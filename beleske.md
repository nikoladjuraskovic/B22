Da, tačno! 👌 Hajde da razjasnimo i pokažemo kako bi tvoj kod mogao da radi sa getElementsByTagName, jer on vraća live HTMLCollection, za razliku od querySelectorAll koji vraća statistički (static) NodeList.

🔹 Ključna razlika
Metoda Tip kolekcije Live / Static Šta znači
document.querySelectorAll(".red") NodeList Static Kolekcija ne menja se kad DOM promeniš. Moraš je svaki put ponovo dohvatiti.
document.getElementsByTagName("tr") HTMLCollection Live Kolekcija se automatski ažurira kad dodaš ili ukloniš <tr> iz DOM-a.

Zaključak: Ako koristiš getElementsByTagName, ne moraš stalno ponovo učitavati redove — kolekcija prati stanje DOM-a.

🔹 Primer kako bi tvoj kod izgledao

Pretpostavimo da želiš da obojiš neparne redove:

const tabela = document.querySelector("#tabela");
const tbody = tabela.tBodies[0]; // prvi tbody

document.querySelector("#neparni").addEventListener("click", function () {
const redovi = tbody.getElementsByTagName("tr"); // live kolekcija

    for (let i = 0; i < redovi.length; i++) {
        // ignorisemo prvi red (header)
        if (i === 0) continue;

        if ((i % 2) === 1) {
            redovi[i].style.backgroundColor = "gray"; // neparni
        } else {
            redovi[i].style.backgroundColor = "white"; // parni
        }
    }

});

Objašnjenje:

redovi je live HTMLCollection → ako korisnik kasnije ukloni neki red, kolekcija se automatski ažurira.

Nema potrebe za ponovnim querySelectorAll unutar event listenera.

🔹 Primer za brisanje redova koji nisu položili:
document.querySelector("#izdvoj_polozili").addEventListener("click", function () {
const redovi = tbody.getElementsByTagName("tr"); // live kolekcija

    // idemo unazad zbog live kolekcije i brisanja redova
    for (let i = redovi.length - 1; i > 0; i--) { // i>0 da preskočimo header
        let poeni = parseInt(redovi[i].children[4].textContent);
        if (poeni < 50) {
            tbody.removeChild(redovi[i]);
        }
    }

});

Važno:

Kod live kolekcija, kada brišeš elemente, trebaš ići unazad (i = length - 1; i >= 0; i--), inače preskačeš neke elemente zbog automatskog ažuriranja kolekcije.

🔹 Zaključak

getElementsByTagName ili getElementsByClassName → live kolekcije → prate DOM promene automatski.

querySelectorAll → static NodeList → moraš ponovo dohvatiti elemente ako se DOM menja.

Ako koristiš live kolekcije, kod postaje jednostavniji jer ne moraš stalno dohvatati redove.

Ako želiš, mogu ti napraviti kompletan tvoj JS zadatak sa tabelom koristeći getElementsByTagName, gde nije potrebno stalno ponovo učitavati redove, i sve dugmad bi radila kako treba.

Rešenje sa live kolekcijom tj. sa getElementsByTagName:
const tasterSortiraj = document.querySelector("#sortiraj");
const neparni = document.querySelector("#neparni");
const polozili = document.querySelector("#polozili");
const nisuPolozili = document.querySelector("#nisu_polozili");
const izdvojPolozili = document.querySelector("#izdvoj_polozili");

const tabela = document.querySelector("#tabela");
const tbody = tabela.tBodies[0]; // prvi tbody (postoji u HTML-u)

// Promenljive za naizmenično sortiranje po poenima
let rastuciPoeni = true;

// Funkcija za sortiranje po poenima (opadajuće ili rastuće)
function sortirajRedove() {
const redovi = Array.from(tbody.getElementsByTagName("tr")).slice(1); // preskoči header
const sortiraniNiz = redovi.sort((a, b) => {
const poeniA = parseInt(a.children[4].textContent);
const poeniB = parseInt(b.children[4].textContent);
return rastuciPoeni ? poeniA - poeniB : poeniB - poeniA;
});

    // Dodajemo redove u tbody (browser ih automatski premesti)
    for (let red of sortiraniNiz) {
        tbody.appendChild(red);
    }

    rastuciPoeni = !rastuciPoeni; // obrni smjer za sledeći klik

}

// Sortiranje dugme
tasterSortiraj.addEventListener("click", sortirajRedove);

// Oboj neparne redove
neparni.addEventListener("click", function () {
const redovi = tbody.getElementsByTagName("tr");
for (let i = 1; i < redovi.length; i++) { // preskoči header
redovi[i].style.backgroundColor = (i % 2 === 1) ? "gray" : "white";
}
});

// Označi one koji su položili
polozili.addEventListener("click", function () {
const redovi = tbody.getElementsByTagName("tr");
for (let i = 1; i < redovi.length; i++) {
const poeni = parseInt(redovi[i].children[4].textContent);
redovi[i].style.color = poeni >= 50 ? "green" : redovi[i].style.color;
}
});

// Označi one koji nisu položili
nisuPolozili.addEventListener("click", function () {
const redovi = tbody.getElementsByTagName("tr");
for (let i = 1; i < redovi.length; i++) {
const poeni = parseInt(redovi[i].children[4].textContent);
redovi[i].style.color = poeni < 50 ? "red" : redovi[i].style.color;
}
});

// Izdvoji samo one koji su položili (brise ostale)
izdvojPolozili.addEventListener("click", function () {
const redovi = tbody.getElementsByTagName("tr"); // live kolekcija
for (let i = redovi.length - 1; i > 0; i--) { // unazad zbog brisanja
const poeni = parseInt(redovi[i].children[4].textContent);
if (poeni < 50) {
tbody.removeChild(redovi[i]);
}
}
});

---

- **Problem sa NodeList/HTMLCollection** u običnom JS-u: DOM se menja, pa moraš stalno ponovo dohvatati elemente.
-
