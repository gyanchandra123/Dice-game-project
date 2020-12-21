/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var score, activePlayer, roundScore, dice, gamePlaying = true;

initialisingGame();


//GAME START'S HERE:

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        
        // 1. get the random number :
        dice = Math.floor(Math.random() * 6) + 1;

        // 2. display the result :
        var diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block'; //re-enable the element

        diceDOM.src = 'dice-' + dice + '.png'; // update the <img> src attribute value w.r.t. random no:



        // 4. update the ROUND score ,if the rollno was not 1.

        if (dice !== 1) {

            // add score :
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }
        else {
            nextPlayer();

        }

    }




})


//HOLD BUTTON OPERATION :
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {

        // 1. add current score to the global score:
        score[activePlayer] += roundScore;

        // 2. update the UI:
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        // 3. CHECK if the player won the game:-

        if (score[activePlayer] >= 30) {
            document.querySelector('#name-' + activePlayer).innerHTML = '<strong> Winner</strong>';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');  
            

            //document.querySelector('#score-'+activePlayer).style.fontWeight = 500;

            document.querySelector('.dice').style.display = 'none';



            // INSTEAD OF THESE 2 YOU CAN USE STATE VARIABLE
            /*  document.querySelector('.btn-roll').disabled = true;
             document.querySelector('.btn-hold').disabled = true; */

            gamePlaying = false;

            //PLAY THE FIREWORK:             
            document.getElementById('canvas').style.display = 'block';
            document.getElementById('canvas').classList.add('canvasAdd');
            document.querySelector('.player-0-panel').classList.add('transparents');
            document.querySelector('.player-1-panel').classList.add('transparents');

            //playing audio:
            document.getElementsByTagName('audio')[0].play();



        }
        else {

            // 4. change the player
            nextPlayer();
        }
    }

})


// STARTING NEW GAME :

document.querySelector('.btn-new').addEventListener('click', function () {

   
    initialisingGame();

})

//OR
//document.querySelector('.btn-new').addEventListener('click', initialisingGame) ; 






// NEXT PLAYER COMMON FUNCTION:
function nextPlayer() {

    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // with this we are selecting the 2nd player
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';


}


//INITIALISED THE GAME :

function initialisingGame() {

    // disabling the firework:
    document.getElementById('canvas').style.display = 'none'; 

    //disabling audio:
    document.getElementsByTagName('audio')[0].pause();  


    score = [0, 0]; // each index value represent the total score of each player.
    roundScore = 0;
    activePlayer = 0;

  

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'PLAYER-1';

    document.getElementById('name-1').textContent = 'PLAYER-2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

   // document.querySelector('.player-'+activePlayer+'-panel').style.zIndex ='1000';


    document.querySelector('.player-0-panel').classList.add('active');    
    //document.querySelector('.player-1-panel').classList.remove('active');  
   
    ///INSTEAD OF THIS USE !important in the active class in the style.css .
  /*   document.querySelector('.player-0-panel').classList.remove('transparents');
    document.querySelector('.player-1-panel').classList.remove('transparents'); */

    // INSTEAD OF THESE 2 YOU CAN USE STATE VARIABLE
    /*  document.querySelector('.btn-roll').disabled = false;
        document.querySelector('.btn-hold').disabled = false; */

    gamePlaying = true;  //STATE VARIABLE.
}


 

