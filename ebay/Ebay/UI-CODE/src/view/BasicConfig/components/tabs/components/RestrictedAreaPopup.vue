<template>
  <div class="restricted-area-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="75%"
      top="3%"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="area">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="domestic">
            <div class="title">国内:</div>
            <el-checkbox
              v-for="(item,index) in unavailableLocation.Domestic_Location"
              :label="item.value"
              :key="item.name"
              v-model="item.select"
              @change="handleCheckedDomesticChange(item,index,$event)"
            ></el-checkbox>
          </div>
          <div class="foreign">
            <div class="title">国外:</div>
            <div class="container">
              <div
                v-for="(area,index) in form.foreign"
                :key="area.id"
                class="region"
                :style="area.showCountry ? '  height: 150px;':'height: 30px'"
              >
                <h4>
                  <el-checkbox
                    :label="area.totalArea"
                    v-model="area.isSelectAll"
                    @change="handleCheckedForeignChangeAll(area,index,$event)"
                  ></el-checkbox>
                  <el-button type="text" @click="showCountry(area)">（{{area.changeTitle}}所有国家）</el-button>
                </h4>

                <ul class="margin-l10 control">
                  <li v-for="(aims,aimsIndex) in area.child" :key="aimsIndex">
                    <el-checkbox
                      :label="aims.name"
                      v-model="aims.select"
                      @change="handleCheckedForeignChange(area,aims,aimsIndex,$event)"
                    >{{aims.name}}</el-checkbox>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="other">
            <div class="title">其他:</div>
            <el-checkbox
              v-for="(item,index) in unavailableLocation.Additional_Locations"
              :label="item.value"
              :key="item.name"
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
                type="info"
                @close="handleCloseTags(tag)"
              >{{tag.name}}</el-tag>
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
    },
    unavailableLocation: {
      type: Object
    },
    unavailableShippingLocation: {
      type: Array
    }
  },
  data() {
    return {
      showModule: this.showAreaDialog,
      form: {
        foreign: [],
        tags: []
      },
      copyLocation: []
    };
  },
  created() {
    for (const key in this.unavailableLocation.Worldwide) {
      if (this.unavailableLocation.Worldwide.hasOwnProperty(key)) {
        const item = this.unavailableLocation.Worldwide[key];

        switch (key) {
          case "South_America":
            this.form.foreign.push({
              totalArea: "南美洲",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
          case "Africa":
            this.form.foreign.push({
              totalArea: "非洲",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
          case "Asia":
            this.form.foreign.push({
              totalArea: "亚洲",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
          case "Central_America_and_Caribbean":
            this.form.foreign.push({
              totalArea: "中美洲和加勒比海",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
          case "Europe":
            this.form.foreign.push({
              totalArea: "欧洲",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
          case "Middle_East":
            this.form.foreign.push({
              totalArea: "中东",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
          case "North_America":
            this.form.foreign.push({
              totalArea: "北美",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
          case "Oceania":
            this.form.foreign.push({
              totalArea: "大洋洲",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
          case "Southeast_Asia":
            this.form.foreign.push({
              totalArea: "东南亚",
              showCountry: true, // 显示隐藏国家
              isSelectAll: false,
              changeTitle: "隐藏", // 显示隐藏国家按钮
              child: this.unavailableLocation.Worldwide[key]
            });
            break;
        }
      }
    }
    if (!this.recordCurrent.noShipping) {
      // 编辑  => 不运送地区数组赋值
      if (this.unavailableShippingLocation) {
        this.copyLocation = _g.getJsonParse(this.unavailableShippingLocation);
        this.unavailableShippingLocation.forEach(location => {
          //   // 国内
          if (this.unavailableLocation.Domestic_Location) {
            this.traverseTheCountry(
              this.unavailableLocation.Domestic_Location,
              location
            );
          }
          //   // 国际
          this.form.foreign.forEach(country => {
            country.child.forEach(item => {
              if (item.value == location) {
                item.select = true;
                country.isSelectAll = true;
                // this.form.tags.push({
                //   name: item.name,
                //   select: item.select,
                //   value: item.value
                // });
              }
            });
          });

          //   // 其他
          this.traverseTheCountry(
            this.unavailableLocation.Additional_Locations,
            location
          );
        });
      }

      // this.form.tags = [];
      //   // 本地数据已选后退出再次进入的套用
      this.form.foreign.forEach(country => {
        country.child.forEach(item => {
          if (item.select) {
            country.isSelectAll = true;
            this.form.tags.push({
              name: item.name,
              select: item.select,
              value: item.value
            });
          }
        });
        let countryAll = country.child.filter(item => item.select == true);
        if (countryAll.length == country.child.length) {
          country.isSelectAll = true;
        }
      });
      this.unavailableLocation.Additional_Locations.forEach(country => {
        if (country.select) {
          this.form.tags.push({
            name: country.name,
            select: country.select,
            value: country.value
          });
        }
      });
      this.unavailableLocation.Domestic_Location.forEach(country => {
        if (country.select) {
          this.form.tags.push({
            name: country.name,
            select: country.select,
            value: country.value
          });
        }
      });
    } else {
      let noShipping = this.recordCurrent.noShipping.split("|");
      this.copyLocation = _g.getJsonParse(noShipping);
      noShipping.forEach(location => {
        //   // 国内
        if (this.unavailableLocation.Domestic_Location) {
          this.traverseTheCountry(
            this.unavailableLocation.Domestic_Location,
            location
          );
        }
        //   // 国际
        this.form.foreign.forEach(country => {
          country.child.forEach(item => {
            if (item.value == location) {
              item.select = true;
              country.isSelectAll = true;
              // this.form.tags.push({
              //   name: item.name,
              //   select: item.select,
              //   value: item.value
              // });
            }
          });
        });

        //   // 其他
        this.traverseTheCountry(
          this.unavailableLocation.Additional_Locations,
          location
        );
      });
      // this.form.tags = [];
      //   // 本地数据已选后退出再次进入的套用
      this.form.foreign.forEach(country => {
        country.child.forEach(item => {
          if (item.select) {
            country.isSelectAll = true;
            this.form.tags.push({
              name: item.name,
              select: item.select,
              value: item.value
            });
          }
        });
        let countryAll = country.child.filter(item => item.select == true);
        if (countryAll.length == country.child.length) {
          country.isSelectAll = true;
        }
      });
      this.unavailableLocation.Additional_Locations.forEach(country => {
        if (country.select) {
          this.form.tags.push({
            name: country.name,
            select: country.select,
            value: country.value
          });
        }
      });
      this.unavailableLocation.Domestic_Location.forEach(country => {
        if (country.select) {
          this.form.tags.push({
            name: country.name,
            select: country.select,
            value: country.value
          });
        }
      });
    }
  },
  methods: {
    traverseTheCountry(area, have) {
      area.forEach(country => {
        let list = [];
        list.push(country.value);
        if (list.indexOf(have) !== -1) {
          country.select = true;
        }
        // if (country.name == have) {
        //   country.select = true;
        //   // this.form.tags.push({
        //   //   name: country.name,
        //   //   select: country.select,
        //   //   value: country.value
        //   // });
        // }
      });
    },
    // 删除指定tags
    handleCloseTags(item) {
      let index = this.form.tags.indexOf(item);
      if (index !== -1) {
        this.form.tags.splice(index, 1);
      }
      this.form.foreign.forEach(location => {
        location.child.forEach(country => {
          if (country.name == item.name) {
            country.select = false;
          }
          let afterFiltering = location.child.filter(
            item => item.select == false
          );

          if (afterFiltering.length == location.child.length) {
            location.isSelectAll = false;
          } else {
            location.isSelectAll = true;
          }
        });
      });
    },

    // 国内改变
    handleCheckedDomesticChange(item, index, e) {
      item.select = e;
      if (item.select) {
        this.form.tags.push({
          name: item.name,
          select: item.select,
          value: item.value
        });
        return;
      } else {
        this.findIndexDel(item);
      }
    },
    findIndexDel(item) {
      let direction = this.form.tags.indexOf(item);
      if (direction == -1) {
        this.form.tags.splice(
          this.form.tags.findIndex(tag => tag.name === item.name),
          1
        );
      }
    },
    // 国外全选变化
    handleCheckedForeignChangeAll(item, index, e) {
      this.$set(item, "isSelectAll", e);
      if (item.isSelectAll) {
        item.child.forEach(country => {
          this.$set(country, "select", e);
          this.form.tags.push({
            value: country.value,
            name: country.name,
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
          value: aims.value,
          name: aims.name,
          select: aims.select
        });
      } else {
        this.findIndexDel(aims);
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
          name: item.name,
          select: item.select,
          value: item.value
        });
      } else {
        this.findIndexDel(item);
      }
    },
    handleClose(val) {
      if (!val) {
        this.form.foreign.forEach(country => {
          country.isSelectAll = false;
          country.child.forEach(item => {
            this.copyLocation.forEach(location => {
              if (location == item.value) {
                item.select = true;
              } else {
                item.select = false;
              }
            });
          });
        });
        this.unavailableLocation.Additional_Locations.forEach(country => {
          country.select = false;
        });
        this.unavailableLocation.Domestic_Location.forEach(country => {
          country.select = false;
        });
        // this.form.tags = [];
        this.$emit("on-open-sesion", this.form.tags);

        return;
      }
      if (this.form.tags.length) {
        this.$emit("on-open-sesion", this.form.tags);
      } else {
        this.$message({
          message: " 请选择至少一个不运送地区",
          type: "warning"
        });
        return;
      }
    },
    // 取消全部tags选择
    cancelAllTags() {
      this.form.tags = [];

      this.form.foreign.forEach(region => {
        region.isSelectAll = false;
        region.child.forEach(area => {
          area.select = false;
        });
      });
      this.unavailableLocation.Domestic_Location.forEach(region => {
        region.select = false;
      });
      this.unavailableLocation.Additional_Locations.forEach(region => {
        region.select = false;
      });
    },
    //   显示隐藏国家按钮
    showCountry(area) {
      area.showCountry = !area.showCountry;
      area.showCountry
        ? (area.changeTitle = "隐藏")
        : (area.changeTitle = "显示");
      this.$forceUpdate();
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