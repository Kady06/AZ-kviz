
let hraciPole = document.querySelectorAll("div");
let obsahPoliHracihoPole = document.querySelectorAll("div p");

let hracNaTahu = -1;   // (1 - ORANGE) || (-1 - BLUE)

start();



function start() {
    nastaveniCiselPoli();
    pridaniListeneru();
    zmenaHrace();
}



function nastaveniCiselPoli() {
    let pom = 1;
    for (const neco of obsahPoliHracihoPole) {
        neco.textContent = pom++;
    }
}

function pridaniListeneru() {
    for (const neco of hraciPole) {
        neco.addEventListener("click", odkliknutiPole);
    }
}

function odkliknutiPole() {
    let otazka = "TODO: nejsou otázky...";
    document.querySelector(".otazka").textContent = otazka;
    let spravnaOdpoved = "1";

//    zacitOdpocet();
//    let pauzicka = setTimeout(kontrolaOdpovedi, 1000);
    
    let odpoved = kontrolaOdpovedi(otazka);

    switch (odpoved) {
        case 1:
            this.style.backgroundColor = "orange";
            this.removeEventListener("click", odkliknutiPole);
            break;
        case -1:
            this.style.backgroundColor = "blue";
            this.removeEventListener("click", odkliknutiPole);
            break;
        case 0:
            this.style.backgroundColor = "black";
            break;    
        default:
            console.log("Chyba switch, hracNaTahu!!!");
            break;
    }
    

    zmenaHrace();
    
}


function kontrolaOdpovedi(otazka) {
    let spravnaOdpoved = "1";
    // if (document.querySelector(".odpoved") == spravnaOdpoved) {
    if (prompt(otazka) == spravnaOdpoved) {
        return hracNaTahu;
    } else {
        return 0;
    }
}

function zmenaHrace() {
    hracNaTahu = hracNaTahu*(-1);

    switch (hracNaTahu) {
        case 1:
            document.querySelector(".prvniTeam").style.color = "orange";
            document.querySelector(".druhyTeam").style.color = "black";
            break;
        case -1:
            document.querySelector(".prvniTeam").style.color = "black";
            document.querySelector(".druhyTeam").style.color = "blue";
            break;
        default:
            break;
    }
}