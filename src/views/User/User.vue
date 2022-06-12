<template>
	<div class="user-main">
		<!-- 填写信息的表单 -->
		<!-- 点击新增才能看见 -->
		<el-dialog
			:title="operateType === 'add' ? '新增用户' : '更新用户'"
			:visible.sync="isShow"
		>
			<!-- 传入信息表单的内容 -->
			<common-form
				:formLabel="opertateFormLabel"
				:form="operateForm"
				:inline="true"
				ref="form"
			></common-form>

			<!-- 表单中的按钮 -->
			<div class="dialog-footer" slot="footer">
				<!-- 退出、取消 -->
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
		<!-- 正常就可以看见 -->
		<!-- 新增和搜索按钮 -->
		<div class="manage-header">
			<el-button type="primary" @click="addUser">+ 新增</el-button>
			<!-- 新增前的输入表单 -->
			<common-form
				:formLabel="formLabel"
				:form="searchFrom"
				:inline="true"
				ref="form"
			>
				<el-button type="primary" @click="getList(searchFrom.keyword)"
					>搜索</el-button
				>
			</common-form>
		</div>
		<!-- 数据 -->
		<common-table
			:tableData="tableData"
			:tableLable="tableLable"
			:config="config"
			@changePage="getList()"
			@edit="editUser"
			@del="delUser"
		></common-table>
	</div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable.vue";
import { getUser } from "../../../api/data.js";
export default {
	data() {
		return {
			operateType: "add",
			isShow: false,
			// 向commonForm组件传递内容
			opertateFormLabel: [
				{
					model: "name",
					label: "姓名",
					type: "input",
				},
				{
					model: "age",
					label: "年龄",
					type: "input",
				},
				{
					model: "sex",
					label: "性别",
					type: "select",
					opts: [
						{
							label: "男",
							value: 1,
						},
						{
							label: "女",
							value: 0,
						},
					],
				},
				{
					model: "birth",
					label: "出生日期",
					type: "date",
				},
				{
					model: "addr",
					label: "地址",
					type: "input",
				},
			],
			// 表单中获取的内容
			operateForm: {
				name: "",
				addr: "",
				age: "",
				birth: "",
				sex: "",
			},
			// 新增前的输入表单
			formLabel: [
				{
					model: "keyword",
					label: "",
					type: "input",
				},
			],
			searchFrom: {
				keyword: "",
			},

			tableData: [],
			tableLable: [
				{
					prop: "name",
					label: "姓名",
				},
				{
					prop: "age",
					label: "年龄",
				},

				{
					prop: "sexLabel",
					label: "性别",
				},
				{
					prop: "birth",
					label: "出生日期",
					width: 200,
				},
				{
					prop: "addr",
					label: "地址",
					width: 320,
				},
			],
			config: {
				page: 1,
				total: 30,
			},
		};
	},
	methods: {
		confirm() {
			if (this.operateType === "edit") {
				this.$http.post("/user/edit", this.operateForm).then((res) => {
					this.isShow = false;
					this.getList();
				});
			} else {
				this.$http.post("/user/add", this.operateForm).then((res) => {
					this.isShow = false;
					this.getList();
				});
			}
		},
		// 新增
		addUser() {
			this.isShow = true;
			(this.operateType = "add"),
				(this.operateForm = {
					name: "",
					addr: "",
					age: "",
					birth: "",
					sex: "",
				});
		},

		editUser(row) {
			this.operateType = "edit";
			this.isShow = true;
			this.operateForm = row;
			this.getList();
		},
		delUser(row) {
			this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				const id = row.id;
				this.$http
					.post("user/del", {
						params: { id },
					})
					.then((res) => {
						this.$message({
							type: "success",
							message: "删除成功",
						});
						this.getList();
					});
			});
		},
		getList(name = "") {
			this.config.loading = true;
			name ? (this.config.page = 1) : "";
			getUser({
				page: this.config.page,
				name,
			}).then(({ data: res }) => {
				this.tableData = res.list.map((item) => {
					item.sexLabel = item.sex === 0 ? "女" : "男";
					return item;
				});
				this.config.total = res.count;
				console.log(this.config.total);
				this.config.page = res.page;
				this.config.loading = false;
			});
		},
	},
	created() {
		this.getList();
	},
	components: {
		CommonForm,
		CommonTable,
	},
};
</script>

<style lang="less" scoped>
.user-main {
	height: 100%;
}
.manage-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	form {
		align-items: center;
	}
}
</style>