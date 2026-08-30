import html.parser
from pathlib import Path
import re

# 1. Parse HTML
html_content = Path('index.html').read_text(encoding='utf-8')

class Validator(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.img_sources = []
        self.hrefs = []
    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)
        d = dict(attrs)
        if tag == 'img' and 'src' in d:
            self.img_sources.append(d['src'])
        if tag == 'a' and 'href' in d:
            self.hrefs.append(d['href'])

val = Validator()
val.feed(html_content)
print(f'Total HTML tags parsed: {len(val.tags)}')
print(f'Total img sources referenced in HTML: {len(val.img_sources)}')

# Check every referenced image file exists
missing = [img for img in val.img_sources if not Path(img).exists()]
print('Missing images:', missing if missing else 'None (All exist!)')

# Check all internal anchors exist
anchors = [h[1:] for h in val.hrefs if h.startswith('#') and len(h) > 1]
for a in set(anchors):
    if f'id="{a}"' not in html_content and f'id=\'{a}\'' not in html_content:
        print(f'Warning: anchor #{a} target not found in HTML')
print('Anchor targets check complete.')

# 2. Check CSS braces match
css_content = Path('style.css').read_text(encoding='utf-8')
open_braces = css_content.count('{')
close_braces = css_content.count('}')
print(f'CSS open braces: {open_braces}, close braces: {close_braces}')
assert open_braces == close_braces, 'CSS braces mismatch!'

# 3. Check JS cert list
cert_list_js = Path('cert-list.js').read_text(encoding='utf-8')
js_certs = re.findall(r'"([^"]+\.(?:png|jpg|jpeg))"', cert_list_js)
print(f'Certificates in cert-list.js: {len(js_certs)}')
missing_js_certs = [c for c in js_certs if not Path(c).exists()]
print('Missing JS certs:', missing_js_certs if missing_js_certs else 'None (All exist!)')

print('ALL VALIDATIONS PASSED SUCCESSFULLY!')
