import * as THREE from 'three';

import Debug from './Utils/Debug';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World'
import Resources from './Utils/Resources';

import sources from './sources';

import Stats from 'stats.js';


let instance: Experience | null = null;

export default class Experience 
{
    debug: Debug;
    sizes: Sizes;
    time: Time;

    scene: THREE.Scene;
    camera: Camera;
    renderer: Renderer;
    world: World;
    resources: Resources;

    stats: Stats | undefined;

    constructor() {

        if ( instance ) {
            return instance
        }
        instance = this

        // Setup
        this.debug = new Debug();
        this.sizes = new Sizes();
        // this.mouse = new Mouse();
        // this.loading = new Loading();
        this.time = new Time();
        this.scene = new THREE.Scene();
        // this.cssScene = new THREE.Scene();
        // this.overlayScene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.camera.setControls();
        this.world = new World();

        // Stats
        if (window.location.hash === '#debug') {
            this.stats = new Stats();
            this.stats.showPanel(0);
            document.body.appendChild(this.stats.dom);
        }
        
        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })

        this.scene.add( new THREE.AxesHelper( 5 ) )
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        if (this.stats) this.stats.begin();
        this.camera.update()
        this.world.update()
        this.renderer.update()
        if (this.stats) this.stats.end();
    }
}