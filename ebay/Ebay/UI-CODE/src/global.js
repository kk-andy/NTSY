/**
 * 全局函数
 */
const commonFn = {
  toastMsg(type, msg, time, callback) {
    //success/warning/info/error
    bus.$message({
      message: msg,
      type: type,
      duration: time ? time : 3000,
      showClose: true,
      onClose: function() {
        if (typeof callback == "function") {
          callback();
        }
      }
    });
  },
  noticeMsg(type, title, msg, time, callback) {
    bus.$notify({
      type: type,
      title: title,
      message: msg,
      duration: time ? time : 3000,
      onClose: function() {
        if (typeof callback == "function") {
          callback();
        }
      }
    });
  },
  confirmMsg(type, title, msg, success, cancel) {
    bus
      .$confirm(msg, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type
      })
      .then(() => {
        if (typeof success == "function") {
          success();
        }
      })
      .catch(() => {
        if (typeof cancel == "function") {
          cancel();
        }
      });
  },
  /**
   * 取消选中的值
   * @param {array} array 选中的值
   * @param {int} value 当前值
   */
  unsetArray(array, value) {
    _.forEach(array, (val, index) => {
      if (val == value) {
        array.splice(index, 1);
      }
    });

    return array;
  },
  /**
   * 从cookie中读取Laravel设置的XSRF-TOKEN值
   * @returns {string}
   */
  getXsrfToken() {
    let name = "XSRF-TOKEN",
      match = document.cookie.match(
        new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
      );
    return match ? decodeURIComponent(match[3]) : null;
  },
  /**
   * 获取 el-upload 上传 header 设置
   *
   * @returns {object}
   */
  getElUploadHeader() {
    return {
      "X-XSRF-TOKEN": this.getXsrfToken(),
      "X-Requested-With": "XMLHttpRequest"
    };
  },
  /**
   * 表单验证
   */
  validationRule: {
    /**
     * 手机号码
     *
     * @param {string} val
     * @returns bool
     */
    // 验证电话号
    chinaMobileNumber(val) {
      return /^1[3456789]\d{9}$/.test(val);
    },
    // 验证五位数的正整数
    fivePositiveIntegers(val) {
      return /^[1-9]\d{1,5}$/.test(val);
    },
    // 验证大于零的数
    greaterThanZero(val) {
      return /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(val);
    },
    //纯数字
    pureNumbers(val) {
      // return /^([0-9][0-9]*)+(.[0-9]{1,2})?$/.test(val);
      return /^(\-|\+)?\d+(\.\d+)?$/.test(val);
    },
    checkIsPositiveInteger(val) {
      //验证包含0的正整数
      return /^(0|[1-9][0-9]*)$/.test(val);
    },
    verifyAllPositiveIntegers(val) {
      //验证不包含0的正整数
      return /^[1-9]+\d*$/.test(val);
    },
    checkIsImg(url) {
      return /\.(jpeg|jpg|png)$/.test(url);
    }
  },
  getAdaptiveHeight(domHeight, ref, setAside = 20) {
    // this.styleHeight = window.innerHeight - this.$refs.refValue.offsetTop - 20;
    domHeight = window.innerHeight - ref.offsetTop - setAside;
    //window.innerHeight:浏览器的可用高度
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    // ref.offsetTop：组件距离浏览器的高度
    //setAside：根据需求空出的高度，自行调整

    return domHeight;
  },
  // 定义母系统域名前缀
  getLastDomain() {
    return process.env.VUE_APP_ERP_DOMAIN;
    // return 'http://localhost:8080'
  },
  redirectRoute(path) {
    window.location.href = "/#" + path;
  },
  scrollTop() {
    window.document.querySelector(".el-table__body-wrapper").scrollTop = 0;
    // this.$refs.table.bodyWrapper.scrollTop = 0  //單頁面使用
  },
  getJsonParse(object) {
    return JSON.parse(JSON.stringify(object));
  },
  getIntRandom() {
    return Math.ceil(Math.random() * 10);
  },
  // 数据同步列表/listing列表 数据重构渲染
  searchField(source) {
    let arr = [];
    source.forEach((e, index) => {
      let key = Object.keys(e);
      arr.push({ id: e[key], value: key[0] });
    });
    return arr;
  },
  /**
   * 获取 el-upload 上传 header 设置
   *
   * @returns {object}
   */
  getElUploadHeader() {
    return { Authorization: sessionStorage.getItem("token") };
  }
};

export default commonFn;
