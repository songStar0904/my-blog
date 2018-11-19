<template>
	<div class="side-bar">
		<ul class="sidebar-links" >
			<li v-for="(level2, key) in sideData" :key="key">
				<a :href="`/my-blog${$page.path}#${level2.slug}`" >{{level2.title}}</a>
				<ul class="sidebar-links" v-if="level2.child">
					<li v-for="(level3, k) in level2.child" :key="k">
						<a :href="`/my-blog${$page.path}#${level3.slug}`">{{level3.title}}</a>
					</li>
				</ul>
			</li>
		</ul>
    </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  computed: {
  	sideData () {
  	  let data = []
  	  this.data.forEach((item) => {
  	  	if (item.level === 2) {
  	  	  data.push(item)
  	  	} else {
  	  	  if (!data[data.length - 1].child) {
  	  	  	data[data.length - 1].child = []
  	  	  }
  	  	  data[data.length - 1].child.push(item)
  	  	}
  	  })
  	return data
  	}
  }
}
</script>
<style lang="scss">
@media screen and (max-width: 1400px) {
    .side-bar{
        display: none;
    }
}
.side-bar{
	position: fixed;
	left: 0;
	top: 60px;
	width: 250px;
	padding: 30px 0 0 30px;
	>ul{
		>li{
			margin: 10px 0;
		}
	}
}
</style>