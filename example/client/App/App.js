import './App.scss'
import template from './App.pug'

import store from '../vuex/store'
import commonStore from '../vuex/module/common/type.json'

import LayoutHeader from 'ex/client/component/layout/LayoutHeader/LayoutHeader'
import LayoutFooter from 'ex/client/component/layout/LayoutFooter/LayoutFooter'

require('file-loader?name=favicon.ico!src/asset/img/favicon.ico')

export default {
  name: 'app',

  store,

  data() {
    return {
      contentHeight: 0
    }
  },

  template: template(),

  components: {
    'header-layout': LayoutHeader,
    'footer-layout': LayoutFooter
  },

  computed: {
    windowProps() {
      return this.$store.getters[commonStore.window.get]
    },

    appStyle() {
      if (this.contentHeight === 0) {
        return {}
      }

      return {
        height: `${this.contentHeight}px`
      }
    }
  },

  watch: {
    'windowProps' (val) {
      let bodyHeight = document.body.offsetHeight

      this.contentHeight = val.innerHeight - this.$refs.header.$el.offsetHeight - this.$refs.footer.$el.offsetHeight
    }
  },

  mounted() {
    this.$store.dispatch(commonStore.window.add, {
      prop: 'innerHeight',
      value: window.innerHeight
    })

    this.$store.dispatch(commonStore.appContent.add, this.$refs.appContent)
  }
}
