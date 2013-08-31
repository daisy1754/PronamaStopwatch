var STATE_INIT = 0, STATE_RUNNING = 1, STATE_STOPPED = 2;
var KEI_IMAGE_HEIGHT = 1004, KEI_IMAGE_WIDTH = 459;
var currentState;
var timeText;
var startButton, stopButton, restartButton, resetButton;
var keiImage;
var stopwatch = new StopWatch();
var imageAnimator;
var voicePlayer;

window.onload = function() {
  voicePlayer = new AudioPlayer({baseUrl: "resources/sound/kei_voice/"});
  startButton = getById("start_button");
  restartButton = getById("restart_button");
  resetButton = getById("reset_button");
  stopButton = getById("stop_button");
  timeText = getById("time");
  keiImage = getById("kei");
  resizeKeiImage();
  imageAnimator = new ImageAnimator(keiImage, keiImagePath('default'));
  imageAnimator.play([
    {src: keiImagePath('default'), duration: 1500},
    {src: keiImagePath('default_to_smile'), duration: 50},
    {src: keiImagePath('smile'), duration: 1000}
  ]);
  addEvent(startButton, 'click', handleStart);
  addEvent(stopButton, 'click', handleStop);
  addEvent(restartButton, 'click', handleRestart);
  addEvent(resetButton, 'click', handleReset);
  voicePlayer.play('yoroshiku.wav');
};

function keiImagePath(name) {
  return "resources/images/" + name + ".png";
}

function resizeKeiImage() {
  var buttons = getById("buttons");
  var height = buttons.getBoundingClientRect().top - keiImage.getBoundingClientRect().top;
  var ratio = parseFloat(height) / KEI_IMAGE_HEIGHT;
  if (ratio >= 1) {
    return;
  }
  keiImage.style.height = parseInt(height) + 'px';
  keiImage.style.width = parseInt(KEI_IMAGE_WIDTH * ratio) + 'px';
}

function updateTimeText(millis) {
  var sec = parseInt(millis / 1000);
  var handred_millis = parseInt(millis % 1000 / 100);
  var ten_millis = parseInt(millis % 100 / 10);
  timeText.innerHTML = sec + "." + handred_millis + "" + ten_millis;
}

function handleStart() {
  setUIState(STATE_RUNNING);
  stopwatch.start({onTimeChange: updateTimeText});
  voicePlayer.play('start.wav');
  imageAnimator.setDefaultSrc(keiImagePath('good'));
  imageAnimator.stopAnimation(true);
}

function handleStop() {
  setUIState(STATE_STOPPED);
  updateTimeText(stopwatch.stop());
  voicePlayer.play('shuryo.wav');
  imageAnimator.setDefaultSrc(keiImagePath('default'));
  imageAnimator.stopAnimation(true);
}

function handleRestart() {
  setUIState(STATE_RUNNING);
  stopwatch.restart(
      parseFloat(timeText.innerHTML) * 1000, {onTimeChange: updateTimeText});
  voicePlayer.play('start.wav');
  imageAnimator.setDefaultSrc(keiImagePath('good'));
  imageAnimator.stopAnimation(true);
}

function handleReset() {
  if (currentState == STATE_STOPPED) {
    setUIState(STATE_INIT);
  }
  updateTimeText(0);
  stopwatch.reset();
  voicePlayer.play('ga.wav');
  imageAnimator.play([{src: keiImagePath('ga'), duration: 300}]);
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
