// import parseTime, formatTime and set to filter
export {
    parseTime,
    formatTime
}
from '@/utils'
var filters = {
    currency(value, type) {
        let mapping = {
            127001: "rmb",
            127002: "usd",
            127003: "hk"
        }
        return !!type ? filters[mapping[type]](value) : value;
    },
    usd: function (val) {
        return val + "$"
    },
    rmb: function (val) {
        return val + "￥"
    },
    hk: function (val) {
        return val + "HK$"
    },
}
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}
export function dataListFormat(val, format, row) {
    if (!format)
        return val;
    if (typeof (format) == "function") {
        return filters[format()](val);
    } else if (typeof (format) == "object") {
        let funName = format.funName;
        let type = row ? row[format.paramProp] : undefined;
        if (!type) {
            type = format.paramProp;
        }
        return filters[funName](val, type);
    } else {
        return filters[format](val);
    }
}
/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
    const si = [{
            value: 1E18,
            symbol: 'E'
        },
        {
            value: 1E15,
            symbol: 'P'
        },
        {
            value: 1E12,
            symbol: 'T'
        },
        {
            value: 1E9,
            symbol: 'G'
        },
        {
            value: 1E6,
            symbol: 'M'
        },
        {
            value: 1E3,
            symbol: 'k'
        }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
export function moveDecimals(arg) {
    let data = arg * 1;
    return data.toFixed(0);
}
