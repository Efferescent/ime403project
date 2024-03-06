document.getElementById('goToTextToSpeech').addEventListener('click', function() {
    chrome.tabs.create({url: 'popup.html'});
  });
  
  document.getElementById('goToTimer').addEventListener('click', function() {
    // Handle navigation to the timer page or any other functionality
  });
  
  document.getElementById('info').addEventListener('click', function() {
    alert("This extension allows you to convert text to speech and set a timer for studying. Click 'Go to Text to Speech' to convert text to speech, and 'Go to Timer' to set a timer for studying and breaks.");
    // You can replace the alert with any other method of displaying information, such as a modal or a separate HTML page.
  });
  
