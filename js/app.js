window.onload = function() {
  // TODO: implement something
}

var StopWatch = (function () {
  function StopWatch() {
    this.running = false;
    this.startDate = null;
    this.changeListener = {onTimeChange: function(){}};
  }

  StopWatch.prototype.isRunning = function() {
    return this.running;
  };

  StopWatch.prototype.start = function(changeListener) {
    this.startDate = new Date();
    this.running = true;
    if (changeListener && changeListener.onTimeChange) {
      this.changeListener = changeListener;
    }
    setTimeout(this.notifyPassedTime.bind(this), 5);
  };

  StopWatch.prototype.notifyPassedTime = function() {
    if (!this.running) {
      return;
    }
    var passedTimeMillis = new Date().getTime() - this.startDate.getTime();
    this.changeListener.onTimeChange(passedTimeMillis);
    setTimeout(this.notifyPassedTime.bind(this), 5);
  };

  StopWatch.prototype.stop = function() {
    this.running = false;
    return new Date().getTime() - this.startDate.getTime();
  };
  return StopWatch;
})();