const gameContainer = document.getElementById("game");
let flipped = [];
let card1 = null;
let card2 = null;
let finish = 0;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);
        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

// TODO: Implement this function!
function handleCardClick(e) {

    if (flipped.length < 2) {
        if (flipped.length === 0) {
            card1 = e.target;
            e.target.style.backgroundColor = e.target.className;
            flipped.push(e.target);
        } else if (flipped.length === 1) {
            flipped.push(e.target);
            e.target.style.backgroundColor = e.target.className;
            card2 = e.target;
            if (flipped[0].className === flipped[1].className) {
                finish += 2;
                flipped = [];
                if (finish === COLORS.length) {
                    alert('YOU WIN!');
                    gameContainer.innerHTML = "";
                    createDivsForColors(shuffledColors);
                }
            } else {
                function flipBack() {
                    card1.removeAttribute('style');
                    card2.removeAttribute('style');
                    flipped = [];
                }
                setTimeout(flipBack, 800);
            }
        }
        console.log(card1, card2);
    }

}

// when the DOM loads
createDivsForColors(shuffledColors);
