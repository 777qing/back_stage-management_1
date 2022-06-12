<template>
	<div class="commont-header">
		<!-- 左侧 -->
		<div class="l-content">
			<!-- // eventbug 的方法来做点击菜单按钮切换左侧导航栏 -->
			<!-- @click="onOff" -->
			<el-button
				plain
				icon="el-icon-menu"
				size="mini"
				@click="handleMenu"
			></el-button>
			<!-- <h3>首页</h3> -->
			<!-- 面包屑--头部路由导航 -->
			<el-breadcrumb separator="/">
				<el-breadcrumb-item
					class="color"
					v-for="item in tags"
					:key="item.path"
					:to="{ path: item.path }"
					>{{ item.label }}</el-breadcrumb-item
				>
			</el-breadcrumb>
		</div>
		<!-- 右侧 -->
		<div class="r-content">
			<el-dropdown trigger="click" szie="mini">
				<!-- 头像 -->
				<span> <img class="user" :src="userImg" /> </span>
				<!-- 下滑内容 -->
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
// eventbug 的方法来做点击菜单按钮切换左侧导航栏
// import bus from "./eventBus.js";
import { mapState } from "vuex";
import CommonTag from "./CommonTag.vue";
export default {
	components: { CommonTag },
	data() {
		return {
			on_off: true,
			userImg: require("../assets/images/userImg.png"),
		};
	},
	methods: {
		// eventbug 的方法来做点击菜单按钮切换左侧导航栏
		// onOff() {
		// 	this.on_off = !this.on_off;
		// 	bus.$emit("taggle", this.on_off);
		// },
		// vuex切换左侧导航
		handleMenu() {
			this.$store.commit("callapeMenu");
		},
		logOut() {
			this.$store.commit("clearToken");
			this.$store.commit("clearMenu");
			this.$router.push("/login");
		},
	},
	computed: {
		...mapState({
			tags: (state) => state.tab.tabsList,
		}),
	},
};
</script>

<style lang="less" scoped>
.commont-header {
	margin: 0;
	display: flex;
	height: 100%;
	justify-content: space-between;
	align-items: center;
	// 左侧
	.l-content {
		display: flex;
		align-items: center;

		.el-button {
			margin-right: 20px;
		}
		h3 {
			color: #fff;
		}
	}
	// 右侧
	.r-content {
		.user {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}
	.color /deep/ .el-breadcrumb__inner {
		color: #606266;
	}
	// .color /deep/ .el-breadcrumb__inner:visited {
	// 	color: #606266;
	// }
}
</style>