import btn from './component/base/btn/btn'
import check from './component/base/check/check'
import form from './component/base/form/form'
import input from './component/base/input/input'
import icon from './component/base/icon/icon'

import bubble from './component/base/bubble/bubble'
import modal from './component/base/modal/modal'
import pop from './component/base/pop/pop'
import message from './component/base/message/message'

import code from './component/common/code/code'
import loading from './component/base/loading/loading'
import nav from './component/common/nav/nav'

import page from './component/base/page/page'
import scroller from './component/base/scroller/scroller'
import search from './component/common/search/search'

import {
  foldComp as fold,
  foldTitleComp as foldTitle,
  foldContentComp as foldContent
} from './component/base/fold/fold'

import list from './component/common/list/list'
import {
  tableComp as table,
  tableColComp as tableCol,
  tableRowComp as tableRow
} from './component/common/table/table'

import menu from './component/base/menu/menu'
import menuEle from './component/base/menu/menu-ele'

import shift from './component/base/shift/shift'
import shiftEle from './component/base/shift/shift-ele'

import tab from './component/base/tab/tab'
import tabEle from './component/base/tab/tab-ele'

import col from './component/common/layout/col/col'
import row from './component/common/layout/row/row'

const compHub = [
  btn,
  bubble,
  check,
  code,
  form,
  fold,
  foldTitle,
  foldContent,
  modal,
  message,
  nav,
  input,
  icon,
  list,
  loading,
  pop,
  page,
  menu,
  menuEle,
  scroller,
  shift,
  shiftEle,
  search,
  tab,
  tabEle,
  col,
  row,
  table,
  tableRow,
  tableCol
]

const component = {
  install(Vue, { prefix = 'z' } = {}) {
    compHub.forEach((item) => {
      Vue.component(`${prefix}-${item.name}`, item)
    })
  }
}

export default component
