# Music
## 介绍（Introduction)
一个精美的网易云音乐播放器。

### 预览（Preview)

- [移动端播放页面](https://zhuanghaixin.github.io/Music/src/index.html)


### 技术栈 (Technique stack)

该项目包括 **PC 端后台管理页面** 以及 **移动端播放页面**，项目主要涉及到的技术有：
- [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)：根据 **HTML** 最新标准使用具有语义化的标签
- [CSS3](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS3)：根据 **CSS** 语言最新版本为元素设置正确的样式
- [jQuery](http://api.jquery.com/)：原生 JS 的封装库，更加便捷的操作 DOM 以及调用 JS API
- [MVC](https://zh.wikipedia.org/wiki/MVC)：即 **Model**、**View**、**Controller**，一种软件设计模式，面向对象编程
- [观察者模式](https://zh.wikipedia.org/wiki/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)：观察者模式是软件设计模式的一种。在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。这通常透过呼叫各观察者所提供的方法来实现。此种模式通常被用来实时事件处理系统。
- [LeanCloud](https://leancloud.cn/)：提供一站式后端云服务，作为歌曲信息存储的后台云服务器
- [七牛云](https://www.qiniu.com)：国内领先的企业级云服务商，作为歌曲文件存储的后台云服务器

### 功能 (Function)
1. 首页
- 推荐音乐
- 热歌榜
- 歌曲搜索
2. 歌单详情页
- 歌单简介
- 歌单歌曲列表
3. 歌曲播放页
- 歌曲唱片动画
- 歌词滚动高亮
- 百分百像素级还原
- flex布局
## 开始使用 （Usage)
- 下载或克隆仓库。
- 在七牛创建bucket，将server.js第25行的scope的值改为你的bucket name。
- 在七牛个人面板查询AccessKey/SecretKey，然后在根目录创建新的文件qiniu-key.json，文件内容为你的AccessKey/SecretKey的json格式（保存成json对象）。
- 终端进入根目录，node server 8888开启服务（目的是拿到tocken）。
- 在leancloud上创建自己的应用并新建AllSongs、SongList两个Class（权限设置为可读可写），拿到id和key，再全局替换掉我的id和key（admin.js前两行就是）。
- 用http-server再在终端开启一个服务就可以进入admin页面进行后台管理了。
## 文档 (Documentation)
## 提问（Questions）
## 问题（Issue)
## 更新日志(Changelog)
### Releases
#### Version 1.0

- 完成 PC 端管理页面的部分样式制作
- 完成新建歌曲、编辑歌曲页面制作
## 保持联系（Stay In Touch）
## 贡献（Contribution)
## 执照（License）
