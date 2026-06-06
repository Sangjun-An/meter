import http.server
import os
import socketserver
import sys
import webbrowser

PORT = 8000

def resource_path(relative_path):
    if getattr(sys, 'frozen', False):
        return os.path.join(sys._MEIPASS, relative_path)
    return os.path.join(os.path.abspath(os.path.dirname(__file__)), relative_path)

os.chdir(resource_path('.'))

class SilentHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

handler = SilentHTTPRequestHandler

try:
    with socketserver.TCPServer(("127.0.0.1", PORT), handler) as httpd:
        url = f"http://127.0.0.1:{PORT}/"
        webbrowser.open(url)
        print(f"앱을 실행합니다: {url}")
        print("브라우저가 자동으로 열리지 않으면 위 주소를 복사해서 붙여넣으세요.")
        httpd.serve_forever()
except OSError as exc:
    print(f"포트 {PORT}을(를) 열 수 없습니다. 이미 사용 중일 수 있습니다.")
    print("다른 포트를 사용하려면 run_app.py를 수정하거나, 현재 열려 있는 서버를 종료하세요.")
    print(exc)
