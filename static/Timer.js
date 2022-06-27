let timemin = 25;
let timeSecond = timemin * 60;
// Global variable for setinterval's ID
let countDown

const timeH = document.querySelector("h1");

// checks if there is already a value in local storage
if (!localStorage.getItem('timeSecond')) {
  // if not, set the counter to 0 in local storage
  localStorage.setItem('timeSecond', 0);
}

displayTime(timeSecond);

// effectively starts the timer
function start() {
  countDown = setInterval(count, 1000);
}

// this is the tick function
function count() {
  // Retrieves counter value from local storage
  let timeSecond = localStorage.getItem('timeSecond');
  timeSecond--;
  displayTime(timeSecond);
  localStorage.setItem('timeSecond', timeSecond);
  if (timeSecond == 0 || timeSecond < 1) {
    clearInterval(countDown);
  }
  }


// stops the setinterval function
function Stop() {
  clearInterval(countDown);
}

// displays the time
function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}

// this block takes care of the toggle function of the start/stop button
const btn = document.querySelector("#timecon");
document.addEventListener('DOMContentLoaded', function() {
  // Start and Stop button
  btn.addEventListener("click", updateBtn);

  function updateBtn() {
      if (btn.textContent === "Start") {
          btn.textContent = "Stop";
          start();
      } else {
          btn.textContent = "Start";
          Stop();
      }
  }
});

// this function takes care of the function when a user setss new value for the timer
document.querySelector('.innput').oninput = function() {
  timemin = document.querySelector(".innput").value;
  Stop();
  timeSecond = timemin * 60;
  displayTime(timeSecond);
  localStorage.setItem('timeSecond', timeSecond);
  btn.textContent = "Start";
}

// This block ensures that the time showing on the timer is from localstorage
document.addEventListener('DOMContentLoaded', function() {
  // Set heading to the current value inside local storage
  let timeSecond = localStorage.getItem('timeSecond');
  document.querySelector('h1').innerHTML = timeSecond;
  displayTime(timeSecond);

  // Users actual time
  const myInterval = setInterval(myTimer, 1000);
  function myTimer() {
    const date = new Date();
    document.getElementById("demo").innerHTML = date.toLocaleTimeString();
  }

  function myStop() {
    clearInterval(myInterval);
  }
});
