/**
 * fade motion component
 *
 * @prop speed - 淡出速度
 * @prop opacity - 使用 css 定义的 opacity 淡入淡出
 */

import motionMixin from '../../mixin/motion'

export default {
  name: 'MotionFade',

  mixins: [motionMixin],

  props: {
    opacity: {
      tyep: Boolean,
      default: false
    }
  },

  computed: {
    transition() {
      return `opacity ${this.transitionTime} ease-out`
    }
  },

  methods: {
    beforeEnter({
      code
    } = {}) {
      this.$emit('beforeEnter')

      let el = this.$el

      Object.assign(el.style, {
        transition: this.transition,
        opacity: 0
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          code === this.code && (el.style.display = '')

          return resolve()
        }, 78)
      })
    },

    entering() {
      let el = this.$el

      this.$emit('entering')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          Object.assign(el.style, {
            opacity: this.opacity ? '' : 1
          })

          setTimeout(() => {
            return resolve()
          }, this.time)
        }, 10)
      })
    },

    afterEnter() {
      let el = this.$el

      Object.assign(el.style, {
        transition: '',
        opacity: ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        transition: this.transition
      })

      if (!this.opacity) {
        el.style.opacity = 1
      }

      return this.leaveing()
    },

    leaveing({
      code
    } = {}) {
      let el = this.$el

      this.$emit('leaving')

      Object.assign(el.style, {
        opacity: 0
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          code === this.code && (el.style.display = 'none')

          return resolve()
        }, this.time)
      })
    },

    afterLeave() {
      let el = this.$el

      Object.assign(el.style, {
        transition: '',
        opacity: ''
      })

      return this.$emit('afterLeave')
    }
  },

  render(h) {
    return h('transition', this.$slots.default)
  },

  mounted() {
    if (!this.display) {
      this.$el.style.display = 'none'
    }
  }
}
