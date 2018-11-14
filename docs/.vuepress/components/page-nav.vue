<template>
	<div class="page-nav">
		<div class="pre"><router-link v-if="pre" :to="pre.path">← {{pre.title}}</router-link></div>
		<div class="next"><router-link v-if="next" :to="next.path">{{next.title}} →</router-link></div>
    </div>
</template>
<script>
export default {
  props: {
  	type: {
  	  type: String
  	}
  },
  data () {
  	return {
  	  current: 0,
  	  pre: null,
  	  next: null
  	}
  },
  created() {
  	let pages = JSON.parse(localStorage.getItem(this.type)) || this.$site.pages
  	if ('path' in pages[0]) {
      pages = pages.filter((item, index) => {
  	    return item.path.indexOf(`/${this.type}/`) >= 0
  	  })
  	  pages.shift()
  	}
  	pages.map((item, index) => {
  	  if (!item.path && item.link) {
  	  	item.path = `/${this.type}/${item.link}.html`
  	  }
      if (item.path === this.$route.path) {
  	    this.current = index
  	  }
  	})
  	let len = pages.length
  	this.pre = this.current - 1 >= 0 ? pages[this.current - 1] : false
  	this.next = this.current + 1 <= len ? pages[this.current + 1] : false
  	console.log(pages, this.current, this.pre, this.next)
  }
}
</script>
<style lang="scss">
.page-nav{
	display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 18px;
}
</style>