/**
 * fold(折叠) motion component
 *
 * @prop height - 被过渡的元素高度
 *
 */

import {
  addClass,
  delClass
} from '../../util/dom/attr'

import {
  prop as elementProp
} from '../../util/dom/prop'

import baseMixin from '../../mixin/base'
import motionMixin from '../../mixin/motion'

export default {
  name: 'MotionFold',

  mixins: [baseMixin, motionMixin],

  props: {
    height: Number
  },

  data() {
    this.moving = false // 是否正在执行过渡动画

    return {
      motionHeight: 0
    }
  },

  computed: {
    transition() {
      return `height ${this.transitionTime} ease-out`
    }
  },

  watch: {
    height(val) {
      return this.setHeight(val)
    }
  },

  methods: {
    _setDataOpt() {
      this.motionHeight = this.height
    },

    _initComp() {
      if (this.height === undefined) {
        this.motionHeight = elementProp(this.$el).offsetHeight
      }
    },

    /**
     * 设置高度
     *
     * @param { Number }
     */
    setHeight(height) {
      this.motionHeight = height
    },

    beforeEnter({
      code
    } = {}) {
      this.$emit('beforeEnter')
      let el = this.$el

      Object.assign(el.style, {
        height: 0,
        overflow: 'hidden',
        transition: this.transition
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          code === this.code && (el.style.display = '')

          return resolve()
        }, 218)
      })
    },

    entering() {
      let el = this.$el
      // HACK: trigger browser reflow
      let height = el.offsetHeight

      el.style.height = `${this.motionHeight}px`

      this.$emit('entering')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve()
        }, this.time)
      })
    },

    afterEnter() {
      let el = this.$el

      Object.assign(el.style, {
        height: '',
        overflow: '',
        transition: ''
      })

      this.$emit('afterEnter')
    },

    beforeLeave() {
      let el = this.$el

      this.$emit('beforeLeave')

      Object.assign(el.style, {
        height: `${this.motionHeight}px`,
        overflow: 'hidden',
        transition: this.transition
      })

      return this.leaveing()
    },

    leaveing({
      code
    } = {}) {
      let el = this.$el
      let height = el.offsetHeight

      this.$emit('leaving')

      Object.assign(el.style, {
        height: 0
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
        height: '',
        overflow: ''
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
