//loguj
class Net {
    constructor() {
        this.interval
    }

    fetchNaSerwer(arg, kolor) {
        console.log(arg, kolor);
        //fetch

        const data = JSON.stringify({
            nazwa: arg,
            kolor: kolor,
        })
        console.log(data)
        //fetch
        const options = {
            method: "POST",
            body: data
        };

        fetch("/add", options)
            .then(response => response.text()) // konwersja na json
            .then(data => {
                let kolor
                let dat = JSON.parse(data)
                console.log(dat)
                let wybrany = ""
                if (dat.kolor == "żółty") wybrany = 1
                if (dat.kolor == "zielony") wybrany = 2
                if (dat.kolor == "czerwony") wybrany = 3
                if (dat.kolor == "niebieski") wybrany = 4
                if (dat.status == "drugi") {
                    kolor = "czarnymi"
                    document.getElementById("pasek").innerHTML = `</br>` + "Witaj " + dat.imie + ", jesteś " + dat.kolor
                    document.getElementById("logowanie").style.visibility = "hidden"
                    game.genGraczDwa(wybrany, dat.imie)
                } else if (dat.status == "pierwszy") {
                    kolor = "białymi"
                    document.getElementById("pasek").innerHTML = `</br>` + "Witaj " + dat.imie + ", jesteś " + dat.kolor
                    this.interval = setInterval(() => {
                        net.czekajNaDrugiego(wybrany, dat.imie)
                    }, 1000);
                } else if (dat.status == "nazwa zajęta") {
                    document.getElementById("pasek").innerHTML = `</br>` + "Nazwa " + dat.imie + " jest już zajęta. Wybierz inną"
                } else if (dat.status == "za dużo graczy") {
                    document.getElementById("pasek").innerHTML = `</br>` + "Brak wolnych miejsc, spróbuj później"
                }

            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));


    }
    fetchReset() {
        console.log("reset");
        const data = JSON.stringify({
            reset: "tak",
        })
        const options = {
            method: "POST",
            body: data
        };

        fetch("/reset", options)
            .then(response => response.text()) // konwersja na json
            .then(data => {
                console.log(data)
            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));


    }
    czekajNaDrugiego(wybrany, imie) {
        document.getElementById("logowanie").innerHTML = "Czekam na drugiego gracza" + `</br></br><img src="./img/czekaj.gif" ></img>`

        let odp
        console.log("czekam");
        const options = {
            method: "POST",
        };

        fetch("/czekam", options)
            .then(response => response.text()) // konwersja na json
            .then(data => {
                console.log(data)
                odp = JSON.parse(data)
                if (odp.liczba == 2) {
                    clearInterval(this.interval);
                    ui.graj(wybrany, imie)
                }
            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));
    }
    fetchTablica(nx, nz, id) {
        console.log("TABLICA");
        const data = JSON.stringify({ x: nx, z: nz, id: id })
        const options = {
            method: "POST",
            body: data
        };

        fetch("/aktualizacja_tablicy", options)
            .then(response => response.text()) // konwersja na json
            .then(data => {

                console.log("AK")
                console.log(data)
                game.pytaj(data)

            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));


    }
    fetchPorownaj(tabelka, nazwa) {
        // console.log("PO")
        const data = JSON.stringify({ tab: tabelka, name: nazwa })
        const options = {
            method: "POST",
            body: data
        };

        fetch("/porownanie_tablic", options)
            .then(response => response.text()) // konwersja na json
            .then(data => {
                // console.log("POR")
                console.log(data)
                game.nowatab(data)
                // game.drugiczeka()
            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));


    }

    fetchBrak() {
        console.log("BRAK");
        const data = JSON.stringify({ x: "KL" })
        const options = {
            method: "POST",
            body: data
        };

        fetch("/brak", options)
            .then(response => response.text()) // konwersja na json
            .then(data => {

                game.pytaj(data)

            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));


    }


    fetchWygrana(sec, min, nick) {
        console.log("WYGRANA");
        const data = JSON.stringify({ sec: sec, min: min, nick: nick })
        const options = {
            method: "POST",
            body: data
        };

        fetch("/wygrana", options)
            .then(response => response.text()) // konwersja na json
            .then(data => {




            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));


    }



    fetchWyniki() {

        const data = JSON.stringify({ df: "wyb" })
        const options = {
            method: "POST",
            body: data
        };

        fetch("/wyniki", options)
            .then(response => response.text()) // konwersja na json
            .then(data => {

                game.genWyniki(data)


            }) // dane odpowiedzi z serwera
            .catch(error => console.log(error));


    }







}