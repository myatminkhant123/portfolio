import os
import re

found = {}
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.ts', '.tsx')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as file:
                c = file.read()
                matches = re.findall(r'[\'\"](/[a-zA-Z0-9_\-\.]+\.(?:png|jpg|webp|svg|ico|pdf))[\'\"]', c)
                if matches:
                    found[p] = sorted(list(set(matches)))

for p, m in found.items():
    print(p)
    for item in m:
        print(f"  {item}")
