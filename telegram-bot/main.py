import os
import re
import json
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from github import Github
from openai import OpenAI
import anthropic
from groq import Groq

TELEGRAM_TOKEN = os.environ['TELEGRAM_TOKEN']
GITHUB_TOKEN = os.environ['GITHUB_TOKEN']
ALLOWED_USER_ID = int(os.environ['ALLOWED_USER_ID'])
OPENAI_KEY = os.environ.get('OPENAI_KEY', '')
ANTHROPIC_KEY = os.environ.get('ANTHROPIC_KEY', '')
GROQ_KEY = os.environ.get('GROQ_KEY', '')

g = Github(GITHUB_TOKEN)
petr_repo = g.get_repo("petrhollan22/petr-portfolio")
lukas_repo = g.get_repo("petrhollan22/lukas-web")

# Default provider
current_provider = {"value": "groq"}

SYSTEM_PROMPT = """Jsi asistent pro správu dvou webů:
1. petr.hollan.cz - osobní portfolio (závody, maraton PB)
2. lukasbranka.cz - fotografické portfolio (fotky, bio, statistiky)

Dostupné příkazy:
/add_race <název> <DD.MM.YYYY> <km> <místo>
/update_pb <čas>
/lukas_stat <1|2|3> <hodnota>
/lukas_bio <text>
/status

Na základě zprávy navrhni příkaz nebo odpověz co nelze udělat. Odpovídej stručně česky."""

async def ask_llm(text: str) -> str:
    provider = current_provider["value"]
    try:
        if provider == "anthropic":
            client = anthropic.Anthropic(api_key=ANTHROPIC_KEY)
            msg = client.messages.create(
                model="claude-haiku-4-5",
                max_tokens=500,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": text}]
            )
            return msg.content[0].text
        elif provider == "groq":
            client = Groq(api_key=GROQ_KEY)
            response = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": text}
                ],
                max_tokens=500
            )
            return response.choices[0].message.content
        elif provider == "openai":
            client = OpenAI(api_key=OPENAI_KEY)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": text}
                ],
                max_tokens=500
            )
            return response.choices[0].message.content
    except Exception as e:
        return f"Chyba LLM: {e}"

async def check_auth(update: Update) -> bool:
    if update.effective_user.id != ALLOWED_USER_ID:
        await update.message.reply_text("Nemáš přístup.")
        return False
    return True

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not await check_auth(update): return
    await update.message.reply_text(
        f"Web bot aktivní! Provider: {current_provider['value']}\n\n"
        "/add_race <název> <DD.MM.YYYY> <km> <místo>\n"
        "/update_pb <čas>\n"
        "/lukas_stat <1|2|3> <hodnota>\n"
        "/lukas_bio <text>\n"
        "/provider <anthropic|groq|openai>\n"
        "/status\n\n"
        "Nebo napiš volně co chceš změnit."
    )

async def set_provider(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not await check_auth(update): return
    if not context.args or context.args[0] not in ['anthropic', 'groq', 'openai']:
        await update.message.reply_text("Použití: /provider <anthropic|groq|openai>")
        return
    current_provider["value"] = context.args[0]
    await update.message.reply_text(f"Provider nastaven na: {context.args[0]}")

async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not await check_auth(update): return
    await update.message.reply_text(
        f"Provider: {current_provider['value']}\n"
        "petr-portfolio: https://petr.hollan.cz\n"
        "lukas-web: https://lukasbranka.cz"
    )

async def add_race(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not await check_auth(update): return
    args = context.args
    if len(args) < 4:
        await update.message.reply_text("Použití: /add_race <název> <DD.MM.YYYY> <km> <místo>")
        return
    name, date, distance = args[0], args[1], args[2]
    place = ' '.join(args[3:])
    day, month, year = date.split('.')
    iso_date = f"{year}-{month.zfill(2)}-{day.zfill(2)}"
    new_entry = f"  {{ date: '{date}', isoDate: '{iso_date}', day: 'Neděle', name: '{name}', url: '', place: '{place}', distance: {distance}, surface: '', profile: '' }},"
    try:
        file = petr_repo.get_contents("data/races.ts")
        content = file.decoded_content.decode()
        new_content = content.replace('];', new_entry + '\n];')
        petr_repo.update_file("data/races.ts", f"Add race: {name}", new_content, file.sha)
        await update.message.reply_text(f"Závod '{name}' přidán!")
    except Exception as e:
        await update.message.reply_text(f"Chyba: {e}")

async def update_pb(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not await check_auth(update): return
    if not context.args:
        await update.message.reply_text("Použití: /update_pb <čas>")
        return
    pb = context.args[0]
    try:
        file = petr_repo.get_contents("app/[locale]/about/page.tsx")
        content = file.decoded_content.decode()
        new_content = re.sub(
            r'(font-black gradient-text mb-2[^"]*">)[0-9:]+(<)',
            rf'\g<1>{pb[:4]}\g<2>',
            content
        )
        petr_repo.update_file("app/[locale]/about/page.tsx", f"Update PB to {pb}", new_content, file.sha)
        await update.message.reply_text(f"PB aktualizováno na {pb}!")
    except Exception as e:
        await update.message.reply_text(f"Chyba: {e}")

async def lukas_stat(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not await check_auth(update): return
    args = context.args
    if len(args) < 2:
        await update.message.reply_text("Použití: /lukas_stat <1|2|3> <hodnota>")
        return
    stat_num, value = args[0], args[1]
    key_map = {'1': 'stat1Num', '2': 'stat2Num', '3': 'stat3Num'}
    key = key_map.get(stat_num)
    if not key:
        await update.message.reply_text("Statistika musí být 1, 2 nebo 3.")
        return
    try:
        for lang in ['cs', 'en']:
            file = lukas_repo.get_contents(f"messages/{lang}.json")
            data = json.loads(file.decoded_content.decode())
            data['home'][key] = value
            new_content = json.dumps(data, ensure_ascii=False, indent=2)
            lukas_repo.update_file(f"messages/{lang}.json", f"Update stat {stat_num} to {value}", new_content, file.sha)
        await update.message.reply_text(f"Statistika {stat_num} aktualizována na {value}!")
    except Exception as e:
        await update.message.reply_text(f"Chyba: {e}")

async def lukas_bio(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not await check_auth(update): return
    if not context.args:
        await update.message.reply_text("Použití: /lukas_bio <text>")
        return
    bio = ' '.join(context.args)
    try:
        file = lukas_repo.get_contents("messages/cs.json")
        data = json.loads(file.decoded_content.decode())
        data['about']['bio1'] = bio
        new_content = json.dumps(data, ensure_ascii=False, indent=2)
        lukas_repo.update_file("messages/cs.json", "Update Lukas bio", new_content, file.sha)
        await update.message.reply_text("Bio aktualizováno!")
    except Exception as e:
        await update.message.reply_text(f"Chyba: {e}")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not await check_auth(update): return
    text = update.message.text
    await update.message.reply_text(f"Přemýšlím ({current_provider['value']})...")
    reply = await ask_llm(text)
    await update.message.reply_text(reply)

def main():
    app = Application.builder().token(TELEGRAM_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("status", status))
    app.add_handler(CommandHandler("provider", set_provider))
    app.add_handler(CommandHandler("add_race", add_race))
    app.add_handler(CommandHandler("update_pb", update_pb))
    app.add_handler(CommandHandler("lukas_stat", lukas_stat))
    app.add_handler(CommandHandler("lukas_bio", lukas_bio))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    print("Bot spuštěn...")
    app.run_polling()

if __name__ == "__main__":
    main()
