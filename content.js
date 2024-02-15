// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'readText' && request.text) {
      chrome.tts.speak(request.text);
    }
  });