import os
import re

# List of files to fix
files_to_fix = [
    'onboardingStyles.ts',
    'chatInbox.ts',
    'paymentsSTyles.ts',
    'profileStyles.ts',
    'notificationStyle.ts',
    'portfolioStyles.ts',
    'reportsStyles.ts',
    'settingsStyles.ts',
    'thryvStyles.ts',
    'withdrawalStyles.ts',
    'walletStyles.ts',
]

for filename in files_to_fix:
    filepath = filename
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Fix: "return  StyleSheet" -> "return StyleSheet"
    content = re.sub(r'return\s+\n\s+StyleSheet', 'return StyleSheet', content)
    content = re.sub(r'return\s{2,}StyleSheet', 'return StyleSheet', content)
    
    # Fix missing width reference in onboardingStyles
    if 'onboardingStyles' in filename:
        if 'width*0.8' in content and 'const {' not in content:
            content = re.sub(
                r"(import { useTheme } from './theme';)\n\n",
                r"\1\nimport { Dimensions } from 'react-native';\n\nconst { width, height } = Dimensions.get('window');\n\n",
                content
            )
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Fixed {filepath}")

print("\n✅ All files fixed!")
