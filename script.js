let myForm = document.querySelector("#myForm")

let myDay = document.querySelector("#inputDate")
let myMonth = document.querySelector("#inputMonth")


let newDateParagraph = document.createElement("p")
let newMonthParagraph = document.createElement("P")
let newYearParagraph = document.createElement("p")

let actuallFullDate = new Date();
let actuallYear = actuallFullDate.getFullYear();
let actuallMonth = actuallFullDate.getMonth() + 1;
let actuallDay = actuallFullDate.getDate();



myForm.addEventListener("submit", function(event){
    event.preventDefault()
    
    let carkyDate = document.querySelector("#dateEmptySpace")
    carkyDate.remove()
    let carkyMonth = document.querySelector("#monthEmptySpace")
    carkyMonth.remove()
    let carkyYear = document.querySelector("#yearEmptySpace")
    carkyYear.remove()

    let myYear = document.querySelector("#inputYear")

    let searchingYear = actuallYear - Number(myYear.value)
    let searchingMonth = actuallMonth - Number(myMonth.value)
    let searchingDay = actuallDay - Number(myDay.value)

    if(Number(myMonth.value) > actuallMonth) {
        searchingYear = searchingYear - 1
    }

    if(searchingMonth < 0) {
        // searchingYear = searchingYear - 1
        searchingMonth = searchingMonth + 12
    }

    if(searchingDay < 0) {
        searchingMonth = searchingMonth - 1
        let lastMonth = new Date(actuallYear, actuallMonth - 1, 0)
        searchingDay = searchingDay + lastMonth.getDate();
    }

    console.log(searchingYear + "roků")
    console.log(searchingMonth + "měsíců")
    console.log(searchingDay + "dní")


    newDateParagraph.textContent = myDay.value
    newMonthParagraph.textContent = myMonth.value
    newYearParagraph.textContent = myYear.value

    document.querySelector("#placeDate").appendChild(newDateParagraph)
    document.querySelector("#placeMonth").appendChild(newMonthParagraph)
    document.querySelector("#placeYear").appendChild(newYearParagraph)

    myDay.value = ""
    myMonth.value = ""
    myYear.value = ""

    
})