/**
 * slide transition component - 滑动过度效果
 *
 * @prop offset - 元素滑动的偏移值,
 *                direction 为 south：实例顶部距离实例的 offsetParent 的顶部的偏移值
 *                direction 为 north：实例低部距离实例的 offsetParent 的低部的偏移值
 *                direction 为 west：实例右边距离实例的 offsetParent 的右边的偏移值
 *                direction 为 east：实例左边距离实例的 offsetParent 的左边的偏移值
 * @prop direction - 滑动方向(north | east | west | south)
 * @prop global - 元素的位置是否是以可视界面的相对定位 (fixed)，默认为否（绝对定位 absolute）
 * @prop speed - 淡出速度
 */

import baseMixin from '../../mixin/transition'

export default {
  name: 'slide-transition',

  mixins: [baseMixin],

  props: {
    direction: {
      type: String,
      default: 'south'
    },
    global: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      transiting: false,
      isEnter: false,
      isLeaving: false,
      slideOffset: {}
    }
  },

  computed: {
    translate() {
      return this._getTranslate()
    },
    transition() {
      return `transform ${this.transitionTime} ease-out`
    },
    positionType() {
      return this.global ? 'fixed' : 'absolute'
    }
  },

  methods: {
    /**
     *
     * @param {Object} opt -
     *                      {Number} top
     *                      {Number} left
     * @return {String} - 过渡的样式声明
     *
     */
    _getTranslate() {
      switch (this.direction) {
        case 'south':
          return `translateY(calc(-100% - ${this.slideOffset}px))`
        case 'north':
          return `translateY(calc(100% + ${this.slideOffset}px))`
        case 'east':
          return `translateX(calc(-100% - ${this.slideOffset}px))`
        case 'west':
          return `translateX(calc(100% + ${this.slideOffset}px))`
        default:
          return `translateY(calc(-100% - ${this.slideOffset}px))`
      }
    },

    /**
     * 设置 offset 属性
     */
    setOffset(value) {
      this.slideOffset = value

      return this
    },

    beforeEnter() {
      this.$emit('beforeEnter')

      let el = this.$el

      Object.assign(el.style, {
        'position': this.positionType,
        'transition': this.transition,
        'transform': this._getTranslate()
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          el.style.display = ''

          return resolve()
        })
      })
    },

    entering() {
      let el = this.$el
      // HACK: trigger browser reflow
      let height = el.offsetHeight

      this.$emit('entering')

      Object.assign(el.style, {
        'transform': ''
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterEnter() {
      let el = this.$el

      Object.assign(el.style, {
        'position': '',
        'transition': ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      return Object.assign(el.style, {
        'position': this.positionType,
        'transition': this.transition,
        'transform': ''
      })
    },

    leaveing() {
      let el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        'transform': this.translate
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          el.style.display = 'none'

          return resolve()
        }, this.time)
      })
    },

    afterLeave() {
      let el = this.$el

      Object.assign(el.style, {
        'position': '',
        'transition': '',
        'transform': ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  },

  created() {
    this.slideOffset = this.offset
  },

  mounted() {
    if (!this.display) {
      this.$el.style.display = 'none'
    }
  }
}
