<template>
	<div>
		<div v-if="loading" class="alert alert-success" role="alert">请稍后，正在加载中……</div>
		<div v-if="loadingFail" class="alert alert-danger" role="alert">加载失败！请检查网络或联系管理员。</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<div
						class="file"
						v-for="(item, index) in oddFiles"
						:key="index"
						@click="downloadFile(item.fileName,item.fileCategory)"
					>
						<img src="../assets/exam/ppt.svg" alt>
						<div class="title h4" v-text="item.fileName"></div>
						<div class="info text-muted">文件上传日期：{{item.addtime}}</div>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<div
						class="file"
						v-for="(item, index) in evenFiles"
						:key="index"
						@click="downloadFile(item.fileName,item.fileCategory)"
					>
						<img src="../assets/exam/ppt.svg" alt>
						<div class="title h4" v-text="item.fileName"></div>
						<div class="info text-muted">文件上传日期：{{item.addtime}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="hint text-muted">没有更多啦</div>
	</div>
</template>

<style lang="scss" scoped>
	.file {
		box-shadow: 2px 2px 10px lightgray;
		height: 100px;
		width: 90%;
		margin: 16px auto;
		padding: 24px;
		border-radius: 5px;
		background: white;
		text-align: right;
		position: relative;
		overflow: hidden;
		img {
			position: absolute;
			top: -10px;
			left: -20px;
			width: 120px; // color: lightgray;
		}
		&:hover {
			box-shadow: 2px 2px 30px lightgray;
			cursor: pointer;
			transition: 0.4s;
		}
	}
	.hint {
		border: 2px solid gainsboro;
		text-align: center;
		padding: 10px 20px;
		border-radius: 30px;
		width: 90%;
		margin: 50px auto 10px auto;
		font-size: 18px;
	}
</style>


<script>
	import axios from "axios";
	import domain from "../libs/domain";
	export default {
		name: "examfiles",
		data: () => {
			return {
				files: [],
				loading: false,
				loadingFail: false
			};
		},
		computed: {
			oddFiles: function() {
				return this.files.filter((item, index) => {
					if (index % 2 == 0) {
						return item;
					}
				});
			},
			evenFiles: function() {
				return this.files.filter((item, index) => {
					if (index % 2 != 0) {
						return item;
					}
				});
			}
		},
		mounted() {
			axios
				.get(`${domain}/files/`)
				.then(data => {
					data.data.forEach((element, index, arr) => {
						let t = new Date(element.addtime);
						element.addtime = `${t.getFullYear()}-${t.getMonth() +
							1}-${t.getDate()}`;
					});
					this.files = data.data;
				})
				.catch(err => {
					console.error(err);
					this.$message.error("出错了，请检查网络或联系管理员。");
				});
		},
		methods: {
			downloadFile(fileName, fileCategory) {
				window.open(`${domain}/files/${fileName}.${fileCategory}`);
				// axios.get(`${domain}/files/${fileName}.${fileCategory}`).then(data => {
				// 	console.log("data :", data);
				// 	switch (data.data.state) {
				// 		case 1:
				// 			this.$message.success("下载成功");
				// 			break;
				// 		case 0:
				// 		case 2:
				// 			this.$message.error("出错了，请检查网络或联系管理员。");
				// 			break;
				// 	}
				// });
			}
		}
	};
</script>
