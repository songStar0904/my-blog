<template>
  <div class="component-home">
    <div class="center">
      <img class="hero" src="/my-blog/logo.jpg"></img>
      <div class="title">{{ front.title }}</div>
      <div class="description">
        {{ front.description }}
      </div>
      <div class="button-wrapper">
        <el-button
          v-for="item in nav"
          round
          :key="item.text"
          @click="handlerClick(item)">
          {{ item.text }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    front () {
      return this.$page.frontmatter
    },

    nav () {
      return this.front.nav || []
    }
  },

  methods: {
    handlerClick ({ link = '' }) {
      if (/^http/.test(link)) {
        window.open(link)
      } else {
        this.$router.push(link)
      }
    }
  }
}
</script>

<style lang="scss">
.component-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #909399;

  .center {
    height: 50%;
    text-align: center;

    .hero {
      width: 120px;
      height: 120px;
      border-radius: 60px;
      border: 4px solid #f2f6fc;
      &:hover{
        transform: rotate(666turn);
        transition-delay: 1s;
        transition-property: all;
        transition-duration: 59s;
        transition-timing-function: cubic-bezier(.34,0,.84,1);
      }
    }

    .title {
      padding: 6px 0;
      font-size: 32px;
      color: #606266;
    }

    .description {
      margin-bottom: 10px;
      padding: 4px 0;
      border-bottom: 1px solid #ccc;
    }

    .button-wrapper {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
