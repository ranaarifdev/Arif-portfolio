from pathlib import Path
import re

html = Path('index.html').read_text(encoding='utf-8')
srcs = re.findall(r"""<img[^>]+src=["']([^"']+)["']""", html)
cert_list = Path('cert-list.js')
if cert_list.exists():
    cert_js = cert_list.read_text(encoding='utf-8')
    srcs.extend(re.findall(r'"([^"]+\.(?:jpg|jpeg|png))"', cert_js, re.I))

srcs = sorted(set(srcs))
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
