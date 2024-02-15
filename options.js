// options.js
document.addEventListener('DOMContentLoaded', function () {
    var textToReadInput = document.getElementById('textToRead');
    var readButton = document.getElementById('readButton');
  
    readButton.addEventListener('click', function () {
      var textToRead = textToReadInput.value.trim();
      if (textToRead) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'readText', text: textToRead });
        });
      }
    });
  });
  