<template>
	<el-menu
		default-active="1-4-1"
		class="el-menu-vertical-demo"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffe04b"
		@open="handleOpen"
		@close="handleClose"
		:collapse="isCollapse"
	>
		<h3>{{ isCollapse ? "后台" : "通用管理系统" }}</h3>
		<!-- 一级菜单 -- 无子导航-->
		<el-menu-item
			v-for="item in noChildren"
			:index="item.path + ''"
			:key="item.path"
			@click="clickMenu(item)"
		>
			<!-- 图标、文字 -->
			<i :class="'el-icon-' + item.icon"></i>
			<span slot="title">{{ item.label }}</span>
		</el-menu-item>
		<!-- 二级菜单 --- 有子导航 -->
		<el-submenu
			v-for="item in hasChildren"
			:index="item.path + ''"
			:key="item.path"
		>
			<!--  -->
			<template slot="title">
				<i :class="'el-icon-' + item.icon"></i>
				<span slot="title">{{ item.label }}</span>
			</template>
			<el-menu-item-group
				v-for="(subitem, subindex) in item.children"
				:key="subitem.path"
			>
				<!-- 一级菜单--子导航 -->
				<el-menu-item @click="clickMenu(subitem)" :index="subindex + ''">{{
					subitem.label
				}}</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>

<script>
// eventbug 的方法来做点击菜单按钮切换左侧导航栏
// import bus from "./eventBus.js";
export default {
	data() {
		return {
			// 决定左侧导航是展开还是收缩
			// 用vuex来传入
			// isCollapse: false,
			// menu: [
			// 	{
			// 		path: "/",
			// 		name: "home",
			// 		label: "首页",
			// 		icon: "s-home",
			// 		url: "Home/Home",
			// 	},
			// 	{
			// 		path: "/mall",
			// 		name: "mall",
			// 		label: "商品管理",
			// 		icon: "video-play",
			// 		url: "MallManage/MallManage",
			// 	},
			// 	{
			// 		path: "/user",
			// 		name: "user",
			// 		label: "用户管理",
			// 		icon: "user",
			// 		url: "UserManage/UserManage",
			// 	},
			// 	{
			// 		label: "其他",
			// 		icon: "location",
			// 		children: [
			// 			{
			// 				path: "/page1",
			// 				name: "page1",
			// 				label: "页面1",
			// 				icon: "setting",
			// 				url: "Other/PageOne",
			// 			},
			// 			{
			// 				path: "/page2",
			// 				name: "page2",
			// 				label: "页面2",
			// 				icon: "setting",
			// 				url: "Other/PageTow",
			// 			},
			// 		],
			// 	},
			// ],
			menu: [],
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		clickMenu(item) {
			this.$router.push({
				name: item.name,
			});
			this.$store.commit("selectMenu", item);
		},
	},
	computed: {
		noChildren() {
			return this.asyncMenu.filter((item) => !item.children);
		},
		hasChildren() {
			return this.asyncMenu.filter((item) => item.children);
		},
		// vuex切换左侧导航
		isCollapse() {
			return this.$store.state.tab.isCollapse;
		},
		asyncMenu() {
			return this.$store.state.tab.menu;
		},
	},
	// eventbug 的方法来做点击菜单按钮切换左侧导航栏
	// created() {
	// 	bus.$on("taggle", (val) => {
	// 		this.isCollapse = val;
	// 	});
	// },
};
</script>

<style lang='less' scpoed>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	// min-height: 400px;
}
.el-menu {
	height: 100%;
	border: none;
	h3 {
		color: #fff;
		text-align: center;
		line-height: 48px;
	}
}
</style>