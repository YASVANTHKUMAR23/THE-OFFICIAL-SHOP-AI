import requests
import json
import sys

# Fix Windows console Unicode (handles ₹ and other symbols)
sys.stdout.reconfigure(encoding='utf-8')

FLOWISE_URL = "http://localhost:3000/api/v1/prediction/f4d3bd1d-4d12-469a-8309-06d0a325b2c6"
SESSION_ID = "test-session-001"  # Keep consistent to maintain memory context

def query(question, session_id=SESSION_ID):
    payload = {
        "question": question,
        "chatId": session_id,           # Links to BufferWindowMemory session
        "overrideConfig": {
            "sessionId": session_id     # Ensures vector store retriever uses same context
        }
    }
    try:
        response = requests.post(FLOWISE_URL, json=payload, timeout=60)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.ConnectionError:
        return {"error": "Cannot connect to Flowise. Make sure Docker is running: 'docker ps'"}
    except requests.exceptions.Timeout:
        return {"error": "Request timed out. Flowise may be busy."}
    except Exception as e:
        return {"error": str(e)}

# Test query
output = query("samsung s25 ultra")

print("\n=== Flowise Response ===")
if "error" in output:
    print(f"ERROR: {output['error']}")
else:
    print(output.get("text", json.dumps(output, indent=2)))
print("=======================\n")
