export async function queryChatbot(data: { 
  question: string; 
  chatId?: string; 
  overrideConfig?: { sessionId?: string } 
}) {
    const response = await fetch(
        "http://localhost:3000/api/v1/prediction/f4d3bd1d-4d12-469a-8309-06d0a325b2c6",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}
