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
