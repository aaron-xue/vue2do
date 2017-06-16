/*
 * check - 多选框组件
 *
 * @prop initVal - 初始化时选中的值，默认为第一项， 是checkbox 則為數組
 * @prop queryName - 参数名
 * @prop initOpt - 复选框数据
 * @prop readOnly - 只读
 * @prop required - 是否必选
 * @prop theme - 主题
 * @prop type - input 的 type(radio | checkbox)
 *
 * @prop errorMessage - checkbox 没选的时候显示的错误信息
 * @prop valName - 指定读取 checkboxItems 的 value 值的 key 的名字
 * @prop txtName - 指定读取 checkboxItems 的 text 值的 key 的名字
 * @prop remote - 不为空则是远程下载的 url 地址，并且数据是从远程下载
 *
 * @prop beforeCheck - 选择之前的回调函数
 * @prop success - 选择成功的回调函数
 *
 * @prop checkAll - 全选 checkbox 的选项
 *
 */

import './check.scss'

import Vue from 'vue'
import render from './check.render'
import compEvent from '../../../config/event.json'

import iconComp from '../../base/icon/icon'
import checkComp from '../../base/check/check'
import tip from '../../base/message/tip'

import baseMixin from '../../../mixin/base'
import formMixin from '../../../mixin/form'

import { isEmpty as isEmptyArray } from '../../../util/data/array'

const TYPE_RADIO = 'radio'
const TYPE_CHECKBOX = 'checkbox'

let checkCompConfig = {
  name: 'check',

  mixins: [baseMixin, formMixin],

  render,

  components: {
    icon: iconComp,
    check: checkComp
  },

  props: {
    initOpt: {
      type: Array,
      default: () => []
    },

    inputName: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: TYPE_RADIO
    },

    readOnly: {
      type: Boolean,
      default: false
    },

    queryName: {
      type: String,
      default: ''
    },

    errorMessage: {
      type: String,
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    },

    initVal: [Number, Array],

    beforeCheck: Function,

    success: Function,

    valName: {
      type: String,
      default: 'value'
    },

    txtName: {
      type: String,
      default: 'text'
    },

    remote: String,

    checkAll: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // 组件名字
      compName: 'check',
      // 当前选择框值的游标
      currentIndex: 0,
      // check 当前 value 值
      value: {},
      // check 当前 text 值
      text: {},
      // check 的选项值
      option: [],
      // check 的旧的 value 值
      oldValue: [],
      // 组件的验证状态
      verified: true,
      dangerTip: '',
      slotItems: [],
      // 是否已经全选
      checkedAll: false
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-check`
    },
    isCheckbox() {
      return this.type === TYPE_CHECKBOX
    },
    isRadio() {
      return this.type === TYPE_RADIO
    }
  },

  watch: {
    value(val) {
      this._initCheckbox()
    },
    initVal(val) {
      this.value = val
    },
    initOpt(val) {
      this.option = val
      this._initCheckbox()
    }
  },

  methods: {
    /**
     * 设置 data 选项的默认值
     */
    _setDataOpt() {
      if (typeof this.initVal === 'object') {
        this.value = Object.assign([], this.initVal)
      } else {
        this.value = this.initVal
      }

      this.option = Object.assign([], this.initOpt)
    },

    /**
     * 初始化checkbox
     *
     * @return {Function}
     **/
    _initCheckbox() {
      if (this.isCheckbox) {
        if (!Array.isArray(this.value)) {
          this.text = []
          this.value = []
          this.oldValue = []
        }

        if (this.checkAll) {
          this.checkedAll = this.value.length === this.option.length
        }

        this.setText()
        this.verified = !this.required || this.value.length !== 0
      } else {
        if (!this.value && this.value !== 0) {
          this.value = undefined
          this.oldValue = undefined
        } else {
          this.setCurrentIndex()
          this.setText()
        }

        if (this.required) {
          this.verified = this.value !== 'undefined'
        }
      }
    },

    /**
     * 初始化checkboxItems值
     *
     * @return {Function, Object}
     **/
    _initCheckboxItems() {
      if (!this._slotContents && !(!!this.$options._content && this.$options._content.innerHTML)) {
        return false
      }

      let $checkboxSlot = {}
      let optionContent = this.$options._content ? this.$options._content.innerHTML : ''
      let $checkboxItemSlot = $(this.$el).find('.checkbox-items-slot')

      if (optionContent) {
        $checkboxSlot = $checkboxItemSlot.html(optionContent)
      } else {
        console.warn('vm.$options._content 取不到值, 需要修复，没值情况下的问题')
        $checkboxSlot = $checkboxItemSlot.html(this._slotContents.default)
      }

      let $checkEles = $checkboxSlot.find('check-ele')

      if ($checkEles.length === 0) {
        return this
      }

      let items = []
      let checkboxItemsEmpty = isEmptyArray(this.option)

      $checkEles.each((index, el) => {
        let $el = $(el)
        let val = $el.attr('value')
        let txt = ''

        val = isNaN(val) ? val : Number(val)

        if ($el[0].hasAttribute('text')) {
          txt = $el.attr('text').trim()

          // 不让生成 html 有 text 节点
          this.slotItems.push($el.html().trim())
        } else {
          txt = $el.text().trim()
        }

        if (checkboxItemsEmpty) {
          items.push({
            value: val,
            text: txt
          })
        }
      })

      $checkboxItemSlot.html('')
      checkboxItemsEmpty && this.$set('checkboxItems', items)

      this.$nextTick(() => {
        this._initCheckboxSlot()
      })

      return this
    },

    /**
     * 初始化checkboxItems 里面的 slot
     */
    _initCheckboxSlot() {
      if (this.slotItems.length === 0) {
        return false
      }

      if (typeof this.compileVm === 'undefined') {
        this.compileVm = this.$parent
      }

      $(this.$el).find(`.${this.cPrefix}-opt-slot .item`).each((index, el) => {
        if (this.slotItems[index]) {
          let $el = $(el)
          let dom = document.createElement('div')

          dom.innerHTML = this.slotItems[index]
          this.compileVm.$compile(dom)
          el.appendChild(dom.firstChild)
        }
      })
    },

    /**
     * 删除或者增加复选 checkbox 的 value 值
     *
     * @param {String, Number} - checkbox 的值
     */
    _changeCheckbox(val) {
      let hasDelflag = false

      this.value.every((item, index) => {
        if (val === item) {
          hasDelflag = true
          this.value.splice(index, 1)

          return false
        }

        return true
      })

      if (hasDelflag) {
        return this
      }

      return this.value.push(val)
    },

    /**
     * checkbox的icon的样式
     *
     * @param { String } - checkbox当前值
     * @return { Function, Object }
     **/
    iconName(val) {
      if (this.isRadio) {
        return this.value === val ? 'circle-check-o' : 'circle-o'
      } else if (this.isCheckbox && Array.isArray(this.value)) {
        return this.value.indexOf(val) !== -1 ? 'square-check-o' : 'square-o'
      }
    },

    /**
     * 选择 checkbox
     */
    check(evt) {
      let index = evt.currentTarget.getAttribute('z-data-index')
      let val = this.option[parseInt(index, 10)].value

      if (this.beforeCheck && this.beforeCheck.call(null, this) === false) {
        return false
      }

      if (this.isCheckbox) {
        this.oldValue = []

        this.value.forEach((item) => {
          this.oldValue.push(item)
        })

        this._changeCheckbox(val)
      } else {
        this.oldValue = this.value

        this.value = val
      }

      this.$nextTick(() => {
        this.success && this.success.call(null, this)
      })
    },

    /**
     * 获取 checkboxItems 数据
     * @return {Object} this - 组件
     */
    fetch(cb) {
      let _self = this

      $.ajax({
        type: typeof this.ajaxType === 'undefined' ? 'get' : this.ajaxType,
        url: this.remote,
        success(rtn) {
          if (rtn.code === 0) {
            cb && cb(rtn)
          } else {
            console.warn('复 / 单选框获取远程数据失败')
          }
        }
      })
    },

    /**
     * 设置checkbox的text值
     *
     * @return {Function, String}
     **/
    setText() {
      if (this.isRadio) {
        this.text = this.option[this.currentIndex][this.txtName]

        return this
      } else {
        if (!Array.isArray(this.value)) {
          return false
        }

        this.text = []

        return this.value.forEach((item) => {
          this.option.forEach((ele) => {
            if (item === ele[this.valName]) {
              this.text.push(item)
            }
          })
        })
      }
    },

    /**
     * 设置 currentIndex
     *
     * @return {Function, Object}
     **/
    setCurrentIndex() {
      if (this.isRadio) {
        return this.option.forEach((item, index) => {
          if (item[this.valName] === this.value) {
            this.currentIndex = index
          }
        })
      }

      return this
    },

    /**
     * 验证数据格式
     *
     * @return {Object} - this - 组件
     */
    verify() {
      this.dangerTip = `请选择${this.errorMessage}${this.errorMessage ? '的' : ''}${this.isRadio ? '单选框' : '复选框'}!`

      return this.verified
    },

    /**
     * 验证数据格式并且弹出错误
     *
     * @return {Object} - this - 组件
     */
    validate() {
      this.verify()

      if (!this.verified) {
        tip(this.dangerTip)

        return false
      }

      return this
    },

    /**
     * 全选复选框
     *
     * @return {Object} - this - 组件
     */
    checkAllOption() {
      if (!this.selectAllVal) {
        let value = []

        this.option.forEach((item) => {
          value.push(item[this.valName])
        })

        this.value = value
        this.selectAllVal = value
      }

      if (this.checkedAll) {
        this.value = []
      } else {
        this.value = this.selectAllVal
      }

      this.checkedAll = !this.checkedAll
    }
  },

  created() {
    if (this.remote) {
      this.fetch((rtn) => {
        this.option = rtn.data

        this._initCheckboxItems()
        this._initCheckbox()
      })
    } else {
      this._initCheckboxItems()
      this._initCheckbox()
    }
  }
}

export default checkCompConfig
