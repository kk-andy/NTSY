<template>
  <div class="restricted-area-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="60%"
      top="3%"
      append-to-body
      :close-on-click-modal="false"
    >
      <div class="area">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="domestic">
            <div class="title">国内:</div>
            <el-checkbox
              :label="item.uid"
              v-for="(item,index) in form.domestic"
              :key="item.uid"
              v-model="item.select"
              @change="handleCheckedDomesticChange(item,index,$event)"
            ></el-checkbox>
          </div>
          <div class="foreign">
            <div class="title">国外:</div>
            <div class="container">
              <div
                v-for="area in form.foreign"
                :key="area.id"
                class="region"
                :style="area.showCountry ? '  height: 150px;':'height: 30px'"
              >
                <h4>
                  <el-checkbox
                    :label="area.totalArea"
                    v-model="area.isSelectAll"
                    @change="handleCheckedForeignChangeAll(area,$event)"
                  ></el-checkbox>
                  <el-button type="text" @click="showCountry(area)">（{{area.changeTitle}}所有国家）</el-button>
                </h4>

                <ul class="margin-l10 control">
                  <li v-for="(aims,aimsIndex) in area.child" :key="aimsIndex">
                    <el-checkbox
                      :label="aims.name"
                      v-model="aims.select"
                      @change="handleCheckedForeignChange(area,aims,aimsIndex,$event)"
                    >{{aims.name}}{{aimsIndex}}</el-checkbox>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="other">
            <div class="title">其他:</div>
            <el-checkbox
              :label="item.uid"
              v-for="(item,index) in form.other"
              :key="item.uid"
              v-model="item.select"
              @change="handleCheckedOtherChange(item,index,$event)"
            ></el-checkbox>
          </div>
          <div class="check-tags">
            <div class="title">
              已选中项
              <el-button type="text" @click="cancelAllTags">（取消全部）</el-button>：
            </div>
          </div>
          <el-card class="label-collection">
            <div class="tags-all">
              <el-tag
                class="tags"
                v-for="tag in form.tags"
                :key="tag.value"
                closable
                :type="tag.type"
                @close="handleCloseTags(tag)"
              >{{tag.value}}</el-tag>
            </div>
          </el-card>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RestrictedAreaPopup",
  props: {
    showAreaDialog: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showAreaDialog,
      form: {
        domestic: [],
        foreign: [],
        other: [],
        tags: []
      }
    };
  },
  created() {
    // this.form.domestic.forEach(dom => {
    //   this.$set(dom, "select", false);
    // });
    // this.form.foreign.forEach(fore => {
    //   this.$set(fore, "showCountry", false);
    //   this.$set(fore, "isSelectAll", false);
    // });
    // this.form.other.forEach(oth => {
    //   this.$set(oth, "select", false);
    // });
  },
  methods: {
    //   显示隐藏国家按钮
    showCountry(area) {
      area.showCountry = !area.showCountry;
      area.showCountry
        ? (area.changeTitle = "显示")
        : (area.changeTitle = "隐藏");
      this.$forceUpdate();
    },
    handleCloseTags(item) {
      let index = this.form.tags.indexOf(item);
      if (index !== -1) {
        this.form.tags.splice(index, 1);
      }
    },
    // 取消全部tags选择
    cancelAllTags() {
      this.form.tags = [];
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          const item = this.form[key];
        }
      }
    },
    // 国内改变
    handleCheckedDomesticChange(item, index, e) {
      item.select = e;
      if (item.select) {
        this.form.tags.push({
          value: item.value,
          type: "info",
          uid: item.uid,
          select: item.select
        });
        return;
      } else {
        this.form.tags.splice(index, 1);
      }
    },
    // 国外全选变化
    handleCheckedForeignChangeAll(item, e) {
      this.$set(item, "isSelectAll", e);
      if (item.isSelectAll) {
        item.child.forEach(country => {
          this.$set(country, "select", e);
          this.form.tags.push({
            value: country.name,
            type: "info",
            uid: country.uid,
            select: e
          });
        });
      } else {
        item.child.forEach(country => {
          country.select = false;
          this.form.tags.splice(country.uid, 1);
        });
      }
    },
    // 国外单选变化
    handleCheckedForeignChange(area, aims, index, e) {
      if (aims.select) {
        this.form.tags.push({
          value: aims.name,
          type: "info",
          uid: aims.uid,
          select: aims.select
        });
      } else {
        let a = this.form.tags.splice(index, 1);
      }
      let selectedAll = area.child.filter(item => item.select == true);
      if (selectedAll.length) {
        area.isSelectAll = true;
      } else {
        area.isSelectAll = false;
      }
    },

    // 其他单选变化
    handleCheckedOtherChange(item, index, e) {
      item.select = e;
      if (item.select) {
        this.form.tags.push({
          value: item.value,
          type: "info",
          uid: item.uid,
          select: item.select
        });
      } else {
        this.form.tags.splice(index, 1);
      }
    },
    handleClose(val) {
      this.$emit("on-open-sesion", false);
    }
  }
};
</script>


<style scoped>
.foreign .title,
.other .title,
.check-tags .title {
  margin: 10px 0;
}
.domestic .title {
  margin-bottom: 10px;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  grid-gap: 10px;
  margin: auto;
}
.container .region {
  text-align: left;
  overflow: hidden;
}
.control {
  height: 110px;
  overflow-y: auto;
  padding-bottom: 10px;
}
.label-collection {
  width: 100%;
  height: 90px;
  margin: 10px 0;
  background-color: #f9f9f9;
  overflow: hidden;
}
.tags-all {
  overflow-y: auto;
  height: 70px;
  padding-bottom: 10px;
}
.tags {
  margin: 2px 5px;
}
</style>