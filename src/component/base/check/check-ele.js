/**
 * check 组件里面的 ele 组件
 */

import baseMixin from '../../../mixin/base'

export default {
  template: `
    <div :class="[cPrefix]">
      <slot></slot>
    </div>
  `,

  mixins: [baseMixin],

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-check-ele`
    }
  }
}
