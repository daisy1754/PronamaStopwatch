var STATE_INIT = 0, STATE_RUNNING = 1, STATE_STOPPED = 2;
var currentState;
var startButton, stopButton, restartButton, resetButton;

window.onload = function() {
  var stopwatch = new StopWatch();
  startButton = getById("start_button");
  restartButton = getById("restart_button");
  resetButton = getById("reset_button");
  stopButton = getById("stop_button");
  addEvent(startButton, 'click', handleStart);
  addEvent(stopButton, 'click', handleStop);
  addEvent(restartButton, 'click', handleRestart);
  addEvent(resetButton, 'click', handleReset);
};

function handleStart() {
  setUIState(STATE_RUNNING);
}

function handleStop() {
  setUIState(STATE_STOPPED);
}

function handleRestart() {
  setUIState(STATE_RUNNING);
}

function handleReset() {
  if (currentState == STATE_STOPPED) {
  	setUIState(STATE_INIT);
  }
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
