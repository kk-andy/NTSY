export default {
  props: {
    condition: {
      required: false
    }
  },
  watch: {
    condition: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.chart && this.$refs.chart.initCharts()
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {}
}
