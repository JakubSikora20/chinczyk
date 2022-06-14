class Ui {
    constructor() {
    }

    loguj = () => {
        let imie = document.getElementById('login').value
        let kolor = document.getElementById('kolor').value
        net.fetchNaSerwer(imie, kolor)
    }
    reset = () => {
        console.log("nie działa")
        net.fetchReset()
  

    }
    graj(wybrany, imie) {
        console.log("ok")
        document.getElementById("logowanie").style.visibility = "hidden"
        game.genGraczJeden(wybrany, imie)
        document.getElementById("pasek").innerHTML = `</br>`+"Twój przeciwik jest gotowy. Wykonaj pierwszy ruch. Masz 30 sekund"
        game.tak()
    } 
  
}

