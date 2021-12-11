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
customColor.addEventListener("change", function() {
    document.querySelector("#squareGrid").childNodes.forEach(btn => {
        btn.className = "";
        btn.classList.add("black");
    })
})

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

    // Creates squares, adds event listener to them and appends them to the grid
    for (let i = 0; i < horizontalSize * verticalSize; i++) {

        const square = document.createElement("div");

        square.addEventListener("mouseover", function () {
            if (isDrawing === true) {
            colorSquare(square)
            }
        })

        square.addEventListener("mousedown", function() {
            colorSquare(square)
        })

        squareGrid.appendChild(square);
    }
}

// Colors the squares
function colorSquare(square) {



        // Random Color
        if (square.classList.contains("random")) {
            if (square.style.backgroundColor === "") {
                square.style.opacity = "0";
                setTimeout(function () {
                    square.style.backgroundColor = `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`;
                    square.style.transition = "opacity 1s"
                    square.style.opacity = "1";
                }, 50);
            }
        }

        // Custom Color
        if (square.classList.contains("black")) {
            if (square.style.backgroundColor === "") {
                square.style.opacity = "0";
                square.style.backgroundColor = customColor.value;
                setTimeout(function () {
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

        // Eraser
        if (square.classList.contains("eraser")) {
            square.style.opacity = "";
            square.style.backgroundColor = "";
        }
    
}

// Creates random values for RGB
function randomColorValue() {
    return Math.floor(Math.random() * 255);
}

// Adds event listeners for the color buttons to enable change of color
randomColorButton.addEventListener("click", function () {
    document.querySelector("#squareGrid").childNodes.forEach(btn => {
        btn.className = "";
        btn.classList.add("random");
    });
});

grayscaleButton.addEventListener("click", function () {
    document.querySelector("#squareGrid").childNodes.forEach(btn => {
        btn.className = "";
        btn.classList.add("grayscale");
    })
});

eraserButton.addEventListener("click", function () {
    document.querySelector("#squareGrid").childNodes.forEach(btn => {
        btn.className = "";
        btn.classList.add("eraser");
    })
});

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
submitButton.addEventListener("click", function() {
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