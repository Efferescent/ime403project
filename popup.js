document.getElementById('speak').addEventListener('click', function() {
    var text = document.getElementById('text-to-speak').value;
    chrome.tts.speak(text, {'lang': 'en-US', 'rate': 1.0});
  });
  