# Claude-Mem Quick Start Guide

## What is Claude-Mem?

Claude-Mem is a Claude Code plugin that automatically preserves and references your conversation context across sessions. It remembers your previous conversations, preferences, and work history, making your Claude interactions more contextual and efficient.

## Installation (Quick)

```bash
# Option 1: Automated setup with language selection
./scripts/install-claude-mem.sh

# Option 2: Manual npm installation
npx claude-mem install
```

## Basic Usage

### Automatic Context Preservation

After installing claude-mem, your conversation context is **automatically saved** when you:
- End a conversation
- Switch between different chats
- Close and reopen Claude Code

### Accessing Previous Context

Claude-Mem automatically loads relevant context from your previous conversations. You don't need to do anything—it works in the background.

### Example Workflow

**Session 1 (Tuesday):**
```
You: "I'm working on a project to build a portfolio website with React"
Claude: [Helps with project setup]
```

**Session 2 (Thursday):**
```
You: "Can you help me add animations?"
Claude: "I remember you're building a portfolio website. Here's how to add animations to your React project..."
```

## Language Configuration

### Switch Language Anytime

Edit `~/.claude-mem/settings.json`:

```bash
# For Czech
{
  "CLAUDE_MEM_MODE": "code--cs"
}

# For English
{
  "CLAUDE_MEM_MODE": "code--en"
}
```

Then restart Claude Code.

### Check Current Language

Look at your settings file:
```bash
cat ~/.claude-mem/settings.json
```

## Configuration Options

### Czech Primary (with English Fallback)
```json
{
  "CLAUDE_MEM_MODE": "code--cs",
  "CLAUDE_MEM_FALLBACK_LANGUAGE": "en",
  "CLAUDE_MEM_LANGUAGES": ["cs", "en"],
  "CLAUDE_MEM_PRIMARY_LANGUAGE": "cs"
}
```

### English Primary (with Czech Fallback)
```json
{
  "CLAUDE_MEM_MODE": "code--en",
  "CLAUDE_MEM_FALLBACK_LANGUAGE": "cs",
  "CLAUDE_MEM_LANGUAGES": ["en", "cs"],
  "CLAUDE_MEM_PRIMARY_LANGUAGE": "en"
}
```

### Trilingual or More
```json
{
  "CLAUDE_MEM_MODE": "code--cs",
  "CLAUDE_MEM_FALLBACK_LANGUAGE": "en",
  "CLAUDE_MEM_LANGUAGES": ["cs", "en", "sk"],
  "CLAUDE_MEM_PRIMARY_LANGUAGE": "cs"
}
```

## Features

✨ **Automatic Context Preservation**
- Previous conversations saved automatically
- Relevant context loaded when needed

🌍 **Multilingual Support**
- Czech (Čeština)
- English
- Extensible to other languages

⚡ **Seamless Integration**
- Works within Claude Code
- No manual context management needed
- Faster context switching

🔒 **Privacy-Focused**
- Your data stored locally
- SQLite database with encrypted storage options

## Troubleshooting

### "Plugin not loaded"
→ Restart Claude Code after installation

### "Settings not applied"
→ Check JSON syntax in `~/.claude-mem/settings.json`
→ Verify file location: `~/.claude-mem/settings.json`

### "Wrong language showing"
→ Check `CLAUDE_MEM_MODE` setting
→ Restart Claude Code completely

### Context not loading
→ Verify plugin is in Claude Code's plugin list
→ Check database file exists at `~/.claude-mem/db.sqlite`

## Advanced Usage

### View Stored Conversations

```bash
# List conversations (requires CLI tools)
ls ~/.claude-mem/
```

### Reset Context (if needed)

```bash
# Backup first
cp -r ~/.claude-mem ~/.claude-mem-backup

# Remove database to start fresh
rm ~/.claude-mem/db.sqlite
```

Then restart Claude Code to rebuild the database.

### Custom Data Directory

You can configure a custom location for claude-mem data:

```json
{
  "CLAUDE_MEM_MODE": "code--cs",
  "CLAUDE_MEM_DATA_DIR": "/custom/path/to/storage"
}
```

## Performance Tips

- **First-time load**: May take a few seconds as it indexes your history
- **Regular use**: Gets faster as it learns your patterns
- **Periodic cleanup**: Archive old conversations if storage becomes an issue

## Support & Resources

- 📚 [Full Documentation](https://github.com/thedotmack/claude-mem)
- 🇨🇿 [Czech Documentation](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.cs.md)
- 🐛 [Report Issues](https://github.com/thedotmack/claude-mem/issues)

## Next Steps

1. Run the installation script or `npx claude-mem install`
2. Restart Claude Code
3. Start using Claude normally—your context will be preserved automatically
4. Check the settings file if you want to adjust language preferences

Happy coding! 🚀
