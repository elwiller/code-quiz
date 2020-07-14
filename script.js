// Initalize the quesion pool with correct and incorrect answers
var quizPool = [
  {question: "Which built-in method removes the last element from an array and returns that element?",
    answers: [['pop()', true],
             ['last()', false],
             ['get()', false],
             ['slice()', false]]},
  {question: "Which of these is the correct method to create a new array?",
    answers: [['var myArray = ();', false],
             ['var myArray = [];', true],
             ['var myArray = {};', false],
             ['var myArray = <>;', false]]},
  {question: "Which of these is correct to create a JavaScript object?",
    answers: [['var myArray = ();', false],
             ['var myArray = [];', false],
             ['var myArray = {};', true],
             ['var myArray = <>;', false]]},
  {question: "Which of these is NOT a logical operator?",
    answers: [['!', false],
             ['&&', false],
             ['||', false],
             ['=', true]]},
  {question: "Which of the following variable types does NOT exist in JavaScript?",
    answers: [['boolean', false],
             ['number', false],
             ['object', false],
             ['double', true]]},
  {question: "Which event fires whenever a control loses focus?",
    answers: [['onclick', false],
             ['onmove', false],
             ['onblur', true],
             ['onchange', false]]},
  {question: "The function call Math.floor(3.5) returns:",
    answers: [['0', false],
             ['3', true],
             ['4', false],
             ['undefined', false]]},
  {question: "Which of these will throw a SyntaxError?",
    answers: [['if (x ==== 1) { }', true],
             ['if (x === 1) { }', false],
             ['if (x == 1) { }', false],
             ['if (x = 1) { }', false]]},
  {question: "How do you check what type of value is in variable x?",
    answers: [['gettype(x);', false],
             ['x.type;', false],
             ['Object.type(x);', false],
             ['typeof(x);', true]]},
  {question: "Which of the following is NOT a reserved word?",
    answers: [['throw', false],
             ['void', false],
             ['program', true],
             ['return', false]]},
];

var currentQuestion = 0;
var currentScore = 100;
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var timer = setInterval(scoreTimer, 1000);

// randomly shuffle an array (from https://javascript.info/)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};

// get the first 5 questions and randomly shuffle their answers
const createQuiz = () => {
  var quiz = [];
  for (var i = 0; i < 5; i++) {
    var answers = shuffle(quizPool[i].answers);
    quiz.push([quizPool[i].question, answers]);
  };
  return quiz;
};

// display questions and answer, assign correct answer
function displayNextQuestion(question) {
  document.getElementById('question').innerHTML = question[0];
  for (i = 0; i < 4; i++) {
    document.getElementById('answer' + (i + 1)).innerHTML = question[1][i][0];
    document.getElementById('answer' + (i + 1)).style.backgroundColor = 'transparent';
  };
};

// event listeners for answer buttons
$('.answer-btn').on({
  mouseover: function() {
    $('.answer-btn').css('cursor', 'pointer');
  },
  
  click: function(event) {
    if (nextButton.disabled) {
      if (!quizArray[currentQuestion][1][event.target.id[6]-1][1]) {
        event.target.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        currentScore -= 10;
        updateScore(currentScore);
      };
      for (i = 0; i < 4; i++) {
        if (quizArray[currentQuestion][1][i][1]) {
          document.getElementById('answer' + (i + 1)).style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
        };
      };
      nextButton.disabled = false;
    }
  }
});

// event listeners for control buttons
$('#start-btn').click(function() {
  currentScore = 100;
  updateScore(currentScore);
  quizPool = shuffle(quizPool);
  quizArray = createQuiz();
  currentQuestion = 0;
  startButton.disabled = true;
  document.getElementById('answers').style.visibility = 'visible';
  displayNextQuestion(quizArray[currentQuestion]);
});
$('#next-btn').click(function() {
  nextButton.disabled = true;
  currentQuestion++;
  if (currentQuestion < 5) {
    displayNextQuestion(quizArray[currentQuestion]);
  } else {
    startButton.disabled = false;
  };
});

// timer function to subtract one point per second
function scoreTimer() {
  if (startButton.disabled) {
    currentScore--;
    updateScore(currentScore);
  };
};

// update score
function updateScore(score) {
  document.getElementById('score').textContent = 'Score: ' + score;
};
