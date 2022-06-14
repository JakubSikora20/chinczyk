class Pionek extends THREE.Mesh {
    constructor(x) {
        super()
        this.geometry = new THREE.BoxGeometry(20, 5, 20);
        let kolor
        if (x == 1) {
            kolor = 0xFFFF00//A52A2A 15537C
        }else if (x==2) {
            kolor = 0x008000//E6E6FA
        }else if (x==3) {
            kolor = 0xFF0000//E6E6FA
        }else if (x==4){
            kolor = 0x0000FF//E6E6FA
        }
        
        this.geometry = new THREE.CylinderGeometry(7, 7, 10, 64);
        this.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('./img/drewno2.jpg'), // plik tekstury
            color: kolor,
            specular: 0xff0000,
            shininess: 50,
            side: THREE.DoubleSide,
        });

        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.y = 5
        
    }


}