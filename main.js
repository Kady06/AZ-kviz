// import data from "https://jankarlik.cz/AZ-Kviz/json/dataAZ.json" assert {type : "json"};
// ↑ Na Stránkách
// ↓ Develop na PC
import data from "/json/dataAZ.json" assert {type : "json"};

let hraciPole = document.querySelectorAll("div");
let obsahPoliHracihoPole = document.querySelectorAll("div p");

let hracNaTahu = -1;   // (1 - ORANGE) || (-1 - BLUE)

let cisloOtazky = 0;

let casNaOdpovedMILISEKUNDY = 15000; // čas na odpověď v milisekundách


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
    let otazka = data[cisloOtazky].otazka;
    document.querySelector(".otazka").textContent = otazka;
    let spravnaOdpoved = data[cisloOtazky].odpoved;

    document.querySelector(".aktivniSekce").style.display = "flex";

    let aktualniDatum = new Date().getTime();
    let konecneDatum = new Date().getTime() + casNaOdpovedMILISEKUNDY;


    setInterval(casovac, 10);
    setTimeout(() => {
        odpoved = kontrolaOdpovedi(otazka);
    }, casNaOdpovedMILISEKUNDY);
    setTimeout(() => {
        console.log(odpoved);
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
        console.log("test");
    }, (casNaOdpovedMILISEKUNDY + 1000))
    

    function casovac() {
        if ((konecneDatum - aktualniDatum) > 0) {
            document.querySelector(".casovac").textContent = (konecneDatum - aktualniDatum);
            aktualniDatum = (new Date().getTime());
        } else {
            document.querySelector(".casovac").textContent = "00:00";
        }
    }
    let odpoved = "";


    
    
    
    cisloOtazky++;

    function timeoutSpoust2(test) {
        
    }
}

function kontrolaOdpovedi(otazka) {
    let retunovaciPomoc = 0;
    let spravnaOdpoved = data[cisloOtazky].odpoved;



    switch (document.querySelector(".odpoved").textContent) {
        case spravnaOdpoved:
            retunovaciPomoc = hracNaTahu;
            break;
        default:
            break;
    }

    return retunovaciPomoc;
    
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


function kozoleTest() {
    console.log("test funkce");
}