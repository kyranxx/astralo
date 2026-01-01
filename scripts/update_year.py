import os
import re

# Directories to process
directories = [
    r'src/lib/blog/articles',
    r'src/locales',
    r'src/pages'
]

extensions = ['.ts', '.astro', '.tsx', '.js', '.md', '.mdx']

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Replace 2024 with 2026 in all contexts
    content = content.replace('2024', '2026')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {filepath}')
        return True
    return False

count = 0
for directory in directories:
    if not os.path.exists(directory):
        print(f'Directory not found: {directory}')
        continue
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if any(filename.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, filename)
                if process_file(filepath):
                    count += 1

print(f'\nTotal files updated: {count}')
