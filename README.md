# vue2do - 基于 vue2 的响应式基础组件
[![Coverage Status](https://coveralls.io/repos/github/zen0822/vue2do/badge.svg)](https://coveralls.io/github/zen0822/vue2do)
[![Build Status](https://travis-ci.org/zen0822/vue2do.svg?branch=master)](https://travis-ci.org/zen0822/vue2do)

[![vue2do](https://nodei.co/npm/vue2do.png)](https://npmjs.org/package/vue2do)


## 安装
```sh
npm i vue2do -S
```

## 开始使用

### 全部加载
``` js
import Vue from 'vue'
import vue2do from 'vue2do'

Vue.use(vue2do)
```
在项目中使用
``` html
<z-input></z-input>
```

### 局部加载
```js
import {
  select,
  input
  // ...
} from 'vue2do'

Vue.component('select', select)
Vue.component('yourPrefix' + input.compName, input)
```

### 加载指定组件

#### 因为从 vue2do/index.js 文件加载的时候会加载所有的组件，所以只加载指定组件就可以只打包这个组件的文件
```js
import Input from 'vue2do/component/Input'

Vue.component('Input', Input)
```

## 构建单页应用（spa）和多页应用（mpa）

### 全局安装 vue2do

```
npm i vue2do -g
```

### 命令行

#### 初始化应用项目

* projectName: 项目名字

```
vue2do init project [projectName]
```

#### 构建应用

* appType: 应用类型，可选 spa 和 mpa
* appName: 应用名字

```
cd [projectName] // 初始化的项目应用目录下
vue2do build <appType> [appName]
```

### 例子

#### 在当前目录构建名字为 zenProject 的应用项目

```
vue2do init project zenProject
```

#### 在当前应用项目构建 名字为 zenMpa 的多页应用

```
cd zenProject
vue2do build mpa zenMpa
```

***

获取更多信息请访问 vue2do 的 [文档网站](https://zen0822.github.io)。

本项目遵循 [semver](http://semver.org/lang/zh-CN/) 版本管理