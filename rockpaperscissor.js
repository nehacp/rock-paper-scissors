'use strict';

var computerGesture;
var userGesture;

var view = {
	displayGesture: function(gesture, type) {
		var displayGesture;
		if (gesture === 'rock'){
			displayGesture = document.getElementById(type);
			displayGesture.setAttribute('class', 'rock');
		}
		else if (gesture === 'paper'){
			displayGesture = document.getElementById(type);
			displayGesture.setAttribute('class', 'paper');
		}
		else if (gesture === 'scissor'){
			displayGesture = document.getElementById(type);
			displayGesture.setAttribute('class', 'scissor');
		}
		else {
			displayGesture = document.getElementById(type).className = '';
			
		}
	},
	
	displayScore: function(userScore, computerScore) {
		var uScore = document.getElementById('userScore');
		uScore.innerHTML ='Your score is ' + userScore;

		var cScore = document.getElementById('computerScore');
		cScore.innerHTML ='Your score is ' + computerScore;
	},

	displayCurrentTurn: function(msg) {
		var message = document.getElementById('currentTurn');
		message.innerHTML = msg; 
	}
};

var model = {
	userScore: 0,
	computerScore: 0,
	compareGesture: function() {
		if (userGesture === computerGesture) {
			view.displayCurrentTurn('Its a draw!');
		}
		else if (userGesture === 'rock' && computerGesture === 'paper') {
			view.displayCurrentTurn('Paper wins. Point to computer');
			this.computerScore++;		
		}
		else if (userGesture === 'rock' && computerGesture === 'scissor') {
			view.displayCurrentTurn('Rock wins! Point to you!');
			this.userScore++;
		}
		else if (userGesture === 'paper' && computerGesture === 'rock') {
			view.displayCurrentTurn('Paper wins! Point to you!');
			this.userScore++;
		}
		else if (userGesture === 'paper' && computerGesture === 'scissor') {
			view.displayCurrentTurn('Scissor wins. Point to computer');
			this.computerScore++;
		}
		else if (userGesture === 'scissor' && computerGesture === 'rock') {
			view.displayCurrentTurn('Rock wins. Point to computer');
			this.computerScore++;
		}
		else if (userGesture === 'scissor' && computerGesture === 'paper') {
			view.displayCurrentTurn('Scissor wins! Point to you!');
			this.userScore++;
		}
		
		view.displayScore(this.userScore, this.computerScore);
		this.gameOver();
	},

	userName: function() {
		var name = prompt('Please tell us your name');
		var setName = document.getElementById('userName');
		setName.innerHTML = name.charAt(0).toUpperCase() + name.slice(1); 
		console.log(setName.innerHTML);
	},


	gameOver: function() {
		if (this.userScore === 10) {
			alert('Wow! You knew what the compter was thinking! You win!');
			this.resetGame();
		}
		else if (this.computerScore === 10) {
			alert('The computer won. Better luck next time :(');
			this.resetGame();
		}
	},

	resetGame: function() {
		view.displayCurrentTurn('');
			this.userScore = 0;
			this.computerScore = 0;
			view.displayScore(this.userScore, this.computerScore);
			view.displayGesture('', 'user');
			view.displayGesture('', 'computer');
	}
};

var controller = {
	generateGesture: function() {
		var randomGesture = Math.floor(Math.random() * 3);
		if (randomGesture === 0) {
			computerGesture = 'rock';
			view.displayGesture('rock', 'computer');
		}
		else if (randomGesture === 1) {
			computerGesture = 'paper';
			view.displayGesture('paper', 'computer');
		}
		else if (randomGesture === 2) {
			computerGesture = 'scissor';
			view.displayGesture('scissor', 'computer');
		}
		return computerGesture;
	},

	gamePlay: function(gesture){
		var rock = document.getElementById(gesture);
		userGesture = gesture;
		view.displayGesture(gesture, 'user');
		controller.generateGesture();
		model.compareGesture();		
	}

};

window.onload = model.userName ();
