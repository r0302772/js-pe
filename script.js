let errorvak = document.querySelector("#error");
let paymentvak = document.querySelector("#payment");
let succesvak = document.querySelector("#succes");

let belgie = ["Antwerpen", "Henegouwen", "Limburg", "Luik", "Luxemburg", "Namen", "Oost-Vlaanderen", "Vlaams-Brabant", "Waals-Brabant", "West-Vlaanderen"];
let nederland = ["Noord-Holland", "Zuid-Holland", "Zeeland", "Noord-Brabant", "Utrecht", "Flevoland", "Friesland", "Groningen", "Drenthe", "Overijssel", "Gelderland", "Limburg"];

function checkLand() { //https://stackoverflow.com/questions/11255219/use-a-javascript-array-to-fill-up-a-drop-down-select-box
    if (document.getElementById("land").value == "") {
        document.getElementById('provincie').innerHTML = "";
        let sel = provincie;
        var opt = document.createElement('option');
        opt.innerHTML = "Kies een provincie";
        sel.appendChild(opt);

    } else if (document.getElementById("land").value == "België") {
        belgie = belgie.sort();
        document.getElementById('provincie').innerHTML = "";
        let sel = document.getElementById('provincie');
        for (var i = 0; i < belgie.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = belgie[i];
            opt.value = belgie[i];
            sel.appendChild(opt);
        }

    } else if (document.getElementById("land").value == "Nederland") {
        nederland = nederland.sort();
        document.getElementById('provincie').innerHTML = "";
        let sel = document.getElementById('provincie');
        for (var i = 0; i < nederland.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = nederland[i];
            opt.value = nederland[i];
            sel.appendChild(opt);
        }
    }
}


errorvak.style.display = 'none';
paymentvak.style.display = 'none';
succesvak.style.display = 'none';

function toonAlerts() {

    if (errors == "") {
        errorvak.style.display = 'none';
        paymentvak.style.display = 'block';
        succesvak.style.display = 'block';
    } else {
        errorvak.style.display = 'block';
        paymentvak.style.display = 'none';
        succesvak.style.display = 'none';
    }

}

function validateForm() {

    errors = [];

    let voornaam = document.getElementById("voornaam").value;
    let naam = document.getElementById("naam").value;
    let gebruikersnaam = document.getElementById("gebruikersnaam").value;
    let email = document.getElementById("email").value;
    let wachtwoord = document.getElementById("wachtwoord").value;
    let herhaalwachtwoord = document.getElementById("herhaalwachtwoord").value;
    let adres = document.getElementById("adres").value;
    let land = document.getElementById("land").value;
    let provincie = document.getElementById("provincie").value;
    let postcode = document.getElementById("postcode").value;
    let betalingswijze = document.getElementsByName("betaling");

    checkEmptyField(voornaam, "Het veld voornaam is vereist.");
    checkEmptyField(naam, "Het veld naam is vereist.");
    checkEmptyField(gebruikersnaam, "Het veld gebruikersnaam is vereist.");
    checkEmptyField(email, "Het veld email is vereist.");
    checkEmptyField(wachtwoord, "Het veld wachtwoord is vereist.");
    checkEmptyField(herhaalwachtwoord, "Het veld herhaal wachtwoord is vereist.");
    checkEmptyField(adres, "Adres is vereist.");
    checkEmptyField(land, "Land is vereist.");
    checkEmptyField(provincie, "Provincie is vereist.");
    checkEmptyField(postcode, "Het veld postcode is vereist.");

    if (!validateEmail(email)) {
        errors.push("E-mailadres is niet correct.");
    }

    validatePasswords(wachtwoord, herhaalwachtwoord);

    validatePayment(betalingswijze);

    checkPC(postcode);

    checkVoorwaarden();

    toonAlerts();

    console.log(errors);
    //https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
    document.getElementById("form").classList.replace("col-12", "col-lg-8");
    document.getElementById("alerts").classList.replace("col", "col-lg-4");

    document.getElementById("errorText").innerText = errors.join("\n").toString();

}

//KLAAR!!!
function validatePasswords(veld1, veld2) {

    if (veld1.length < 8) {
        errors.push("Je wachtwoord moet minstens 8 tekens lang zijn.");
    } else if (veld1 != veld2) {
        errors.push("Je wachtwoorden komen niet overeen.");
    }

}


//KLAAR!!!
function checkPC(veld) {

    if (veld < 1000 || veld > 9999) {
        errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.");
    }

}

//KLAAR!!!
function validateEmail(emailadres) { //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return mailformat.test(emailadres);

}

//KLAAR!!!
function checkVoorwaarden() {

    if (!(document.getElementById("voorwaarden").checked)) {
        errors.push("Je moet de algemene voorwaarden accepteren.");
    }

}

// KLAAR!!!
function checkEmptyField(veld, melding) { //https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

    if (veld == "") {

        errors.push(melding);

    }
}

//KLAAR!!!
function validatePayment(veld) { //https://www.youtube.com/watch?v=cSuEAD-Tnd4&ab_channel=JuniorDeveloperCentral

    let betaling = "";

    veld.forEach(radio => {
        if (radio.checked) {

            betaling = radio.value;
        }
    })

    return document.getElementById("paymentText").innerHTML = `Je betalingswijze is ${betaling}.`;
}