var express = require("express");
const { copyFileSync } = require("fs");
var app = express()
const PORT = process.env.PORT || 3000;

const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: 'wyniki.db',
    autoload: true
});

app.use(express.text());

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.use(express.static('static')) // serwuje stronę index.html

let oldtab = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 4, 0, 0, 0, 0, 0, 3, 3, 0],
    [0, 4, 4, 0, 0, 0, 0, 0, 3, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let newTab = [];
let gracze = []
let status = 0;
let pioni
let pionj
let pionx
let pionz
let pionid
let pierwszy
let drugi
let przeciwnik = "false"
let kolory = ["zielony", "niebieski", "żółty", "czerwony"]
app.post("/add", function (req, res) {
    // res.sendFile(...)   
    console.log("OK")
    console.log(req.body)
    let dat = JSON.parse(req.body)
    console.log(dat)
    console.log(dat.nazwa)
    lok = dat.kolor
    u = dat.nazwa
    for (i = 0; i < dat.kolor.length; i++) {
        if (dat.kolor == kolory[i]) {
            kolory.splice(i, 1)
        }
    }
    console.log(kolory)
    if (gracze.length == 0) {
        gracze.push(u)
        pierwszy = dat.kolor
        res.end(JSON.stringify({ status: "pierwszy", imie: u, kolor: dat.kolor, }))
        console.log(gracze.length)

    } else {
        for (let i = 0; i < gracze.length; i++) {
            console.log("weszło")
            if (gracze[i] == u) {
                status = 1
            }
        }
        if (status == 0) {
            gracze.push(u)
            console.log(gracze)
            if (gracze.length == 2) {
                drugi = dat.kolor
                res.end(JSON.stringify({ status: "drugi", imie: u, kolor: dat.kolor, przeciwnik: pierwszy}))

            } else if (gracze.length > 2) {
                res.end(JSON.stringify({ status: "za dużo graczy" }))
            }
        } else {
            status = 0
            res.end(JSON.stringify({ status: "nazwa zajęta", imie: u, }))
            kolory.push(lok)
        }


    }


})


app.post("/reset", function (req, res) {
    console.log(req.body)
    let dat = JSON.parse(req.body)
    if (dat.reset == "tak") {
        gracze = []
        res.end(JSON.stringify({ status: "usunięto" }))
        kolory = ["zielony", "niebieski", "żółty", "czerwony"]
    }

})

app.post("/czekam", function (req, res) {
    res.end(JSON.stringify({ liczba: gracze.length, przeciwnik: drugi }))
})

app.post("/aktualizacja_tablicy", function (req, res) {
    console.log(req.body)
    console.log("UP")
    let dat = JSON.parse(req.body)
    pionx = dat.x
    pionz = dat.z
    pionid = dat.id
    przeciwnik = "true"
    res.end(JSON.stringify({ status: "czekaj", x: dat.x, z: dat.z, id: dat.id }))


})

app.post("/brak", function (req, res) {
    console.log(req.body)
    console.log("UP")
    przeciwnik = "brak"
    res.end(JSON.stringify({ status: "czekaj", }))


})

app.post("/wygrana", function (req, res) {
    console.log(req.body)
    console.log("UP")
    przeciwnik = "wygrana"
    let dat = JSON.parse(req.body)

    const doc = {
        sec: dat.sec,
        min: dat.min,
        nick: dat.nick
    };


    coll1.insert(doc, function (err, newDoc) {
        console.log("dodano dokument (obiekt):")
        console.log(newDoc)
        console.log("losowe id dokumentu: " + newDoc._id)
    });

    res.end(JSON.stringify({ status: "czekaj", }))


})

app.post("/porownanie_tablic", function (req, res) {
    // console.log(req.body)
    console.log("PORÓW")
    let dat = JSON.parse(req.body)
    newTab = dat.tab
    if (przeciwnik == "true") {

        console.log("zmiana")
        res.end(JSON.stringify({ status: "zmiana", tablica: oldtab, name: dat.name, i: pioni, j: pionj, x: pionx, z: pionz, id: pionid }))

    } else if (przeciwnik == "brak") {

        res.end(JSON.stringify({ status: "brak" }))
    }
    else if (przeciwnik == "wygrana") {
        console.log("brak zmiany")
        res.end(JSON.stringify({ status: "wygrana", name: dat.name }))
    }
    else if (przeciwnik == "false") {
        console.log("brak zmiany")
        res.end(JSON.stringify({ status: "nie", name: dat.name }))
    }
    przeciwnik = "false"

})

app.post("/kolor", function (req, res) {
    // console.log(req.body)
    console.log("PORÓW")
    // let dat = JSON.parse(kolory)
    res.end(JSON.stringify({ kolory }))


})


app.post("/wyniki", function (req, res) {

    coll1.find({}, function (err, docs) {
        //zwracam dane w postaci JSON
        console.log("----- tablica obiektów pobrana z bazy: \n")
        console.log(docs)
        console.log("----- sformatowany z wcięciami obiekt JSON: \n")
        console.log(JSON.stringify({ "docsy": docs }, null, 5))
        res.end(JSON.stringify({ "docsy": docs, }))
    });




})


