import PageTotal from '../component/page/Component/total/total'
import PageBtn from '../component/page/Component/form/Btn/Btn'
import PageStart from '../component/page/Component/Start/Start'
import PageSelect from '../component/page/Component/form/Select/Select'
import PageMenu from '../component/page/Component/Other/Menu/Menu'
import PageCheck from '../component/page/Component/form/Check/Check'
import PageInput from '../component/page/Component/form/Input/Input'
import PageIcon from '../component/page/Component/style&layout/Icon/Icon'
import PageModal from '../component/page/Component/message/Modal/Modal'
import PageOmit from '../component/page/Component/other/Omit/Omit'
import PagePop from '../component/page/Component/other/Pop/Pop'
import PageTip from '../component/page/Component/message/Tip/Tip'
import PageTable from '../component/page/Component/data/Table/Table'
import PageTab from '../component/page/Component/other/Tab/Tab'
import PageList from '../component/page/Component/data/List/List'
import PagePager from '../component/page/Component/data/Page/Page'
import PageGrid from '../component/page/Component/style&layout/Grid/Grid'
import PageScroller from '../component/page/Component/other/Scroller/Scroller'
import PageMotion from '../component/page/Component/Motion/Motion'

import motionChildren from './motionChildren.js'

export default [{
  path: '',
  component: PageTotal,
  meta: {
    title: '全部组件'
  }
}, {
  path: 'start',
  component: PageStart,
  meta: {
    title: '开始使用'
  }
}, {
  path: 'btn',
  component: PageBtn,
  meta: {
    title: '按钮组件'
  }
}, {
  path: 'check',
  component: PageCheck,
  meta: {
    title: '按钮组件'
  }
}, {
  path: 'select',
  component: PageSelect,
  meta: {
    title: '下拉框组件'
  }
}, {
  path: 'input',
  component: PageInput,
  meta: {
    title: '输入组件'
  }
}, {
  path: 'icon',
  component: PageIcon,
  meta: {
    title: '图标组件'
  }
}, {
  path: 'modal',
  component: PageModal,
  meta: {
    title: '弹窗组件'
  }
}, {
  path: 'omit',
  component: PageOmit,
  meta: {
    title: '省略组件'
  }
}, {
  path: 'pop',
  component: PagePop,
  meta: {
    title: '弹出组件'
  }
}, {
  path: 'tip',
  component: PageTip,
  meta: {
    title: '提示组件'
  }
}, {
  path: 'table',
  component: PageTable,
  meta: {
    title: '表格组件'
  }
}, {
  path: 'list',
  component: PageList,
  meta: {
    title: '列表组件'
  }
}, {
  path: 'pager',
  component: PagePager,
  meta: {
    title: '分页组件'
  }
}, {
  path: 'grid',
  component: PageGrid,
  meta: {
    title: '表格布局组件'
  }
}, {
  path: 'scroller',
  component: PageScroller,
  meta: {
    title: '滚动条组件'
  }
}, {
  path: 'tab',
  component: PageTab,
  meta: {
    title: '选项卡组件'
  }
}, {
  path: 'menu',
  component: PageMenu,
  meta: {
    title: '菜单组件'
  }
}, {
  path: 'motion',
  component: PageMotion,
  children: motionChildren
}]
