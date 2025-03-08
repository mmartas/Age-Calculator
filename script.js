let myForm = document.querySelector("#myForm")

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

let inputLabels = document.querySelectorAll(".askLabel");
let allInputs = document.querySelectorAll(".inputs")

//let inputDateErrorPlace = document.querySelector("#inputDateErrorPlace")

//let newDateError = document.createElement("p")

myForm.addEventListener("submit", function(event){
    // ZABRÁNĚNÍ REFRESHOVÁNÍ STRÁNKY
    event.preventDefault()

    // měsíce které mají jen 30 dní
    if([4, 6, 9, 11].includes(Number(inputMonth.value)) && Number(inputDay.value > 30)) {
        inputLabels.forEach(function(label){
            label.classList.add("red-font-color");
        })
        allInputs.forEach(function(oneInput){
            oneInput.classList.add("error-border");
        })
        // newDateError.textContent = "Enter a valid date"
        // inputDateErrorPlace.appendChild(newDateError)
    // únor nemůže mít více jak 29 dní
    } else if ([2].includes(Number(inputMonth.value)) && Number(inputDay.value > 29)) {
        inputLabels.forEach(function(label){
            label.classList.add("red-font-color");
        })
        allInputs.forEach(function(oneInput){
            oneInput.classList.add("error-border");
        })
    // ošetření toho, že únor má 29 dní jednou za 4 roky
    } else if ([29].includes(Number(inputDay.value)) && Number(inputYear.value) % 4 !== 0) {
        inputLabels.forEach(function(label){
            label.classList.add("red-font-color");
        })
        allInputs.forEach(function(oneInput){
            oneInput.classList.add("error-border");
        })
    // ošetření, aby nešli psát budoucí datumy
    } else if(inputYear.value > actuallYear || (Number(inputYear.value) === actuallYear && Number(inputMonth.value) > actuallMonth) || (Number(inputYear.value) === actuallYear && Number(inputMonth.value) === actuallMonth && Number(inputDay.value) > actuallDay)) {
        inputLabels.forEach(function(label){
            label.classList.add("red-font-color");
        })
        allInputs.forEach(function(oneInput){
            oneInput.classList.add("error-border");
        })
    // prázdný vstup není povolen
    } else if(inputDay.value === "" || inputMonth.value === "" || inputYear.value === "") {
        allInputs.forEach(function(oneInput){
            if(oneInput.value === "") {
                oneInput.classList.add("error-border")
            }
        })

    } else {
        inputLabels.forEach(function(label){
            label.classList.remove("red-font-color");
        })
        allInputs.forEach(function(oneInput){
            oneInput.classList.remove("error-border");
        })

        // ODSTRAŇOVÁNÍ ČÁREK(PRÁZDNÝCH HODNOT)
        if(document.getElementById("dateEmptySpace")) {
            let noneValueDay = document.querySelector("#dateEmptySpace")
            noneValueDay.remove()
        }
        
        if(document.getElementById("monthEmptySpace")) {
            let noneValueMonth = document.querySelector("#monthEmptySpace")
            noneValueMonth.remove()
        }
        
        if(document.getElementById("yearEmptySpace")) {
            let noneValueYear = document.querySelector("#yearEmptySpace")
            noneValueYear.remove()
        }
       
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
        newDayValue.textContent = searchedDay
        newMonthValue.textContent = searchedMonth
        newYearValue.textContent = searchedYear
    
        // VYPSÁNÍ NOVÝCH HODNOT VE STRÁNCE
        let newDayValuePlace = document.querySelector("#placeDate").appendChild(newDayValue);
        let newMonthValuePlace = document.querySelector("#placeMonth").appendChild(newMonthValue);
        let newYearValuePlace = document.querySelector("#placeYear").appendChild(newYearValue)
    
        // SMAZÁNÍ ČÍSEL Z FORMULÁŘE
        inputDay.value = ""
        inputMonth.value = ""
        inputYear.value = ""
    }
})