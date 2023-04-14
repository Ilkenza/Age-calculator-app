const inpday = document.querySelector("#day")
const inpmonth = document.querySelector("#month")
const inpyear = document.querySelector("#year")

const errday = document.querySelector("#errday")
const errmonth = document.querySelector("#errmonth")
const erryear = document.querySelector("#erryear")

const btn = document.querySelector("#btn")

const years = document.querySelector("#years")
const months = document.querySelector("#months")
const days = document.querySelector("#days")

const lday = document.querySelector("#lday")
const lmonth = document.querySelector("#lmonth")
const lyear = document.querySelector("#lyear")


let maxDaysInMonth = 0;

function Years() {
    const currentYear = new Date().getFullYear();
    if (inpyear.value === "") {
        erryear.innerText = "This field is required"
        inpyear.style.borderColor = "#ff5757"
        lyear.style.color = "#ff5757"
        years.textContent = "--"
    } else if (inpyear.value.length !== 4 || inpyear.value > currentYear || inpyear.value < 0001) {
        erryear.innerText = "Must be a valid years"
        inpyear.style.borderColor = "#ff5757"
        lyear.style.color = "#ff5757"
        years.textContent = "--"
    } else {
        erryear.innerText = ""
        inpyear.style.borderColor = "#dbdbdb"
        lyear.style.color = "#716f6f"
    }
}
function Months() {
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    if (inpmonth.value === "02") {
        maxDaysInMonth = isLeapYear(inpyear.value) ? 29 : 28;
    } else if (inpmonth.value === 04 || inpmonth.value === 06 || inpmonth.value === 09 || inpmonth.value === 11) {
        maxDaysInMonth = 30;
    } else {
        maxDaysInMonth = 31;
    }
    if (inpmonth.value === "") {
        errmonth.innerText = "This field is required"
        inpmonth.style.borderColor = "#ff5757"
        lmonth.style.color = "#ff5757"
        months.textContent = "--"
    } else if (inpmonth.value > 12 || inpmonth.value.length < 2 || inpmonth.value < 01) {
        errmonth.innerText = "Must be a valid month"
        inpmonth.style.borderColor = "#ff5757"
        lmonth.style.color = "#ff5757"
        months.textContent = "--"
    } else {
        errmonth.innerText = ""
        inpmonth.style.borderColor = "#dbdbdb"
        lmonth.style.color = "#716f6f"
    }
}
function Days() {
    if (inpday.value === "") {
        errday.innerText = "This field is required"
        inpday.style.borderColor = "#ff5757"
        lday.style.color = "#ff5757"
        days.textContent = "--"
    } else if (inpday.value > 31 || inpday.value.length < 2 || inpday.value > maxDaysInMonth || inpday.value < 01) {
        errday.innerText = "Must be a valid days"
        inpday.style.borderColor = "#ff5757"
        lday.style.color = "#ff5757"
        days.textContent = "--"
    } else {
        errday.innerText = ""
        inpday.style.borderColor = "#dbdbdb"
        lday.style.color = "#716f6f"
        return true
    }
}

function calculateAge(e) {
    const birthdate = new Date(e);
    const today = new Date();

    let yearss = today.getFullYear() - birthdate.getUTCFullYear();
    let monthss = today.getMonth() - birthdate.getUTCMonth();
    let dayss = today.getDate() - birthdate.getUTCDate();
    if (monthss < 0 || (monthss === 0 && dayss < 0)) {
        yearss--;
        if (monthss === 0) {
            monthss = 11;
        } else {
            monthss = 12 + monthss;
        }
        dayss = 30 + dayss;
    }

    years.textContent = yearss;
    months.textContent = monthss;
    days.textContent = dayss;
}
inpday.addEventListener("input", function () {
    inpday.value = inpday.value.replace(/[^0-9]/g, '');
})
inpmonth.addEventListener("input", function () {
    inpmonth.value = inpmonth.value.replace(/[^0-9]/g, '');
})
inpyear.addEventListener("input", function () {
    inpyear.value = inpyear.value.replace(/[^0-9]/g, '');
})

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const day = Days()
    const month = Months()
    const year = Years()
    if(!day && !month && !year)return
    let birthday = `${inpmonth.value}/${inpday.value}/${inpyear.value}`;
    calculateAge(birthday);
})