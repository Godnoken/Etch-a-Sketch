let currentHorizontalSize = 16;
let currentVerticalSize = 16;
let isDrawing = false;
let isGridShowing = false;

const container = document.createElement("main");
const headerContainer = document.createElement("div");
const headerText = document.createElement("h1");
const gridForm = document.createElement("form");
const squareGridContainer = document.createElement("div");
const squareGrid = document.createElement("div");
const buttonContainer = document.createElement("div");
const clearButton = document.createElement("div");
const randomColorButton = document.createElement("div");
const grayscaleButton = document.createElement("div");
const eraserButton = document.createElement("div");
const showGridButton = document.createElement("div");

let customColor = document.createElement("input");
customColor.type = "color";

const horizontalLabel = document.createElement("label");
horizontalLabel.htmlFor = "horizontal";
let horizontalSize = document.createElement("input");
horizontalSize.type = "number";
horizontalSize.max = "40";
horizontalSize.min = "0";
horizontalSize.required = true;

const verticalLabel = document.createElement("label");
verticalLabel.htmlFor = "vertical";
let verticalSize = document.createElement("input");
verticalSize.type = "number";
verticalSize.max = "40";
verticalSize.min = "0";
verticalSize.required = true;

const submitButton = document.createElement("div");
submitButton.type = "submit";

container.id = "container";
headerContainer.id = "headerContainer";
headerText.id = "headerText";
horizontalSize.id = "horizontal";
verticalSize.id = "vertical";
submitButton.id = "confirm";
squareGridContainer.id = "squareGridContainer";
squareGrid.id = "squareGrid";
buttonContainer.id = "buttonContainer";

submitButton.classList.add("button");
clearButton.classList.add("button");
randomColorButton.classList.add("button");
grayscaleButton.classList.add("button");
eraserButton.classList.add("button");
showGridButton.classList.add("button");

headerText.textContent = "Etch-a-Sketch";
submitButton.textContent = "Confirm";
horizontalLabel.textContent = currentHorizontalSize;
verticalLabel.textContent = currentVerticalSize;
clearButton.textContent = "Clear";
randomColorButton.textContent = "Random Colors";
grayscaleButton.textContent = "Grayscale";
eraserButton.textContent = "Eraser";
showGridButton.textContent = "Show Grid";

document.body.appendChild(container);
container.appendChild(headerContainer);
headerContainer.appendChild(headerText);
headerContainer.appendChild(gridForm);
gridForm.appendChild(horizontalLabel);
gridForm.appendChild(verticalLabel);
gridForm.appendChild(horizontalSize);
gridForm.appendChild(verticalSize);
gridForm.appendChild(submitButton);
container.appendChild(squareGridContainer);
squareGridContainer.appendChild(squareGrid);
container.appendChild(buttonContainer);
buttonContainer.appendChild(clearButton);
buttonContainer.appendChild(eraserButton);
buttonContainer.appendChild(customColor);
buttonContainer.appendChild(randomColorButton);
buttonContainer.appendChild(grayscaleButton);
buttonContainer.appendChild(showGridButton);

window.addEventListener("mousedown", () => {
    isDrawing = true;
});

window.addEventListener("mouseup", () => {
    isDrawing = false;
});

// Initializes standard 16x16 grid
createGrid(16, 16);

// Creates grid
function createGrid(horizontalSize, verticalSize) {

    currentHorizontalSize = horizontalSize;
    currentVerticalSize = verticalSize;

    horizontalLabel.textContent = currentHorizontalSize;
    verticalLabel.textContent = currentVerticalSize;

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

// Creates random values for RGB
function randomColorValue() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

}

let color;

function chosenColor() {
    if (color === "random") {
        return randomColorValue();
    } else if (color === "custom") {
        return customColor.value;
    } else {
        return "#000000";
    }
}

function draw(event) {

    if (isDrawing) {
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
        } else {
            event.target.style.opacity = "0";
            setTimeout(function () {
                event.target.style.backgroundColor = chosenColor();
                event.target.style.transition = "opacity 1s"
                event.target.style.opacity = 1;
            }, 5);
        }
    }
}

squareGrid.addEventListener("mouseover", function (event) {
    draw(event);
})

eraserButton.addEventListener("click", function () { color = "eraser" })

randomColorButton.addEventListener("click", function () { color = "random" })

grayscaleButton.addEventListener("click", function () { color = "grayscale" })

customColor.addEventListener("click", function () { color = "custom" })

function showGrid() {
    if (isGridShowing === true) {
        document.querySelector("#squareGrid").childNodes.forEach(square => square.style.border = "1px solid gray");
    } else {
        document.querySelector("#squareGrid").childNodes.forEach(square => square.style.border = "");
    }
}

showGridButton.addEventListener("click", function () {
    isGridShowing = !isGridShowing;
    showGrid();
})

// Runs clearGrid function if users input values satisfy the requirements
submitButton.addEventListener("click", function () {
    if (horizontalSize.checkValidity() === true && verticalSize.checkValidity() === true) {
        clearGrid(horizontalSize.value, verticalSize.value);
    } else {
        horizontalSize.reportValidity();
        verticalSize.reportValidity();
    }
})

clearButton.addEventListener("click", function () {
    clearGrid(currentHorizontalSize, currentVerticalSize);
});

function clearGrid(horizontal, vertical) {

    // Clears grid
    while (squareGrid.firstChild) {
        squareGrid.removeChild(squareGrid.firstChild);
    }

    // Clears user input for grid size
    horizontalSize.value = "";
    verticalSize.value = "";

    createGrid(horizontal, vertical);

    showGrid();
}