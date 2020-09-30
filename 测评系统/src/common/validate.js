import reg from "@/common/reg";
const {
    email,
    mobile,
    int,
    alphaNumericRegex
} = reg

export function advertisementId(rule, value, callback) { //只能输入数字或者字母
    if (value && value.length) {
        if (value) {
            if (alphaNumericRegex.test(value)) {
                return callback()
            } else {
                return callback(new Error('广告ID中只能出现数字或者字母'))
            }
        }
    } else {
        return callback()
    }
};

export function onlyNumberto(rule, value, callback) { //整数
    if (value && value.length) {
        if (value[0] !== '' && value[1] !== '') {
            if (int.test(value[1])) {
                return callback()
            } else {
                return callback(new Error('请输入正确的ms数'))
            }
        } else if (value[1] == '') {
            return callback(new Error('请输入响应时间'))
        } else {
            return callback(new Error('请输入正确的响应时间'))
        }
    } else {
        return callback()
    }
};

export function tagEmail(rule, value, callback) {
    if (value) {
        if (email.test(value)) {
            return callback()
        } else {
            return callback(new Error('请输入正确的邮箱格式'))
        }

    } else {
        return callback()
    }
}

// export function tagMobile(value) {
//     if (value) {
//         if (mobile.test(value)) {
//             return true
//         }
//         return false
//     }
// }
export function tagMobile(rule, value, callback) {
    if (value) {
        if (mobile.test(value)) {
            return callback()
        } else {
            return callback(new Error('请输入正确的电话格式'))
        }

    } else {
        return callback()
    }
}

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
