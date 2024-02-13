# ime403project

hi this is Aidan
hi this is mackenzie

Team Project Email:
IME403Project@gmail.com
IME403Project***


1. Create Simple Extension
2. Convene
3. Segment Project

This is Ashley- In the chatgpt summary files, its incomplete. in the popup.js file theres a section where we need to "// Replace the following with the code to interact with ChatGPT for summarization". We need to according to chatgpt: "Interacting with ChatGPT for summarization typically involves making an API call. Since OpenAI provides a GPT API, you would need to obtain the API key from OpenAI and use it to send requests. Below is a basic example using the fetch API to make a request to the OpenAI GPT API. Note that you'll need to replace 'YOUR_API_KEY' with your actual OpenAI API key." and use this code: 

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
    const apiKey = 'YOUR_API_KEY';
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
