let myForm = document.querySelector("#myForm")

let inputLabels = document.querySelectorAll(".askLabel");
//let errorMessages = document.querySelectorAll(".error-state-style")

let allInputs = document.querySelectorAll(".inputs")
let inputDay = document.querySelector("#inputDate")
let inputMonth = document.querySelector("#inputMonth")
let inputYear = document.querySelector("#inputYear")

let newDayValue = document.createElement("p")
let newMonthValue = document.createElement("P")
let newYearValue = document.createElement("p")

let actuallFullDate = new Date();
let actuallYear = actuallFullDate.getFullYear();
let actuallMonth = actuallFullDate.getMonth() + 1;
let actuallDay = actuallFullDate.getDate();

let inputDateErrorPlace = document.querySelector("#inputDateErrorPlace")
let inputMonthErrorPlace = document.querySelector("#inputMonthErrorPlace")
let inputYearErrorPlace = document.querySelector("#inputYearErrorPlace")

let newDateError = document.createElement("p")
let newMonthError = document.createElement("p")
let newYearError = document.createElement("p")

let noneValueDay = document.querySelector("#dateEmptySpace")
let noneValueMonth = document.querySelector("#monthEmptySpace")
let noneValueYear = document.querySelector("#yearEmptySpace")

let sendingButton = document.querySelector("#sending")

myForm.addEventListener("submit", function(event){
    // ZABRÁNĚNÍ REFRESHOVÁNÍ STRÁNKY
    event.preventDefault()

    // měsíce které mají jen 30 dní
    if([4, 6, 9, 11].includes(Number(inputMonth.value)) && Number(inputDay.value > 30)) {
        highlightErrors()
        showErrorMessage(newDateError, "Enter a valid day", inputDateErrorPlace, newDateError)
        showErrorMessage(newMonthError, "Enter a valid month", inputMonthErrorPlace, newMonthError)

    // únor nemůže mít více jak 29 dní
    } else if ([2].includes(Number(inputMonth.value)) && Number(inputDay.value > 29)) {
        highlightErrors()
        showErrorMessage(newDateError, "Enter a valid day", inputDateErrorPlace, newDateError)
        showErrorMessage(newMonthError, "Enter a valid month", inputMonthErrorPlace, newMonthError)

    // ošetření toho, že únor má 29 dní jednou za 4 roky
    } else if ([29].includes(Number(inputDay.value)) && Number(inputYear.value) % 4 !== 0) {
        highlightErrors()
        showErrorMessage(newDateError, "Enter a valid day", inputDateErrorPlace, newDateError)
        showErrorMessage(newMonthError, "Enter a valid month", inputMonthErrorPlace, newMonthError)

    // ošetření, aby nešli psát budoucí datumy
    } else if(inputYear.value > actuallYear || (Number(inputYear.value) === actuallYear && Number(inputMonth.value) > actuallMonth) || (Number(inputYear.value) === actuallYear && Number(inputMonth.value) === actuallMonth && Number(inputDay.value) > actuallDay)) {
        highlightErrors()
        showErrorMessage(newDateError, "Enter a valid day", inputDateErrorPlace, newDateError)
        showErrorMessage(newMonthError, "Enter a valid month", inputMonthErrorPlace, newMonthError)
        showErrorMessage(newYearError, "Enter a valid year", inputYearErrorPlace, newYearError)

    // prázdný vstup není povolen
    } else if(inputDay.value === "" || inputMonth.value === "" || inputYear.value === "") {
        clearErrors()
        allInputs.forEach(function(oneInput){
            if(oneInput.value !== ""){
                if(oneInput.id === "inputDate"){
                    clearErrorMessage(newDateError)
                } else if(oneInput.id === "inputMonth"){
                    clearErrorMessage(newMonthError)
                } else {
                    clearErrorMessage(newYearError)
                }
            }
            if(oneInput.value === "") {
                oneInput.classList.add("error-border")
                let matchingLabel = document.querySelector(`label[for='${oneInput.id}']`)
                if(matchingLabel) {
                    matchingLabel.classList.add("red-font-color");
                }
                if(oneInput.id === "inputDate") {
                    showErrorMessage(newDateError, "Enter a valid day", inputDateErrorPlace, newDateError)
                } else if(oneInput.id === "inputMonth") {
                    showErrorMessage(newMonthError, "Enter a valid month", inputMonthErrorPlace, newMonthError)
                } else {
                    showErrorMessage(newYearError, "Enter a valid year", inputYearErrorPlace, newYearError)
                }
            }
        })
    } else {
        sendingButton.classList.toggle("rotate")

        // ODSTRANĚNÍ ERRORU Z PŘEDEŠLÉHO HLEDÁNÍ
        clearErrorMessage(newDateError)
        clearErrorMessage(newMonthError)
        clearErrorMessage(newYearError)
        clearErrors()

        // ODSTRAŇOVÁNÍ ČÁREK(PRÁZDNÝCH HODNOT)
        clearNoneValuesPlaces(noneValueDay)
        clearNoneValuesPlaces(noneValueMonth)
        clearNoneValuesPlaces(noneValueYear)
       
        // VÝPOČET ZBÝVAJÍCH LET, MĚSÍCŮ A DNŮ
        let searchedYear = actuallYear - Number(inputYear.value)
        let searchedMonth = actuallMonth - Number(inputMonth.value)
        let searchedDay = actuallDay - Number(inputDay.value)
    
        // DNY
        if(searchedDay < 0) {
            let lastMonth = new Date(actuallYear, actuallMonth - 1, 0)
            searchedDay += lastMonth.getDate();
            searchedMonth--;
        }
    
        // MĚSÍCE
        if(searchedMonth < 0) {
            searchedMonth += 12;
        }
    
        // ROKY
        if(Number(inputMonth.value) > actuallMonth || (Number(inputMonth.value) === actuallMonth && Number(inputDay.value) > actuallDay)) {
            searchedYear--;
        }
    
        // NAPLNĚNÍ NOVÉHO ODSTAVCE HODNOTAMI
        addedValuesToParagraph(newDayValue, searchedDay)
        addedValuesToParagraph(newMonthValue, searchedMonth)
        addedValuesToParagraph(newYearValue, searchedYear)
    
        // VYPSÁNÍ NOVÝCH HODNOT VE STRÁNCE
        addedParagraphToHTML("#placeDate", newDayValue)
        addedParagraphToHTML("#placeMonth", newMonthValue)
        addedParagraphToHTML("#placeYear", newYearValue)
    
        // SMAZÁNÍ ČÍSEL Z FORMULÁŘE
        allInputs.forEach(function(oneInput){
            oneInput.value = ""
        })
        
    }
})