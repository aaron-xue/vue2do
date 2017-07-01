/**
 * transition 组件的 mixin
 *
 * @prop speed - 动画速度
 *
 * @event beforeEnter - 进来过渡之前
 * @event enter - 进来过渡期间
 * @event afterEnter - 进来过渡完成
 * @event beforeLeave - 离开过渡之前
 * @event leave - 离开过渡期间
 * @event afterLeave - 离开过渡之后
 */

export default {
  props: {
    speed: {
      type: [Number, String],
      default: 'normal'
    }
  },

  computed: {
    time() {
      switch (this.speed) {
        case 'normal':
          return 300
        case 'fast':
          return 150
        case 'slow':
          return 450
        default:
          return 300
      }
    },
    transitionTime() {
      return this.time + 'ms'
    }
  },

  methods: {
    async enter() {
      this.transiting = this.isEntering = true

      await this.beforeEnter()
      await this.entering()
      await this.afterEnter()

      this.transiting = this.isEntering = false

      return new Promise((resolve, reject) => {
        return resolve()
      })
    },

    async leave() {
      this.transiting = this.isEntering = true

      await this.beforeLeave()
      await this.leaveing()
      await this.afterLeave()

      this.transiting = this.isEntering = false

      return new Promise((resolve, reject) => {
        return resolve()
      })
    }
  }
}