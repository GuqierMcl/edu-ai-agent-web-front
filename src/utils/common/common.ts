import dayjs from "dayjs";
/**
 * 格式化时间
 */
export const formatDateTime = (
  time: dayjs.ConfigType,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  return dayjs(time).format(format);
};

export const formateTimestamp = (timestamp: string) => {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
};

export const parseDateTime = (time: string) => {
  return dayjs(time).valueOf();
};

export const messageError = (message: string) => {
  if (window.$message) {
    window.$message.info(message);
  } else {
    setTimeout(() => {
      window.$message && window.$message.info(message);
    }, 200);
  }
};

export function getCookie(name: string) {
  console.log(document.cookie);

  var strcookie = document.cookie; //获取cookie字符串
  var arrcookie = strcookie.split("; "); //分割
  //遍历匹配
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0].trim() == name) {
      return arr[1];
    }
  }
  return "";
}

/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(method: Function, wait: number, immediate?: boolean) {
  let timeout: NodeJS.Timeout | null;
  return function (this: any, ...args: any) {
    let context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        method.apply(context, args);
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(context, args);
      }, wait);
    }
  };
}
