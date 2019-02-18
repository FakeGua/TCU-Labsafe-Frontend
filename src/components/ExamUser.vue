<template>
	<div class="body">
		<div class="header">
			<div class="head" @click="updateUsername">
				<div class="head-text" v-text="headText"></div>
			</div>
			<br>
			<div class="h4">你好 ，{{this.$store.state.name}} 。</div>
		</div>
		<br>
		<div class="content">
			<div>
				<h4>未完成试卷</h4>
				<hr>
				<div class="row">
					<div class="col-6">
						<div class="row">
							<div class="exampapers" v-for="(item, index) in oddUnFinishedExampapers" :key="index">
								<div class="h5">{{item.exampaperTitle}}</div>
								<div class="h6 text-muted">发布日期：{{item.addtime}}</div>
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="row">
							<div class="exampapers" v-for="(item, index) in evenUnFinishedExampapers" :key="index">
								<div class="h5">{{item.exampaperTitle}}</div>
								<div class="h6 text-muted">发布日期：{{item.addtime}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br>
			<br>
			<div>
				<h4>已完成试卷</h4>
				<hr>
				<div class="row">
					<div class="col-6">
						<div class="row">
							<div class="exampapers" v-for="(item, index) in oddFinishedExampapers" :key="index">
								<div class="h5">{{item.finishedExampaper}}</div>
								<div class="h6 text-muted">
									得分：
									<span class="text-warning">{{item.finishedScore}}</span>
									&nbsp;&nbsp;&nbsp;完成日期：{{item.addtime}}
								</div>
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="row">
							<div class="exampapers" v-for="(item, index) in evenFinishedExampapers" :key="index">
								<div class="h5">{{item.finishedExampaper}}</div>
								<div class="h6 text-muted">
									得分：
									<span class="text-warning">{{item.finishedScore}}</span>
									&nbsp;&nbsp;&nbsp;完成日期：{{item.addtime}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br>
			<br>
			<div>
				<h4>个人资料</h4>
				<hr>
				<div class="row">
					<div class="col-6">
						<el-input readonly v-model="this.$store.state.name">
							<template slot="prepend">姓名</template>
						</el-input>
					</div>
					<div class="col-6">
						<el-input readonly v-model="this.$store.state.username">
							<template slot="prepend">学号</template>
						</el-input>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-6">
						<el-input readonly v-model="this.$store.state.class">
							<template slot="prepend">班级</template>
						</el-input>
					</div>
					<div class="col-6">
						<el-input readonly v-model="this.$store.state.phone">
							<template slot="prepend">联系方式</template>
						</el-input>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	$tcuColor: rgb(4, 60, 122);
	.body {
		width: 90%;
		margin: auto;
		.header {
			padding: 30px 0;
			height: 280px;
			background: lighten($tcuColor, 0.5);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			border-radius: 5px;
			color: white;
			box-shadow: 2px 2px 10px lightgray;
			.head {
				width: 150px;
				height: 150px;
				background: white;
				border-radius: 150px;
				border: 6px solid gainsboro;
				overflow: hidden;
				position: relative;
				.head-text {
					position: absolute;
					color: lightgray;
					font-size: 100px;
					width: 200px;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					text-align: center;
				}
			}
		}
		.content {
			// height: 500px;
			background: white;
			border-radius: 5px;
			box-shadow: 2px 2px 10px lightgray;
			padding: 66px;
			.exampapers {
				box-shadow: 2px 2px 10px lightgray;
				height: 80px;
				width: 90%;
				margin: 16px auto; // padding: 24px;
				border-radius: 5px;
				background: white;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;
				img {
					position: absolute;
					top: -10px;
					left: -20px;
					width: 120px;
				} // &:hover {
				//     box-shadow: 2px 2px 30px lightgray;
				//     cursor: pointer;
				//     transition: .4s;
				// }
			}
		}
	}
</style>

<script>
	import axios from "axios";
	import domain from "../libs/domain";
	import formatTime from "../libs/formatTime";
	export default {
		name: "examuser",
		data() {
			return {
				unFinishedExampapers: [],
				finishedExampapers: [],
				exampapers: []
			};
		},
		methods: {
			updateUsername() {},
			initPage() {
				if (this.$store.state.username) {
					axios
						.get(`${domain}/exam/exampapers`)
						.then(data => {
							this.exampapers = data.data;
							this.exampapers.forEach(item => {
								let t = new Date(formatTime(item.addtime));
								item.addtime = `${t.getFullYear()}年${t.getMonth() +
									1}月${t.getDate()}日`;
							});
							axios
								.get(
									`${domain}/exam/finishedexampapers/${
										this.$store.state.username
									}`
								)
								.then(data => {
									this.finishedExampapers = data.data;
									this.finishedExampapers.forEach(item => {
										let t = new Date(formatTime(item.addtime));
										item.addtime = `${t.getFullYear()}年${t.getMonth() +
											1}月${t.getDate()}日`;
									});
									//筛选出未完成试卷
									this.unFinishedExampapers = this.exampapers;
									for (let i = 0; i < this.unFinishedExampapers.length; i++) {
										for (let j = 0; j < this.finishedExampapers.length; j++) {
											if (
												this.unFinishedExampapers[i].exampaperTitle ==
												this.finishedExampapers[j].finishedExampaper
											) {
												this.unFinishedExampapers.splice(i, 1);
												if (i > 0) i--;
											}
										}
									}
									//赋值到store
									let c = [];
									this.unFinishedExampapers.forEach(item => {
										c.push(item.exampaperTitle);
									});
									this.$store.state.unFinishedExampapers = c;
								});
						})
						.catch(err => {
							console.error(err);
							this.$message.error("出错了，请检查网络或联系管理员。");
						});
				}
			}
		},
		computed: {
			headText() {
				if (this.$store.state.name) {
					let c = this.$store.state.name.split("");
					return `${c[c.length - 2]}${c[c.length - 1]}`;
				}
			},
			oddUnFinishedExampapers() {
				let oddUnFinishedExampapers = [];
				for (let i = 0; i < this.unFinishedExampapers.length; i++) {
					if (i % 2 == 0) {
						oddUnFinishedExampapers.push(this.unFinishedExampapers[i]);
					}
				}
				return oddUnFinishedExampapers;
			},
			oddFinishedExampapers() {
				let oddFinishedExampapers = [];
				for (let i = 0; i < this.finishedExampapers.length; i++) {
					if (i % 2 == 0) {
						oddFinishedExampapers.push(this.finishedExampapers[i]);
					}
				}
				return oddFinishedExampapers;
			},
			evenUnFinishedExampapers() {
				let evenUnFinishedExampapers = [];
				for (let i = 0; i < this.unFinishedExampapers.length; i++) {
					if (i % 2 != 0) {
						evenUnFinishedExampapers.push(this.unFinishedExampapers[i]);
					}
				}
				return evenUnFinishedExampapers;
			},
			evenFinishedExampapers() {
				let evenFinishedExampapers = [];
				for (let i = 0; i < this.finishedExampapers.length; i++) {
					if (i % 2 != 0) {
						evenFinishedExampapers.push(this.finishedExampapers[i]);
					}
				}
				return evenFinishedExampapers;
			}
		},
		mounted() {
			this.initPage();
		}
		// watch: {
		//     '$route' (to, from) {
		//         this.initPage();
		//     }
		// }
	};
</script>
