/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "What geometric shape is generally used for stop signs??",
      o: ["Square", "Hexagon", "Octagon", "Decagon"],
      a: 2, // Octagon
    },
    {
      q: "What is the rarest M&M colour?",
      o: ["brown", "red", "green", "yellow"],
      a: 0, // brown
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      // id=radio_0_0 means radio question 0 option 0, radio_0_1 -> question 0, option 1
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    // quizItem -> is the object
    // index is the index of the question
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        // id in HTML of the radio option
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);
        let ans = `radio_${index}_${quizItem.a}`;

        if (quizItem.a == i) {
          //change border color of li element here
          document.getElementById(li).style.border = "solid green";
        }

        if (radioElement.checked) {
          // code for task 1 goes here
          // if the radio element is checked, is it the correct answer?
          if (r == ans) {
            score++;
          }
        }
      }
    });
    displayScore(score);
  };

  // adds score content to modal html
  const displayScore = (score) => {
    let modalBody = document.getElementById("modalBody");
    console.log(modalBody);
    let scoreContent = `Your score is ${score}!`;
    modalBody.innerHTML = scoreContent;
  };

  // reload the page
  const btnReset = document.querySelector("#btnReset");
  btnReset.addEventListener("click", () => {
    window.location.reload();
  });

  // add event listener to the submit button
  const btnSubmit = document.querySelector("#btnSubmit");
  btnSubmit.addEventListener("click", () => {
    calculateScore();
  });

  // add a timer for 60 seconds
  let timeLeft = 61;
  const timeDisplay = document.getElementById("time");

  const timer = setInterval(displayTime, 1000);

  function displayTime() {
    timeLeft--;
    // format the time to display as 01:00 ...
    let timeString =
      timeLeft < 10
        ? `00:0${timeLeft}`
        : timeLeft < 60
        ? `00:${timeLeft}`
        : "01:00";
    // set HTML
    timeDisplay.innerHTML = timeString;

    // when timer reaches 0, stop the timer, calculate score and display the mdoal
    if (timeLeft == 0) {
      clearInterval(timer);
      calculateScore();
      $("#scoreModal").modal();
    }
  }

  // call the displayQuiz function
  displayQuiz();
});
