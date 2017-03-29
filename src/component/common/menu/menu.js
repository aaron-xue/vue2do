/**
 * menu 组件
 *
 * @props animate - 菜单显示动画
 * @props initOpt - 菜单的数据
 * @props kind - 菜单的种类
 * @props trigger - 2，3 级菜单的触发模式
 * @props type - 布局类型
 * @props spreadAll - 打开全部一级菜单
 * @props title - 菜单标题
 *
 * @events hide - 隐藏 menu
 */

import './menu.scss'
import render from './menu.render.js'
import baseMixin from 'src/mixin/base'
import {
  foldComp,
  foldTitleComp,
  foldContentComp
} from 'src/component/base/fold/fold'
import foldTransition from 'src/component/transition/fold'
import iconComp from 'src/component/base/icon/icon'
import rowComp from 'src/component/common/layout/row/row'
import colComp from 'src/component/common/layout/col/col'

const layoutType = ['grid', 'flex', 'flow']

export default {
  name: 'menu',

  mixins: [baseMixin],

  render,

  components: {
    'fold': foldComp,
    'fold-title': foldTitleComp,
    'fold-content': foldContentComp,
    'fold-transition': foldTransition,
    row: rowComp,
    column: colComp,
    icon: iconComp
  },

  props: {
    animate: {
      type: String,
      default: 'horizontal'
    },

    initOpt: Array,

    gap: {
      type: Number,
      default: 0
    },

    kind: {
      type: String,
      default: 'center'
    },

    wrap: {
      type: String,
      default: 'wrap'
    },

    spreadAll: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'horizontal'
    },

    trigger: {
      type: String,
      default: 'no'
    },

    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isStageActive: false
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-menu`
    }
  },

  watch: {
    deviceSize(val) {
      this.changeByDeviceSize(val)
    }
  },

  methods: {
    show() {
      this.isStageActive = true
      this.$emit('show')
    },

    hide() {
      this.isStageActive = false
      this.$emit('hide')
    },

    toggle() {
      this.isStageActive = !this.isStageActive
    },

    changeByDeviceSize(size) {
      if (size === '<xl') {
        this.show()
      } else {
        this.hide()
      }
    }
  },

  mounted() {
    this.$nextTick(() => [
      this.changeByDeviceSize(this.deviceSize)
    ])
  }
}
