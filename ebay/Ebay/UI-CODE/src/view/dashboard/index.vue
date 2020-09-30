<template>
  <div class="dashboard-container">
    <chart height="100%" width="100%" />
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Chart from "@/components/Charts/Keyboard";
import { Test } from '@/api/ListOfSelections'
export default {
  name: "Dashboard",
  components: { Chart },
  data() {
    return {
      sku: []
    };
  },
  created() {
    // this.Test()
    this.getNotice();
  },
  methods: {
    getNotice() {
      this.$axios
        .get("/listing/sku/change/notice", {
          headers: { Authorization: "token" }
        })
        .then(res => {
          this.sku = res.data.list;
          this.sku.forEach((sku, index) => {
            this.$set(sku, "id", index);
            // sessionStorage.setItem(`sku${sku.id}`, sku.product_sku);

            setTimeout(() => {
              this.open(sku);
            }, 50);
          });
        });
    },
    // Test() {
    //   Test({ num: 1 }).then(res => {
    //     console.log(res)
    //   })
    // },
    open(sku) {
      let that = this;
      this.$notify({
        title: "通知:",
        dangerouslyUseHTMLString: true,
        type: "warning",
        message: `<a>SKU：${sku.product_sku}资料发生变更，请前往【在线SKU变更列表】查看处理</a>`,
        onClick() {
          that.$router.push({
            path: "/listingManagement/onlineSKUchangeList",
            query: {
              id: sku.product_sku
            }
          });
          this.close();
        },
        onClose() {
          let formdata = new FormData();
          formdata.append("product_sku", sku.product_sku);
          that.$axios.post("/listing/sku/change/notice/close", formdata, {
            headers: { Authorization: "token" }
          });
          // sessionStorage.removeItem(`sku${sku.id}`);
        },
        duration: 0
      });
    }
  }
};
</script>





<style >
.dashboard-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.app-wrapper .main-container {
  padding: 0 !important;
}
</style>