module.exports = {
  title: '我的学习笔记',
  description: '记录我学习过程中的各种知识点',
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: 'Test', link: '/test' },  // 在导航栏中添加 Test 页面链接
    ],
    // 侧边栏配置
    sidebar: {
      '/': [
        {
          text: '首页',
          link: '/'
        },
        {
          text: 'Test',
          link: '/test',  // 在侧边栏中添加 Test 页面链接
        }
      ]
    }
  }
};
