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
  mounted() {
    let type = this.type == 'blog' ? '/blog/' : `/docs/${this.type}/`
  	let pages = JSON.parse(localStorage.getItem(this.type)) || this.$site.pages
    // console.log(type, pages)
  	if ('path' in pages[0] && this.type === 'blog') {
      pages = pages.filter((item, index) => {
  	    return item.path.indexOf(type) >= 0
  	  })
  	  pages.shift()
  	}
  	pages.map((item, index) => {
  	  if (!item.path && item.link) {
  	  	item.path = `${type}${item.link}.html`
  	  }
      if (this.$route.path.indexOf(item.path) !== -1) {
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
    font-size: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eaecef;
}
</style>