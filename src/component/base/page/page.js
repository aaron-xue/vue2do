/**
 * page 组件
 *
 * @props auto -自动计算分页数据（data 选项需要传入数据的长度 length 和每页的数据数目 size）
 * @props display - 显示分页控件
 * @props data - 分页数据
 *             length - 一共有几条数据
 *             total - 一共有多少页
 *             size - 每页几条数据
 *             current - 当前的页码
 * @props onePageDisplay - 分页总页数为 1 时是否显示
 * @props size - 分页外观尺寸大小（s | m | l）
 * @props type - 分页类型（加载更多：more | 数字标注（默认）：num）
 * @props loadMoreText - 加载更多的提示文字
 *
 * @events switch - 换页触发事件
 *
 * @slots loadMore - 分页类型为加载更多时的，在按钮处的内容分发
 *
 */

import './page.scss'

import btnComp from 'src/component/base/btn/btn'
import iconComp from 'src/component/base/icon/icon'
import inputComp from 'src/component/base/input/input'
import rowComp from 'src/component/common/layout/row/row'
import columnComp from 'src/component/common/layout/col/col'
import baseMixin from 'src/mixin/base'
import render from './page.render'

const pageComp = {
  name: 'page',

  render,

  mixins: [baseMixin],

  components: {
    btn: btnComp,
    icon: iconComp,
    row: rowComp,
    column: columnComp,
    'input-box': inputComp
  },

  props: {
    auto: {
      type: Boolean,
      required: false
    },

    data: {
      type: Object,
      required: true
    },

    display: {
      type: Boolean,
      default: true
    },

    loadMoreText: {
      type: String,
      default: '点击加载更多'
    },

    onePageDisplay: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 'm'
    },

    type: {
      type: String,
      default: 'num'
    }
  },

  data() {
    return {
      // 分页数据
      pageData: {},
      // 分页的数字按钮
      pageItem: []
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-page`
    },

    moreDisplay() {
      return this.type === 'more'
    },

    numDisplay() {
      return this.type === 'num'
    },

    nextDisplay() {
      if (this.pageData.current === this.pageData.total) {
        return true
      }

      return false
    },

    preDisplay() {
      if (this.pageData.current === 1) {
        return true
      }

      return false
    },

    pageDisplay() {
      return this.display && (this.onePageDisplay || this.data.total > 1)
    }
  },

  watch: {
    data(val) {
      this._initPage(Object.assign({}, val))
    }
  },

  methods: {
    /**
     * 初始化分页
     */
    _initPage(pageData) {
      if (this.auto) {
        Object.assign(pageData, {
          total: Math.ceil(pageData.length / pageData.size),
          current: 1
        })
      }

      let pageStart = 1
      let pageEnd = pageData.total
      let pageItem = []

      if (pageData.total >= 11) {
        if (pageData.current > 5 && pageData.current < pageData.total - 4) {
          pageStart = pageData.current - 5
          pageEnd = pageData.current + 4
        } else {
          if (pageData.current <= 5) {
            pageStart = 1
            pageEnd = 10
          } else {
            pageEnd = pageData.total
            pageStart = pageData.total - 9
          }
        }
      }

      while (pageStart <= pageEnd) {
        pageItem.push(pageStart)
        pageStart++
      }

      this.pageData = Object.assign(pageData, {
        item: pageItem
      })
    },

    /**
     * 加载更多
     */
    more() {
      this.next()
    },

    /**
     * @param {Number} - 当前页码
     * @return {Function}
     */
    click(evt) {
      let currentPage = parseInt(evt.currentTarget.getAttribute('data-index'), 10)

      if (currentPage === this.pageData.current) {
        return false
      }

      return this.switch(currentPage)
    },

    /**
     * 下一页
     */
    next() {
      if (this.pageData.current + 1 > this.pageData.total) {
        return false
      }

      return this.switch(this.pageData.current + 1)
    },

    /**
     * 上一页
     */
    pre() {
      if (this.pageData.current - 1 === 0) {
        return false
      }

      return this.switch(this.pageData.current - 1)
    },

    /**
     * 最后一页
     */
    end() {
      return this.switch(this.pageData.total)
    },

    /**
     * 第一页
     */
    start() {
      return this.switch(1)
    },

    /**
     * 跳转到指定页数
     */
    jump(pageNum) {
      if (isNaN(pageNum)) {
        return false
      }

      return this.switch(parseInt(pageNum, 10))
    },

    /**
     * 切换页码
     */
    switch(pageNum) {
      this.pageData.current = pageNum

      return this.$emit('switch', pageNum)
    }
  },

  created() {
    this._initPage(Object.assign({}, this.data))
  }
}

export default pageComp