import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { MeshBVH, MeshBVHVisualizer } from 'three-mesh-bvh';

export default class Physic {

    geometries: any = [];
    resource: any;
    environment: THREE.Group;
    
    collider: any;
    visualizer: any;
    type: string;
    player: any = {};

    constructor(resource: any, type: string) {

        this.resource = resource;
        this.type = type;

        switch (this.type) {
            case 'static':
                this.setStaticPhysic( this.resource );
                break;
            case 'player':
                this.setCharacterPhysic( this.resource );
                break;
            default:
                break;
        }
        
    }

    setStaticPhysic( _resource ) {
        this.environment = _resource.scene;
        this.environment.updateMatrixWorld( true );
        this.environment.traverse( (child: THREE.Mesh) => {

            if(child instanceof THREE.Mesh) {
                if ( child.geometry ) {
                    const cloned = child.geometry.clone();
                    cloned.applyMatrix4( child.matrixWorld );

                    for ( const key in cloned.attributes ) {
                        if ( key !== 'position' ) {
                            cloned.deleteAttribute( key );
                        }
                    }
                    this.geometries.push( cloned );
                }
            }
        });

        const mergedBufferGeometry = BufferGeometryUtils.mergeBufferGeometries( this.geometries );
        mergedBufferGeometry.boundsTree = new MeshBVH( mergedBufferGeometry );

        this.collider = new THREE.Mesh( mergedBufferGeometry );
        this.collider.material.wireframe = true;
        this.collider.material.opacity = 0.5;
        this.collider.material.transparent = true;

        this.visualizer = new MeshBVHVisualizer( this.collider, 10 );

        return { collider: this.collider, visualizer: this.visualizer }
    }

    setCharacterPhysic( _player ) {
        let step: number = 5, velocity: THREE.Vector3 = new THREE.Vector3(),
        playerIsOnGround: boolean = false;

        _player.userData.capsuleInfo = {
            radius: 0.5,
            segment: new THREE.Line3( new THREE.Vector3(), new THREE.Vector3( 0, - 1.0, 0.0 ) )
        }

        return this.player = {
            player: _player,
            physicParams: { step: step, playerVelocity: velocity, onGround: playerIsOnGround }
        }
    }

    update() {

    }
}
