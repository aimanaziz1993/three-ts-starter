import * as THREE from 'three'
import Experience from '../Experience';
import Resources from '../Utils/Resources';
import Environment from './Environment'
import Japan from './Japan';
import Player from './Player';

export default class World
{

    experience: Experience;
    scene: THREE.Scene;
    resources: Resources;
    environment: Environment;
    japan: Japan;
    player: Player;

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup all models from resources
            this.environment = new Environment();
            this.japan = new Japan();
            this.player = new Player();

            // console.log(this.player);
        })
    }

    update()
    {
        if ( this.japan ) { this.japan.update() }
        if ( this.player ) { this.player.update() }
    }
}