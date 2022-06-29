function setupAlgorithm() {
	boardElements = [];
	let fields = document.getElementsByClassName("field");
	for (let i = 0; i < 9; i++) {
		boardElements.push([]);
		for (let j = 0; j < 9; j++) {
			boardElements[i].push(fields[9 * i + j]);
		}
	}

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
	board = initialBoard.map(function (arr) {
		return [...arr];
	});

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

	for (
		let k = Math.floor((activeFieldId - 1) / 9) * 9 + 1;
		k < activeFieldId;
		k++
	) {
		//console.log(document.getElementById(k));
		let [m, n] = getIndexesOfField(document.getElementById(k));
		if (board[m][n] === number) {
			errorField(boardElements[m][n]);
			return true;
		}
	}
	for (
		let k = activeFieldId + 1;
		k <= 9 * Math.ceil(activeFieldId / 9);
		k++
	) {
		//console.log(document.getElementById(k));
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

	for (let k = activeFieldId - 9; k > 0; k -= 9) {
		//console.log(document.getElementById(k));
		let [m, n] = getIndexesOfField(document.getElementById(k));
		if (board[m][n] === number) {
			errorField(boardElements[m][n]);
			return true;
		}
	}
	for (let k = activeFieldId + 9; k <= 81; k += 9) {
		//console.log(document.getElementById(k));
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

	let nextField = findNextEmptyField(board);

	for (let i = 1; i <= 9; i++) {
		activeField = boardElements[nextField[0]][nextField[1]];
		if (isMoveValid(i)) {
			board[nextField[0]][nextField[1]] = i;
			activeField.textContent = i;
			if (backtracking()) return true;
			board[nextField[0]][nextField[1]] = 0;
			activeField.textContent = "";
		}
	}

	if (isSudokuDone(board)) return true;

	return false;
}

function findNextEmptyField(board) {
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
