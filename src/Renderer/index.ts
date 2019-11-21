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
    let level: number = 10 - Math.ceil(this._camera.position.z / 400000);
    let maxX: number = Math.pow(2, level); // X轴方向最大瓦片数
    let maxY: number = Math.pow(2, level);               // Y轴方向最大瓦片数
    let singleX: number = 180 / maxX;      // 一张瓦片占的经度跨幅
    let singleY: number = 180 / maxY;         // 一张瓦片占的纬度跨幅
    let rec: Vec2[] = this._camera.getViewRec();

    let left = Math.floor((rec[0].x + 90) / singleX);
    let right = Math.floor((rec[1].x + 90) / singleX);
    let top = Math.floor((rec[0].y + 90) / singleY);
    let bottom = Math.floor((rec[1].y + 90) / singleY);

    let ctx = this._canvas.getContext("2d");

    // console.log(rec);
    // console.log(left, right, top, bottom)
    for (let i = left; i < right; i++) {
      for (let j = bottom; j < top; j++) {
        this._mapLoader.getTile(i, j, level).then((img: any) => {
          ctx.drawImage(img, 100 * (i - left), 100 * (j - bottom), 100, 100);
        });
      }
    }

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