var numOfSquares = 6;
var colors = [];

var h1 = document.querySelector('h1');
var colorDisplay = document.querySelector('#colorDisplay');
var message = document.querySelector("#message");
var squares = document.querySelectorAll('.square');
var btnReset = document.querySelector('#btn-reset');
// var btnEasy = document.querySelector('#btn-easy');
// var btnHard = document.querySelector('#btn-hard');
var modeButtons = document.querySelectorAll('.mode');
var pickedColor = pickColor();

init();

function init() {
    // setting up mode buttons event listeners
    setupModeButtons();
    // setting up squares
    setupSquares()
    // resetting
    reset();
}

btnReset.addEventListener('click', function() {
    reset()
});

// check if clicked color is correct
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// generate color array with randon colors
function generateRandomColors(num) {
    var colorArray = [];

    for (var i = 0; i < num; i++) {
        colorArray.push(randomColor());
    }
    return colorArray;
}

// selecting picked (winner) color
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// change color of all squares and h1 if won
function changeColor(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    h1.style.backgroundColor = color;
}

function reset() {
    colors = generateRandomColors(numOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "steelblue";
    btnReset.textContent = "New Colors";
    message.textContent = "";

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function() {
            modeButtons[0].classList.remove('selectedMode');
            modeButtons[1].classList.remove('selectedMode');
            this.classList.add('selectedMode');
            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        // squares[i].style.backgroundColor = colors[i];
        // squares[i].textContent = colors[i];
        squares[i].addEventListener('click', function() {
            if (this.style.backgroundColor === pickedColor) {
                message.textContent = "Correct!";
                btnReset.textContent = "Play Again?";
                changeColor(pickedColor);
            }
            else {
                this.style.backgroundColor = "#232323";
                message.textContent = "Try again!";
            } 
        })
    }
}