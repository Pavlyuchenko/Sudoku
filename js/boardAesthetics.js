function fieldClicked(field) {
	// If a sudoku field was clicked,
	// this function controls and calls other
	// function to unset current activeField and to set the new one.

	if (activeField == field) {
		unsetActiveField();
		activeField = null;
		return;
	}

	if (activeField) {
		unsetActiveField();
	}
	setActiveField(field);
}

function unsetActiveField() {
	// Used for removing styles from the current activeField

	activeField.style.border = fieldBorder;
	activeField.style.backgroundColor = "transparent";
}
function setActiveField(field) {
	// Sets the activeField's style and the variable itself

	field.style.border = "8px solid red";
	field.style.backgroundColor = "#ccc";
	activeField = field;
}

function fieldHovered(field) {
	// Hover

	if (activeField == field) return;
	field.style.backgroundColor = "#999";
}
function fieldLeft(field) {
	// On hover end

	if (activeField == field) return;

	field.style.backgroundColor = "transparent";
}

function cancelChoice() {
	// Used in HTML
	// onClick outside of the board, unsets the activeField

	if (activeField) {
		unsetActiveField();
		activeField = null;
	}
}

function errorField(field) {
	if (!errors) return;
	field.style.border = "6px solid red";

	setTimeout(() => {
		field.style.border = "1.5px solid black";
	}, 750);
}
