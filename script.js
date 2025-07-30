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
redovi moraju da se ucitaju ponovo jer su se promenili u medjuvremenu i zato ih dohvatamo uvek u okviru eventListener-a.
Ovaj problem je resen u React biblioteci.
*/
//const redovi = document.querySelectorAll(".red");
const tabela = document.querySelector("#tabela");
const tbody = document.querySelector("tbody");

//console.log(redoviNiz[0].childNodes); // 9. dete je broj poena

function sortirajPoene(a, b) {
    //poene iz reda tabele dohvatamo kao tekstualni sadrzaj devetog deteta elementa
    //console.log(a.childNodes)
    //console.log(a.childNodes[9].textContent) // mozete videti ovde
    if (a.childNodes[9].textContent < b.childNodes[9].textContent)
        return 1
    else if (a.childNodes[9].textContent > b.childNodes[9].textContent)
        return -1
    else
        return 0;
}

tasterSortiraj.addEventListener('click', function () {

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
});

izdvoj_polozili.addEventListener('click', function () {

    const redovi = document.querySelectorAll(".red");
    //redove kao NodeList kolekciju pretvaramo u Array da bi mogli da ga sortiramo
    const redoviNiz = Array.from(redovi);
    for (element of redoviNiz) {
        if (parseInt(element.childNodes[9].textContent) < 50) {
            //console.log(element);
            //console.log("Parent: " + element.parentElement);
            tbody.removeChild(element);
        }
    }
});

neparni.addEventListener("click", function () {
    /*Neparni redovi su prvi, treci, peti red itd.
    Ali, se nizovi indeksiraju od nule pa ce parni indeksi
    biti indeksi neparnih redova.
    Zbog promena redova moramo obrisati property siva pozadinska boja
    na ostalim redovima da bi uvek bili sivo obojeni neparni redovi*/
    const redovi = document.querySelectorAll(".red");
    for (let i = 0; i < redovi.length; i++) {
        if (i % 2 == 0)
            redovi[i].style.backgroundColor = "gray";
        else
            redovi[i].style.removeProperty("background-color");
    }
});

polozili.addEventListener("click", function () {

    const redovi = document.querySelectorAll(".red");
    for (let red of redovi) {

        if (parseInt(red.childNodes[9].textContent) > 50)
            red.style.color = "green";
    }
});

nisu_polozili.addEventListener("click", function () {

    const redovi = document.querySelectorAll(".red");
    for (let red of redovi) {

        if (parseInt(red.childNodes[9].textContent) < 50)
            red.style.color = "red";
    }
});

