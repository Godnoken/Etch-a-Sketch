const container = document.createElement("main");
const textContainer = document.createElement("div");
const squareGridContainer = document.createElement("div");
const squareGrid = document.createElement("div");
const buttonContainer = document.createElement("div");
const clearButton = document.createElement("div");
const randomColorButton = document.createElement("div");
const blackColorButton = document.createElement("div");
const grayscaleButton = document.createElement("div");

container.id = "container";
textContainer.id = "textContainer";
squareGridContainer.id = "squareGridContainer";
squareGrid.id = "squareGrid";
buttonContainer.id = "buttonContainer";
clearButton.id = "clearButton";
randomColorButton.id = "randomColorbutton";
blackColorButton.id = "blackColorButton";
grayscaleButton.id = "blackGradientButton";

clearButton.classList.add("button");
randomColorButton.classList.add("button");
blackColorButton.classList.add("button");
grayscaleButton.classList.add("button");

textContainer.textContent = "Etch-a-Sketch"
clearButton.textContent = "Clear";
randomColorButton.textContent = "Random Colors";
blackColorButton.textContent = "Black";
grayscaleButton.textContent = "Grayscale";

document.body.appendChild(container);
container.appendChild(textContainer);
container.appendChild(squareGridContainer);
squareGridContainer.appendChild(squareGrid);
container.appendChild(buttonContainer);
buttonContainer.appendChild(clearButton);
buttonContainer.appendChild(randomColorButton);
buttonContainer.appendChild(blackColorButton);
buttonContainer.appendChild(grayscaleButton);

// Initializes standard 16x16 grid
createGrid(16, 16);

// Clears grid, asks user how many squares they want and create new grid
clearButton.addEventListener("click", function() {

    // Resets user input if asked for before
    let horizontalAmount = 0;
    let verticalAmount = 0;

    // Prompts for and limits user input to numbers between 1 to 40
    while (horizontalAmount > 40 || horizontalAmount < 1) {
        horizontalAmount = prompt("How many squares do you want horizontally? (Maximum 40)");
    }
    while (verticalAmount > 40 || verticalAmount < 1) {
        verticalAmount = prompt("And how many squares vertically? (Maximum 40)");
    }

    // Clears grid
    while (squareGrid.firstChild) {
        squareGrid.removeChild(squareGrid.firstChild);
    }

    createGrid(horizontalAmount, verticalAmount);
});

// Creates grid
function createGrid(horizontalAmount, verticalAmount) {

        // Sets new grid size
        squareGrid.style.gridTemplateColumns = `repeat(${horizontalAmount}, 1fr)`;
        squareGrid.style.gridTemplateRows = `repeat(${verticalAmount}, 1fr)`;
    
        // Creates new divs for the grid
        for (let i = 0; i < horizontalAmount * verticalAmount; i++) {

            const square = document.createElement("div");

            colorSquare(square);
    
            squareGrid.appendChild(square);
        }
}

// Creates random values for RGB
function randomColorValue() {
    return Math.floor(Math.random() * 255);
}

// Colors the squares
function colorSquare(square) {

    square.addEventListener("mouseover", function() {

        // Random Color
        if (square.classList.contains("random")) {
            if (square.style.backgroundColor === "") {
                square.style.opacity = "0";
                setTimeout(function() {
                    square.style.backgroundColor = `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`;
                    square.style.transition = "opacity 1s"
                    square.style.opacity = "1";
                }, 50);
            }
        }

        // Black Color
        if (square.classList.contains("black")) {
            if (square.style.backgroundColor === "") {
                square.style.opacity = "0";
                square.style.backgroundColor = "black";
                setTimeout(function() {
                    square.style.transition = "opacity 1s"
                    square.style.opacity = "1";
                }, 50);
            }
        }

        // Grayscale
        if (square.classList.contains("grayscale")) {
                if (square.style.opacity < 1) {
                    square.style.backgroundColor = `rgb(0, 0, 0, ${Number(square.style.backgroundColor.slice(-4, -1)) + 0.1})`;
                }

        }

    });
}

// Adds event listeners for the color buttons to enable change of color
randomColorButton.addEventListener("click", function() {
    document.querySelector("#squareGrid").childNodes.forEach(btn => {
        btn.className = "";
        btn.classList.add("random");
    });
});

blackColorButton.addEventListener("click", function() {
    document.querySelector("#squareGrid").childNodes.forEach(btn => {
        btn.className = "";
        btn.classList.add("black");
    });
});

grayscaleButton.addEventListener("click", function() {
    document.querySelector("#squareGrid").childNodes.forEach(btn => {
        btn.className = "";
        btn.classList.add("grayscale");
    })
});