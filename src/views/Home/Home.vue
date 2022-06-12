<template>
	<!-- 将整个页面分为20 Layout-->
	<el-row class="home" :gutter="20">
		<!-- 左侧用户整体信息 --- 占8 -->
		<el-col :span="8" style="margin-top: 20px">
			<!-- 上-----用户个人信息  card卡片-->
			<el-card shadow="hover">
				<!-- 头像、名字 -->
				<div class="user" slot="header">
					<img :src="userImg" />
					<div class="userinfo">
						<p class="name">Admin</p>
						<p class="access">超级管理员</p>
					</div>
				</div>
				<!-- 时间、地点 -->
				<div class="login-info">
					<p>上次登录事件：<span>2021-7-9</span></p>
					<p>上次登陆地点：<span>哈尔滨</span></p>
				</div>
			</el-card>
			<!-- 下------用户数据信息 -->
			<el-card style="margin-top: 20px; height: 460px">
				<!-- form表单 -->
				<el-table :data="tableData">
					<el-table-column
						v-for="(val, key) in tableLabel"
						:key="key"
						:prop="key"
						:label="val"
					>
					</el-table-column>
				</el-table>
			</el-card>
		</el-col>
		<!-- 右侧 统计图表-->
		<el-col :span="16">
			<!-- 上部分订单 -->
			<div class="sum">
				<el-card
					v-for="item in countData"
					:key="item.name"
					:body-style="{ display: 'flex', padding: 0 }"
				>
					<i
						class="icon"
						:class="`el-icon-${item.icon}`"
						:style="{ background: item.color }"
					></i>
					<div class="detail">
						<p class="num">￥{{ item.value }}</p>
						<p class="txt">{{ item.name }}</p>
					</div>
				</el-card>
			</div>
			<!-- 中部 -->
			<el-card style="height: 280px">
				<div style="height: 280px" ref="echarts"></div>
			</el-card>
			<!-- 下册两个 -->
			<div class="graph">
				<!-- 做 -->
				<el-card style="height: 260px" class="l-graph">
					<div style="height: 240px" ref="userEcharts"></div>
				</el-card>
				<!-- you -->
				<el-card style="height: 260px" class="r-graph">
					<div style="height: 240px" ref="videoEcharts"></div>
				</el-card>
			</div>
		</el-col>
	</el-row>
</template>

<script>
import { getData } from "../../../api/data.js";
import * as echarts from "echarts";
import { color } from "echarts";

export default {
	data() {
		return {
			userImg: require("@/assets/images/userImg.png"),
			// 左侧用户数据
			// tableData: [
			// 	{
			// 		name: "oppo",
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: "vive",
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: "苹果",
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: "小米",
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: "三星",
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: "魅族",
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// ],
			tableData: [],
			tableLabel: {
				name: "课程",
				todayBuy: "今日购买",
				monthBuy: "本月购买",
				totalBuy: "总购买",
			},
			// 右侧图标数据
			countData: [
				{
					name: "今日支付订单",
					value: 1234,
					icon: "success",
					color: "#2ec7c9",
				},
				{
					name: "今日收藏订单",
					value: 210,
					icon: "star-on",
					color: "#ffb980",
				},
				{
					name: "今日未支付订单",
					value: 1234,
					icon: "s-goods",
					color: "#5ab1ef",
				},
				{
					name: "本月支付订单",
					value: 1234,
					icon: "success",
					color: "#2ec7c9",
				},
				{
					name: "本月收藏订单",
					value: 210,
					icon: "star-on",
					color: "#ffb980",
				},
				{
					name: "本月未支付订单",
					value: 1234,
					icon: "s-goods",
					color: "#5ab1ef",
				},
			],
		};
	},
	mounted() {
		// getMenu().then((res) => {
		// 	console.log(res);
		// });
		getData().then((res) => {
			const { code, data } = res.data;
			if (code === 20000) {
				this.tableData = data.tableData;
				const order = data.orderData;
				const xData = order.date;
				const keyArray = Object.keys(order.data[0]);
				const series = [];
				keyArray.forEach((key) => {
					series.push({
						name: key,
						data: order.data.map((item) => item[key]),
						type: "line",
					});
				});
				const option = {
					xAxis: {
						data: xData,
					},
					yAxis: {},
					legend: {
						data: keyArray,
					},
					series,
				};

				const E = echarts.init(this.$refs.echarts);
				E.setOption(option);
				//用户图
				const userOption = {
					legend: {
						textStyle: {
							color: "#333",
						},
					},
					grid: {
						left: "20%",
					},
					tooltip: {
						trigger: "axis",
					},
					xAxis: {
						type: "category",
						data: data.userData.map((item) => item.date),
						axisLine: {
							lineStyle: {
								color: "#17b3a3",
							},
						},
						axisLabel: {
							interval: 0,
							color: "#333",
						},
					},
					yAxis: [
						{
							type: "value",
							axisLine: {
								lineStyle: {
									color: "#17b3a3",
								},
							},
						},
					],
					color: ["#2ec7c9", "#b6a2de"],
					series: [
						{
							name: "新增用户",
							data: data.userData.map((item) => item.new),
							type: "bar",
						},
						{
							name: "活跃用户",
							data: data.userData.map((item) => item.active),
							type: "bar",
						},
					],
				};
				const U = echarts.init(this.$refs.userEcharts);
				U.setOption(userOption);

				//饼图
				const videoOption = {
					tooltip: {
						trigger: "item",
					},
					color: [
						"#0f78f4",
						"#dd536b",
						"#9462e5",
						"#a6a6a6",
						"#e1bb22",
						"#39c362",
						"#3ed1cf",
					],
					series: [
						{
							data: data.videoData,
							type: "pie",
						},
					],
				};
				const V = echarts.init(this.$refs.videoEcharts);
				V.setOption(videoOption);
			}
			console.log(res);
		});
	},
};
</script>

<style lang="less" scoped>
.home {
	.el-card {
		padding: 5px 15px;
		// margin-bottom: 5px;
	}
	.user {
		display: flex;
		align-items: center;
		.userinfo {
			color: #999;
			.name {
				font-size: 25px;
				color: #000;
				font-weight: 600;
				margin-bottom: 2px;
			}
			.access {
				margin-top: 5px;
			}
		}
		img {
			width: 150px;
			height: 150px;
			border-radius: 50%;
			margin-right: 60px;
		}
	}
	.login-info {
		color: #999;
		span {
			margin-left: 50px;
			color: #303133;
		}
	}

	// 右侧
	// 右侧上部分
	.sum {
		display: flex;
		// 设置是否换行
		flex-wrap: wrap;
		margin-bottom: 20px;
		.el-card {
			flex: 0 0 32%;
			width: 300px;
			height: 80px;
			padding: 0;
			margin-right: 10px;
			margin-top: 20px;
			border-radius: 10px;
			i {
				width: 90px;
				text-align: center;
				line-height: 80px;
				font-size: 30px;
				color: #fff;
				margin-right: 15px;
			}
			.detail {
				height: 80px;
				padding: 15px 0;
				.num {
					margin: 0;
					font-size: 25px;
					font-weight: 500;
				}
				.txt {
					margin: 0;
					font-size: 13px;
					color: #999;
				}
			}
		}
	}
	// 下方
	.graph {
		display: flex;
		margin-top: 20px;
		.l-graph {
			flex: 1;
			margin-right: 5px;
		}
		.r-graph {
			flex: 1;
			margin-left: 5px;
		}
	}
}
</style>