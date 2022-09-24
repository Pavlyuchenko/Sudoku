function chooseSudoku(index) {
	let decision = confirm(
		"Choosing this Sudoku will permanently delete the current one. Are you sure?"
	);
	if (!decision) return;

	setupAlgorithm(index);
}

function showBurgerMenu() {
	document.getElementById("hamburger-menu").style.display = "block";
}
function hideHamburger() {
	document.getElementById("hamburger-menu").style.display = "none";
}
