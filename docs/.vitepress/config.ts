import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的学习笔记',
  description: '记录我学习过程中的各种知识点',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/前端' },
      { text: '测试页', link: '/test' }
    ],
    sidebar: {
      '/': [
        {
          text: '目录',
          items: [
            { text: '首页', link: '/' },
            { text: '前端', link: '/前端' },
            { text: '测试页', link: '/test' }
          ]
        }
      ]
    }
  }
})
