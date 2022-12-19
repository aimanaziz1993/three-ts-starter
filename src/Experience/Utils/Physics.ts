import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { MeshBVH, MeshBVHVisualizer } from 'three-mesh-bvh';

import Experience from '../Experience';


export default class Physic {

    experience: Experience;
    scene: THREE.Scene;
    geometries: any = [];
    collider: any;
    visualizer: any;

    constructor(geometries: any = []) {

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.geometries = geometries;
        this.setPhysic();
    }

    setPhysic() {

        const mergedBufferGeometry = BufferGeometryUtils.mergeBufferGeometries( this.geometries );
        mergedBufferGeometry.boundsTree = new MeshBVH( mergedBufferGeometry );

        this.collider = new THREE.Mesh( mergedBufferGeometry );
        this.collider.material.wireframe = true;
        this.collider.material.opacity = 0.5;
        this.collider.material.transparent = true;

        this.visualizer = new MeshBVHVisualizer( this.collider, 10 );

        return { collider: this.collider, visualizer: this.visualizer }
    }

    update() {

    }
}
