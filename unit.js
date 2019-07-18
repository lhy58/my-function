/**
 * Created by lihanying on 2018/7/31.
 */
//保留小数点=>使用:round(12.000,2)
export function round(number, precision=0) {//number数字,precision保留的位数
    let factor = Math.pow(10, precision);
    let tempNumber = number * factor;
    let roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
}


//解决ios 微信公众号H5不显示标题问题  用法:setTitle('这是一个界面')
export function setTitle(title) {
    document.title = title;
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
        let i           = document.createElement('iframe');
        i.src           = '/favicon.ico';
        i.style.display = 'none';
        i.onload        = function () {
            setTimeout(function () {
                i.remove();
            }, 9)
        };
        document.body.appendChild(i);
    }
}


//默认时间
export function startTime(){
    let start_time = new Date();
    start_time.setHours(17,0);
    start_time.setDate(1);
    return start_time.toISOString().slice(0,16).replace(/T/,' ');
}
export function endTime(){
    let end_time = new Date();
    end_time.setHours(17,0);
    end_time.setDate(end_time.getDate() + 1);
    return end_time.toISOString().slice(0,16).replace(/T/,' ');
}

//倒计时
export function countTime(end_time){
    let t = ((end_time - new Date()) / 1000); //秒
    let m = Math.floor(t / 60);
    let s = Math.floor(t % 60);
    let h = Math.floor(t / 3600);
    return {
        s_r: Math.floor(s % 10),
        s_l: Math.floor(s / 10),
        m_r: Math.floor(m % 10),
        m_l: Math.floor((m % 100)/10),
        h_r: Math.floor(h % 10),
        h_l: Math.floor(h / 10),
    };
}


/**
 * 禁止window滑动  适用于模态框弹框底部滑动问题
 * 用法: stopBodyScroll(true) 禁止底部滑动(弹框时调用该方法)
 *  stopBodyScroll(false)  释放(模态框消失时调用该方法)
 *
 */
export function stopBodyScroll(isFixed){
    let bodyEl = document.body;
    let top = 0;
    if (isFixed) {
        //top = window.scrollY;
        bodyEl.style.position = 'fixed';
        bodyEl.style.top = -top + 'px';
        bodyEl.style.width = '100%';
    } else {
        bodyEl.style.position = '';
        bodyEl.style.top = '';
        bodyEl.style.width = '';

        window.scrollTo(0, top) // 回到原先的top
    }
}

/*
* 深克隆函数
* @_isClass判断类型
* @deepClone克隆
*/
const _isClass = (obj) => {
    if(obj === null){
       return 'null'
    }
    if(obj === undefined){
       return 'undefined'
    }
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

function deepClone(obj){
    let result
    let oClass = _isClass(obj)
    if (oClass === 'object') {
        result = {}
    }else if(oClass === 'array'){
        result = []
    }else {
        return obj
    }
    for (let key in obj) {
       let copy = obj[key]
       if(_isClass(obj[key]) === 'object'){
           result[key] = deepClone(copy)
       } else if(_isClass(obj[key]) === 'array'){
           result[key] = deepClone(copy)
       }else{
           result[key] = obj[key]
       }
    }
    return result
}

/*
*深克隆
*/
function deepClone_1(obj){
  if(Array.isArray(obj)){
    return obj.map(item => {
      return deepClone_1(item)
    })
  }else if(obj && typeof obj === 'object'){
    const result = {}
    Object.keys(obj).map(idx => {
      result[idx] = deepClone_1(obj[idx])
    })
    return result
  }
  return obj
}

/*
*比较两个日期相差的天数,可为负值
*传入格式: 2018-12-18
*/
function difftime (time1, time2) {
  let aDate1 = time1.split('-')
  let aDate2 = time2.split('-')
  let oDate1 = new Date(aDate1[0], aDate1[1] - 1, aDate1[2])
  let oDate2 = new Date(aDate2[0], aDate2[1] - 1, aDate2[2])
  let iDays = parseInt(Math.abs(oDate2 - oDate1) / (1000 * 3600 * 24))
  if (oDate1 - oDate2 < 0){
    return -iDays
  }
  return iDays
}

/*
*传入时间格式:
*2015-11-05 09:23:00
*2015-11-05T09:23:00
*2015/11/05 09:23:00
*不兼容格式化20151105 09:23:00
*返回日期显示逻辑如下:
*1.当天日期显示时间
*2.昨天和前天日期显示: 昨天 时间
*3.更早日期显示: 月 日 时间
*
*/
function parserTime (times) {
  //把日期以:隔开,替换所有的: /,T,-为:
  times = times.replace(/\//g, ':')
  times = times.replace(/\-/g, ':')
  times = times.replace(/\T/g, ':')
  times = times.replace(' ', ':')
  times = times.split(':')
  let dd 
  // 重新组合需比较日期
  let inDate = times[0] + '-' + times[1] + '-' + tiems[2]
  let inTime = times[3] + ':' + times[4]
  // HH:MM:SS
  let d = new Date()
  let newDate = d.getFullYear()+ '-' + (d.getMonth() + 1) + '-' + d.getDate()
  // 判断年份-今年
  if (times[0] == d.getFullYear()){
    if (difftime(newDate, inDate) == 0){
      dd = inTime
    } else if (difftime(newDate, inDate) == 1){
      dd = '昨天 ' + inTime
    } else if (difftime(newDate, inDate) == 2) {
      dd = '前天 ' + inTime
    } else {
      dd = parseInt(items[1]) + '月' + parseInt(items[2]) + '日 ' + inTime
    }
  }else {
    dd = times[0] + '/' + parseInt(items[1]) + '/' + parseInt(items[2]) + ' ' + inTime
  }
  return dd
}

/*
*防抖函数: 防止快速点击 如果在 300 毫秒内又发生了这个事件则废除上一次点击，重新计时
*id: 唯一标识
*fn: 函数 使用:delay_till_last('id', ()=>{}, 300)
*wait: 时间 默认300毫秒
*/

var _timer = {};
function delay_till_last (id, fn, wait) {
  if (_timer[id]) {
    window.clearTimeout(_timer[id]);
    delete _timer[id];
  }
  return _timer[id] = window.setTimeout(function () {
    fn();
    delete _timer[id];
  }, wait);
}