// import { Vec3 } from '@/Widgets/Coordinates';
import { Vec3, Vec2 } from '../Widgets/Coordinates';

export class Camera {

  /**
   * 最小离地高度
   */
  static MIN_HEIGHT: number = 10;

  /**
   * 最大离地高度
   */
  static MAX_HEIGHT: number = 4000000;

  /**
   * 最小比例尺(度/像素)
   */
  private MIN_SCALE: number;

  /**
   * 最大比例尺(度/像素)
   */
  private MAX_SCALE: number;

  /**
   * 当前比例尺(度/像素)
   */
  private _currentScale: number;

  private _position: Vec3;

  position: Vec3;

  constructor() {
    this.position = new Vec3(0, 0, Camera.MAX_HEIGHT);
    this._position = this.position;
    this.MIN_SCALE = 1 / 800;
    this.MAX_SCALE = 180 / 800;
    this._currentScale = this.MAX_SCALE;
  }

  /**
   * 拉近
   */
  zoomIn(distance: number) {
    this._position.z -= distance;
    this._position.z = this._position.z < Camera.MIN_HEIGHT ? Camera.MIN_HEIGHT : this._position.z;
    this._currentScale = this.MIN_SCALE
      + (this._position.z - Camera.MIN_HEIGHT) / (Camera.MAX_HEIGHT - Camera.MIN_HEIGHT)
      * (this.MAX_SCALE - this.MIN_SCALE);
  }

  /**
   * 拉远
   */
  zoomOut(distance: number) {
    this._position.z += distance;
    this._position.z = this._position.z > Camera.MAX_HEIGHT ? Camera.MAX_HEIGHT : this._position.z;
  }

  /**
   * 移动
   */
  move(offset: Vec2) {
    // console.log(offset);
    this._position.x += offset.x * this._currentScale;
    this._position.y += offset.y * this._currentScale;
  }

  /**
   * 获取镜头可视矩阵
   */
  getViewRec(): Vec2[] {
    let left = this._position.x - this._currentScale * 400;
    let right = this._position.x + this._currentScale * 400;
    let top = this._position.y + this._currentScale * 400;
    let bottom = this._position.y - this._currentScale * 400;
    return [
      new Vec2(left, top),
      new Vec2(right, bottom),
    ];
  }

}

export default Camera;