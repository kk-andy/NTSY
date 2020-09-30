<template>
  <div class="popupsBox">
    <div class="popups">
      <div class="popupsTit">
        <h3>模板预览（样式预览，未获取真实数据）</h3>
        <i class="el-icon-close" style="font-size: 20px;" @click="cancelClick"></i>
      </div>
      <!-- 描述上方 -->

      <div
        v-if="formLabelAlign.describe_above"
        class="dxm-ebay-related-marketing-description-up"
        data-rule-id
      >
        <h3>描述上方</h3>
        <div class="ebayUpTit">{{formLabelAlign.above.title}}</div>
        <div class="rowBox">
          <div
            class="goodsBox"
            v-for="(item,index) in aboveGoods"
            :key="item.amount + index"
            :style="'flex-basis:'+100 / formLabelAlign.above.col+'%'"
          >
            <img class="goodsImg" :src="item.img" alt />
            <div v-show="!formLabelAlign.above.goodsName" class="goodsTit">{{item.tit}}</div>
            <div class="amount">{{item.amount}}</div>
          </div>
        </div>
      </div>
      <!-- 描述下方 -->

      <div
        v-if="formLabelAlign.describe_below"
        class="dxm-ebay-related-marketing-description-down"
        data-rule-id
      >
        <h3>描述下方</h3>
        <div class="ebayDownTit">{{formLabelAlign.below.title}}</div>
        <div class="rowBox">
          <div
            class="goodsBox"
            v-for="(item,index) in belowGoods"
            :key="item.amount + index"
            :style="'flex-basis:'+100 / formLabelAlign.below.col+'%'"
          >
            <img class="goodsImg" :src="item.img" alt />
            <div v-show="!formLabelAlign.above.goodsName" class="goodsTit">{{item.tit}}</div>
            <div class="amount">{{item.amount}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    formLabelAlign: {
      typr: Object,
    },
  },
  data() {
    return {
      // 模拟数据
      simulationData: {
        img:
          "https://i.ebayimg.com/00/s/NzIwWDcyMA==/z/1AkAAOSwIuBd4PV0/$_37.JPG?set_id=880000500F",
        tit:
          "Under Desk Headset MountAcry licdual Headphone Hanger Stand Holder Hook UK",
        amount: "GBP 7.8",
      },
      // 描述上方数据列表
      aboveGoods: [],
      // 描述下方数据列表
      belowGoods: [],
    };
  },
  computed: {},
  mounted() {
    let that = this;
    if (that.formLabelAlign.describe_above) {
      let num =
        that.formLabelAlign.above.row * that.formLabelAlign.above.col;
      do {
        that.aboveGoods.push(that.simulationData);
        num--;
      } while (num > 0);
    }
    if (that.formLabelAlign.describe_below) {
      let num =
        that.formLabelAlign.below.row * that.formLabelAlign.below.col;
      do {
        that.belowGoods.push(that.simulationData);
        num--;
      } while (num > 0);
    }
  },
  methods: {
    cancelClick() {
      this.$emit("cancelClick");
    },
  },
};
</script>
<style scoped>
.popupsBox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popups {
  width: 70%;
  max-height: 80%;
  overflow:auto;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.popups > div {
  width: 100%;
  padding-top: 10px;
}
.popups .popupsTit {
  padding-bottom: 10px;
  padding-top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.ebayUpTit,
.ebayDownTit {
  padding: 2px 10px;
  width: 100%;
  font-size: 16px;
  color: white;
  background-color: red;
}
.rowBox {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}
.rowBox .goodsBox {
  flex-grow: 0;
  flex-shrink: 0;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0);
  box-sizing: border-box;
  color: red;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.rowBox .goodsBox:hover {
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.rowBox .goodsBox .goodsImg {
  width: 80%;
}
.rowBox .goodsBox .goodsTit {
  width: 80%;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.rowBox .goodsBox .amount {
  width: 80%;
  text-align: left;
}
</style>
