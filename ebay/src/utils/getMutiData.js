import { map } from "core-js/fn/array";

const getObjectKeyList = (obj) => {
    let keyList = [];
    for (let key in obj) {
        keyList.push(key);
    }
    // console.log(keyList)
    return keyList;
};

const getObjectValueList = (obj) => {
    let valueList = [];
    valueList = Object.values(obj).map(item => {
        return Array.from(new Set(item))
    })
    return valueList;
};

const generateExampleObject = (keyList) => {
    let exampleObjectItem = {};
    keyList.forEach((item) => {
        exampleObjectItem[item] = null;
    });
    return exampleObjectItem;
};

const arrayCombination = (arr) => {
    let count = arr.length - 1;
    let tmp = [];
    let totalArr = [];

    return arrayCombinationCallback(arr, 0);

    function arrayCombinationCallback(arr, curr_index) {
        for (let val of arr[curr_index]) {
            tmp[curr_index] = val;
            if (curr_index < count) {
                arrayCombinationCallback(arr, curr_index + 1);
            } else {
                totalArr.push(tmp);
            }
            let oldTmp = tmp;
            tmp = [];
            for (let index of oldTmp) {
                tmp.push(index);
            }
        }
        return totalArr;
    }
};

export const getMutiData = (obj) => {
    const keyList = getObjectKeyList(obj);
    const valueList = getObjectValueList(obj);
    const exampleObject = generateExampleObject(keyList);
    const combinedArray = arrayCombination(valueList);

    let resultList = [];

    combinedArray.forEach((item) => {
        const example = JSON.parse(JSON.stringify(exampleObject));
        let index = 0;
        for (let key in example) {
            example[key] = item[index];
            index++;
        }
        resultList.push(example);
    });

    return resultList;
};
export const deleteTableContent = (arr, name, val, valueList, list) => {
    let listLength = list.length
    let productIdList = []
        // console.log(listLength)
        // console.log(valueList)
    for (let i = arr.length; i >= 0; i--) { // 由于是根据循环数组根据下标删除，当下标递增，数组长度减少时，会匹配不到对应的下标，所以删除失败，只有当倒序删除时就不会出现这个问题
        for (let key in arr[i]) {
            if (key === name && arr[i][name] === val) { // 如果当前删除的属性名和属性值相同
                if (valueList.length > 0) { // 判断当前属性名有多少属性值，只有当属性值大于0时才进行删除当前行，因为如果不加判断，会将其他行也进行删除
                    delete arr[i][key]
                    if (arr[i].sku) {
                        productIdList.push(arr[i].sku)
                    }
                    arr.splice(i, 1)
                } else {
                    if (arr.length === 1) { // 判断当前的行数只有一条时，那么这条数据也要删除
                        if (listLength === 1) { // 这里得判断是因为，假如有两条属性都有一条属性值，那么这个时候就不该删除行，只能删除当前得属性值，也就是删除一列
                            // console.log('进来了', list)
                            delete arr[i][name]
                        } else {
                            if (arr[i].sku) {
                                productIdList.push(arr[i].sku)
                            }
                            arr.splice(i, 1)
                        }
                    } else { // 不过不止一条还有其他的属性，那么要将他的属性名从table中删除，避免保存时还有这个属性
                        delete arr[i][name]
                    }
                }
            }
        }
    }
    return productIdList
}
export const deleteObjArrayItem = (objArray, name, val) => {
    let obj = {}
    for (let key in objArray) {
        if (name !== key) { // 判断当前的属性值的父亲属性名跟删除的不同
            obj[key] = objArray[key] // 放入新的对象中
        } else {
            let list = objArray[name].filter(item => item !== val) // 如果相同，则相同的属性值过滤掉，将不同的属性值根据删除的属性值得父亲属性名组成新的对象
            obj[name] = list
        }
    }
    return obj
}