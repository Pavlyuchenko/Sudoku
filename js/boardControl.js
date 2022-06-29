window.addEventListener("keydown", keyPressed);

function keyPressed(e) {
	// Controls what should be done on a lot of key presses

	if (!activeField) return;

	switch (e.key) {
		case "Backspace":
		case "Delete":
			if (isInitialBoard()) break;

			activeField.textContent = "";
			break;
		case "Tab":
		case "ArrowRight":
			moveActiveRight(e);
			break;
		case "ArrowLeft":
			moveActiveLeft();
			break;
		case "ArrowUp":
			moveActiveUp();
			break;
		case "ArrowDown":
			moveActiveDown();
			break;
		case "End":
			moveActiveEnd();
			break;
		case "Home":
			moveActiveHome();
			break;
		default:
			numberPressed(parseInt(e.key));
			break;
	}
}

function moveActiveRight(e) {
	e.preventDefault();
	if (parseInt(activeField.id) % 9 === 0) {
		unsetActiveField();
		setActiveField(document.getElementById(parseInt(activeField.id) - 8));
		return;
	}
	unsetActiveField();
	setActiveField(document.getElementById(parseInt(activeField.id) + 1));
}
function moveActiveLeft() {
	if (parseInt(activeField.id) % 9 === 1) {
		unsetActiveField();
		setActiveField(document.getElementById(parseInt(activeField.id) + 8));
		return;
	}
	unsetActiveField();
	setActiveField(document.getElementById(parseInt(activeField.id) - 1));
}
function moveActiveUp() {
	if (parseInt(activeField.id) <= 9) {
		unsetActiveField();
		setActiveField(document.getElementById(parseInt(activeField.id) + 72));
		return;
	}
	unsetActiveField();
	setActiveField(document.getElementById(parseInt(activeField.id) - 9));
}
function moveActiveDown() {
	if (parseInt(activeField.id) >= 73) {
		unsetActiveField();
		setActiveField(document.getElementById(parseInt(activeField.id) - 72));
		return;
	}
	unsetActiveField();
	setActiveField(document.getElementById(parseInt(activeField.id) + 9));
}
function moveActiveEnd() {
	unsetActiveField();
	let idOfLastField = Math.ceil(activeField.id / 9) * 9;
	setActiveField(document.getElementById(idOfLastField));
}
function moveActiveHome() {
	unsetActiveField();
	let idOfLastField = Math.floor((activeField.id - 1) / 9) * 9 + 1;
	setActiveField(document.getElementById(idOfLastField));
}

function numberPressed(numberPressed) {
	// If key pressed was a number, enter it into sudoku
	if (isNaN(numberPressed)) return;
	if (numberPressed === 0) return;
	if (isInitialBoard()) return;
	if (parseInt(activeField.textContent) === numberPressed) {
		let [i, j] = getIndexesOfField();
		updateBoard(i, j, 0);
		activeField.textContent = "";

		return;
	}
	if (!isMoveValid(numberPressed)) return;
	let [i, j] = getIndexesOfField();
	updateBoard(i, j, numberPressed);

	activeField.textContent = numberPressed;
}

function getIndexesOfField(field) {
	// Enter DOMElement into function to get its indexes in board

	if (field == undefined) {
		field = activeField;
	}
	for (let i = 0; i < boardElements.length; i++) {
		for (let j = 0; j < boardElements[i].length; j++) {
			if (boardElements[i][j].id === field.id) {
				return [i, j];
			}
		}
	}
	return [0, 0];
}
