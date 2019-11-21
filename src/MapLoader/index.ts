import { Vec3 } from "@/Widgets/Coordinates";

/**
 * 地图加载器
 */

const TILE_HASH: any = []

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
    if (x < 0 || y < 0) return null;


    return new Promise((resolve: Function, reject: Function) => {
      if (TILE_HASH[x * y * z]) {
        // TILE_HASH[x * y * z].forEach((tile: Vec3) => {
        //   if (tile.x === x && tile.y === y && tile.z === z) 
        //   return
        // });
        for (let tile of TILE_HASH[x * y * z]) {
          if (tile.x === x && tile.y === y && tile.z === z) {
            resolve(tile.img);
            tile.img.onload = () => {
              resolve(tile.img);
            }
            return;
          }
        }
      }

      let url: string = this._url;
      url = url.replace('{x}', `${x}`);
      url = url.replace('{y}', `${y}`);
      url = url.replace('{z}', `${z}`);
      let img = document.createElement('img');
      img.src = url;

      if (!TILE_HASH[x * y * z]) {
        TILE_HASH[x * y * z] = [];
      }

      let replaceed = false;
      for (let tile of TILE_HASH[x * y * z]) {
        if (tile.x === x && tile.y === y && tile.z === z) {
          tile.img = img;
          replaceed = true;
        }
      }
      !replaceed && TILE_HASH[x * y * z].push({
        x: x, y: y, z: z, img: img
      });

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