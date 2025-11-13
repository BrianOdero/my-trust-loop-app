import re
import os

# Color mappings from hex to theme property
color_mappings = {
    '#0f0f0f': 'theme.colors.background',
    '#1a1a1a': 'theme.colors.surface',
    '#2a2a2a': 'theme.colors.surfaceSecondary',
    '#374151': 'theme.colors.surfaceTertiary',
    '#10b981': 'theme.colors.primary',
    '#059669': 'theme.colors.primaryDark',
    '#34d399': 'theme.colors.primaryLight',
    '#3b82f6': 'theme.colors.secondary',
    '#ffffff': 'theme.colors.text',
    '#fff': 'theme.colors.text',
    'white': 'theme.colors.text',
    '#9ca3af': 'theme.colors.textSecondary',
    '#6b7280': 'theme.colors.textTertiary',
    '#94a3b8': 'theme.colors.textSecondary',
    '#d1d5db': 'theme.colors.border',
    '#e5e7eb': 'theme.colors.borderLight',
    '#ef4444': 'theme.colors.error',
    '#f59e0b': 'theme.colors.warning',
    '#000000': 'theme.colors.black',
    '#000': 'theme.colors.black',
    'black': 'theme.colors.black',
    '#fbbf24': 'theme.colors.warning',
}

def convert_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if already converted
    if 'const theme = useTheme();' in content:
        print(f"Skipping {filepath} - already converted")
        return
    
    original_content = content
    
    # Add theme hook after imports if not present
    if 'useTheme()' not in content:
        # Find the export statement
        export_match = re.search(r'(export const \w+ = \(\) =>?)', content)
        if export_match:
            insert_pos = export_match.end()
            # Add theme hook
            if '=> {' in content[insert_pos:insert_pos+10] or '=> \n' in content[insert_pos:insert_pos+10]:
                # Function with braces
                content = content[:insert_pos] + ' {\n  const theme = useTheme();\n\n  return' + content[insert_pos:]
            else:
                # Arrow function without braces
                content = content[:insert_pos] + ' {\n  const theme = useTheme();\n\n  return ' + content[insert_pos:]
                # Add closing brace at the end
                content = re.sub(r'\}\);$', '});\n};', content)
    
    # Replace color values
    for hex_color, theme_prop in color_mappings.items():
        # Match color in quotes
        content = re.sub(
            rf"(backgroundColor|borderColor|color|shadowColor|borderTopColor|borderBottomColor|borderLeftColor|borderRightColor):\s*['\"]({re.escape(hex_color)})['\"]",
            rf"\1: {theme_prop}",
            content,
            flags=re.IGNORECASE
        )
    
    # Special handling for dark mode colors in light theme
    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Converted {filepath}")
    else:
        print(f"No changes needed for {filepath}")

# Get all style files
style_files = [
    'styles/chatInbox.ts',
    'styles/chatStyles.ts',
    'styles/contactSelectionModalStyles.ts',
    'styles/dashboardStyles.ts',
    'styles/groupCreationModalStyles.ts',
    'styles/notificationStyle.ts',
    'styles/paymentsSTyles.ts',
    'styles/portfolioStyles.ts',
    'styles/profileStyles.ts',
    'styles/reportsStyles.ts',
    'styles/settingsStyles.ts',
    'styles/thryvStyles.ts',
    'styles/walletStyles.ts',
    'styles/withdrawalStyles.ts',
]

for file in style_files:
    if os.path.exists(file):
        convert_file(file)

print("\n✅ Conversion complete!")
