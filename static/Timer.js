// class timer
class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    // Reference of each of the important HTML elements
    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset")
    };

    // The interval - checks to see if the timer is running or not
    this.interval = null;
    // checks for the remaining seconds before it gets to 0
    this.remainingSeconds = 1500;

    // checks if there is already a value in local storage
    if (!localStorage.getItem('this.remainingSeconds')) {
    // if not, set the counter to 0 in local storage
      localStorage.setItem('this.remainingSeconds', 0);
    }

    
    // Eventlistener for the control of the play and pause timer
    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });


    this.el.reset.addEventListener("click", () => {
      let inputMinutes = prompt("Enter number of minutes:");
      while (!/^[0-9]+$/.test(inputMinutes)) {
        alert("You did not enter a number.");
        inputMinutes = prompt("Enter a number(minutes):");
      }
      if (inputMinutes) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        localStorage.setItem('this.remainingSeconds', this.remainingSeconds);
        this.updateInterfaceTime();
      }
    });
  }

  // a fxn to update the interface time based on the current remaining seconds
  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    // Adds extra 0 to the timer if it is a single digit
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  // A fxn that toggles between play and pause button
  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  // This fxn starts the timer
  start() {
    // This conditions cancels the current timer if the remaining seconds is 0
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds = localStorage.getItem('this.remainingSeconds');
      this.remainingSeconds--;
      this.updateInterfaceTime();
      localStorage.setItem('this.remainingSeconds', this.remainingSeconds);

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  // This fxn stops the timer
  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  // Static method that injects the html code from js
  static getHTML() {
    return `
          <span class="timer__part timer__part--minutes">00</span>
          <span class="timer__part">:</span>
          <span class="timer__part timer__part--seconds">00</span>
          <button type="button" class="btn-outline-dark timer__btn timer__btn--control timer__btn--start">
              <span class="material-icons">play_arrow</span>
          </button>
          <button type="button" class="timer__btn timer__btn--reset">
              <span class="material-icons">timer</span>
          </button>
        `;
  }
}

// Instance of timer
new Timer(
    document.querySelector(".timer")
);
