<template>
	<div>
		<div
			class="exampaper"
			v-for="(item, index) in exampapers"
			:key="index"
			@click="judgeFinished(item)"
		>
			<img src="../assets/exam/exampapersTitle.svg" alt>
			<div>
				<div class="title h4" v-text="item.exampaperTitle"></div>
				<div class="info text-muted">{{item.addtime}}</div>
			</div>
			<img src="../assets/exam/exampapersTitle.svg" alt>
		</div>
		<div class="hint text-muted">没有更多啦</div>
	</div>
</template>

<style lang="scss" scoped>
	.exampaper {
		box-shadow: 2px 2px 10px lightgray;
		height: 100px;
		width: 90%;
		margin: 16px auto;
		padding: 24px;
		border-radius: 5px;
		background: white;
		text-align: center;
		display: flex;
		justify-content: space-around;
		&:hover {
			box-shadow: 2px 2px 30px lightgray;
			cursor: pointer;
			transition: 0.4s;
		}
		.context {
			height: 70px;
			width: 100%;
			margin-top: 14px;
			overflow: hidden;
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
	import formatTime from '../libs/formatTime';
	export default {
		props: ["cy"],
		name: "exampapers",
		data: () => {
			return {
				exampapers: []
			};
		},
		methods: {
			initPage() {
				axios
					.get(`${domain}/exam/exampapers?category=${this.cy}`)
					.then(data => {
						data.data.forEach((element, index, arr) => {
							let t = new Date(formatTime(element.addtime));
							element.addtime = `${t.getFullYear()}-${t.getMonth() +
								1}-${t.getDate()}`;
						});
						this.exampapers = data.data;
					})
					.catch(err => {
						console.error(err);
						this.$message.error("出错了，请检查网络或联系管理员。");
					});
			},
			judgeFinished(item) {
				if (
					this.$store.state.unFinishedExampapers.includes(item.exampaperTitle)
				) {
					this.$confirm(
						"考试时间为60分钟，请确保考试途中网络畅通以及无他人干扰。",
						"即将考试",
						{
							confirmButtonText: "我已明白",
							cancelButtonText: "再等等",
							type: "warning"
						}
					).then(result => {
                        this.$router.push("/exampaper/" + item.exampaperTitle);
					});
				} else {
					this.$message.error("你已经做过这套试卷了。");
				}
			}
		},
		mounted() {
			this.initPage();
		},
		watch: {
			$route(to, from) {
				this.initPage();
			}
		}
	};
</script>
