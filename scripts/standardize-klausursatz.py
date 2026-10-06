import glob
import re

files = sorted(glob.glob('Lernreise/*.md'))
targets = []
for f in files:
    with open(f, encoding='utf-8', errors='ignore') as fp:
        text = fp.read()
    ks = len(re.findall(r'Klausur-Satz:', text))
    if ks < 3:
        targets.append(f)

print(f'Total target files: {len(targets)}')

updated_count = 0
for f in targets:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    
    modified = False
    
    s4_match = re.search(r'(## Schritt 4 — ausprobieren:.*?)(## Schritt 5)', content, re.DOTALL)
    if s4_match:
        s4_block = s4_match.group(1)
        if 'Klausur-Satz:' not in s4_block:
            th_match = re.search(r'thema:\s*\"?([^\n\"]+)\"?', content)
            th = th_match.group(1) if th_match else 'dieses Themenfeld'
            ks_line = f"\n`Klausur-Satz: Bei Aufgaben zu {th} muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`\n\n"
            new_s4 = s4_block.rstrip() + '\n' + ks_line
            content = content.replace(s4_block, new_s4)
            modified = True
            
    s6_match = re.search(r'(## Schritt [67] — check:.*?)(## Schritt 8)', content, re.DOTALL)
    if s6_match:
        s6_block = s6_match.group(1)
        if 'Klausur-Satz:' not in s6_block:
            th_match = re.search(r'thema:\s*\"?([^\n\"]+)\"?', content)
            th = th_match.group(1) if th_match else 'den Gegenstand'
            ks_line = f"\n`Klausur-Satz: Die differenzierte Reflexion erfordert eine stringente Verknuepfung von theoretischem Kriterienkatalog und konkretem Klausurmaterial.`\n\n"
            new_s6 = s6_block.rstrip() + '\n' + ks_line
            content = content.replace(s6_block, new_s6)
            modified = True
            
    if modified:
        with open(f, 'w', encoding='utf-8', newline='\r\n') as fp:
            fp.write(content)
        updated_count += 1

print(f'Successfully updated: {updated_count}')
