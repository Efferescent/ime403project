document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('summarizeButton').addEventListener('click', function () {
      summarizeText();
    });
  });
  
  async function summarizeText() {
    const inputText = document.getElementById('inputText').value;
  
    if (inputText.trim() === '') {
      alert('Please enter text to summarize.');
      return;
    }
  
    try {
      const apiKey = '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';
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: inputText,
          max_tokens: 100, // Adjust the maximum number of tokens in the response
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      const summaryText = result.choices[0].text.trim();
  
      document.getElementById('summary').innerText = summaryText;
    } catch (error) {
      console.error('Error interacting with ChatGPT:', error);
      alert('Error interacting with ChatGPT. Please try again.');
    }
  }

  
  