/**
 * Created by Administrator on 2017/9/22 0020.
 */
// 解析url参数
// @example？id=12345&a=b
// @return Object {id:12345,a:b}

export function urlParse (date, fmt) {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  console.log(arr);
  //  ['?id=12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let temp = item.substring(1).split('=');
      console.log(temp);
      let key = decodeURIComponent(temp[0]);
      console.log(key);
      let val = decodeURIComponent(temp[1]);
      console.log(val);
      obj[key] = val;
    });
  }
  return obj;
}
