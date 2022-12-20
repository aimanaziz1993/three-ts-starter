import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import Experience from '../Experience'
import Debug from '../Utils/Debug';
import Time from '../Utils/Time';
import Physic from '../Utils/Physics';

export default class Player {

    experience: Experience;
    scene: THREE.Scene;
    player: THREE.Mesh;
    time: Time;
    debug: Debug;
    debugFolder: any;
    debugParams: any = {}

    physic: Physic;
    collider: any;
    physicParams: any;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.physic = this.experience.world.japan.physic;
        this.collider = this.physic.collider;

        this.setPlayer();

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Player');

            this.debugParams = {
                physicsStep: 5,
            }
        }

        // Have to include bind key control event for movement
    }

    setPlayer() {

        const playerGeometry = new RoundedBoxGeometry( 1.0, 2.0, 1.0, 10, 0.5 );
        const playerMaterial = new THREE.MeshStandardMaterial();
        this.player = new THREE.Mesh(
            playerGeometry,
            playerMaterial
        );
        this.player.scale.setScalar( 1 );
        this.player.geometry.translate( 0, 1, 0 );
        this.player.receiveShadow = true;

        this.physic = new Physic( this.player, 'player' );
        console.log(this.physic);
        
        this.physicParams = this.physic.player.physicParams;

        console.log(this.physicParams);

        this.scene.add(this.physic.resource);

        setTimeout(() => {
            this.resetPosition();
        }, 500)
    }

    resetPosition() {

    }

    setAnimation() {

    }

    playerPhysic(delta: any) {
        console.log(delta);
    }

    update() {
        if ( this.collider ) {
            const steps = this.physicParams;
        }
    }

}