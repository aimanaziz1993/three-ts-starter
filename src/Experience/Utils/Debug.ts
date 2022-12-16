import * as dat from 'lil-gui';

export default class Debug
{

    active: boolean;
    ui: dat.GUI;

    constructor()
    {
        this.active = window.location.hash === '#debug'

        if (this.active)
        {
            this.ui = new dat.GUI()
        }
    }

    setDebugControl( _obj: any, folder: any )
    {
        switch (_obj.type) {
            case 'DirectionalLight':
                folder.add(_obj, 'intensity').name('sunLightIntensity')
                    .min(0)
                    .max(10)
                    .step(0.001)
            
                folder.add(_obj.position, 'x').name('sunLightX')
                    .min(- 5)
                    .max(5)
                    .step(0.001)
                
                folder.add(_obj.position, 'y').name('sunLightY')
                    .min(- 5)
                    .max(5)
                    .step(0.001)
                
                folder.add(_obj.position, 'z').name('sunLightZ')
                    .min(- 5)
                    .max(5)
                    .step(0.001)

                folder.close()
                break;

            case "AmbientLight":
                folder.add(_obj, 'intensity').name('ambientLightIntensity')
                    .min(0)
                    .max(10)
                    .step(0.001)
            
                folder.add(_obj.position, 'x').name('ambientLightX')
                    .min(- 5)
                    .max(5)
                    .step(0.001)
                
                folder.add(_obj.position, 'y').name('ambientLightY')
                    .min(- 5)
                    .max(5)
                    .step(0.001)
                
                folder.add(_obj.position, 'z').name('ambientLightZ')
                    .min(- 5)
                    .max(5)
                    .step(0.001)

                folder.close()

                break;
        
            default:
                break;
        }
    }
}