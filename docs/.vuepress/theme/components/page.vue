<template>
  <div class="component-page">
    <home v-if="$route.path === '/'"></home>
    <div
      v-else
      class="page-content">

      <ClientOnly>
        <item-list v-if="isBlog"></item-list>
      </ClientOnly>
      <Content :class="{p0: isBlog}"/>
      <page-nav :type="type" v-if="isItem"></page-nav>
      <div class="vcomment content" v-if="isItem || isAbout">
        <div id="vcomments"></div>
      </div>
    </div>
    <el-button
      v-if="isResume"
      type="primary"
      icon="el-icon-download"
      class="download-btn"
      @click="downloadResume">
      下载简历
    </el-button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import Home from './Home.vue'
import ItemList from './item-list.vue'
import pageNav from '../../components/page-nav.vue'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/prism.js'

function downLoadImage(canvas,name) {
    var a = document.createElement("a")
    a.href = canvas.toDataURL()
    a.download = name
    a.click()
}
export default {
  computed: {
    isBlog () {
      return this.$route.path === '/blog/'
    },
    isItem () {
      return this.$page.path.endsWith('.html')
    },
    isAbout () {
      return this.$page.path.endsWith('/about/')
    },
    isResume () {
      return this.$route.path === '/my/'
    },
    type () {
      let paths = this.$route.path.split('/')
      return paths[paths.length - 2]
    }
  },
  watch: {
    '$route' (to, from) {
        if(to.path !==  from.path){
          this.isItem && this.$router.go(0)
        }else{
           // nothing
       }
     }
  },
  mounted () {
    this.initComment()
  },
  methods: {
    initComment () {
      const Valine = require('valine')
      window.AV = require('leancloud-storage')

      new Valine({
        el: '#vcomments' ,
        appId: 'GpBL6hIkIyhvrV2k67M2dIGy-gzGzoHsz',// your appId
        appKey: 'BNbBiXN3fo2YmOVRGqQwDcwK', // your appKey
        notify: false, 
        verify: false, 
        visitor: true, // 阅读量统计
        avatar:'monsterid', 
        placeholder: 'ヾﾉ≧∀≦)o来啊，快活啊!' 
      })
    },
    downloadResume () {
      html2canvas(document.querySelector('#resume')).then(canvas => {
        downLoadImage(canvas, '简历')
      })
    }
  },

  components: {
    Home,
    ItemList,
    pageNav
  }
}
</script>

<style lang="scss">
.p0{
  padding: 0!important;
}
.component-page {
  max-width: 800px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // overflow: auto;
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;

  .page-content {
    margin: 15px auto;

    .custom {
      img {
        width: 100%;
        max-height: 500px;
      }
    }
  }

  .download-btn {
    position: fixed;
    top: 100px;
    right: 100px;
  }
}
</style>
