import * as THREE from 'three';
import Experience from '../Experience';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import EventEmitter from './EventEmitter'

export default class Resources extends EventEmitter
{

    sources: Resource[];
    items: {
        texture: { [name: string]: LoadedTexture };
        cubeTexture: { [name: string]: LoadedCubeTexture };
        gltfModel: { [name: string]: LoadedModel };
        audio: { [name: string]: LoadedAudio };
    }
    toLoad: number
    loaded: number
    loaders: {
        gltfLoader: GLTFLoader,
        textureLoader: THREE.TextureLoader
        cubeTextureLoader: THREE.CubeTextureLoader
    }
    experience: Experience;

    constructor(sources: Resource[])
    {
        super()

        this.sources = sources

        this.items = { texture: {}, cubeTexture: {}, gltfModel: {}, audio: {} }
        this.toLoad = this.sources.length
        this.loaded = 0
        this.experience = new Experience()

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new THREE.TextureLoader(),
            cubeTextureLoader: new THREE.CubeTextureLoader(),
        }
    }

    startLoading()
    {

        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source: Resource, file: LoadedResource)
    {
        this.items[source.type][source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}