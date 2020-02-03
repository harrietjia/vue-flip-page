export default {
  props: {
    item: Object,
    index: Number,
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      default: 0
    },
    active: { // 翻动效果生效
      type: Boolean,
      default: false
    },
    styles: {
      type: Array,
      default: () => [{}, {}, {}, {}, {}, {}]
    }
  },
  data() {
    return {};
  },
  mounted() {
  },
  computed: {
    clipSize() {
      return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2), 2);
    }
  }
};
