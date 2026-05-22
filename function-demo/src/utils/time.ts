//  秒  --> hh:mm:ss
export function toTimeHour(timeStamp: any) {
    if (timeStamp === 0) {
        return timeStamp
    }

    const time = Number(timeStamp)
    const h = Math.floor(time / 3600)
    const m = Math.floor((time % 3600) / 60)
    const s = parseInt((time % 3600) as any) % 60
    const hh = h < 10 ? '0' + h : h
    const mm = m < 10 ? '0' + m : m
    const ss = s < 10 ? '0' + s : s
    return hh + ':' + mm + ':' + ss
}

//  hh:mm:ss --> 秒
export function toTimestamp(time: any) {
    if (time !== null) {
        let s: any = ''
        const hour = time.split(':')[0]
        const min = time.split(':')[1]
        const sec = time.split(':')[2]
        s = Number(hour * 3600) + Number(min * 60) + Number(sec)
        return s
    }
}

// 时间格式化
export const format = (formatStr: string = 'YYYY-MM-DD hh:mm:ss', date?: any) => {
    const _this = date ? new Date(date) : new Date();
    let str:any = formatStr;
    let Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, _this.getFullYear());
    str = str.replace(
        /yy|YY/,
        _this.getFullYear() % 100 > 9
            ? (_this.getFullYear() % 100).toString()
            : '0' + _this.getFullYear() % 100
    );
    str = str.replace(
        /MM/,
        _this.getMonth() + 1 > 9
            ? (_this.getMonth() + 1).toString()
            : '0' + (_this.getMonth() + 1)
    );
    str = str.replace(/M/g, _this.getMonth() + 1);
    str = str.replace(/w|W/g, Week[_this.getDay()]);
    str = str.replace(
        /dd|DD/,
        _this.getDate() > 9 ? _this.getDate().toString() : '0' + _this.getDate()
    );
    str = str.replace(/d|D/g, _this.getDate());
    str = str.replace(
        /hh|HH/,
        _this.getHours() > 9 ? _this.getHours().toString() : '0' + _this.getHours()
    );
    str = str.replace(/h|H/g, _this.getHours());
    str = str.replace(
        /mm/,
        _this.getMinutes() > 9
            ? _this.getMinutes().toString()
            : '0' + _this.getMinutes()
    );
    str = str.replace(/m/g, _this.getMinutes());
    str = str.replace(
        /ss|SS/,
        _this.getSeconds() > 9
            ? _this.getSeconds().toString()
            : '0' + _this.getSeconds()
    );
    str = str.replace(/s|S/g, _this.getSeconds());
    return str;
};

/**
 * 日期快捷选择初始化
 * @param {Number} index  0：昨天，1：本周，2：上周，3：本月，4：上月，5：今天， 6: 今天至零点
 * @param {Boolean} isPicker 是否为快捷项 使用
 * @param {Boolean} isNeedSecond 是否需要 秒
 */
export const dateSelect = (index: number, isPicker: boolean = true, isNeedSecond: boolean = false,formatStr?:string) => {
    let start = new Date();
    let end = new Date();
    let currentYear = start.getFullYear();
    let currentMonth = start.getMonth();
    let currentDay = start.getDate();
    switch (index) {
        case 0:
            start = new Date(new Date(new Date().toLocaleDateString()).getTime());
            end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            end.setTime(end.getTime() - 3600 * 1000 * 24);
            break;
        case 1:
            start = new Date(new Date(new Date().toLocaleDateString()).getTime());
            let initDay = start.getDay();
            if (initDay === 0) initDay = 7
            let thisDay = initDay - 1;
            let thisDate = start.getDate();
            if (thisDay != 0) {
                start.setDate(thisDate - thisDay);
            }
            break;
        case 2:
            const oneDayTime = 24 * 60 * 60 * 1000;
            const oDateStart = new Date(new Date(new Date().toLocaleDateString()).getTime());
            const oDateEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() + oneDayTime - 1);
            oDateStart.setTime(oDateStart.getTime() - oneDayTime * 7);
            oDateEnd.setTime(oDateEnd.getTime() - oneDayTime * 7);
            let lastInitDay = oDateStart.getDay();
            if (lastInitDay === 0) lastInitDay = 7
            start = new Date();
            end = new Date();
            start.setTime(oDateStart.getTime() - oneDayTime * (lastInitDay - 1));
            end.setTime(oDateEnd.getTime() + oneDayTime * (7 - lastInitDay));
            break;
        case 3:
            start = new Date(new Date(new Date().toLocaleDateString()).getTime());
            start.setDate(1);
            break;
        case 4:
            if (currentMonth == 0) {
                currentYear--
                start = new Date(currentYear, 11, 1, 0, 0, 0)
                end = new Date(currentYear, 11, 31, 23, 59, 59)
            } else {
                start = new Date(currentYear, currentMonth - 1, 1)
                end = new Date(currentYear, currentMonth, 0, 23, 59, 59);
            }
            break;
        case 5:
            start = new Date(currentYear, currentMonth, currentDay, 0, 0, 0)
            break;
        case 6: 
            start = new Date(currentYear, currentMonth, currentDay, 0, 0, 0),
            end = new Date(currentYear, currentMonth, currentDay, 23, 59, 59)
        default:
            break;
    }

    let timeStr = 'YYYY-MM-DD HH:mm:ss';

    if (!isNeedSecond) {
        timeStr = 'YYYY-MM-DD HH:mm';
    }
    if(formatStr){
        timeStr = formatStr;
    }

    if (!isPicker) {
        start = format(timeStr, start);
        end = format(timeStr, end);
    }
    return [start, end];
}


/**
 * 获取距离当前时间的前几个月份的天数
 * @param month 月
 */
export const getMonthDay = (month:number):number => {
    let y:number = new Date().getFullYear();
    let m:number = new Date().getMonth() - 1;
    let day:number = 0;
    for (let i = 0; i < month; i++) {
        y = m - i > 0 ? y : y - Math.ceil(Math.abs((m - i) / 12));
        m = m - 1;
        day = day + new Date(y,m, 0).getDate();
    }
    day  = day;
    return day;
}


// 格式化日期时间
export const formatDate = (date: any) => {
    const y = date.getFullYear();
    let m = date.getMonth() + 1; // JavaScript的月份是从0开始计数的
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    min = min < 10 ? '0' + min : min;
    s = s < 10 ? '0' + s : s;

    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  }