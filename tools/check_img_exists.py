from pathlib import Path
import re

html = Path('index.html').read_text(encoding='utf-8')
srcs = re.findall(r"""<img[^>]+src=["']([^"']+)["']""", html)
missing = []
for s in srcs:
    p = Path(s)
    if not p.exists():
        # also check root relative path
        if not Path(p.name).exists():
            missing.append(s)

if not missing:
    print('ALL_EXIST')
else:
    for m in missing:
        print('MISSING:' + m)
