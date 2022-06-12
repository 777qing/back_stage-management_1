<template>
	<div class="home">
		<el-container style="height: 100%">
			<!-- 左侧导航 -->
			<el-aside width="auto" class="home-aside"
				><commont-aside></commont-aside
			></el-aside>
			<el-container>
				<!-- 顶部区域 -->
				<el-header class="home-header">
					<commont-header></commont-header>
				</el-header>
				<common-tag></common-tag>
				<!-- 下方主体 -->
				<el-main class="home-main"><router-view></router-view></el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
// 顶部区域
import CommontHeader from "@/components/CommontHeader.vue";
// 左侧区域
import CommontAside from "@/components/CommontAside.vue";
import CommonTag from "@/components/CommonTag.vue";
export default {
	components: {
		CommontAside,
		CommontHeader,
		CommonTag,
	},
};
</script>

<style lang="less" scoped>
.el-aside {
	height: 100vh;
	overflow: "visible";
	ul {
		border: none;
	}
}

.home-header {
	background: #333;
	color: #fff;
}
.home-main {
	padding-top: 0;
}
</style>