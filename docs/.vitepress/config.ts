import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'lxy的学习笔记',
  description: '记录我学习过程中的各种知识点',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/frontend' },
      { text: '测试页', link: '/前端_cleaned_emoji_html' }
    ],
    sidebar: {
      '/': [
        {
          text: '目录',
          items: [
            { text: '首页', link: '/' },
            { text: '前端', link: '/frontend' },
            { text: '测试页', link: '/test' }
          ]
        }
      ]
    }
  }
})
