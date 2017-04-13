/**
 * row 组件
 *
 * @props align - 定义了列在行上垂直方向上的对齐方式，对应 flex 的 align-items 属性
 *    可选值[start, end, center]
 * @props gap - 每列的间隔是多少（px）-- 草案
 * @props justify - 定义了列在行上的水平空间的对齐方式，对应 flex 的 justify-content 属性
 *    可选值[start, end, center, justify]
 * @props wrap - 定义列的换行模式，对应 flex 的 flex-wrap 属性（nowrap | wrap）
 * @props type - 布局类型
 *
 */

import './row.scss'
import render from './row.render.js'
import baseMixin from '../../../../mixin/base'

const layoutType = ['grid', 'flex', 'flow']

export default {
  name: 'row',

  mixins: [baseMixin],

  render,

  props: {
    align: {
      type: String,
      default: 'center'
    },

    gap: {
      type: Number,
      default: 0
    },

    justify: {
      type: String,
      default: 'space-between'
    },

    wrap: {
      type: String,
      default: 'wrap'
    },

    type: {
      type: String,
      default: 'flow'
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-row`
    },
    compClass() {
      let compClass = this.xclass([
        `align-${this.align}`,
        `justify-${this.justify}`,
        this.wrap
      ])

      return [compClass, this.cPrefix]
    }
  }
}
