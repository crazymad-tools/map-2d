import Camera from "@/Camera";
import MapLoader from "@/MapLoader";
import { Vec2 } from '../Widgets/Coordinates';

export class Renderer {
  private _camera: Camera;

  private _mapLoader: MapLoader;

  private _canvas: any;

  constructor(canvas: any, camera: Camera, mapLoader: MapLoader) {
    this._canvas = canvas;
    this._camera = camera;
    this._mapLoader = mapLoader;
  }

  /**
   * 帧渲染
   */
  update() {
    requestAnimationFrame(this.update.bind(this));
    // console.log(this._camera.position);
    let level = this._camera.position.z;
    let { x, y } = this._camera.getViewRec();
    let ctx = this._canvas.getContext("2d");
    for (let i = x; i < x + 2; i++) {
      for (let j = y; j < y + 2; j++) {
        this._mapLoader.getTile(i, j, level).then((img: any) => {
          ctx.drawImage(img, (i - x) * 400, (j - y) * 400, 400, 400); 
        });
      }
    }
    console.log(x, y);
    // this._mapLoader.getTile(left, top, level).then((img: any) => {
    //   var ctx = this._canvas.getContext("2d");
    //   ctx.drawImage(img, 0, 0, 800, 800);
    //   // ctx.drawImage(img, 100, 100, 100, 100);
    // });
    // this._mapLoader.getTile(left, top, level).then((img: any) => {
    //   var ctx = this._canvas.getContext("2d");
    //   ctx.drawImage(img, 400, 0, 400, 400);
    // });
  }
}

export default Renderer;