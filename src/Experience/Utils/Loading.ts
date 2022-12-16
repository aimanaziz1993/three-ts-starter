import * as THREE from 'three';
import Experience from '../Experience';
import EventEmitter from './EventEmitter';
import Resources from './Resources';

// To import dispatch UI Event Bus for updating UI

export default class Loading extends EventEmitter {

    progress: number;
    experience: Experience;
    resources: Resources;
    scene: THREE.Scene;

    constructor() {
        super();

        this.experience = new Experience();
        this.resources = this.experience.resources;

        this.scene = this.experience.scene;

        // TO add event on receive & dispatch to frontend
    }

}