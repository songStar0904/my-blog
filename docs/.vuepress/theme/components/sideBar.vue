<template>
	<div class="side-bar">
		<ul v-for="(item, key) in data">
			<li><a :href="`#${item.slug}`">{{item.title}}</a></li>
		</ul>
    </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
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
}
</style>