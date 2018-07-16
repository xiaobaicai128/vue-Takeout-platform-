/*
* 解析url参数
  @example  ?id = 12345&a=b
  @return   {id: 12345, a:b}
*/
// export function urlParse() {
//   let url = window.location.search // 得到url
//   let obj = {}
//   let reg = /[?&][^?&]+=[^?&]+/g // 正则表达式获得相应格式
//   let arr = url.match(reg) // 得到数组 arr=【‘？id=12345’，‘&a=b’】
//   if (arr) {
//     arr.forEach((item) => {
//       let tempArr = item.substring(1).split('=') // 遍历数组 去掉数组中每个数的
//                                                 // 第一个符号 ？和& 并形成新的数组
//       let key = decodeURIComponent(tempArr[0])
//       let val = decodeURIComponent(tempArr[1])
//       obj[key] = val
//     })
//   }
//   return obj
// }
export function urlParse() {
  // 拿到?id=12345&a=b这样的字符串
  let url = window.location.search 
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg) // 数组
  // ['?id=12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1])
      obj[key] = value
    })
  }
  return obj
};
