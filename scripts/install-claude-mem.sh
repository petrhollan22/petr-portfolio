#!/bin/bash

# Claude-Mem i18n Installation Script
# Installs claude-mem with Czech and English language support

set -e

echo "🚀 Claude-Mem i18n Installation"
echo "================================"
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.0.0 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20.0.0 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Step 1: Install claude-mem
echo "📦 Step 1/3: Installing claude-mem..."
npx claude-mem install

echo ""
echo "✅ claude-mem installed successfully"
echo ""

# Step 2: Configure language settings
echo "🌍 Step 2/3: Configuring language support..."

SETTINGS_DIR="$HOME/.claude-mem"
SETTINGS_FILE="$SETTINGS_DIR/settings.json"

# Create directory if it doesn't exist
mkdir -p "$SETTINGS_DIR"

# Ask user for language preference
echo ""
echo "Select your preferred language:"
echo "1) Czech (Čeština) - Primary with English fallback"
echo "2) English - Primary with Czech fallback"
echo "3) Custom configuration"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "Setting up Czech as primary language..."
        cat > "$SETTINGS_FILE" <<'SETTINGS'
{
  "CLAUDE_MEM_MODE": "code--cs",
  "CLAUDE_MEM_FALLBACK_LANGUAGE": "en",
  "CLAUDE_MEM_LANGUAGES": ["cs", "en"],
  "CLAUDE_MEM_PRIMARY_LANGUAGE": "cs"
}
SETTINGS
        echo "✅ Czech language configuration saved"
        ;;
    2)
        echo "Setting up English as primary language..."
        cat > "$SETTINGS_FILE" <<'SETTINGS'
{
  "CLAUDE_MEM_MODE": "code--en",
  "CLAUDE_MEM_FALLBACK_LANGUAGE": "cs",
  "CLAUDE_MEM_LANGUAGES": ["en", "cs"],
  "CLAUDE_MEM_PRIMARY_LANGUAGE": "en"
}
SETTINGS
        echo "✅ English language configuration saved"
        ;;
    3)
        echo "Opening settings file for manual configuration..."
        if command -v nano &> /dev/null; then
            nano "$SETTINGS_FILE"
        elif command -v vi &> /dev/null; then
            vi "$SETTINGS_FILE"
        else
            echo "⚠️  Please manually create/edit: $SETTINGS_FILE"
            exit 1
        fi
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""

# Step 3: Verify installation
echo "🔍 Step 3/3: Verifying installation..."
echo ""

if npx claude-mem --version &> /dev/null; then
    CLAUDE_MEM_VERSION=$(npx claude-mem --version)
    echo "✅ Claude-Mem version: $CLAUDE_MEM_VERSION"
else
    echo "⚠️  Could not verify version (this is okay)"
fi

echo ""
echo "================================"
echo "✅ Installation Complete!"
echo "================================"
echo ""
echo "📋 Next steps:"
echo "1. Restart Claude Code"
echo "2. The plugin will automatically load with your chosen language settings"
echo "3. Your conversation context will be preserved across sessions"
echo ""
echo "📖 For more information, see: docs/CLAUDE_MEM_I18N_SETUP.md"
echo ""
