# Dusk
## Video Demo:  <URL HERE>
### Description: A Final Project of Harvard's Introduction to Computer Science. Dusk is a web application that is keeps track of the a task. It is developed with students and developers in mind. Dusk also helps the user concentrate whilst at this task. The inspiration was drawn from my lack of concentration - I have ADHD, which is very bad for someone that wants to spend hours coding. Dusk focuses on solving a problem that has already been solved but in a better way. For instance, most browsers time keepers will keep ticking when my laptop lid is shut. It's supposed to stop since the user isn't working at the moment.
#### Technologies Used to Build this Web App
  - HTML
  - CSS 
  - Bootstrap (framework)
  - Javascript
  - MySQL
  - Flask (framework)
#### Features
  - Home page features
  - Login
  - Pomodoro
  - ToDo
#### Main Description
  Dusk is a web application built with javascript and python (flask) that keeps track of a task using the pomodoro technique. Pomodoro technique according to [Wikipedia](https://en.wikipedia.org/wiki/Pomodoro_Technique) is a time management method developed by **Francesco Cirillo** in the late 1980s. It uses a kitchen timer to break work into intervals, typically 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student.
##### Pomodoro Description
  The original technique has six steps:
  1. Decide on the task to be done.
  2. Set the pomodoro timer (typically for 25 minutes).
  3. Work on the task.
  4. End work when the timer rings and take a short break (typically 5–10 minutes).
  5. If you have finished fewer than three pomodoros, go back to Step 2 and repeat until you go through all three pomodoros.
  6. After three pomodoros are done, take the fourth pomodoro and then take a long break (typically 20 to 30 minutes). Once the long break is finished, return to step two.
  
For the purposes of the technique, a pomodoro is an interval of work time.
Regular breaks are taken, aiding assimilation. A 10-minute break separates consecutive pomodoros. Four pomodoros form a set. There is a longer 20–30 minute break between sets.
  The javascript file **timer.js** takes care of the above steps. The algorithm is built to allow only one mode at a time. They are three modes in the app:
  - Pomodoro
  - Short Break
  - Long Break
  The initial idea was to write the pomodoro alogrithm with python (backend). After some research, I found out that it could be problem sending the timer to the frontend every second. That was how I started learning Javascript more deeply.
#### ToDo
  The ToDo part of the web app was written with Javascript in the file, to-do.js.
  The ToDo allows users to add a todo, tick it when they are done with the task - with a line through and the user can delete a task or clear the whole todos.
  Learning Javascript object was handy in completing this task.
  
