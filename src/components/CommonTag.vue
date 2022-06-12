<template>
	<div class="tabs">
		<el-tag
			v-for="(tag, index) in tags"
			:key="tag.name"
			:closable="tag.name !== 'home'"
			:effect="$route.name === tag.name ? 'dark' : 'plain'"
			@click="changeMenu(tag)"
			@close="handleClose(tag, index)"
			size="small"
		>
			{{ tag.name }}
		</el-tag>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			tags: (state) => state.tab.tabsList,
		}),
	},
	methods: {
		...mapMutations({
			close: "closeTag",
		}),
		changeMenu(item) {
			this.$router.push({
				name: item.name,
			});
		},
		handleClose(tag, index) {
			const length = this.tags.length - 1;
			this.close(tag);
			if (tag.name !== this.$route.name) {
				return;
			}
			if (index === length) {
				this.$router.push({
					name: this.tags[index - 1].name,
				});
			} else {
				this.$router.push({
					name: this.tags[index].name,
				});
			}
		},
	},
};
</script>

<style lang="less" scpoed>
.tabs {
	margin: 20px 15px 0px 15px;
	.el-tag {
		height: 25px;
		// padding: 0;
		margin-right: 10px;
		cursor: pointer;
	}
}
</style>