// Récupération des tags HTML
let btnReset = document.getElementById("reset");
let radioTips = document.querySelectorAll("input[type='radio']");
let btnCustom = document.getElementById("btnCustom")

radioTips.forEach((radioTip) => {
    radioTip.addEventListener("click", (event) => {
        let tip = event.target.value
        main(tip)
    })
})

btnCustom.addEventListener("blur", (event) => {
    let tip = event.target.value
    console.log(tip)
    main(tip)
})

btnReset.addEventListener("reset", (event) => {
    event.preventDefault()
})

function main(tip) {
    let bill = document.getElementById("bills").value;
    let nbrPeople = document.getElementById("nbrPeople").value;

    if(verifyError(parseInt(nbrPeople))) {
        let zoneTipAmount = document.getElementById("amount");
        let zoneTotal = document.getElementById("total");
        let amount = calcAmount(bill, tip)
        let total = calcTotal(bill, nbrPeople, amount)

        displayAnswer(zoneTipAmount, amount)
        displayAnswer(zoneTotal, total)
    }
}

function calcAmount(bill, tip) {
    bill = parseFloat(bill)
    tip = parseFloat(tip)
    let amount = ((bill * tip) / 100) / 5
    return parseFloat(amount.toFixed(2))
}

function calcTotal(bill, nbrPeople, amount) {
    bill = parseFloat(bill)
    nbrPeople = parseInt(nbrPeople)
    let total = (bill / nbrPeople) + amount
    return parseFloat(total.toFixed(2))
}

function displayAnswer(zone, answer) {
    zone.innerHTML = `$ ${answer}`
}

function addErrorMessage(zoneError, errorInput) {
    if(zoneError.className === "title none") {
        zoneError.classList.remove("none")
        errorInput.style.outline = "2px solid red"
    }
}

function removeErrorMessage(zoneError, errorInput) {
    if(zoneError.className === "title") {
        zoneError.classList.add("none")
        errorInput.style.outline = "none"
    }
}

function verifyError(value) {
    let regex = new RegExp("^[0-9]+$")
    let enterNbrPeople = document.getElementById("nbrPeople");
    let errorMessage = document.querySelector(".error span")
    if(regex.test(value)) {
        removeErrorMessage(errorMessage, enterNbrPeople)
        return true
    } else {
        addErrorMessage(errorMessage, enterNbrPeople)
        return false
    }
}