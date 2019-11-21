import MapLoader, { GoogleMapLoader } from './MapLoader';
import Camera from './Camera';
import Renderer from './Renderer';
import Controller from './Controller';

interface CMapOptions {
  mapLoader?: MapLoader;
}

class CMap {
  static MapLoader: any = MapLoader;
  static GoogleMapLoader: any = GoogleMapLoader;
  static Camera: any = Camera;

  /*********************************************/

  private _mapLoader: MapLoader;

  private _renderer: Renderer;

  private _container: any;

  private _controller: Controller;

  public camera: Camera;
  
  constructor(id: string, options: CMapOptions) {
    this._container = document.getElementById(id);
    this._container.classList.add('cmap-container');
    let canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    this._container.appendChild(canvas);
    canvas.classList.add('cmap-canvas');
    // 初始化地图加载器
    this._mapLoader = options.mapLoader && new GoogleMapLoader();
    // 初始化摄像机
    this.camera = new Camera();
    // 初始化控制器
    this._controller = new Controller(this.camera, this._container);
    // 初始化渲染器
    this._renderer = new Renderer(canvas, this.camera, this._mapLoader);

    this._renderer.update();
  }
}

let _window: any = window;
_window.CMap = CMap;