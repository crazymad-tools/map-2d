import MapLoader, {GoogleMapLoader} from "./MapLoader";

interface CMapOptions {
  mapLoader: MapLoader;
}

class CMap {
  static MapLoader: any = MapLoader;
  static GoogleMapLoader: any = GoogleMapLoader;

  /*********************************************/

  private _mapLoader: MapLoader;

  constructor (id: string, options: any) {
    let container = document.getElementById(id);
    let canvas = document.createElement('canvas');
    container.appendChild(canvas);
    canvas.classList.add('cmap-canvas');

    this._mapLoader = options.mapLoader;
    this._mapLoader.getTile(0, 0, 0).then((img: any) => {
      // let dom: any = document.getElementById('test');
      // console.log(img.length);
      // console.log(img);
      // dom.src = img;
      document.body.append(img);
    });

  }
}

let _window: any = window;
_window.CMap = CMap;