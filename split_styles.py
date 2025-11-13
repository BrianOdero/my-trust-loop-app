import re

with open('styles/styles.ts', 'r') as f:
    content = f.read()

# Find all export statements
exports = re.finditer(r'^export const (\w+) = .*?\n(?=^export const |\Z)', content, re.MULTILINE | re.DOTALL)

for match in exports:
    name = match.group(1)
    code = match.group(0)
    print(f"{name}: {len(code)} chars")
    
    # Save to individual file
    with open(f'styles/{name}.ts', 'w') as out:
        # Add imports
        out.write("import { StyleSheet } from 'react-native';\n")
        out.write("import { useTheme } from './theme';\n\n")
        out.write(code)

print("\nFiles created successfully!")
