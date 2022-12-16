import * as THREE from 'three'
import Experience from '../Experience'
import Debug from '../Utils/Debug';
import Resources from '../Utils/Resources';


export default class Environment
{
    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
    debug: Debug;
    debugFolder: any;

    sunLight: THREE.DirectionalLight
    ambientLight: THREE.AmbientLight

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Light')
        }

        this.setSunLight();
        this.setAmbientLight();
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(- 1.637, 3.156, - 2.375 )
        this.scene.add(this.sunLight)

        // Debug
        if(this.debug.active) {
            this.debug.setDebugControl( this.sunLight, this.debugFolder )
        }
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 )
        this.scene.add( this.ambientLight );

        // Debug
        if(this.debug.active) {
            this.debug.setDebugControl( this.ambientLight, this.debugFolder )
        }
    }
}