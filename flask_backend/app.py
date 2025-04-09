from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import VideoUnavailable, TranscriptsDisabled
from google import genai
import os
import re
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

def extract_video_id(link):
    pattern = r'(?:v=|\/)([0-9A-Za-z_-]{11}).*'
    match = re.search(pattern, link)
    return match.group(1) if match else None

@app.route('/api/process-link', methods=['POST'])
def process_link():
    try:
        data = request.get_json()
        link = data.get('url')
        
        if not link:
            return jsonify({"error": "Missing YouTube link"}), 400
            
        video_id = extract_video_id(link)
        if not video_id:
            return jsonify({"error": "Invalid YouTube link"}), 400
            
        transcript_data = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = "\n".join([entry["text"] for entry in transcript_data])
        
        prompt = """
Summarize this youtube video transcript text into clear, plain text notes without any special formatting like bold (**), lists, or Markdown syntax.
""" + transcript_text
        
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=[prompt]
        )
        
        notes = response.text
        note_lines = notes.split('\n')
        
        # Filter out empty lines
        note_lines = [line for line in note_lines if line.strip()]
        
        return jsonify({"notes": note_lines, "status": "success"})
        
    except Exception as e:
        print("ERROR:", e)  # ← this will show up in terminal
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
