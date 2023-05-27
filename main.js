import data from "/dataAZ.json" assert {type : "json"};

let hraciPole = document.querySelectorAll("div");
let obsahPoliHracihoPole = document.querySelectorAll("div p");

let hracNaTahu = -1;   // (1 - ORANGE) || (-1 - BLUE)

let cisloOtazky = 0;


start();



function start() {
    nastaveniCiselPoli();
    pridaniListeneru();
    zmenaHrace();

    nastaveniSystemuOdpovedi();
    testCasovac();
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

//    zacitOdpocet();
//    let pauzicka = setTimeout(kontrolaOdpovedi, 1000);
    
    let odpoved = kontrolaOdpovedi(otazka);
    cisloOtazky++;

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
}

function kontrolaOdpovedi(otazka) {
    let spravnaOdpoved = data[cisloOtazky].odpoved;
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

function nastaveniSystemuOdpovedi() {
    let aktivniSekce = document.querySelector(".aktivniSekce");
    aktivniSekce.style.display = "flex";
}

function testCasovac() {
    
    let aktualniDatum = new Date().getTime();
    let konecneDatum = new Date().getTime() + 10000;


    document.querySelector(".test2").textContent = konecneDatum;

    // while (aktualniDatum < konecneDatum) {
    //     document.querySelector(".test1").textContent = (konecneDatum - aktualniDatum);
    //     aktualniDatum = new Date().getTime();

    //     console.log(konecneDatum - aktualniDatum);
    // }

    for (let i = 0; i < 1000; i++) {
        document.querySelector(".test1").textContent = (konecneDatum - aktualniDatum);
        aktualniDatum = new Date().getTime();
        
    }


}