import os
import re

articles_dir = r'src/lib/blog/articles'

fixed_count = 0

for root, dirs, files in os.walk(articles_dir):
    for f in files:
        if f.endswith('.ts') and f not in ['index.ts', 'en.ts']:
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            original = content
            
            # Pattern 1: content ends with ` followed by extra stuff and ' };
            # e.g. `extra text' };
            content = re.sub(r"(content:\s*`[\s\S]*?</p>\s*)\n?\s*`[^`]*'\s*\};", r"\1`\n};", content)
            
            # Pattern 2: content ends with ` followed by extra stuff (no quote) and };
            # These are minified single-line files
            if "' };" in content and "content:" in content:
                # Find where the proper content should end (after </p>)
                content = re.sub(r"(</p>)\s*`[^`']+'\s*\};", r"\1` };", content)
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f'FIXED: {filepath}')
                fixed_count += 1

print(f'\nTotal fixed: {fixed_count} files')
