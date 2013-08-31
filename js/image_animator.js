var ImageAnimator = (function () {
  function ImageAnimator(targetImgTag, defaultSrc) {
    this.imgTag = targetImgTag;
    this.defaultSrc = defaultSrc;
    this.animationId = 0;
    this.animationQueue = [];
  }

  /**
   * This function take an array of pairs, where each pair corresponds to the
   * image file and duration to show that image.
   * For instance, [{src: 'a.png', duration: 1000}, {src: 'b.png', duration:2000}]
   * means a.png is shown for 1000 msec, and then b.png is shown for 3000 msec.
   * 
   * If this method is called during another animation is ongoing, new animation
   * overrides the old one.
   */
  ImageAnimator.prototype.play = function(animation) {
    this.animationId++;
    this.animationQueue = animation;
    this._playAnimationUnit(this.animationId);
  };

  ImageAnimator.prototype._playAnimationUnit = function(animationId) {
    if (animationId != this.animationId) {
      // Another animation started, so just ignore this animation.
      return;
    }
    if (this.animationQueue.length == 0) {
      this.imgTag.src = this.defaultSrc;
      return;
    }
    var animationUnit = this.animationQueue.shift();
    this.imgTag.src = animationUnit.src;
    setTimeout(this._playAnimationUnit.bind(this, this.animationId), animationUnit.duration);
  };

  ImageAnimator.prototype.stopAnimation = function(restoreDefault) {
    this.animationId++;
    if (restoreDefault) {
      this.imgTag.src = this.defaultSrc;
    }
  };

  ImageAnimator.prototype.setDefaultSrc = function(src) {
    this.defaultSrc = src;
  };

  return ImageAnimator;
})();
