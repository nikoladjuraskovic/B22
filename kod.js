function oboji()
{
    var tabela=document.getElementById("Tabela");
    var redovi=tabela.rows; //kolekcija redova - svi redovi kao niz 
    var brRedova=redovi.length; //ili tabela.rows.length
   
    //svaki drugi red - neparni redovi--> i=i+2
    for(var i=1;i<brRedova;i=i+2)
        redovi[i].style.backgroundColor="lightGray"; 
}
function markirajZeleno()
{
    var tabela=document.getElementById("Tabela");
    var redovi=tabela.rows; //kolekcija redova - svi redovi kao niz 
    var brRedova=redovi.length;
    //prolazimo kroz sve redove sa podacima (preskacemo zaglavlje)
    for(var i=1;i<brRedova;i++)
    {
        //ako je broj poena u polju Poeni veci od 50
        if(parseInt(redovi[i].cells[4].innerHTML)>50)
        {

            /*OPREZ! U tekstu zadatka pise da treba obojiti tekst zelenom bojom, a na slici je pozadina tih celija
            obojena u zeleno. Ovde smo obojili tekst jer se tako trazi u formulaciji zadatka.*/

			//bojimo slova celiju po celiju u tom redu 
            for(var j=0;j<redovi[i].cells.length;j++)
                redovi[i].cells[j].style.color="green";
			
        }
    }
}
//isto kao prethodna funkcija samo je <=50 i boja crvena
function markirajCrveno()
{
    var tabela=document.getElementById("Tabela");
    var redovi=tabela.rows; //kolekcija redova - svi redovi kao niz 
    var brRedova=redovi.length;
    for(var i=1;i<brRedova;i++)
    {
        if(parseInt(redovi[i].cells[4].innerHTML)<=50)
        {
           for(var j=0;j<tabela.rows[i].cells.length;j++)
                redovi[i].cells[j].style.color="red";    
	    }
    }
}
function izdvoji()
{
    var tabela=document.getElementById("Tabela");
    var redovi=tabela.rows; //kolekcija redova - svi redovi kao niz
    var brRedova=redovi.length; 
	//prolazimo kroz sve redove
    for(var i=1;i<brRedova;i++)
		//ako je broj poena manji ili jednak 50
    if(parseInt(redovi[i].cells[4].innerHTML)<=50)
    {
        //brisemo red u kome je broj poena <=50, indeks tog reda je i
        tabela.deleteRow(i);
        //smanjujemo indeks za redove
        i--;
        //smanjuje se broj redova svaki put kada izbrisemo red
        brRedova--;
    }
    //poziv f-je za sortiranje da sortira po koloni Poeni one koji su ostali
    sortiraj();
}
function sortiraj()
{
    var tabela=document.getElementById("Tabela");
    var redovi=tabela.rows;//svi redovi iz tabele
    var brRedova=redovi.length; //broj redova
    //algoritam za sortiranje opadajuce
    for(var i=0;i<brRedova-1;i++)
        for(var j=i+1;j<brRedova;j++)
        {   //poredimo dva susedna reda, tj. broj poena iz tih redova
            // ako je broj poena u redu i manji od broja poena u redu j, 
            //potrebno je da zamenimo mesta celim redovima
             if(parseInt(redovi[i].cells[4].innerHTML)<parseInt(redovi[j].cells[4].innerHTML))
            {
                /*menjamo mesta celim redovima sa indeksima i I j preko pomocne promenljive, 
                a ne samo polju sa poenima (zamena vrednosti dve promenljive var p=a; a=b; b=p;)*/
                var p=redovi[i].innerHTML;
                redovi[i].innerHTML=redovi[j].innerHTML;
                redovi[j].innerHTML=p;
            }
        }
    
}