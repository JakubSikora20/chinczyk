class Field extends THREE.Mesh {
    constructor(x) {
        super()
        this.geometry = new THREE.BoxGeometry(20, 5, 20);
        let obrazek
        let kolor
        if (x == 1) {
            obrazek = './img/yellow.jpg'
            kolor = "y"
        }else if (x==2) {
            obrazek = './img/green.jpg'
            kolor = "g"
        }else if (x==3) {
            obrazek = './img/red.jpg'
            kolor = "r"
        }else if (x==4){
            obrazek = './img/blue.jpg'
            kolor = "b"
        }else if (x==5){
            obrazek = './img/bialy.jpeg'
            kolor = "w"
        }else{
            kolor = "v"
            obrazek = './img/bialy.jpeg'
        }
        this.material = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xff0000,
            shininess: 50,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load(obrazek), // plik tekstury
        })
        this.name = kolor
        if (this.name == "v") {
            this.visible = false
        }
    }

}