/** Setting up all the HTML through the DOM */

// Create elements
const container = document.createElement("main");
const headerContainer = document.createElement("header");
const headerText = document.createElement("h1");
const squareGridContainer = document.createElement("div");
const squareGrid = document.createElement("div");
const footerContainer = document.createElement("footer");
const buttonContainer = document.createElement("div");
const clearButton = document.createElement("div");
const eraserButton = document.createElement("div");
const showGridButton = document.createElement("div");
const colorContainer = document.createElement("div");
const randomColorButton = document.createElement("img");
const grayscaleButton = document.createElement("img");
let customColorButton = document.createElement("input");
const gridForm = document.createElement("form");
const horizontalLabel = document.createElement("label");
let horizontalInput = document.createElement("input");
const verticalLabel = document.createElement("label");
let verticalInput = document.createElement("input");
const confirmButton = document.createElement("div");
const codeWriter = document.createElement("p");
const githubIcon = document.createElement("img");

// Attributes
horizontalLabel.htmlFor = "horizontal";
horizontalInput.type = "number";
horizontalInput.max = "40";
horizontalInput.min = "0";
horizontalInput.required = true;
verticalLabel.htmlFor = "vertical";
verticalInput.type = "number";
verticalInput.max = "40";
verticalInput.min = "0";
verticalInput.required = true;
confirmButton.type = "submit";
customColorButton.type = "color";

// IDs
container.id = "container";
headerContainer.id = "headerContainer";
headerText.id = "headerText";
confirmButton.id = "confirmButton";
squareGridContainer.id = "squareGridContainer";
squareGrid.id = "squareGrid";
footerContainer.id = "footerContainer";
buttonContainer.id = "buttonContainer";
colorContainer.id = "colorContainer";
randomColorButton.id = "randomColorButton";
grayscaleButton.id = "grayscaleButton";
codeWriter.id = "codeWriter";
githubIcon.id = "githubIcon";

// Classes
confirmButton.classList.add("button");
clearButton.classList.add("button");
eraserButton.classList.add("button");
showGridButton.classList.add("button");

// Text
headerText.textContent = "Etch-a-Sketch";
confirmButton.textContent = "Confirm";
horizontalLabel.textContent = verticalInput;
verticalLabel.textContent = verticalInput;
clearButton.textContent = "Clear";
randomColorButton.textContent = "Random";
eraserButton.textContent = "Eraser";
showGridButton.textContent = "Show Grid";
codeWriter.innerHTML = "Code written by: <a href='https://github.com/Godnoken' target='_blank'>Godnoken <img src='github.svg' id='githubIcon'><a/>"

// Appending to the HTML
document.body.appendChild(container);
container.appendChild(codeWriter);
container.appendChild(headerContainer);
headerContainer.appendChild(headerText);
headerContainer.appendChild(gridForm);
gridForm.appendChild(horizontalLabel);
gridForm.appendChild(verticalLabel);
gridForm.appendChild(horizontalInput);
gridForm.appendChild(verticalInput);
gridForm.appendChild(confirmButton);
container.appendChild(squareGridContainer);
squareGridContainer.appendChild(squareGrid);
container.appendChild(footerContainer);
footerContainer.appendChild(colorContainer);
colorContainer.appendChild(randomColorButton);
colorContainer.appendChild(customColorButton);
colorContainer.appendChild(grayscaleButton);
footerContainer.appendChild(buttonContainer);
buttonContainer.appendChild(clearButton);
buttonContainer.appendChild(eraserButton);
buttonContainer.appendChild(showGridButton);




/** Create Grid */

// Initializes standard 16x16 grid
createGrid(16, 16);

// Creates grid
function createGrid(horizontalSize, verticalSize) {

    // Shows current grid size
    horizontalLabel.textContent = horizontalSize;
    verticalLabel.textContent = verticalSize;

    // Sets new grid size
    squareGrid.style.gridTemplateColumns = `repeat(${horizontalSize}, 1fr)`;
    squareGrid.style.gridTemplateRows = `repeat(${verticalSize}, 1fr)`;

    // Creates squares, adds class "square" and appends them to the grid
    for (let i = 0; i < horizontalSize * verticalSize; i++) {

        const square = document.createElement("div");

        square.classList.add("square");

        squareGrid.appendChild(square);
    }
}




/** User Input Grid Creation */

// When user clicks on "Confirm" button, deletes old grid
// and creates a new one with users inputted Input
// if input is valid, otherwise gives user an error
confirmButton.addEventListener("click", function () {
    if (horizontalInput.checkValidity() === true && verticalInput.checkValidity() === true) {
        while (squareGrid.firstChild) {
            squareGrid.removeChild(squareGrid.firstChild);
        }
        createGrid(horizontalInput.value, verticalInput.value);

        // Resets input after new grid is created
        horizontalInput.value = "";
        verticalInput.value = "";

        // Makes sure grid borders show after new gridi is created
        showGrid();
    } else {
        horizontalInput.reportValidity();
        verticalInput.reportValidity();
    }
})




/** Resets/Clears Current Grid */

// When user clicks "Clear" button, resets current grid
clearButton.addEventListener("click", function () {
    clearGrid();
});

// Resets current grid
function clearGrid() {

    document.querySelector("#squareGrid").childNodes.forEach(square => {
        square.style.backgroundColor = "";
        square.style.opacity = "";
        square.style.transition = "";
    });

    showGrid();
}




/** Show Grid */

let isGridShowing = false;

// Turns on or off grid borders
function showGrid() {
    if (isGridShowing === true) {
        document.querySelector("#squareGrid").childNodes.forEach(square => square.style.border = "1px solid gray");
    } else {
        document.querySelector("#squareGrid").childNodes.forEach(square => square.style.border = "");
    }
}

// When clicking "Show Grid" button, run showGrid function
showGridButton.addEventListener("click", function () {
    isGridShowing = !isGridShowing;
    showGrid();
})




/** Drawing Tools */

// Tracks users choice of color/tool
let color;

let isDrawing = false;

// Creates random values for RGB
function randomColorValue() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

}

// Users choice of color
function chosenColor() {
    if (color === "random") {
        return randomColorValue();
    } else if (color === "custom") {
        return customColorButton.value;
    } else {
        return "#000000";
    }
}

// Drawing tools
function draw(event) {
        if (color === "eraser") {
            event.target.style.opacity = "";
            event.target.style.transition = "";
            event.target.style.backgroundColor = "";
        } else if (color === "grayscale") {
            if (event.target.style.opacity === "1" && event.target.style.backgroundColor !== "black") {
                event.target.style.opacity = "0";
            }
            event.target.style.opacity = Number(event.target.style.opacity.slice(0, 3)) + 0.1;
            event.target.style.backgroundColor = "black";
        } 
        
        // Normal brush
        else {
            event.target.style.opacity = "0";
            setTimeout(function () {
                event.target.style.backgroundColor = chosenColor();
                event.target.style.transition = "opacity 1s"
                event.target.style.opacity = 1;
            }, 5);
        }
}

// Listens for user holding down the mousebutton
// Enables drawing tools
window.addEventListener("mousedown", () => {
    isDrawing = true;
});

// Listens for letting go of the mousebutton
// Disables drawing tools
window.addEventListener("mouseup", () => {
    isDrawing = false;
});

// Listens for user holding down the mouse button and moving over the squares
// If true - user can use drawing tools on squares
squareGrid.addEventListener("mouseover", function (event) {
    if (isDrawing) {
    draw(event);
    }
})

// Listens for user holding doewn the mouse button
// This event listener is in practice enabling user to click a square to draw
squareGrid.addEventListener("mousedown", function(event) {
    draw(event);
})

// Click on drawing tool buttons to chooose tool
eraserButton.addEventListener("click", function () { color = "eraser" });
randomColorButton.addEventListener("click", function () { color = "random" });
grayscaleButton.addEventListener("click", function () { color = "grayscale" });
customColorButton.addEventListener("click", function () { color = "custom" });