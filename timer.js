class Timer {
  constructor(durationInput, startButton, pauseButton, stopButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.stopButton = stopButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onPause = callbacks.onPause;
      this.onStop = callbacks.onStop;
    }
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.stopButton.addEventListener("click", this.stop);
    this.started = false;
  }

  start = () => {
    if (this.onStart && !this.started) {
      this.onStart(this.timeRemaining);
    }
    if (!this.started) {
      this.tick();
      this.interval = setInterval(this.tick, 50);
    }
    this.started = true;
  };
  stop = () => {
    if (this.onStop && this.started) {
      this.onStop();
    }
    if (this.started) {
      clearInterval(this.interval);
      this.started = false;
    }
  };
  pause = () => {
    this.started = false;
    if (this.onPause) {
      this.onPause();
    }
    clearInterval(this.interval);
  };
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
