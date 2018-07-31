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
