/**
 * btn 组件
 *
 * @props ban - 禁止点击
 * @props flag - 按钮标识
 * @props kind - 按钮种类
 * @props link - 链接地址
 * @props size - 按钮大小
 * @props submit - 提交按钮
 * @props type - 按钮类型 (button | link)
 * @props value - 按钮名字
 * @props textDisplay - 是否显示按钮文字
 *
 * @events click - 点击btn事件
 */

import './btn.scss'

import loadingComp from 'src/component/base/loading/loading'
import render from './btn.render'
import baseMixin from 'src/mixin/base'
import formMixin from 'src/mixin/form'

const BTN_TYPE_LINK = 'link'
const BTN_TYPE_BUTTON = 'button'

const SIZE_S = 'S'
const SIZE_M = 'M'
const SIZE_L = 'L'

const btnComp = {
  name: 'btn',

  mixins: [baseMixin, formMixin],

  render,

  components: {
    loading: loadingComp
  },

  props: {
    ban: {
      type: Boolean,
      default: false
    },

    flag: {
      type: String,
      require: false
    },

    link: Object,

    kind: {
      type: String,
      default: 'primary'
    },

    type: {
      type: String,
      default: BTN_TYPE_BUTTON
    },

    value: {
      type: String,
      require: true
    },

    size: {
      type: String,
      default: SIZE_S
    },

    submit: {
      type: Boolean,
      require: false
    },

    textDisplay: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // 按钮的禁用状态
      banState: false,
      // 按钮值显示状态
      btnValueDisplay: false,
      // 是否已经创建了按钮的 loading 组件
      createdLoading: false
    }
  },

  watch: {
    ban(val) {
      this.banState = val
    }
  },

  methods: {
    _setDataOpt() {
      this.banState = this.ban
    },

    /**
     * 点击按钮
     * @return {Object} this - 组件
     */
    click() {
      return this.$emit('click')
    },

    /**
     * 将按钮变为只读操作
     */
    banBtn() {
      this.banState = true
    },

    /**
     * 取消按钮只读状态
     */
    allowBtn() {
      this.banState = false
    },

    /**
     * 开启按钮等待功能
     */
    openLoading() {
      if (!this.createdLoading) {
        this.createdLoading = true
        this.banBtn()
      }

      this.$nextTick(() => {
        this.$refs.loading.show()
      })
    },

    /**
     * 关闭按钮等待功能
     */
    classLoading(state) {
      this.allowBtn()
      this.$refs.loading.hide()
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-btn`
    },

    btnClass() {
      if (!this.kind) {
        return false
      }

      return `ele-${this.kind}`
    },

    sizeClass() {
      return `ele-${this.size.toLowerCase()}`
    },

    isLink() {
      return !this.btnValueDisplay && this.type === BTN_TYPE_LINK
    },

    isButton() {
      return !this.btnValueDisplay && this.type === BTN_TYPE_BUTTON
    }
  }
}

export default btnComp