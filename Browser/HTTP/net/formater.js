function format() {
  const head = `${this.version} ${this.status} ${this.message}`;
  let headers = "";
  for (let key in this.headers) {
    const value = this.headers[key];
    headers += `${key.toLocaleLowerCase()}: ${value}\r\n`;
  }
  const combineData = [head, headers, this.body].join("\r\n");
  return combineData;
}

function parseHeaders(headers) {
  this.httpMessage.headers = {};
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const [key, value] = header.split(":");
    key = key.toLocaleLowerCase();
    value = value.trim();
    this.httpMessage.headers[key] = value;
  }
}
module.exports = {
  format,
  parseHeaders,
};
//   private parseHead(headStr) {
//     const [method, url, version] = headStr.split(' ');
//     this.httpMessage.method = method;
//     this.httpMessage.url = url;
//     this.httpMessage.version = version;
//   }
