/**
 * 地图加载器
 */
export class MapLoader {
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  /**
   * 获取指定瓦片
   * @param x x轴编号
   * @param y y轴编号
   * @param z 瓦片层级
   */
  async getTile(x: number, y: number, z: number): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {

      let url: string = this._url;
      url = url.replace('{x}', `${x}`);
      url = url.replace('{y}', `${y}`);
      url = url.replace('{z}', `${z}`);
      let img = document.createElement('img');
      img.src = url;
      img.onload = () => {
        resolve(img);
      }
    });
  }
}

/**
 * 地图加载器（google map 图源
 */
export class GoogleMapLoader extends MapLoader {
  constructor() {
    super('http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali');
  }
}

export default MapLoader;