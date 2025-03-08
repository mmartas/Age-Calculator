// ZVÝRAZNÍ INPUT RÁMEČEK A POPISEK
function highlightErrors() {
    inputLabels.forEach(label => label.classList.add("red-font-color"));
    allInputs.forEach(oneInput => oneInput.classList.add("error-border"));
}

// SMAŽE ZVÝRAZNĚNÍ INPUT RÁMEČKU A POPISKU
function clearErrors() {
    inputLabels.forEach(label => label.classList.remove("red-font-color"));
    allInputs.forEach(oneInput => oneInput.classList.remove("error-border"));
}

// PŘIDÁNÍ ERROR ZPRÁVU DO ODSTAVCE A POTÉ PŘIDÁNÍ NA STRÁNKU
function showErrorMessage(placeToText, text, htmlNewErrorPlace, errorMessage) {
    placeToText.textContent = text;
    placeToText.classList.add("error-state-style");
    htmlNewErrorPlace.appendChild(errorMessage)
}