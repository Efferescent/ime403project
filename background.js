let timeLeft = 0; // Time left in seconds
let timerType = "work"; // Current timer type: "work" or "break"
let state = "Start";
let pause = "Pause";
let isPaused = false; // Added to track pause state
let countdownTimer;

function startTimer(duration, type) {
    clearInterval(countdownTimer);
    timeLeft = duration * 60; // Convert minutes to seconds
    timerType = type;
    iteration = 0;
    countdownTimer = setInterval(() => {
        iteration++;
        console.log(iteration);
        if (timeLeft > 0) {
            console.log(timeLeft);
            console.log(pause);
            console.log(pause === "Pause");
            console.log(iteration == 10);
            if (iteration >= 10 && pause === "Pause") {
                timeLeft--;
                iteration = 0;
            }
            // Send a periodic update to the popup
            chrome.runtime.sendMessage({timeLeft: timeLeft, timerType: timerType, state: state, pause: pause});
        } else {
            clearInterval(countdownTimer);
            // Switch timer type and start the next timer
            timerType = timerType === "work" ? "break" : "work";
            notifTitle = timerType === "work" ? "Work Time" : "Break Time";
            notifText = timerType === "work" ? "Time to get back to work!" : "Time to take a break!";
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'images/icon.png', // Path to the icon
                title: notifTitle,
                message: notifText
            });
            let nextDuration = timerType === "work" ? duration : duration; // Adjust this line to switch between different durations for work and break
            startTimer(nextDuration, timerType);
        }
    }, 100);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
        state = "Stop";
        startTimer(request.workTime, "work");
        chrome.storage.local.set({isTimerRunning: true});
    } else if (request.action === "stop") {
        state = "Start";
        clearInterval(countdownTimer);
        chrome.storage.local.set({isTimerRunning: false});
    } else if (request.request === "currentTimeLeft") {
        // Respond with the current timer state
        sendResponse({timeLeft: timeLeft, timerType: timerType});
    } else if (request.action === "pause") {
        pause = "Play";
        chrome.storage.local.set({isPaused: true});
    } else if (request.action === "play") {
        pause = "Pause";
        chrome.storage.local.set({isPaused: false});  
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({isTimerRunning: false});
    chrome.storage.local.set({isPaused: false});
});
