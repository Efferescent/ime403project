var speechUtterance = null;

document.getElementById('speak').addEventListener('click', function () {
    var text = document.getElementById('text-to-speak').value;
    var rate = parseFloat(document.getElementById('speed').value);
    speakText(text, rate);
});

document.getElementById('pause').addEventListener('click', function () {
    if (speechUtterance) {
        if (speechUtterance.paused) {
            chrome.tts.resume();
        } else {
            chrome.tts.pause();
        }
    }
});

function speakText(text, rate) {
    if (speechUtterance) {
        chrome.tts.stop();
    }

    speechUtterance = new SpeechSynthesisUtterance(text);
    speechUtterance.lang = 'en-US';
    speechUtterance.rate = rate;

    chrome.tts.speak(text, {
        'lang': 'en-US',
        'rate': rate
    });
}
