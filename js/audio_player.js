var AudioPlayer = (function () {
  // Note: this MUST be called after document is loaded.
  function AudioPlayer(options) {
    options = options || {};
    this.baseUrl = options.baseUrl || '';
    this.channelType = options.channelType || 'normal';
    this.audioTag = document.createElement('audio');
    this.audioTag.style.display = 'none';
    this.audioTag.mozAudioChannelType = this.channelType;
    this.audioTag.src = '';
    if (options.audioType) {
      this.audioTag.type = options.audioType;
    }
    if (!document || !document.body) {
      console.error("Cannot find document.body, " 
          + "this method should be called in window.onload");
    }
    document.body.appendChild(this.audioTag);
  }

  AudioPlayer.prototype.play = function(contentUrl) {
    var url = this.baseUrl + contentUrl;
    this.audioTag.src = this.baseUrl + contentUrl;
    this.audioTag.play();
  };

  return AudioPlayer;
})();