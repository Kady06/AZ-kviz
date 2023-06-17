import data from "https://jankarlik.cz/AZ-Kviz/json/dataAZ.json" assert {type : "json"};
import dataCerna from "https://jankarlik.cz/AZ-Kviz/json/dataAZcerna.json" assert {type : "json"};
// ↑ Na Stránkách
// ↓ Develop na PC
// import data from "/json/dataAZ.json" assert {type : "json"};

let hraciPole = document.querySelectorAll("div");
let obsahPoliHracihoPole = document.querySelectorAll("div p");

let hracNaTahu = -1;   // (1 - ORANGE) || (-1 - BLUE)

let cisloOtazky = 0;
let cisloOtazkyCerne = 0;

let rozliseniCerneOtazky = -1;  // 1 = černá || -1 = barevná

let pomocnicek = prompt("Před kliknutím na nové pole, musí být políčko s odpovědí prázdné!! (mělo by se samo mazat, snad), Zde zadej v ms, jak dlouhý čas chceš na odpověď!!!", "13000");
let casNaOdpovedMILISEKUNDY = pomocnicek++ // čas na odpověď v milisekundách
console.log(casNaOdpovedMILISEKUNDY);

let konkretniPolicko = "";

start();



function start() {
    nastaveniCiselPoli();
    pridaniListeneru();
    zmenaHrace();

    nastaveniSystemuOdpovedi();
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
    konkretniPolicko = this;
    let otazka = "";
    let spravnaOdpoved = "";
    if (konkretniPolicko.style.backgroundColor == "black") {
        otazka = dataCerna[cisloOtazkyCerne].otazka;
        spravnaOdpoved = dataCerna[cisloOtazkyCerne].odpoved;
        rozliseniCerneOtazky = 1;
    } else {
        otazka = data[cisloOtazky].otazka;
        spravnaOdpoved = data[cisloOtazky].odpoved;
        rozliseniCerneOtazky = -1;
    }
    document.querySelector(".otazka").textContent = otazka;
    

    document.querySelector(".aktivniSekce").style.display = "flex";

    let aktualniDatum = new Date().getTime();
    let konecneDatum = new Date().getTime() + casNaOdpovedMILISEKUNDY;


    let odpocet = setInterval(casovac, 10);

    let timeoutik = setTimeout(snadBudeFungovat, (casNaOdpovedMILISEKUNDY + 800))
    

    function casovac() {
        if ((konecneDatum - aktualniDatum) > 0) {
            document.querySelector(".casovac").textContent = (konecneDatum - aktualniDatum);
            aktualniDatum = (new Date().getTime());
        } else {
            document.querySelector(".casovac").textContent = "00:00";
            clearInterval(casovac);
        }
        console.log(document.querySelector(".odpoved").value);
        if (document.querySelector(".odpoved").value == 1) {
            clearTimeout(timeoutik);
            snadBudeFungovat();
        }
    }

    function snadBudeFungovat() {
        clearInterval(odpocet);
        let retunovaciPomoc = 0;
        if (document.querySelector(".odpoved").value == 1) {
            retunovaciPomoc = hracNaTahu
        }

        console.log(retunovaciPomoc);
        switch (retunovaciPomoc) {
            case 1:
                konkretniPolicko.style.backgroundColor = "orange";
                konkretniPolicko.removeEventListener("click", odkliknutiPole);
                break;
            case -1:
                konkretniPolicko.style.backgroundColor = "blue";
                konkretniPolicko.removeEventListener("click", odkliknutiPole);
                break;
            case 0:
                konkretniPolicko.style.backgroundColor = "black";
                break;    
            default:
                console.log("Chyba switch, hracNaTahu!!!");
                break;
        }
        zmenaHrace();
        if (rozliseniCerneOtazky == 1) {
            cisloOtazkyCerne++;
        }
        if (rozliseniCerneOtazky == -1) {
            cisloOtazky++;
        }
        console.log("test");
        document.querySelector(".odpoved").value = "";
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

function nastaveniSystemuOdpovedi() {
    let aktivniSekce = document.querySelector(".aktivniSekce");
    aktivniSekce.style.display = "none";
}
