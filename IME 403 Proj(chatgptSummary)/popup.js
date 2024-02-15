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
    const tokenLimit = 4096; // Adjust based on the specific token limit of your GPT model
    if (inputText.split(' ').length > tokenLimit) {
      alert('Input text exceeds the token limit. Please provide a shorter text.');
      return;
    }

    const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
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
      const errorDetails = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(errorDetails)}`);
    }

    const result = await response.json();
    const summaryText = result.choices[0].text.trim();

    document.getElementById('summary').innerText = summaryText;
  } catch (error) {
    console.error('Error interacting with ChatGPT:', error);
    alert(`Error interacting with ChatGPT. Details: ${error.message}`);
  }
}