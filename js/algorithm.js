function setupAlgorithm() {
	// Creates two distinct boards:
	// one with DOM elements (boardElements)
	// one with values (board)

	boardElements = [];
	let fields = document.getElementsByClassName("field");
	for (let i = 0; i < 9; i++) {
		boardElements.push([]);
		for (let j = 0; j < 9; j++) {
			boardElements[i].push(fields[9 * i + j]);
		}
	}

	// Example Sudokus
	initialBoard = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
	];
	let zeros = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
	];
	let sudoku1 = [
		[0, 0, 0, 2, 4, 0, 3, 0, 0],
		[9, 0, 0, 0, 0, 1, 0, 5, 0],
		[8, 7, 2, 0, 0, 0, 6, 0, 0],
		[8, 1, 0, 5, 3, 9, 0, 0, 0],
		[0, 6, 2, 0, 8, 0, 0, 3, 0],
		[0, 5, 0, 7, 0, 0, 1, 4, 0],
		[6, 2, 1, 0, 7, 0, 0, 0, 5],
		[0, 0, 0, 8, 0, 0, 0, 1, 0],
		[0, 0, 3, 4, 0, 0, 0, 9, 0],
	];
	let sudoku2 = [
		[0, 0, 1, 0, 0, 6, 0, 9, 0],
		[3, 0, 0, 0, 0, 1, 6, 0, 2],
		[0, 2, 0, 0, 0, 9, 0, 8, 3],
		[4, 0, 0, 9, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 8, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 7, 0, 0, 5],
		[6, 8, 0, 7, 0, 0, 0, 1, 0],
		[4, 0, 3, 1, 0, 0, 0, 0, 8],
		[0, 5, 0, 8, 0, 0, 7, 0, 0],
	];

	// Create a copy of the initial board
	board = initialBoard.map(function (arr) {
		return [...arr];
	});

	// Enter values from initial board to the HTML
	for (let i = 0; i < initialBoard.length; i++) {
		for (let j = 0; j < initialBoard.length; j++) {
			if (initialBoard[i][j] === 0) continue;
			boardElements[i][j].textContent = initialBoard[i][j];
		}
	}
}

function updateBoard(i, j, value) {
	board[i][j] = value;
}

function isInitialBoard() {
	// Check if number was in the initial Sudoku
	// in that case don't allow the field to change
	// since it's the assignment

	let [i, j] = getIndexesOfField();
	if (initialBoard[i][j] !== 0) {
		return true;
	}
	return false;
}

function numberUsedin3x3(number, i) {
	// Number already is in the 3x3
	let biggerField = board[i];

	if (biggerField.indexOf(number) !== -1) {
		errorField(boardElements[i][biggerField.indexOf(number)]);
		return true;
	}
}

function numberUsedInRow(number) {
	// Number already is in row

	let activeFieldId = parseInt(activeField.id);

	// Look left
	for (
		let k = Math.floor((activeFieldId - 1) / 9) * 9 + 1;
		k < activeFieldId;
		k++
	) {
		let [m, n] = getIndexesOfField(document.getElementById(k));
		if (board[m][n] === number) {
			errorField(boardElements[m][n]);
			return true;
		}
	}
	// Look right
	for (
		let k = activeFieldId + 1;
		k <= 9 * Math.ceil(activeFieldId / 9);
		k++
	) {
		let [m, n] = getIndexesOfField(document.getElementById(k));

		if (board[m][n] === number) {
			errorField(boardElements[m][n]);
			return true;
		}
	}
}

function numberUsedInColumn(number) {
	// Number already is in column

	let activeFieldId = parseInt(activeField.id);

	// Look up
	for (let k = activeFieldId - 9; k > 0; k -= 9) {
		let [m, n] = getIndexesOfField(document.getElementById(k));
		if (board[m][n] === number) {
			errorField(boardElements[m][n]);
			return true;
		}
	}
	// Look down
	for (let k = activeFieldId + 9; k <= 81; k += 9) {
		let [m, n] = getIndexesOfField(document.getElementById(k));

		if (board[m][n] === number) {
			errorField(boardElements[m][n]);
			return true;
		}
	}
}

function isMoveValid(number) {
	let [i, j] = getIndexesOfField();

	if (numberUsedin3x3(number, i)) return false;

	if (numberUsedInRow(number)) return false;

	if (numberUsedInColumn(number)) return false;

	return true;
}

function backtracking() {
	errors = false;
	if (isSudokuDone(board)) return true;

	let nextField = findNextEmptyField(board); // Empty field

	// Check all numbers from 1 to 9
	// if they can be placed in the field
	for (let i = 1; i <= 9; i++) {
		// activeField is a global variable, set it every time in the loop
		activeField = boardElements[nextField[0]][nextField[1]];

		if (isMoveValid(i)) {
			// If the move is valid, place the number
			board[nextField[0]][nextField[1]] = i;
			activeField.textContent = i;
			// If backtracking returned true, means that Sudoku is done
			if (backtracking()) return true;

			// Else the move is not valid, so we need to backtrack
			board[nextField[0]][nextField[1]] = 0;
			activeField.textContent = "";
		}
	}

	if (isSudokuDone(board)) return true;

	return false;
}

function findNextEmptyField(board) {
	// Finds the next empty field in Sudoku

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board.length; j++) {
			if (board[i][j] === 0) return [i, j];
		}
	}
	return null;
}

function isSudokuDone(board) {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board.length; j++) {
			if (board[i][j] === 0) return false;
		}
	}
	return true;
}
