
var questions = [
	{
		question: "What is the name of the main spaceship in The Expanse?",
		choices: ["The Tiger","Edward Israel","Rocinante","Flying Alamo"],
		choicesAnswer: 2
	},
	{
		question: "Name the main character on the show Firefly?",
		choices: ["James Holden","Malcolm Reynolds","James T. Kirk","Yoda"],
		choicesAnswer: 1
	},
	{
		question: "In the Expanse, what Martian moon was destroyed by Earth?",
		choices: ["Deimos","Luna","Phobos","Phoebe"],
		choicesAnswer: 0
	},
	{
		question: "What is Sherlock Holmes's brother's name?",
		choices: ["Hudson","Gladstone","Mycroft","Lestrade"],
		choicesAnswer: 2
	},
	{
		question: "In The Expanse, the protomolecule was unleashed on what station?",
		choices: ["Ceres","Pallas","Tycho","Eros"],
		choicesAnswer: 3
	}
];

for(var i = 0; i < questions.length; i++){ //Prints out in console all questions and answers
	console.log(questions[i].question);
	console.log(questions[i].choices);
	var answer = questions[i].choicesAnswer;
	console.log(questions[i].choices[answer]);
}

function getCorrect(check){ //Checks to see if selected answer is correct, wrong, or unanswered
	var current = questions[currentQuestion].choicesAnswer;
	var currentAnswer = clearRadio();
	if(currentAnswer == -1){
		unanswered++;
	}
	else if(current == currentAnswer){
			correctAnswers++;
	}
	else{
			wrongAnswers++;
	}

}

function addQuestions(num){ //Rewrites the question and answers by going to next question
	var num2 = num + 1;
	$("#first").html("Question #" + num2 + ": " + questions[num].question);
	$("#1-a").html(questions[num].choices[0]);
	$("#1-b").html(questions[num].choices[1]);
	$("#1-c").html(questions[num].choices[2]);
	$("#1-d").html(questions[num].choices[3]);
}

function checkData(id){ //Retrieves the current selected radio button value
	var check = -1;
	if(document.getElementById(id).checked){
			switch (id){
				case 'q1':
					check = 0;
					break;
				case 'q2':
					check = 1;
					break;
				case 'q3':
					check = 2;
					break;
				case 'q4':
					check = 3;
					break;
			}
	}
		return check;
}

function clearRadio(){ //Unchecks the selected radio button when new question appears
	var ob1 = document.getElementsByTagName("input");
	for(i = 0; i < ob1.length; i++){
		var id = ob1[i].id;
		var currentAnswer = checkData(id);
		if(currentAnswer == i){
			document.getElementById(id).checked = false;
			return i;
		}
		
		console.log("ID: " + id + "currentAnswer: " + currentAnswer);
		
	}
	return -1;
}

var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;


function startGame(id){ //Function is called when start button is pressed
	
	correctAnswers = 0;
	unanswered = 0;
	wrongAnswers = 0;

	var timeLeft = 30;
	var timerId = setInterval(countdown, 1000);

	function countdown(){
	if(timeLeft == 0){
		clearTimeout(timerId);
		$("#seconds-remain").html("Time has run out!");
		$("#startText").html("Click Here to Start the Game!");
		unanswered += (5 - currentQuestion);
	}
	else {
		timeLeft--;
	}
	$("#time-left").html(timeLeft);
	$("#answers-list").html("Correct: " + correctAnswers +  " Incorrect: " + wrongAnswers + " Unanswered: " + unanswered);	
}

	$("#seconds-remain").html("Seconds Remaining: ");

	
	countdown(); //Starts the timer
	currentQuestion = 0; //If game is restarted by pressing 'Next' after times is done
	addQuestions(currentQuestion); //Calls addQuestions to rewrite question and answers
}

function nextQuestion(id){ //Used when user presses the 'Next' button
	getCorrect();
	clearRadio();
	if(currentQuestion < 4){
		addQuestions(currentQuestion + 1);
		currentQuestion++;
	}
	else {
		startGame();
		unanswered = 0;
		correctAnswers = 0;
		wrongAnswers = 0;
	}
}