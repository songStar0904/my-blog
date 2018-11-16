module.exports = {
  title: 'songStar',  // 设置网站标题
  description: 'songstar的博客',
  dest: './dist',    // 设置输出目录
  base: '/my-blog/', // 设置站点根路径
  repo: 'https://github.com/songStar0904/my-blog', // 添加 github 链接
  plugins: ['@vuepress/back-to-top', '@vuepress/active-header-links', '@vuepress/last-updated'],
  themeConfig: {
    // 添加导航栏
    nav: [
        { text: 'Home', link: '/' },
        { text: 'Blog', link: '/blog/' },
        // {
        //     text: '博文',
        //     items: [
        //         { text: 'blog', link: '/blog/' },
        //         { text: 'ios', link: '/ios/' },
        //         { text: 'Web', link: '/web/' }
        //     ]
        // },
        { text: 'About', link: '/about/' },
        { text: 'Github', link: 'https://www.github.com/songstar0904' },
    ],
    sidebarDepth: 2,
    lastUpdated: "上次更新时间： ",
    // 为以下路由添加侧边栏
    // sidebar: ['/', '/git', '/vue']
  }
}