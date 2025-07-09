module.exports = {
  title: '我的学习笔记',
  description: '记录我学习过程中遇到的技术点',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '面试题', link: '/test' },
      { text: 'Vue.js', link: '/vue' },
    ],
    sidebar: {
      '/js/': [
        {
          text: 'JavaScript 笔记',
          children: ['/js/notes']
        }
      ]
    }
  }
}
