const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
const dial = document.querySelector(".dial");
circle.setAttribute("stroke-dasharray", perimeter);
let duration;
const timer = new Timer(durationInput, startButton, pauseButton, stopButton, {
  onStart(totalDuration) {
    duration = totalDuration;
    dial.classList.add("pulse");
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    dial.classList.remove("pulse");
  },
  onPause() {
    dial.classList.remove("pulse");
  },
  onStop() {
    dial.classList.remove("pulse");
  }
});
