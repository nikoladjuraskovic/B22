const tasterSortiraj = document.querySelector("#sortiraj")
const neparni = document.querySelector("#neparni");
const polozili = document.querySelector("#polozili");
const izdvoj_polozili = document.querySelector("#izdvoj_polozili");
const nisu_polozili = document.querySelector("#nisu_polozili");
/*BITNO:
const redovi ne mozemo definisati ovde jer se niz redovi menja dok se program izvrsava.
Potrebno je da se stranica refreshuje da bi se ponovo izvrsio pocetni deo koda.
Tako da svaki put kada nastane promena u redovima tj. DOM stablu html stranice,
a promena u ovom zadatku je brisanje redova,
izmenjeni redovi moraju da se ucitaju ponovo jer su se promenili u medjuvremenu i zato ih dohvatamo uvek u okviru eventListener-a.

*/
//const redovi = document.querySelectorAll(".red");
const tabela = document.querySelector("#tabela");
const tbody = document.querySelector("tbody");

//console.log(redoviNiz[0].childNodes); // 9. dete je broj poena

function sortirajPoene(a, b) {
    //td podatak za broj poena je 5.dete u nizu children, broji se od 0 pa je indeks 4
    let poeni_a = parseInt(a.children[4].textContent);
    let poeni_b = parseInt(b.children[4].textContent);

    if (poeni_a < poeni_b)
        return 1
    else if (poeni_a > poeni_b)
        return -1
    else
        return 0;
}

function sortirajRedove() {
    /*funkcija se poziva vise puta u aplikaciji, takodje nakon mogucih izmena DOM stabla zbog izbacivanja redove,
    te je zbog toga potrebno svaki put ucitati redove iz HTML-a*/
    const redovi = document.querySelectorAll(".red");
    //redove kao NodeList kolekciju pretvaramo u Array da bi mogli da ga sortiramo
    const redoviNiz = Array.from(redovi);
    let sortiraniNiz;
    sortiraniNiz = redoviNiz.sort(function (a, b) {
        return sortirajPoene(a, b)
    });
    for (let element of sortiraniNiz) {

        tbody.appendChild(element);
    }
    /*Ubacujemo redove <tr> u tbody jer browser automatski pravi tbody tag u table tag-u ako
    ga mi ne stavimo sto onda pravi problem pri brisanju redova. Zato koristimo tbody tag 
    ovde i u HTML-u
    Ponovnim dodavanjem sortiranih elemenata U DOM menja se prvobitni redosled*/
}

tasterSortiraj.addEventListener('click', sortirajRedove);

izdvoj_polozili.addEventListener('click', function () {

    const redovi = document.querySelectorAll(".red");
    //redove kao NodeList kolekciju pretvaramo u Array da bi mogli da ga sortiramo
    const redoviNiz = Array.from(redovi);
    for (red of redoviNiz) {
        if (parseInt(red.children[4].textContent) < 50) {
            //console.log(red);
            //console.log("Parent: " + red.parentElement);
            tbody.removeChild(red);
        }
    }
    sortirajRedove();
});

neparni.addEventListener("click", function () {
    /*Neparni redovi su prvi, treci, peti red itd.
    Ali, se nizovi indeksiraju od nule pa ce parni indeksi
    biti indeksi neparnih redova.
    Zbog promena redova moramo property pozadinska boja
    postaviti na belo(default boja)*/
    const redovi = document.querySelectorAll(".red");
    for (let i = 0; i < redovi.length; i++) {
        if (i % 2 == 0)
            redovi[i].style.backgroundColor = "gray";
        else
            redovi[i].style.backgroundColor = "white";
    }
});

polozili.addEventListener("click", function () {

    const redovi = document.querySelectorAll(".red");
    for (let red of redovi) {

        if (parseInt(red.children[4].textContent) > 50)
            red.style.color = "green";
    }
});

nisu_polozili.addEventListener("click", function () {

    const redovi = document.querySelectorAll(".red");
    for (let red of redovi) {

        if (parseInt(red.children[4].textContent) < 50)
            red.style.color = "red";
    }
});

