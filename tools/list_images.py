import pathlib, json
p=pathlib.Path('.').resolve()
imgs=sorted([f.name for f in p.iterdir() if f.suffix.lower() in ('.jpg','.jpeg','.png')])
print(json.dumps(imgs))
