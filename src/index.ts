class CMap {
  constructor (id: string) {
    let container = document.getElementById(id);
    let canvas = document.createElement('canvas');
    container.appendChild(canvas);
  }
}

let _window: any = window;
_window.CMap = CMap;