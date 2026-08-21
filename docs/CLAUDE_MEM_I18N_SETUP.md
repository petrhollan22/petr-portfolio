# Claude-Mem Installation with i18n Support (Czech & English)

## Prerequisites

- **Node.js**: 20.0.0 or higher
- **Claude Code**: Latest version with plugin support
- **Bun**: JavaScript runtime (auto-installed if absent)
- **uv**: Python package manager (auto-installed if absent)
- **SQLite 3**: Persistent storage (bundled)

## Installation Steps

### 1. Install Claude-Mem

Run the quick install command:

```bash
npx claude-mem install
```

Alternatively, use Claude Code plugin marketplace:
```bash
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

After installation, **restart Claude Code** to enable automatic context preservation.

### 2. Configure Language Support

Create or edit your settings file at `~/.claude-mem/settings.json`:

#### For Czech (Čeština)
```json
{
  "CLAUDE_MEM_MODE": "code--cs"
}
```

#### For English
```json
{
  "CLAUDE_MEM_MODE": "code--en"
}
```

#### For Bilingual Support (Czech + English)

Create a settings file that supports both languages:

```json
{
  "CLAUDE_MEM_MODE": "code--cs",
  "CLAUDE_MEM_FALLBACK_LANGUAGE": "en",
  "CLAUDE_MEM_LANGUAGES": ["cs", "en"],
  "CLAUDE_MEM_PRIMARY_LANGUAGE": "cs"
}
```

This configuration:
- Sets Czech (`cs`) as the primary language
- Falls back to English (`en`) when Czech translations are not available
- Enables both Czech and English language support

### 3. Restart Claude Code

After updating the settings file, restart Claude Code to apply the language configuration.

## Switching Between Languages

To switch between Czech and English at runtime:

1. Edit `~/.claude-mem/settings.json`
2. Change the `CLAUDE_MEM_MODE` value:
   - Czech: `"code--cs"`
   - English: `"code--en"`
3. Restart Claude Code

## Language Codes

Claude-Mem uses ISO 639-1 language codes:
- `cs` = Czech (Čeština)
- `en` = English

## Troubleshooting

### npm: command not found
- Verify Node.js installation
- Ensure PATH environment variable includes npm
- Restart your terminal

### Settings not applied
- Verify the JSON syntax in `~/.claude-mem/settings.json`
- Restart Claude Code completely
- Check that the settings file is in the correct location

### Language falling back to English
- Check that the settings file has valid JSON
- Verify the language code is correct (cs for Czech)
- Ensure the settings file path is `~/.claude-mem/settings.json`

## Verification

After installation, you can verify claude-mem is working:

```bash
npx claude-mem --version
```

Check that Claude Code recognizes the plugin in the plugins menu.

## Additional Resources

- [Main Repository](https://github.com/thedotmack/claude-mem)
- [Czech Documentation](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.cs.md)
- [Claude Code Documentation](https://claude.ai/code)
