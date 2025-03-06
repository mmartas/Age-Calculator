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



myForm.addEventListener("submit", function(event){
    // ZABRÁNĚNÍ REFRESHOVÁNÍ STRÁNKY
    event.preventDefault()
    
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

    if(Number(inputMonth.value) >= actuallMonth) {
        searchedYear--;
    }

    if(searchedMonth < 0) {
        searchedMonth += 12;
    }

    if(searchedDay < 0) {
        searchedMonth--;
        let lastMonth = new Date(actuallYear, actuallMonth - 1, 0)
        console.log(lastMonth)
        searchedDay = searchedDay + lastMonth.getDate();
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
})