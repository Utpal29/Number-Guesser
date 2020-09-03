// Game values
let min = 1;
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const UIgame = document.querySelector('#game'),
    UIminNum = document.querySelector('.min-num'),
    UImaxNum = document.querySelector('.max-num'),
    UIguessBtn = document.querySelector('#guess-btn'),
    UIguessInput = document.querySelector('#guess-input'),
    UImessage = document.querySelector('.message');

// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event Listener
UIgame.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
UIguessBtn.addEventListener('click', function () {
    let guess = parseInt(UIguessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, `red`);
        UIguessInput.value = '';
    } else {

        // Check if won
        if (guess === winningNum) {
            // Game over - won
            gameOver(true, `${winningNum} is correcet, YOU WIN!`);
        } else {
            // Wrong number
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                // Game over - lost
                gameOver(false, `Game Over, you lost. The correct number was ${winningNum} `);
            } else if(guessesLeft === -1){
                gameOver(false, ``);
            } else {
                // Game contimues - answer wrong

                // Change border color
                UIguessInput.style.borderColor = 'red';

                // Clear Inpup
                UIguessInput.value = '';

                // Tell user its the wrong number
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            }
        }
    }
});

// Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    won === true ? document.body.style.background = 'rgba(40, 134, 21,0.5)' : document.body.style.background = 'rgba(236, 69, 69, 0.5)';

    // Disable input
    UIguessInput.disabled = true;
    // Change border color
    UIguessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);

    // Play again
    UIguessBtn.value = 'Play again';
    UIguessBtn.className += 'play-again';
}

// Set message 
function setMessage(msg, color) {
    UImessage.style.color = color;
    UImessage.textContent = msg;
}

function getRandomNum(min ,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}