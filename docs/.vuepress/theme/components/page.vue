<template>
  <div class="component-page">
    <home v-if="$route.path === '/'"></home>
    <div
      v-else
      class="page-content">
      <item-list v-if="isBlog"></item-list>
      <Content/>
      <div class="vcomment" v-if="isBlogItem">
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
    isBlogItem () {
      return this.$page.path.indexOf('.html') !== -1
    },
    isResume () {
      return this.$route.path === '/my/'
    }
  },
  watch: {
    '$route' (to, from) {
        if(to.path !==  from.path){
          this.isBlogItem && this.$router.go(0)
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
      console.log('ccc')
      const Valine = require('valine')
      window.AV = require('leancloud-storage')

      new Valine({
        el: '#vcomments' ,
        appId: 'GpBL6hIkIyhvrV2k67M2dIGy-gzGzoHsz',// your appId
        appKey: 'BNbBiXN3fo2YmOVRGqQwDcwK', // your appKey
        notify:false, 
        verify:false, 
        avatar:'monsterid', 
        placeholder: '欢迎留言分享您的想法...' 
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
    ItemList
  }
}
</script>

<style lang="scss">
.component-page {
  width: 100%;
  height: 100%;
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
