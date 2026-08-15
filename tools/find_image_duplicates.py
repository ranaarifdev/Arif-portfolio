import hashlib
import pathlib

ROOT = pathlib.Path('.').resolve()
patterns = ['*.jpg', '*.jpeg', '*.png']
files = []
for p in patterns:
    files.extend(sorted(ROOT.glob(p)))

hash_map = {}
for f in files:
    try:
        data = f.read_bytes()
    except Exception as e:
        print('ERROR reading', f, e)
        continue
    h = hashlib.sha256(data).hexdigest()
    hash_map.setdefault(h, []).append(str(f.name))

duplicates = {h: names for h, names in hash_map.items() if len(names) > 1}
if not duplicates:
    print('NO_DUPLICATES')
else:
    for h, names in duplicates.items():
        print(h + ':' + ','.join(names))
