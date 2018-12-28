<template>
	<div>
		<div class="blend" v-if="type == 1">
	        <img src="/my-blog/logo.jpg" alt="">
	    </div>
		<section class="type2" v-else-if="type == 2">
		    <div class="box first"></div>
		    <div class="box second"></div>
		    <div class="box third"></div>
		</section>
	    <section class="type3" v-else-if="type == 3">
	        <div class="one">One</div>
	        <div class="two">Two</div>
	        <div class="tree">Tree</div>
	        <div class="four">Four</div>
	        <div class="five">Five</div>
	    </section>
	    <section class="type4" v-else-if="type == 4">
	    	<ul class="properties-list">
			  <li class="properties-list_item">
			    <p>Cover</p>
			    <img class="cover properties-list_image" src="http://habrastorage.org/files/2b5/02e/3ce/2b502e3ce4764a349ba4e0c51443bbec.jpg" alt="cover" />
			  </li>
			  <li class="properties-list_item">
			    <p>Contain</p>
			    <img class="contain properties-list_image" src="http://habrastorage.org/files/2b5/02e/3ce/2b502e3ce4764a349ba4e0c51443bbec.jpg" alt="contain" />
			  </li>
			  <li class="properties-list_item">
			    <p>Fill</p>
			    <img class="fill properties-list_image" src="http://habrastorage.org/files/2b5/02e/3ce/2b502e3ce4764a349ba4e0c51443bbec.jpg" alt="fill" />
			  </li>
			  <li class="properties-list_item">
			    <p>Scale-down</p>
			    <img class="scale-down properties-list_image" src="http://habrastorage.org/files/2b5/02e/3ce/2b502e3ce4764a349ba4e0c51443bbec.jpg" />
			  </li>
			</ul>
	    </section>
	    <section class="type5" v-else-if="type == 5">
	    	<input type="checkbox" id="check" name="check" />
            <label for="check">点我点我</label>
	    </section>
	    <section class="type6" v-else-if="type == 6">
	    	<div>
			  <input type="checkbox" id="check1" name="check1" />
			  <label for="check1">Checkbox1</label>
			</div>
			<div>
			  <input type="checkbox" id="check2" name="check2" />
			  <label for="check2">Checkbox 2</label>
			</div>
			<div>
			  <input type="radio" id="radio" name="radio" />
			  <label for="radio">Radio</label>
			</div>
			<div>
			  <input type="radio" id="radio1" name="radio" />
			  <label for="radio1">Radio 1</label>
			</div>
	    </section>
    </div>
</template>
<script>
	export default {
	    props: ['type']
	}
</script>
<style lang="scss">
    .blend {
        background: #fff;
    }
    .blend img {
        mix-blend-mode: darken; 
    }
    /*box*/
    .type2{
    	overflow: hidden;
	    .box {
	      margin: 98px 30px;
	      width: 100px;
	      height: 100px;
	      position: relative;
	      background: #fff;
	      float: left;
	    }
	    .box:before {
	        content: '';
	        z-index: -1;
	        position: absolute;
	        width: 120px;
	        height: 120px;
	        top: -10px;
	        left: -10px;
	    }

	    .first:before {
	        background-image: linear-gradient(90deg, yellow, gold);
	    }
	    .second:before {
	        background-image: linear-gradient(0deg, orange, red);
	    }
	    .third:before {
	        background-image: repeating-linear-gradient(-45deg,#cc2a2d,#cc2a2d 30px,#f2f2f2 30px,#f2f2f2 40px,#0e71bb 40px,#0e71bb 70px,#f2f2f2 70px,#f2f2f2 80px);
	    }
    }
    /*z-index*/
    .type3{
        display: block;
        position: relative;
        height: 320px;
        div{
	        position: absolute;
	        width: 200px;
	        height: 200px;
	    }
	    .one{
	        z-index: 1;
	        top: 0;
	        left: 0;
	        width: 800px;
	        background: hsla(1,70%,50%,.5);
	        -moz-transition: all 3s;
	        -webkit-transition: all 3s; 
	        transition: all 3s; 
	    }
	    .one:hover{
	    	z-index: 6;
		    background: hsla(1,100%,10%,1);
		    -moz-transition: all 3s;
		    -webkit-transition: all 3s;
		    transition: all 3s;
	    }
	    .two{
	        z-index: 2;
	        top: 120px;
	        left: 0;
	        background: hsla(50,70%,50%,.5);
	    }
	    .tree{
	        z-index: 3;
	        top: 120px;
	        left: 160px;
	        background: hsla(120,70%,50%,.5);
	    }
	    .four{
	        z-index: 4;
	        top: 120px;
	        left: 320px;
	        background: hsla(220,70%,50%,.5);
	    }
	    .five{
	        z-index: 5;
	        top: 120px;
	        left: 480px;
	        background: hsla(300,70%,50%,.5);
	    }
    }

    .type4{
    	.cover {
		  object-fit: cover;
		}
		.contain {
		  object-fit: contain;
		}
		.fill {
		  object-fit: fill;
		}
		.scale-down {
		  object-fit: scale-down;
		}
		.properties-list{
			display: flex;
			flex-wrap: wrap;
			padding: 0;
		}
		.properties-list_item {
		  flex-grow: 1;
		  display: inline-block;
		  margin: 0 20px;
		}
		.properties-list_image {
		  background: rgba(255, 112, 42, .7);
		  height: 190px;
		  width: 300px;
		}
    }
    
	.type5{
		input[type=checkbox] {display: none;}

		input[type=checkbox] + label:before {  
		    content: "";
		    border: 1px solid #000;
		    font-size: 11px;    
		    line-height: 10px;
		    margin: 0 5px 0 0;
		    height: 10px;
		    width: 10px;
		    text-align: center;
		    vertical-align: middle;
		}

		input[type=checkbox]:checked + label:before {  
		    content: "\2713";
		}
	}

	.type6{
		div{
			margin: 10px 0;
		}
		input[type=checkbox], input[type=radio] {display: none;}

		input[type=checkbox] + label:before {
		    content: "\2713";
		    color: transparent;
		    display: inline-block;
		    border: 1px solid #000;
		    font-size: 20px;    
		    line-height: 22px;
		    margin: -5px 5px 0 0;
		    height: 20px;
		    width: 20px;
		    text-align: center;
		    vertical-align: middle;
		    transition: color ease .3s;
		}

		input[type=checkbox]:checked + label:before {
		    color: #000;
		}

		input[type=radio] + label:before {
		    content: "\26AB";
		    border: 1px solid #000;
		    border-radius: 50%;
		    display: inline-block;
		    border: 1px solid #000;
		    font-size: 20px;    
		    line-height: 20px;
		    margin: -5px 5px 0 0;
		    height: 20px;
		    width: 20px;
		    text-align: center;
		    vertical-align: middle;
		    font-size: 0;    
		    transition: font-size ease .3s;
		}
		input[type=radio]:checked + label:before {
		    font-size: 20px;    
		}
	}
</style>