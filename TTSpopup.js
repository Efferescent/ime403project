document.addEventListener('DOMContentLoaded', function () {
    var textToSpeak = document.getElementById('textToSpeak');
    var speakButton = document.getElementById('speakButton');
    var rateSlider = document.getElementById('rateSlider');
    var rateValue = document.getElementById('rateValue');
    var volumeSlider = document.getElementById('volumeSlider');
    var volumeValue = document.getElementById('volumeValue');
    var voiceSelect = document.getElementById('voiceSelect');
  
    rateSlider.addEventListener('input', function () {
      rateValue.textContent = rateSlider.value;
    });
  
    volumeSlider.addEventListener('input', function () {
      volumeValue.textContent = volumeSlider.value;
    });
  
    speakButton.addEventListener('click', function () {
      var text = textToSpeak.value;
      var rate = parseFloat(rateSlider.value);
      var volume = parseFloat(volumeSlider.value);
      var selectedVoice = voiceSelect.value;
      speakText(text, rate, volume, selectedVoice);
    });
  
    chrome.tts.getVoices(function (voices) {
      populateVoiceSelect(voices);
    });
  
    function populateVoiceSelect(voices) {
      voiceSelect.innerHTML = '';
      voices.forEach(function (voice) {
        var option = document.createElement('option');
        option.value = voice.voiceName;
        option.textContent = voice.voiceName;
        voiceSelect.appendChild(option);
      });
    }
  
    function speakText(text, rate, volume, selectedVoice) {
      chrome.tts.speak(text, {
        rate: rate,
        volume: volume,
        voiceName: selectedVoice
      });
    }
  });
  