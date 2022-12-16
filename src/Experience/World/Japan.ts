import * as THREE from 'three'
import Experience from '../Experience'
import Debug from '../Utils/Debug';
import Resources from '../Utils/Resources';
import Time from '../Utils/Time';

export default class Japan
{
    experience: Experience;
    scene: THREE.Scene;
    resources: any;
    resource: any;
    model: any;
    time: Time;
    debug: Debug;
    debugFolder: any;

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Japan')

            console.log(this.debug.ui);
        }

        // Resource
        this.resource = this.resources.items.gltfModel.japanModel

        this.setModel()
        
    }

    setModel()
    {
        
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.model.position.set( -20, 0, -20 )
        this.scene.add(this.model)

        this.model.traverse((child: any) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        // Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.model.position, 'x').name('JapanX')
                .min(- 30)
                .max(30)
                .step(0.001)
            
            this.debugFolder.add(this.model.position, 'y').name('japanY')
                .min(- 30)
                .max(30)
                .step(0.001)
            
            this.debugFolder.add(this.model.position, 'z').name('japanZ')
                .min(- 30)
                .max(30)
                .step(0.001)

            this.debugFolder.close();
        }
    }

    setAnimation()
    {
        
    }

    update()
    {
        
    }
}