import * as THREE from 'three';
import Camera from './Camera';
import Experience from './Experience';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

export default class Renderer {

    experience: Experience;
    sizes: Sizes;
    scene: THREE.Scene;
    camera: Camera;
    time: Time;

    instance: THREE.WebGLRenderer;

    constructor() {
        this.experience = new Experience();
        this.time = this.experience.time;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        
        this.setInstance();
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        // this.instance.toneMapping = THREE.CineonToneMapping
        // this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor(0x263238 / 2, 1)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        document.querySelector('#webgl')?.appendChild( this.instance.domElement );
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance);
    }

}