import re
import glob

files = glob.glob('dist/assets/index-*.js')
for fn in files:
    with open(fn, 'r', encoding='utf-8') as f:
        code = f.read()
    matches = set(re.findall(r'[\'\"`]((?:\./|/)[a-zA-Z0-9_\-\.]+\.(?:png|jpg|webp|svg|ico|pdf))[\'\"`]', code))
    print(f'{fn}: {len(matches)} matches')
    for m in sorted(matches):
        print(f'  {m}')
