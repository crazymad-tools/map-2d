import Camera from '@/Camera';
import { Vec2 } from '../Widgets/Coordinates';

export class Controller {
  private _camera: Camera;

  private _container: any;

  constructor(camera: Camera, container: any) {
    this._camera = camera;
    this._container = container;

    this.bindMouseDragEvent();
    this.bindMouseWheelEvent();
  }

  /**
   * 绑定鼠标滚动事件
   */
  bindMouseWheelEvent() {
    this._container.onmousewheel = (e: any) => {
      if (e.deltaY < 0) {
        // 拉近镜头
        this._camera.zoomIn(this._camera.position.z / 5);
      } else if (e.deltaY > 0) {
        // 拉远镜头
        this._camera.zoomOut(this._camera.position.z / 5);
      }
    }
  }

  /**
   * 绑定拖动图层的事件
   */
  bindMouseDragEvent() {
    let movecb = window.onmousemove;
    let upcb = window.onmouseup;
    let last: Vec2 = null;
    this._container.onmousedown = (e: any) => {
      window.onmousemove = (e: any) => {
        let event: any = window.event;
        if (!event.screenX || !event.screenY) return;

        let offset: Vec2 = new Vec2(0, 0);
        if (last) {
          offset = new Vec2(last.x - event.screenX, event.screenY - last.y);
          last.x = event.screenX;
          last.y = event.screenY;
        } else {
          last = new Vec2(event.screenX, event.screenY);
        }
        this._camera.move(offset);
      }
      window.onmouseup = (e: any) => {
        window.onmousemove = movecb;
        window.onmouseup = upcb;
        last = null;
      }
    }
  }

}

export default Controller;