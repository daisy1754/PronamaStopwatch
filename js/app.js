var STATE_INIT = 0, STATE_RUNNING = 1, STATE_STOPPED = 2;
var currentState;
var timeText;
var startButton, stopButton, restartButton, resetButton;
var stopwatch = new StopWatch();

window.onload = function() {
  startButton = getById("start_button");
  restartButton = getById("restart_button");
  resetButton = getById("reset_button");
  stopButton = getById("stop_button");
  timeText = getById("time");
  addEvent(startButton, 'click', handleStart);
  addEvent(stopButton, 'click', handleStop);
  addEvent(restartButton, 'click', handleRestart);
  addEvent(resetButton, 'click', handleReset);
};

function updateTimeText(millis) {
  var sec = parseInt(millis / 1000);
  var handred_millis = parseInt(millis % 1000 / 100);
  var ten_millis = parseInt(millis % 100 / 10);
  timeText.innerHTML = sec + "." + handred_millis + "" + ten_millis;
}

function handleStart() {
  setUIState(STATE_RUNNING);
  stopwatch.start({onTimeChange: updateTimeText});
}

function handleStop() {
  setUIState(STATE_STOPPED);
  updateTimeText(stopwatch.stop());
}

function handleRestart() {
  setUIState(STATE_RUNNING);
  stopwatch.restart(
  	  parseFloat(timeText.innerHTML) * 1000, {onTimeChange: updateTimeText});
}

function handleReset() {
  if (currentState == STATE_STOPPED) {
  	setUIState(STATE_INIT);
  }
  updateTimeText(0);
  stopwatch.reset();
}

function setUIState(state) {
  switch (state) {
  	case STATE_INIT:
  	  showElms([startButton]);
  	  hideElms([stopButton, restartButton, resetButton]);
  	  break;
  	case STATE_RUNNING:
  	  showElms([stopButton, resetButton]);
  	  hideElms([startButton, restartButton]);
  	  break;
  	case STATE_STOPPED:
  	  showElms([restartButton, resetButton]);
  	  hideElms([startButton, stopButton]);
  	  break;
  }
  currentState = state;
}
