window.addEventListener("load", () => {
	initialize();
	setupAlgorithm();
});

var activeField, style, board, boardElements, initialBoard;
var errors = true;

function initialize() {
	var fields = document.getElementsByClassName("field");

	for (let field of fields) {
		field.addEventListener("click", () => fieldClicked(field));
		field.addEventListener("mouseenter", () => fieldHovered(field));
		field.addEventListener("mouseleave", () => fieldLeft(field));
	}

	activeField = null;
	fieldBorder = window.getComputedStyle(fields[0]).getPropertyValue("border");
}
