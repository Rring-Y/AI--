"""
IndexTTS2 TTS Server
====================
为 AI 女友小雅提供语音合成 API。

安装依赖:
  pip install flask flask-cors index-tts

启动服务:
  python tts_server.py

API:
  POST /tts  { "text": "你好呀～我是小雅" }  →  audio/wav
  GET  /health                              →  { "status": "ok" }
"""

from flask import Flask, request, send_file
from flask_cors import CORS
import os
import tempfile
import uuid

app = Flask(__name__)
CORS(app)  # 允许跨域请求（浏览器前端调用）

# ---------- IndexTTS2 初始化 ----------
try:
    from index_tts import IndexTTS2
    tts = IndexTTS2()
    print("[✓] IndexTTS2 加载成功")
except Exception as e:
    print(f"[!] IndexTTS2 加载失败: {e}")
    print("    请确保已安装: pip install index-tts")
    tts = None


@app.route('/health', methods=['GET'])
def health():
    if tts is None:
        return {'status': 'error', 'message': 'IndexTTS2 not loaded'}, 500
    return {'status': 'ok', 'model': 'IndexTTS2'}


@app.route('/tts', methods=['POST'])
def synthesize():
    if tts is None:
        return {'error': 'TTS not available'}, 500

    data = request.get_json()
    if not data or 'text' not in data:
        return {'error': 'Missing "text" field'}, 400

    text = data['text'].strip()
    if not text:
        return {'error': 'Empty text'}, 400

    try:
        # 生成临时文件
        tmp_dir = tempfile.gettempdir()
        filename = f"tts_{uuid.uuid4().hex}.wav"
        filepath = os.path.join(tmp_dir, filename)

        # IndexTTS2 合成语音
        tts.tts_to_file(text=text, file_path=filepath)

        # 返回音频文件
        return send_file(filepath, mimetype='audio/wav',
                         as_attachment=False,
                         download_name=filename)

    except Exception as e:
        return {'error': str(e)}, 500


if __name__ == '__main__':
    print("=" * 50)
    print("  IndexTTS2 TTS Server")
    print("  监听: http://localhost:8765")
    print("  API:  POST /tts  { text: '...' }")
    print("=" * 50)
    app.run(host='0.0.0.0', port=8765)
