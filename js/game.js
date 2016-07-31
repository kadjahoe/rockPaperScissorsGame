/***************************************************************

The Best Rock, Paper, Scissors Game ever!

created by Katherine Adjahoe July 30, 2016

Feel free to use this for learning purposes
If you have any questions or feedback
you can reach me on my blog www.kadesignswow.com or on youtube
at youtube/katherineadjahoe

Also check it out on gitHub as well
https://github.com/kadjahoe/rockPaperScissorsGame.git

***************************************************************/

var time = 4;
var playerChoice = false;
var hourGlass;
var round = 1;
var roundComplete;
var compScore = 0;
var PlayerScore = 0;
var hourGlassCheck = true;
var alertbox = false;
var showing = true;
var showingC = true;

/** 
 This function timer controls the computer's choices if the player
 makes a choice before the time runs out.
 If not, the computer's choice is randomize.
*/

function timer(){
	if(time >= 0){
		time --;
		document.getElementById("timer").innerHTML = time;// Prints the time to the screen
		
		// tracking when to stop the time from going below zero and force user to make a choice anyway
		if (time === 0){
		// hourGlassCheck tells me that the timer went to zero already, which will be used later on to stop user from starting the timer again
			hourGlassCheck = false;
		// then time stops here
			clearInterval(hourGlass);
		// alert the player that they can still make a choice
			document.getElementById('timer').innerHTML = "Opps, times up! but you can still make a choice!";
		}// if playerChoice is false - it means the player has not made a choice yet, so I need to stop them from going forward
		else if (playerChoice === false && hourGlassCheck === false){
			clearInterval(hourGlass);
			
			hourGlassCheck = true;	
		}
		
		return time;
	}
	 
}

/** 
 This function start is triggered when the start button is clicked
*/

function start(){
	var showChoice = document.querySelector('.choices');
	showChoice.classList.remove('hide');//Reveals the radio options for rock, paper, scissors
	var showChoice = document.querySelector('#instruction');
	showChoice.classList.add('hide');//hides press start button to begin
	choicesHideHeading();//hides player and computer choice heading
	document.getElementById("resultBox").innerHTML = ' ';//quick way to hide info since info will constantly go out that area
	//print to the screen what round it is
	document.getElementById("round").innerHTML = 'round' + ' ' + round;
	//hourGlassCheck becomes false when time is up from the timer function above
	if(hourGlassCheck === false){
		// player is alerted that a choice should be me in order to move on 
		alert ("Please make a choice to continue ");
		// store the round back into the round variable so it does not increase or decrease while waiting for player's choice
		round = round;
		// stop the timer while waiting for player to make choice
		clearInterval(hourGlass);
		// says alert box was sent out
		alertbox = true;
	}
	
	//check to see if time as ran out but player still has not made a choice
	else if (hourGlassCheck === true && playerChoice === false){
		// stop the timer
		clearInterval(hourGlass);
		// store round back into round variable
		round = round;
	}

	else{
		// if three rounds have past reset round to 0 for new game
		if (round >= 3) {
			round = 0;
		}
		// print round to screen
		document.getElementById("round").innerHTML = "Round " + round;
		// if time is up reset time to 4 for the next game
		if (time === 0){
			time = 4;
		}

	}// alertbox only changes to true if player has not made a choice and ran out of time
	if( alertbox === true){
		// stop the clock
		clearInterval(timer);
		// reset timer
		time =4;
		// store round back into round
		round = round;
	}
	else 
		// store timer and start timer after checking all the loop holes
		hourGlass = setInterval(timer,1000);	
}
// stop function is called only when player makes a choice
function stop(time, choice){
	// set player choice to true to turn off alertbox
	playerChoice = true;
	// turn alert box off
	alertbox = false;
	// store the time in a variable to decide what computer choice should be
	var timeHolder = time;
	// store player's choice
	var playerHolder = choice;
	// stop the timer
	clearInterval(hourGlass);
	// send the time and player's choice to decide the winner
	decideWinner (timeHolder,playerHolder);
	// hide the choices to avoid triggering stop function again
	var showChoice = document.querySelector('.choices');
	showChoice.classList.add('hide');
	// clear the radio buttons so they don't look like they were checked
	clearRads();
	
}
/* *****************
Everything below controls the outcome of the game and above interacts with the player
*********************/

// function to clear radio
function clearRads() {
    var radList = document.getElementsByName("optradio");

    for (var i = 0; i < radList.length; i++) {
      if(radList[i].checked) document.getElementById(radList[i].id).checked = false;
    }
  }


/* ***************
There is definately a more efficient way
to hide and show the choices for the computer 
and the player, but I decided to go if statement
crazy for purpose of basic understanding

Below are 6 functions to make showing the player and 
computer choice to the screen each time they make a 
choice.

There is 3 separate playerhide functions for player
and 3 separate comperhide functions for the computer
*****************/


// this hides or show player's Rock choice
  function playerhideRock(){
  	var rock = document.querySelector('.player1');
	console.log (rock);
	if(showing === false){
		rock.classList.remove('hide');
	}
	else if(showing === true){
		rock.classList.add('hide');
	}
  }

  // this hides or show player's Paper choice
  function playerhidePaper(){
  	var paper = document.querySelector('.player2');
	console.log (paper);
	if(showing === false){
		paper.classList.remove('hide');
	}
	else if (showing === true){
		paper.classList.add('hide');
	}

  }

  // this hides or show player's Scissors choice
  function playerhideScissors(){
  	var scissors = document.querySelector('.player3');
	console.log (scissors);
	if(showing === false){
		scissors.classList.remove('hide');
	}
	else if(showing === true){
		scissors.classList.add('hide');
	}
  }

  /*******************
	Below are the 3 computer
	choices
  ********************/

  // this hides or show computer's Rock choice
  function computerhideRock(){
  	var rock = document.querySelector('.computer1');
	console.log (rock);
	if(showingC === false){
		rock.classList.remove('hide');
	}
	else if(showingC === true){
		rock.classList.add('hide');
	}
  }

  // this hides or show computer's Paper choice
  function computerhidePaper(){
  	var paper = document.querySelector('.computer2');
	console.log (paper);
	if(showingC === false){
		paper.classList.remove('hide');
	}
	else if(showingC === true){
		paper.classList.add('hide');
	}
}

  // this hides or show computer's Scissors choice
  function computerhideScissors(){
  	var scissors = document.querySelector('.computer3');
	console.log (scissors);
	if(showingC === false){
		scissors.classList.remove('hide');
	}
	else if(showingC === true){
		scissors.classList.add('hide');
	}
  }


  /**********************
	Next the headings for the choices
	that were created and the container
	where the choices that were chosen
	are in the html
  ************************/

  // this function shows the headings for the choices
  function choicesHeading(){
  	var playersChoices = document.querySelector('.playersChoices');
	console.log (playersChoices);
	playersChoices.classList.remove('hide');

	var computerChoices = document.querySelector('.computerChoices');
	console.log (computerChoices);
	computerChoices.classList.remove('hide');
	// shows the container for the chosen choice
	var plays = document.querySelector('.plays');
	console.log (plays);
	plays.classList.remove('hide');
  }

  // this function hides the headings for the choices
  function choicesHideHeading(){
  	var playersChoices = document.querySelector('.playersChoices');
	console.log (playersChoices);
	playersChoices.classList.add('hide');

	var computerChoices = document.querySelector('.computerChoices');
	console.log (computerChoices);
	computerChoices.classList.add('hide');
	// hides the container for the chosen choice
	var plays = document.querySelector('.plays');
	console.log (plays);
	plays.classList.add('hide');
  }

/********************
whatwasChosenP and whatwasChosenC does exactly
what it sounds like.
It determines what choice was chosen by both
the computer and player.
*********************/
  function whatWasChosenP (player){
  	
  	showing = false;
  	if(player === 1){
  		showing = false;
  		playerhideRock();
  		showing = true;
  		playerhidePaper();
  		playerhideScissors();
  	}
  	else if(player === 2){
  		showing = false;
  		playerhidePaper();
  		showing = true;
  		playerhideRock();
  		playerhideScissors();	
  	}
  	else if(player === 3){
  		showing = false;
  		playerhideScissors();
  		showing = true;
  		playerhidePaper();
  		playerhideRock();
  	}
}
function whatWasChosenC (comp){

  	if(comp === 1){
  		showingC = false;
  		computerhideRock();
  		showingC = true;
  		computerhidePaper();
  		computerhideScissors();
  	}
  	else if(comp === 2){
  		showingC = false;
  		computerhidePaper();
  		showingC = true;
  		computerhideRock();
  		computerhideScissors();	
  	}
  	else if(comp === 3){
  		showingC = false;
  		computerhideScissors();	
  		showingC = true;
  		computerhidePaper();
  		computerhideRock();
  	}
  }


/*********************
Now its time to decide who won.
**********************/

// two parameters are taken here - the time that was on
// the timer when it was stopped goes into clock and
// the players choice
function decideWinner(clock, player){
	// once the program gets here we need to turn playerChoice boolen
	// back to false so another choice can be made in the next round
	playerChoice = false;
	// hourGlassCheck if reseted to true to all the timer to start again
	// when called
	hourGlassCheck = true;
	// the time on the timer is used to determine what the computer
	// choice will be, but if time runs out or is 0 or 4 then it is
	// a randomized result
	decideComputer(clock);
	
	// computer decision is made here
	function decideComputer(computer){
		// randomized choice if player runs out of time
		// a number between 1 and 3 is chosen
		if(clock === 0 || clock === 4){
			computer = Math.floor(Math.random() * 3)+ 1;
			console.log (computer);
			
		}
		// if player stops the timer at 1 sec then
		// computer choice will be paper
		else if(clock === 1){
			computer = 2;
			}
		// if player stops the timer at 2 secs then
		// computer choice will be scissors
		else if(clock === 2){
			computer = 3;
		}
		// if player stops the clock at 3 secs then
		// computer choice will be rock
		else
			computer = 1;
		// once computer choice is determine
		// display the headings and choices container
		choicesHeading();
		// then show what player chose
		whatWasChosenP(player);
		// show what computer chose
		whatWasChosenC(computer);
		// next send the computer's choice over
		// to the whoWon function to decide who won
		whoWon(computer);

	}
	// takes the computer choice in has a parameter
	function whoWon(compChoice){

		if (compChoice === player){
			document.getElementById("resultBox").innerHTML = 'It\'s a tie!';
			// these two variables store the player and the computer points
			// to later determine who won after all three rounds
			compScore ++;
			PlayerScore ++;
		}
		else if ((compChoice === 1) && (player === 2)){
			document.getElementById("resultBox").innerHTML = 'You won!';
			PlayerScore ++;
			
		}
		else if ((compChoice === 1) && (player === 3)){
			document.getElementById("resultBox").innerHTML = 'You Lose!';
			compScore ++;
		}
		else if ((compChoice === 2) && (player === 1)){
			document.getElementById("resultBox").innerHTML = 'You Lose!';
			compScore ++;
		}
		else if ((compChoice === 2) && (player === 3)){
			document.getElementById("resultBox").innerHTML = 'You won!';
			PlayerScore ++;
		}
		else if ((compChoice === 3) && (player === 1)){
			document.getElementById("resultBox").innerHTML = 'You won!';
			PlayerScore ++;
		}
		else if ((compChoice === 3) && (player === 2)){
			document.getElementById("resultBox").innerHTML = 'You Lose!';
			compScore ++;
		}
		// reset the timer for next round
		time = 4;
		// check to see if 3 rounds have been completed
		document.getElementById('timer').innerHTML =" ";
		if(round === 3){
			// reset round variable to 1 before next game
			round = 1;
			// call the roundComplete function to calculate
			// who is the winner after 3 rounds
			roundComplete();
		}else
			// but if 3 rounds have not passed
			// add one to round to move to the next round
			round ++;

				
	}

	// this function roundComplete calculate the final score 
	// for both the player and the computer and the resets
	// round, computer's score, and the player's score
	function roundComplete(){
		
			if (compScore > PlayerScore){
				document.getElementById("resultBox").innerHTML = "Sorry, sore LOSER!" + 
				"<br/>" + " Computer " + " " + compScore + "    " + " Player " + " " + PlayerScore;
			
			}
			else if (compScore < PlayerScore){
				document.getElementById("resultBox").innerHTML = "Awesome win!" + 
				"<br/>" + " Computer " + " " + compScore + "    " + " Player " + " " + PlayerScore;
			}
			else if (compScore === PlayerScore){
				document.getElementById("resultBox").innerHTML = "It's a tie!" + "<br/>"
				+ " Computer " + " " + compScore + "    " + " Player " + " " + PlayerScore;
			}
			round = 1;
			compScore = 0;
			PlayerScore = 0;
			// this hides the start button
			var startButton = document.querySelector('.start');
			startButton.classList.add('hide');
			// replaces the start button with play again button
			var playAgain = document.querySelector('.playAgain');
			playAgain.classList.remove('hide');
			// clears old time quickly
			document.getElementById('timer').innerHTML =" ";
			
	}
		

}

/*******************
This resets all of the 
vital components of the 
game.
********************/

function reset(){
	// shows the start button again
	var startButton = document.querySelector('.start');
	startButton.classList.remove('hide');
	// hides the play again button
	var playAgain = document.querySelector('.playAgain');
	playAgain.classList.add('hide');
	// hides the choices that were chosen container
    choicesHideHeading();
    // resets showing to true, which will hides all the player's choices
    showing = true;
    // calls the functions that hides the player's choices
 	playerhideScissors();
  	playerhidePaper();
  	playerhideRock();
  	// resets showingC to true, which will hide all the computer's choices
    showingC = true;
    // calls the functions that hides the computer's choices
    computerhideRock();	
  	computerhidePaper();
  	computerhideScissors();

  	// quick way to clear the area that shows the result of each round
	document.getElementById("resultBox").innerHTML = " ";
	// quick way to clear the where the rounds display
	document.getElementById("round").innerHTML = " ";
	// once play again is called the press start button to start will appear 
	var showChoice = document.querySelector('#instruction');
	showChoice.classList.remove('hide');
	
}
	


	





