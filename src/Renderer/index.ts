import Camera from "@/Camera";
import MapLoader from "@/MapLoader";

export class Renderer {
  private _camera: Camera;

  private _mapLoader: MapLoader;

  constructor (camera: Camera, mapLoader: MapLoader) {
    this._camera = camera;
    this._mapLoader = mapLoader;
  }

  update () {
    requestAnimationFrame(this.update.bind(this));

    // console.log(this._camera.position);
  }  
}

export default Renderer;