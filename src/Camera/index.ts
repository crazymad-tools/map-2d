// import { Vec3 } from '@/Widgets/Coordinates';
import { Vec3 } from '../Widgets/Coordinates';

export class Camera {

  static MIN_HEIGHT: number = 10;

  static MAX_HEIGHT: number = 4000000;

  private _position: Vec3;

  position: Vec3;

  constructor() {
    this.position = new Vec3(0, 0, Camera.MAX_HEIGHT);
    this._position = this.position;
  }

  /**
   * 拉近
   */
  zoomIn(distance: number) {
    this._position.z -= distance;
    this._position.z = this._position.z < Camera.MIN_HEIGHT ? Camera.MIN_HEIGHT : this._position.z;
  }

  /**
   * 拉远
   */
  zoomOut(distance: number) {
    this._position.z += distance;
    this._position.z = this._position.z > Camera.MAX_HEIGHT ? Camera.MAX_HEIGHT : this._position.z;
  }

}

export default Camera;