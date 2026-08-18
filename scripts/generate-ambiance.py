from pathlib import Path
import json
import urllib.request

root = Path(r"C:\Users\north\nonsolopane-github")
src = Path(r"C:\Users\north\restaurantaryana-github\.env.local")
dest_env = root / ".env.local"
out = root / "public" / "audio" / "italia-ambiance.mp3"

key = ""
for line in src.read_text(encoding="utf-8-sig").splitlines():
    if line.startswith("ELEVENLABS_API_KEY="):
        key = line.split("=", 1)[1].strip().strip('"').strip("'")
        break
if not key:
    raise SystemExit("no key")

if not dest_env.exists():
    dest_env.write_text(f"ELEVENLABS_API_KEY={key}\n", encoding="utf-8")

out.parent.mkdir(parents=True, exist_ok=True)

payload = {
    "prompt": (
        "Instrumental only, no vocals and no lyrics. Warm Italian trattoria "
        "ambiance for a family bakery website in Dorval. Nylon acoustic guitar, "
        "soft accordion, light mandolin, gentle brushed percussion, upright bass. "
        "Relaxed mid-tempo around 88 bpm, sunlit, looping cafe background, "
        "smooth start and end so it can repeat. Exclude singing, rap, electronic "
        "drops, sudden endings, and famous melodies."
    ),
    "music_length_ms": 90000,
    "model_id": "music_v2",
    "force_instrumental": True,
}

req = urllib.request.Request(
    "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128",
    data=json.dumps(payload).encode("utf-8"),
    headers={
        "xi-api-key": key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    },
    method="POST",
)

print("requesting music...")
try:
    with urllib.request.urlopen(req, timeout=180) as res:
        audio = res.read()
        ctype = res.headers.get("Content-Type", "")
        print("status", res.status, "type", ctype, "bytes", len(audio))
except urllib.error.HTTPError as err:
    body = err.read().decode("utf-8", errors="replace")
    print("http", err.code, body[:800])
    raise SystemExit(1)

if len(audio) < 8000:
    print("too small, probably an error payload")
    print(audio[:400])
    raise SystemExit(1)

out.write_bytes(audio)
print("wrote", out, out.stat().st_size)
