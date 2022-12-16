import * as THREE from 'three';
import Experience from './Experience';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Debug from './Utils/Debug';
import Sizes from './Utils/Sizes';
import Renderer from './Renderer';
import Time from './Utils/Time';

export default class Camera 
{
    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    debug: Debug;
    debugFolder: any;
    time: Time;

    instance: THREE.PerspectiveCamera;
    orbitControls: OrbitControls;

    renderer: Renderer

    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.renderer = this.experience.renderer;

        this.time = this.experience.time;

        // Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('camera')
        }

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(0, 30, -25)
        this.instance.far
        this.instance.updateProjectionMatrix();
        this.scene.add( this.instance )
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.instance.position, 'x')
                .name('CameraX')
                .min(-30)
                .max(30)
                .step(1)

            this.debugFolder
                .add(this.instance.position, 'y')
                .name('CameraY')
                .min(-30)
                .max(30)
                .step(1)
            this.debugFolder
                .add(this.instance.position, 'z')
                .name('CameraZ')
                .min(-30)
                .max(30)
                .step(1)

            this.debugFolder.close()
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    setControls()
    {
        this.renderer = this.experience.renderer;
        this.orbitControls = new OrbitControls(
            this.instance,
            this.renderer.instance.domElement
        );

        this.orbitControls.maxPolarAngle = Math.PI / 2;
    }

    update()
    {
        this.orbitControls.update()
    }
}