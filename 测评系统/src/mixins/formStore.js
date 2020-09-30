import SkySuffix from '@/components/formComponents/SkySuffix.vue'
const formStore = {
  components: {
    SkySuffix
  },
  props: {
    value: [String, Number, Boolean, Object, Array],
    delay: Boolean
  },
  data() {
    return {
      selfData: this.value
    }
  },
  watch: {
    value: {
      handler(val, oldval) {
        this.selfData = val
      },
      immediate: true
    }
  },
  methods: {
    change(val) {
      this.selfData = val;
      !this.delay && this.setVal()
      this.$emit('change', val)
    },
    setVal() {
      this.$emit('input', this.selfData)
    },
    getVal() {
      this.selfData = this.value
    },
  },
  mounted() { }
}
export default formStore
