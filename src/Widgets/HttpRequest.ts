export default class HttpRequest {

  /**
   * GET请求
   * @param url 
   * @param options 
   */
  static get(url: string, options?: {}): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      let ajax = new XMLHttpRequest();
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          resolve(ajax);
        }
      }
      ajax.open('get', url);
      ajax.send(null);
    });
  }

  /**
   * POST请求
   * @param url 
   * @param data 
   * @param options 
   */
  static post(url: string, data: any, options?: {}): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      let ajax = new XMLHttpRequest();
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          resolve(ajax);
        }
      }
      ajax.open('post', url);
      ajax.send(data);
    });
  }

}