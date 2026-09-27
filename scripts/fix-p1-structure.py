"""
Fix P1 structural issues across Lernreise:
1. Schritt 8: change type from 'entdecken' to 'reflexion' (preserving custom title if present, or defaulting to 'Takeaway & Reflexion')
2. Schritt 6: if title is generic 'Verstaendnispruefung', customize to 'Selbsttest zu <Thema>'
3. Schritt 7: if title is generic 'Klausurtransfer & Rubric', customize to 'Klausurtransfer: <Thema>'
"""

import glob
import re
import os

def fix_p1():
    files = sorted(glob.glob("Lernreise/*.md"))
    fixed_count = 0
    
    for f in files:
        with open(f, "r", encoding="utf-8") as fp:
            content = fp.read()
            
        original = content
        
        # Get thema from frontmatter
        m_thema = re.search(r"^thema:\s*[\"']?(.*?)[\"']?\s*$", content, re.MULTILINE)
        thema = m_thema.group(1).strip() if m_thema else ""
        
        # 1. Schritt 8: replace 'entdecken' with 'reflexion'
        # e.g. ## Schritt 8 — entdecken: Takeaway & Reflexion -> ## Schritt 8 — reflexion: Takeaway & Reflexion
        # or ## Schritt 8 — entdecken -> ## Schritt 8 — reflexion: Takeaway & Reflexion
        def replace_s8(match):
            sep = match.group(1) # — or -
            rest = match.group(2) # optional : title
            if rest and rest.strip():
                # keep title
                return f"## Schritt 8 {sep} reflexion{rest}"
            else:
                return f"## Schritt 8 {sep} reflexion: Takeaway & Reflexion"

        content = re.sub(r"##\s*Schritt\s*8\s*([-—])\s*entdecken([^\n\r]*)", replace_s8, content, flags=re.IGNORECASE)
        
        # 2. Schritt 6 generic titles
        if thema:
            content = re.sub(
                r"(##\s*Schritt\s*6\s*[-—]\s*check)[:：]\s*(?:Verständnisprüfung|Verstaendnispruefung|Verständnisprüfung\s*\(Self-Check\))\s*$",
                rf"\1: Selbsttest zu {thema}",
                content,
                flags=re.MULTILINE
            )
            
            # 3. Schritt 7 generic titles
            content = re.sub(
                r"(##\s*Schritt\s*7\s*[-—]\s*szenario)[:：]\s*(?:Klausurtransfer\s*&\s*Rubric|Klausurtransfer|Klausur-Transfer\s*&\s*Szenario)\s*$",
                rf"\1: Klausurtransfer: {thema}",
                content,
                flags=re.MULTILINE
            )
            
        if content != original:
            with open(f, "w", encoding="utf-8") as fp:
                fp.write(content)
            fixed_count += 1
            
    print(f"P1 Auto-Fix completed! Updated {fixed_count} files.")

if __name__ == "__main__":
    fix_p1()
