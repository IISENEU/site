# Local preview that mimics GitHub Pages: /events serves events.html, unknown paths get 404.html.
# Started by Claude Code from .claude/launch.json ("site", port 8765), or by hand:
#   python3 .claude/serve.py 8765
import http.server, io, os, sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")   # always show the latest edits
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and os.path.exists(path + ".html"):
            self.path = self.path.split("?")[0].split("#")[0] + ".html"
        elif not os.path.exists(path):                       # like GitHub Pages: unknown paths get 404.html
            body = open(os.path.join(os.getcwd(), "404.html"), "rb").read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            return io.BytesIO(body)
        return super().send_head()

http.server.ThreadingHTTPServer(("", int(sys.argv[1])), Handler).serve_forever()
