import './input.scss'
import pug from './input.pug'
import mixin from '../../mixin'

export default {
  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    _init() {

    }
  }
}
