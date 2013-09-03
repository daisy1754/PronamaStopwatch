var StopWatch = (function () {
  function StopWatch() {
    this.running = false;
    this.startTimeMillis = null;
    this.changeListener = {onTimeChange: function(){}};
  }

  StopWatch.prototype.isRunning = function() {
    return this.running;
  };

  StopWatch.prototype.start = function(changeListener) {
    this.reset();
    this._start(changeListener);
  };

  StopWatch.prototype._start = function(changeListener) {
    this.running = true;
    if (changeListener && changeListener.onTimeChange) {
      this.changeListener = changeListener;
    }
    setTimeout(this.notifyPassedTime.bind(this), 5);
  };

  StopWatch.prototype.reset = function() {
    this.startTimeMillis = new Date().getTime();
  };

  StopWatch.prototype.restart = function(currentMillis, changeListener) {
    this.startTimeMillis = new Date().getTime() - currentMillis;
    console.log("restart");
    this._start(changeListener);
  };

  StopWatch.prototype.getPassedTimeMillis = function() {
    return new Date().getTime() - this.startTimeMillis;
  };

  StopWatch.prototype.notifyPassedTime = function() {
    if (!this.running) {
      return;
    }
    this.changeListener.onTimeChange(this.getPassedTimeMillis());
    setTimeout(this.notifyPassedTime.bind(this), 5);
  };

  StopWatch.prototype.stop = function() {
    this.running = false;
    return new Date().getTime() - this.startTimeMillis;
  };
  return StopWatch;
})();