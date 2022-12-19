import * as THREE from 'three'
import Experience from '../Experience'
import Debug from '../Utils/Debug';
import Resources from '../Utils/Resources';
import Time from '../Utils/Time';
import Physic from '../Utils/Physics';

export default class Japan
{
    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
    resource: any;
    model: any;
    time: Time;
    debug: Debug;
    debugFolder: any;

    debugParams: any = {}

    physic: Physic;

    geometries: any = [];

    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Japan');

            this.debugParams = {
                displayCollider: false,
	            displayBVH: false,
            }
        }

        // Resource
        this.resource = this.resources.items.gltfModel.japanModel
        this.setModel();
    }

    setModel()
    {
        
        this.model = this.resource.scene;
        this.model.scale.set(0.02, 0.02, 0.02);
        this.model.position.set( -30, 0, -20 );
        
        // inject physics here
        this.physic = new Physic(this.resource, 'static');

        if ( this.physic.collider ) {
            this.physic.collider.visible = this.debugParams.displayCollider;
            this.scene.add( this.physic.collider )
        }

        if ( this.physic.visualizer ) {
            this.physic.visualizer.visible = this.debugParams.displayBVH;
            this.scene.add( this.physic.visualizer )
        }

        if ( this.physic.environment ) {
            this.scene.add( this.physic.environment )
        }

        this.physic.environment.traverse((child: THREE.Mesh) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true;
                child.receiveShadow = true;
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

            this.debugFolder.add( this.debugParams, 'displayCollider' );
            this.debugFolder.add( this.debugParams, 'displayBVH' );
            this.debugFolder.close();
        }
    }

    setAnimation()
    {
        
    }

    update()
    {
        if ( this.physic.collider ) {
            this.physic.collider.visible = this.debugParams.displayCollider;
            this.physic.visualizer.visible = this.debugParams.displayBVH;
        }
    }
}