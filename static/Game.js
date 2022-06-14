class Game {
    /////////////Prestrzeń////////////////////
    constructor() {
        this.klikniety = ""
        this.interval
        this.time
        this.time2
        this.pox
        this.poz
        this.wygrana = 0
        this.klik = 0
        this.sec = 0
        this.min = 0
        this.nick

        this.wyszed = 0
        this.geometr = new THREE.BoxGeometry(200, 200, 200);
        this.materia = new THREE.MeshPhongMaterial({
            color: 0x8888ff,
            side: THREE.FrontSide,
            wireframe: false,
            transparent: true,
            opacity: 0
        });
        this.kli
        this.klj
        this.kostka = 0
        this.cub = new THREE.Mesh(this.geometr, this.materia);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x62C0B0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);




        // this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)
        //this.camera.position.set(0, 120, 220)
        this.camera.position.set(0, 100, 300)
        this.camera.lookAt(this.scene.position);

        this.bx = [-20, -20, -20, -20, -20, -40, -60, -80, -100, -100, -100, -80, -60, -40, -20, -20, -20, -20, -20, 0, 20, 20, 20, 20, 20, 40, 60, 80, 100, 100, 100, 80, 60, 40, 20, 20, 20, 20, 20, 0, 0, 0, 0, 0]
        this.bz = [100, 80, 60, 40, 20, 20, 20, 20, 20, 0, -20, -20, -20, -20, -20, -40, -60, -80, -100, -100, -100, -80, -60, -40, -20, -20, -20, -20, -20, 0, 20, 20, 20, 20, 20, 40, 60, 80, 100, 100, 80, 60, 40, 20]
        this.yx = [-100, -80, -60, -40, -20, -20, -20, -20, -20, 0, 20, 20, 20, 20, 20, 40, 60, 80, 100, 100, 100, 80, 60, 40, 20, 20, 20, 20, 20, 0, -20, -20, -20, -20, -20, -40, -60, -80, -100, -100, -80, -60, -40, -20]
        this.yz = [-20, -20, -20, -20, -20, -40, -60, -80, -100, -100, -100, -80, -60, -40, -20, -20, -20, -20, -20, 0, 20, 20, 20, 20, 20, 40, 60, 80, 100, 100, 100, 80, 60, 40, 20, 20, 20, 20, 20, 0, 0, 0, 0, 0]
        this.gx = [20, 20, 20, 20, 20, 40, 60, 80, 100, 100, 100, 80, 60, 40, 20, 20, 20, 20, 20, 0, -20, -20, -20, -20, -20, -40, -60, -80, -100, -100, -100, -80, -60, -40, -20, -20, -20, -20, -20, 0, 0, 0, 0, 0]
        this.gz = [-100, -80, -60, -40, -20, -20, -20, -20, -20, 0, 20, 20, 20, 20, 20, 40, 60, 80, 100, 100, 100, 80, 60, 40, 20, 20, 20, 20, 20, 0, -20, -20, -20, -20, -20, -40, -60, -80, -100, -100, -80, -60, -40, -20]
        this.rx = [100, 80, 60, 40, 20, 20, 20, 20, 20, 0, -20, -20, -20, -20, -20, -40, -60, -80, -100, -100, -100, -80, -60, -40, -20, -20, -20, -20, -20, 0, 20, 20, 20, 20, 20, 40, 60, 80, 100, 100, 80, 60, 40, 20]
        this.rz = [20, 20, 20, 20, 20, 40, 60, 80, 100, 100, 100, 80, 60, 40, 20, 20, 20, 20, 20, 0, -20, -20, -20, -20, -20, -40, -60, -80, -100, -100, -100, -80, -60, -40, -20, -20, -20, -20, -20, 0, 0, 0, 0, 0]

        /////////Plansza/////////////
        this.szachownica = [
            [0, 0, 0, 0, 5, 5, 2, 0, 0, 0, 0],
            [0, 1, 1, 0, 5, 2, 5, 0, 2, 2, 0],
            [0, 1, 1, 0, 5, 2, 5, 0, 2, 2, 0],
            [0, 0, 0, 0, 5, 2, 5, 0, 0, 0, 0],
            [1, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5],
            [5, 1, 1, 1, 1, 0, 3, 3, 3, 3, 5],
            [5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 3],
            [0, 0, 0, 0, 5, 4, 5, 0, 0, 0, 0],
            [0, 4, 4, 0, 5, 4, 5, 0, 3, 3, 0],
            [0, 4, 4, 0, 5, 4, 5, 0, 3, 3, 0],
            [0, 0, 0, 0, 4, 5, 5, 0, 0, 0, 0],
        ];
        let z = -100
        let x = -100

        //https://pl.freepik.com/search?format=search&query=drewno
        for (let i = 0; i < 11; i++) {


            for (let j = 0; j < 11; j++) {
                let field = new Field(this.szachownica[i][j])
                field.position.x = x
                field.position.z = z
                field.tablicai = i
                field.tablicaj = j
                this.scene.add(field)
                x += 20
            }
            z += 20
            x = -100

        }//1-> czarny,2-> biały
        this.pionki = [
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
        /////////////////////Pionki///////////////////
        this.walec = []


        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.position.set(1, 1, 1);
        // this.light.position.set(100, 100, 0);

        this.scene.add(this.light);



        this.render() // wywołanie metody render

    }





    render = () => {
        TWEEN.update();
        requestAnimationFrame(this.render);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")



    }


    genGraczJeden(wybrany, imie) {
        this.nick = imie
        console.log("GRACZ JEDEN")
        this.timerCycle()
        console.log(this.kostka)
        document.getElementById('dane').style.visibility = "visible"
        if (wybrany == 1) {
            this.pox = this.yx
            this.poz = this.yz
            this.camera.position.set(-300, 100, 0)
            this.camera.lookAt(this.scene.position);
            this.light.position.set(-1, 1, 1);
        } else if (wybrany == 2) {
            this.pox = this.gx
            this.poz = this.gz
            this.camera.position.set(0, 100, -300)
            this.camera.lookAt(this.scene.position);
            this.light.position.set(1, 1, -1);
        } else if (wybrany == 3) {
            this.pox = this.rx
            this.poz = this.rz
            this.camera.position.set(300, 100, 0)
            this.camera.lookAt(this.scene.position);
        } else if (wybrany == 4) {
            this.pox = this.bx
            this.poz = this.bz
            this.camera.position.set(0, 100, 300)
            this.camera.lookAt(this.scene.position);
        }
        let zz = -100
        let xx = -100
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if (this.pionki[i][j] > 0) {
                    let pionek = new Pionek(this.pionki[i][j])
                    pionek.position.y = 5
                    pionek.position.x = xx
                    pionek.position.z = zz
                    pionek.tablicai = i
                    pionek.tablicaj = j
                    pionek.poczx = xx
                    pionek.poczz = zz
                    pionek.ile = -1
                    pionek.dom = "true"
                    pionek.kolor = wybrany
                    pionek.name = this.pionki[i][j]
                    this.walec.push(pionek)
                    this.scene.add(pionek)

                }
                xx += 20
            }
            zz += 20
            xx = -100
        }
        document.onmousedown = function (event) {

            if (game.kostka > 0) {
                game.zaznacz(wybrany, event, "0xFFFFF0")
            }
            // else {
            //     document.getElementById("pasek").innerHTML = `</br>` + "Musisz rzucić kostką!!!"
            // }
        }
    }
    genGraczDwa(wybrany, imie) {
        this.nick = imie
        this.timerCycle()
        console.log("GRACZ DWA")
        let data = JSON.stringify({ name: 2 })
        this.pytaj(data)
        // this.drugiczeka()
        // this.zegar()
        document.getElementById('dane').style.visibility = "visible"
        if (wybrany == 1) {
            this.pox = this.yx
            this.poz = this.yz
            this.camera.position.set(-300, 100, 0)
            this.camera.lookAt(this.scene.position);
            this.light.position.set(-1, 1, 1);
        } else if (wybrany == 2) {
            this.pox = this.gx
            this.poz = this.gz
            this.camera.position.set(0, 100, -300)
            this.camera.lookAt(this.scene.position);
            this.light.position.set(1, 1, -1);
        } else if (wybrany == 3) {
            this.pox = this.rx
            this.poz = this.rz
            this.camera.position.set(300, 100, 0)
            this.camera.lookAt(this.scene.position);
        } else if (wybrany == 4) {
            this.pox = this.bx
            this.poz = this.bz
            this.camera.position.set(0, 100, 300)
            this.camera.lookAt(this.scene.position);
        }

        let zz = -100
        let xx = -100
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if (this.pionki[i][j] > 0) {
                    let pionek = new Pionek(this.pionki[i][j])
                    pionek.position.y = 5
                    pionek.position.x = xx
                    pionek.position.z = zz
                    pionek.tablicai = i
                    pionek.tablicaj = j
                    pionek.poczx = xx
                    pionek.poczz = zz
                    pionek.ile = -1
                    pionek.dom = "true"
                    pionek.kolor = wybrany
                    pionek.name = this.pionki[i][j]
                    this.walec.push(pionek)
                    this.scene.add(pionek)

                }
                xx += 20
            }
            zz += 20
            xx = -100
        }


        // clearInterval(this.interval);
        // this.interval = setInterval(() => {
        //     net.fetchPorownaj(this.pionki)
        // }, 1000);


        document.onmousedown = function (event) {
            if (game.kostka > 0) {
                game.zaznacz(wybrany, event, "0xFFFFF0")
            }
            // else {
            //     document.getElementById("pasek").innerHTML = `</br>` + "Musisz rzucić kostką!!!"
            // }
        }
    }
    ////////////////Klikanie////////////////
    zaznacz(kolor, event, color) {
        console.log(this.kostka)



        console.log(kolor)
        // console.log("ZAZ")
        console.log(event)
        const raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        const mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        window.onresize = function () {
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        console.log(this.camera)
        raycaster.setFromCamera(mouseVector, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);


        console.log("NAME")



        if (intersects[0].object.name == 1 || intersects[0].object.name == 2 || intersects[0].object.name == 3 || intersects[0].object.name == 4) {
            console.log("PIONEK")
            if (intersects.length > 0) {
                console.log("FFF")


                console.log("PIERWSZY RAZ")
                // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
                console.log("ddd " + kolor)
                console.log(intersects[0].object.name);
                if (kolor == intersects[0].object.name) {
                    console.log("weszlo")
                    console.log(intersects[0].object.material.color);
                    // intersects[0].object.material.color.set(0x88EB1C)
                    this.klikniety = intersects[0]
                    // this.ruch(this.klikniety.object, this.pox[intersects[0].object.ile], this.poz[intersects[0].object.ile], this.kostka)
                    console.log(this.wyszed)
                    console.log(this.kostka)
                    // if (intersects[0].object.ile <= 40) {
                    if (intersects[0].object.dom == "true" && this.kostka == 6) {
                        this.kostka = 0
                        this.ruchPionka(this.klikniety.object, this.pox[0], this.poz[0])







                        //     // if (i = this.kostka) {
                        //     //     net.fetchTablica(this.pox[intersects[0].ile], this.poz[intersects[0].ile], pionek.id)
                        //     // }

                    }
                    else if (intersects[0].object.dom == "false") {

                        if (intersects[0].object.ile + this.kostka > 40) {
                            console.log("GGGG    40");
                            console.log(this.pox[this.pox.length - 1])
                            console.log(this.poz[this.poz.length - 1])
                            this.ostatni(this.klikniety.object, this.pox[this.pox.length - 1], this.poz[this.poz.length - 1])
                        }
                        else {
                            console.log("GGGGG  30")
                            // this.ruch(this.klikniety.object, this.pox[intersects[0].object.ile], this.poz[intersects[0].object.ile], this.kostka)
                            this.ruch(this.klikniety.object, this.pox[intersects[0].object.ile], this.poz[intersects[0].object.ile], this.kostka)
                        }




                    }

                    // }
                }


            }
        }
        // else {
        //     console.log("POLE")
        //     console.log(intersects[0].object)
        //     game.ruchPionka(this.klikniety.object, event)
        //     console.log(this.klikniety)


        // }

    }

    //////////////Ruch Pionka//////////////////////////
    ruchPionka = (pionek, newx, newz) => {
        this.wyszed += 1
        pionek.dom = "false"
        pionek.ile = 1
        new TWEEN.Tween(pionek.position) // co
            .to({ x: newx, z: newz }, 500) // do jakiej pozycji, w jakim czasie
            .repeat(0) // liczba powtórzeń
            .easing(TWEEN.Easing.Elastic.Out) // typ easingu (zmiana w czasie)
            .onUpdate(() => { console.log(pionek.position) })
            .onComplete(() => {
                console.log("koniec animacji")

                net.fetchTablica(newx, newz, pionek.id)
                console.log("DANE PRZECIWNIKA")



            }) // funkcja po zakończeniu animacji
            .start()


    }
    ruch = (pionek, newx, newz, kk) => {
        console.log("RUCH")
        kk -= 1

        new TWEEN.Tween(pionek.position) // co
            .to({ x: newx, z: newz }, 500) // do jakiej pozycji, w jakim czasie
            .repeat(0) // liczba powtórzeń
            .easing(TWEEN.Easing.Elastic.Out) // typ easingu (zmiana w czasie)
            .onUpdate(() => { console.log(pionek.position) })
            .onComplete(() => {
                pionek.ile += 1
                console.log(kk)
                console.log(pionek.ile);

                let ruchy = setTimeout(() => {
                    this.ruch(pionek, this.pox[pionek.ile], this.poz[pionek.ile], kk)
                }, 1);
                if (kk <= 0) {
                    clearTimeout(ruchy);


                    console.log("MMMMMMMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNNNNIIIIIIIIIIIIIIIIIEEEEEEEEEEEEEEEEJJJJJJJJJJJJJ")

                    net.fetchTablica(this.pox[pionek.ile - 1], this.poz[pionek.ile - 1], pionek.id)

                }



            }) // funkcja po zakończeniu animacji
            .start()

        // this.ruch(this.klikniety.object, this.pox[intersects[0].object.ile], this.poz[intersects[0].object.ile], this.kostka)

        // setTimeout(this.ruch, 1000, pionek, this.pox[pionek.ile], this.poz[pionek.ile], kostka)




    }






    nowatab(dat) {
        console.log("NOWATAB")
        let data = JSON.parse(dat)
        console.log(data)
        if (this.wygrana < 4) {
            if (data.status == "zmiana") {
                console.log("ZMIANA")
                this.przeciwnik(data.x, data.z, data.id)

                clearInterval(this.interval);
                this.pionki = data.tablica
                document.getElementById("pasek").innerHTML = `</br>` + "Teraz twoja kolej. Wykonaj ruch. Masz 30 sekund"
                document.getElementById('zegar').style.visibility = "hidden"
                this.kostka = 0
                clearTimeout(this.time);
                this.tak()
                this.scene.remove(this.cub);
                this.klik = 0

            } else if (data.status == "brak") {
                console.log("BRAK")


                clearInterval(this.interval);
                this.pionki = data.tablica
                document.getElementById("pasek").innerHTML = `</br>` + "Teraz twoja kolej. Wykonaj ruch. Masz 30 sekund"
                document.getElementById('zegar').style.visibility = "hidden"
                clearTimeout(this.time);
                this.tak()
                this.scene.remove(this.cub);
                this.klik = 0
            }
            else if (data.status == "wygrana") {
                console.log("WYGRANA")


                clearInterval(this.interval);
                this.pionki = data.tablica
                document.getElementById("pasek").innerHTML = `</br>` + "PRZEGRAŁEŚ TWÓJ PRZECIWNIK WYGRAŁ"
                this.wyniki()
                document.getElementById('zegar').style.visibility = "hidden"
                clearTimeout(this.time);
                // this.tak()
                // this.scene.remove(this.cub);
                // this.klik = 0
            }
        }

    }
    pytaj(dat) {
        console.log(dat)
        console.log("PYT")
        var data = JSON.parse(dat)
        // this.przeciwnik(data.i, data.j, data.x, data.z)
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            net.fetchPorownaj(this.pionki, data.name)
        }, 1000);
        this.drugiczeka()
        var czas = 30
        clearTimeout(this.time);
        this.zegar(czas)

    }

    drugiczeka() {

        console.log("drugi czeka")
        clearTimeout(this.time2);
        document.getElementById("pasek").innerHTML = `</br>` + "Twój przeciwnik wykonuje ruch. Czekaj"
        document.getElementById('zegar').style.visibility = "visible"
        this.scene.add(this.cub);
    }
    zegar = (czas) => {
        document.getElementById('zegar').innerHTML = czas
        if (czas > 0) {
            czas--
        } else {
            document.getElementById("pasek").innerHTML = `</br>` + "Czas twojego przeciwnika minął wygrałeś"
            this.wyniki()
            document.getElementById('zegar').innerHTML = ""
        }
        this.time = setTimeout(() => {
            this.zegar(czas)
        }, 1000);
    }
    licznik = (czas) => {
        if (this.wygrana < 4) {
            if (czas > 0) {
                czas--
                document.getElementById("pasek").innerHTML = `</br>` + "Teraz twoja kolej. Wykonaj ruch. Masz " + czas + " sekund"
            } else {
                document.getElementById("pasek").innerHTML = `</br>` + "Twój czas minął. Przegrałeś"
                this.wyniki()
                document.getElementById('zegar').style.visibility = "visible"
                document.getElementById('zegar').innerHTML = ""
                this.scene.add(this.cub);
            }
            this.time2 = setTimeout(() => {
                this.licznik(czas)
            }, 1000);
        }
    }

    tak() {
        var czas = 30
        clearTimeout(this.time2);
        this.licznik(czas)
        document.getElementById("dane").innerHTML = "<img src='img/cube.png' width='100px' height='100px'></img>"

    }
    kroki(e) {
        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
        if (e.which == 32 && this.klik == 0 && this.wygrana < 4) {
            ////////////////KOSTKA/////////////////


            // let min = 1;
            // let max = 6;
            // game.kostka = Math.floor(Math.random() * (max - min + 1)) + min;

            // document.getElementById("dane").innerHTML = game.kostka



            /////////////////////////////////////////////
            this.klik = 1

            let min = 1;
            let max = 6;
            var img
            game.kostka = Math.floor(Math.random() * (max - min + 1)) + min;
            if (game.kostka == 1) {
                img = "<img src='img/1.png' width='100px' height='100px'></img>"
            } else if (game.kostka == 2) {
                img = "<img src='img/2.png' width='100px' height='100px'></img>"
            } else if (game.kostka == 3) {
                img = "<img src='img/3.png' width='100px' height='100px'></img>"
            } else if (game.kostka == 4) {
                img = "<img src='img/4.png' width='100px' height='100px'></img>"
            } else if (game.kostka == 5) {
                img = "<img src='img/5.png' width='100px' height='100px'></img>"
            } else if (game.kostka == 6) {
                img = "<img src='img/6.png' width='100px' height='100px'></img>"
            }


            if (this.wyszed == 0 && this.kostka < 6) {
                console.log("FFDERTGHNGBFRTYH")
                net.fetchBrak()
            }
            document.getElementById("dane").innerHTML = img
        }
    }

    przeciwnik(nex, nez, fgid) {
        console.log("PRZECIWNIK")

        console.log(nex)
        console.log(nez)
        console.log(this.walec)
        for (let g = 0; g < this.walec.length; g++) {
            // if (this.walec[g].tablicai == fgi && this.walec[g].tablicaj == fgj) {
            if (this.walec[g].id == fgid) {
                console.log("JEST")
                console.log(this.walec[g].position)
                new TWEEN.Tween(this.walec[g].position) // co
                    .to({ x: nex, z: nez }, 1000) // do jakiej pozycji, w jakim czasie
                    .repeat(0) // liczba powtórzeń
                    .easing(TWEEN.Easing.Elastic.Out) // typ easingu (zmiana w czasie)
                    .onUpdate(() => { console.log(this.walec[g].position) })
                    .onComplete(() => {
                        console.log("przeciwnik ruszony")
                    }) // funkcja po zakończeniu animacji
                    .start()
            }

        }




    }


    wygrano(x, z, pionek) {
        console.log("WGRANA")
        if (this.wygrana == 4) {
            console.log("WYGRANA   $$444")

            net.fetchWygrana(this.sec, this.min, this.nick)
            this.scene.add(this.cub);
            document.getElementById("pasek").innerHTML = `</br>` + "WYGRAŁEŚ TWÓJ NICK ZOSTAŁ DODANY DO ZWYCIĘSKIEJ BAZY DANYCH"
            this.wyniki()
        }
        else {
            console.log("NIOE WYGRANA")
            net.fetchTablica(x, z, pionek.id)
        }
    }


    ostatni = (pionek, newx, newz) => {
        console.log("OSTATNI")
        console.log(newx)
        console.log(newz)
        new TWEEN.Tween(pionek.position) // co
            .to({ x: newx, z: newz }, 500) // do jakiej pozycji, w jakim czasie
            .repeat(0) // liczba powtórzeń
            .easing(TWEEN.Easing.Elastic.Out) // typ easingu (zmiana w czasie)
            .onUpdate(() => { console.log(pionek.position) })
            .onComplete(() => {
                pionek.ile += 1

                this.wygrana += 1
                this.wyszed -= 1

                game.wygrano(newx, newz, pionek)




                this.pox.pop()
                this.poz.pop()





            }) // funkcja po zakończeniu animacji
            .start()

        // this.ruch(this.klikniety.object, this.pox[intersects[0].object.ile], this.poz[intersects[0].object.ile], this.kostka)

        // setTimeout(this.ruch, 1000, pionek, this.pox[pionek.ile], this.poz[pionek.ile], kostka)




    }

    timerCycle = () => {
        this
        this.sec = this.sec + 1;

        if (this.sec == 60) {
            this.min = this.min + 1;
            this.sec = 0;
        }

        // if (this.sec < 10 || this.sec == 0) {
        //     this.sec = 0 + this.sec;
        // }
        // if (this.min < 10 || this.min == 0) {
        //     this.min =  + this.min;
        // }

        setTimeout(this.timerCycle, 1000);

    }


    wyniki = () => {
        document.getElementById("wyniki").style.visibility = "visible"
        net.fetchWyniki()
    }
    genWyniki = (data) => {
        let dato = JSON.parse(data)
        let dat = dato.docsy
        let tab = `<table>
    <tr>
       <td>Kto wygrał</td> <td>czas</td>
    </tr>`
        for (i = 0; i < dat.length; i++) {
            let ca = dat[i].min + ":" + dat[i].sec
            tab += ` <tr>
        <td>${dat[i].nick}</td> <td>${ca}</td>
     </tr>`
        }

        tab += `</table>`
        document.getElementById("wyniki").innerHTML = tab
    }
}












