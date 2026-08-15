import re
from pathlib import Path

path = Path('index.html')
html = path.read_text(encoding='utf-8')

pattern = re.compile(r'<article[^>]*class="card cert-card"[^>]*>(.*?)</article>', re.S)
matches = pattern.findall(html)
empty = []
for m in matches:
    h3 = re.search(r'<h3>(.*?)</h3>', m, re.S)
    p = re.search(r'<p>(.*?)</p>', m, re.S)
    title = h3.group(1).strip() if h3 else '(no title)'
    desc = p.group(1).strip() if p else None
    if desc is None or desc == '':
        empty.append(title)

if not empty:
    print('ALL_DESCRIPTIONS_PRESENT')
else:
    for t in empty:
        print('MISSING_DESC:' + t)
