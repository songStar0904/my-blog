<template>
	<div class="page-nav">
		<div class="pre"><a v-if="pre" :href="`/my-blog${pre.path}`">← {{pre.title}}</a></div>
		<div class="next"><a v-if="next" :href="`/my-blog${next.path}`">{{next.title}} →</a></div>
    </div>
</template>
<script>
export default {
  props: ['type'],
  data () {
  	return {
  	  current: 0,
  	  pre: {},
  	  next: {}
  	}
  },
  created() {
  	let pages = this.$site.pages.filter((item, index) => {
  	  return item.path.indexOf(this.type) >= 0
  	})
  	pages.shift()
  	pages.map((item, index) => {
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
}
</style>