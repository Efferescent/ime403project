document.addEventListener('DOMContentLoaded', function() {
    const startStopBtn = document.getElementById('startStopBtn');
    const pausePlayBtn = document.getElementById('playPauseBtn');
    const workTimeInput = document.getElementById('workTime');
    const breakTimeInput = document.getElementById('breakTime');
    const timerDisplay = document.getElementById('timer');

    function updateTimerDisplay(minutes, seconds, timerType, state, pause) {
        timerDisplay.textContent = `${timerType.toUpperCase()} - ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        startStopBtn.textContent = state;
        pausePlayBtn.textContent = pause;
        console.log(pause);
    }

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.timeLeft !== undefined && message.timerType) {
            const minutes = Math.floor(message.timeLeft / 60);
            const seconds = message.timeLeft % 60;
            updateTimerDisplay(minutes, seconds, message.timerType, message.state, message.pause);
        }
    });

    startStopBtn.addEventListener('click', () => {
        chrome.storage.local.get('isTimerRunning', (data) => {
            if (data.isTimerRunning) {
                chrome.runtime.sendMessage({action: "stop"});
                startStopBtn.textContent = "Start";
                workTimeInput.disabled = false;
                breakTimeInput.disabled = false;
            } else {
                chrome.runtime.sendMessage({
                    action: "start",
                    workTime: parseInt(workTimeInput.value),
                    breakTime: parseInt(breakTimeInput.value)
                });
                startStopBtn.textContent = "Stop";
                workTimeInput.disabled = true;
                breakTimeInput.disabled = true;
            }
        });
    });

    pausePlayBtn.addEventListener('click', () => {
        chrome.storage.local.get('isTimerRunning', (data) => {
            if (data.isTimerRunning) {
                console.log("Timer is running");
                chrome.storage.local.get('isPaused', (data2) => {
                    console.log(data2.isPaused);
                    if (data2.isPaused) {
                        chrome.runtime.sendMessage({action: "play"});
                        pausePlayBtn.textContent = "Pause";
                    } else {
                        chrome.runtime.sendMessage({action: "pause"});
                        pausePlayBtn.textContent = "Play";
                    }
                });
                chrome.runtime.sendMessage({action: "pause"});
            }
        });
    });

    // Request the current timer state from the background script when the popup is opened
    chrome.runtime.sendMessage({request: "currentTimeLeft"});
});
