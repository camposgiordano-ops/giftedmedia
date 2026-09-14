from pathlib import Path

p = Path("/workspace/gifted-media-blogger.xml")
t = p.read_text("utf-8")
t = t.replace("&family=", "&family=")
t = t.replace("&display=", "&display=")
t = t.replace("<span class='wordmark-amp'>&</span>", "<span class='wordmark-amp'>&</span>")
t = t.replace("Gifted & Media", "Gifted & Media")
p.write_bytes(t.encode("utf-8"))
print("ok", p.read_bytes()[:6], "amp", t.count("&"))
