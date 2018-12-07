<template>
	<div class="body">
		<div class="exampaper">
			<img src="../assets/index/back.svg" alt @click="$router.go(-1)">
			<div class="display-4 text-center" v-text="ep"></div>
			<div v-if="questions.length>0">
				<div class="text-muted">考生学号：{{$store.state.username}}</div>
				<div class="text-muted">总分 {{allMarks}} 分 | 共 {{questions.length}} 题</div>
				<div class="text-muted">考试时间：60分钟</div>
				<hr>
				<br>
				<div class="question-container">
					<div
						v-if="questions.length>=1"
						class="question"
						v-for="(item, index) in questions"
						:key="index"
					>
						<h6>{{index+1}}、 {{item.question_title}}</h6>
						<hr>
						<div v-if="item.question_category=='选择题'" class="options">
							<div class="row">
								<div class="col-6">
									<div
										class="option"
										data-option="a"
										v-if="item.option_a"
										@click="chooseOption(index,'a',item.question_mark,$event)"
									>
										<span>A</span>
										{{item.option_a}}
									</div>
									<div
										class="option"
										data-option="c"
										v-if="item.option_c"
										@click="chooseOption(index,'c',item.question_mark,$event)"
									>
										<span>C</span>
										{{item.option_c}}
									</div>
								</div>
								<div class="col-6">
									<div
										class="option"
										data-option="b"
										v-if="item.option_b"
										@click="chooseOption(index,'b',item.question_mark,$event)"
									>
										<span>B</span>
										{{item.option_b}}
									</div>
									<div
										class="option"
										data-option="d"
										v-if="item.option_d"
										@click="chooseOption(index,'d',item.question_mark,$event)"
									>
										<span>D</span>
										{{item.option_d}}
									</div>
								</div>
							</div>
						</div>
						<div v-if="item.question_category=='判断题'" class="options">
							<div class="row">
								<div class="col-6">
									<div
										class="option"
										data-option="t"
										@click="chooseOption(index,'t',item.question_mark,$event)"
									>
										<span>True</span>
									</div>
								</div>
								<div class="col-6">
									<div
										class="option"
										data-option="f"
										@click="chooseOption(index,'f',item.question_mark,$event)"
									>
										<span>False</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br>
				<div class="btn btn-success w-100" @click="submitAnswer()">我已确认完成，提交吧！</div>
				<div class="hint">
					<div class="text-center">
						<span class>距离考试结束还有</span>
						<span>{{countDownHour}}:{{countDownMinute}}</span>
					</div>
					<div class="question-items" id="question-items">
						<div class="question-item" v-for="(item, index) in questions" :key="index"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	$tcuColor: rgb(4, 60, 122);
	.body {
		min-height: 100%;
		background: $tcuColor; // padding: 30px 0;
		overflow: auto;
		.hint {
			background: white; // height: 200px;
			width: 200px;
			box-shadow: 2px 2px 10px lightgray;
			position: fixed;
			bottom: 100px;
			right: 100px;
			border-radius: 10px;
			padding: 20px;
			.question-items {
				display: flex;
				flex-wrap: wrap;
				padding: 10px 0;
				.question-item {
					background: gray;
					height: 10px;
					width: 10px;
					border-radius: 10px;
					margin: 5px;
				}
				.checked-item {
					background: green;
				}
			}
		}
		.exampaper {
			position: relative; // box-shadow: 2px 2px 10px lightgray;
			width: 90%;
			margin: 30px auto;
			padding: 66px;
			border-radius: 10px;
			background: white;
			overflow: hidden;
			img {
				position: absolute;
				height: 150px;
				right: -30px;
				top: -34px;
				color: white;
				cursor: pointer;
			}
			.question-container {
				.question {
					background: whitesmoke;
					padding: 20px;
					margin-bottom: 20px;
					border-radius: 10px;
					.options {
						.option {
							margin-bottom: 10px;
							overflow: hidden;
							height: 40px;
							display: flex;
							align-items: center;
							cursor: pointer;
							span {
								color: lightgray;
								font-style: italic;
								font-weight: 900;
								font-size: 60px;
								display: inline-block;
								width: 80px;
								text-align: center;
								height: 84px;
							}
							&:hover {
								background: gainsboro;
								border-radius: 10px;
								color: white;
								span {
									color: white;
								}
							}
						}
						.checked-option {
							background: gainsboro;
							border-radius: 10px;
							color: white;
							span {
								color: white;
							}
						}
					}
				}
			}
		}
	}
</style>


<script>
	import axios from "axios";
	import domain from "../libs/domain";
	export default {
		name: "exampaper",
		props: ["ep"],
		data: () => {
			return {
				questions: [],
				answers: [],
				choosedOptions: [],
				countDown: 3600,
				submitMsg: "我已确认完成，提交"
			};
		},
		computed: {
			allMarks: function() {
				let m = 0;
				for (let i in this.questions) {
					m += this.questions[i].question_mark;
				}
				return m;
			},
			countDownHour: function() {
				return Math.floor(this.countDown / 60) < 10
					? `0${Math.floor(this.countDown / 60)}`
					: Math.floor(this.countDown / 60);
			},
			countDownMinute: function() {
				return Math.floor(this.countDown % 60) < 10
					? `0${Math.floor(this.countDown % 60)}`
					: Math.floor(this.countDown % 60);
			}
		},
		mounted() {
			if (!this.$store.state.isLogined) {
				this.$router.replace("/login");
			}
			//倒计时
			setInterval(() => {
				this.countDown--;
			}, 1000);
			//获取题目
			axios
				.get(`${domain}/exam/getexamquestions?exampaper=${this.ep}`)
				.then(data => {
					if (data.data.length != 0) {
						for (let i = 0; i < data.data.length; i++) {
							let t = new Date(data.data[i].addtime);
							data.data[i].addtime = `${t.getFullYear()}-${t.getMonth() +
								1}-${t.getDate()}`;
							this.answers.push(data.data[i].question_answer);
						}
						this.questions = data.data;
					}
				})
				.catch(err => {
					console.error(err);
					this.$message.error("出错了，请检查网络或联系管理员。");
				});
		},
		watch: {
			countDown() {
				if (this.countDown < 0) {
					alert("考试结束。");
					this.$router.go(-1);
				}
			}
		},
		methods: {
			chooseOption(index, option, mark, event) {
				this.choosedOptions[index] = {
					option,
					mark
				};
				//选项变色
				let e = event.currentTarget.parentNode.parentNode.getElementsByClassName(
					"option"
				);
				for (let i = 0; i < e.length; i++) {
					if (e[i].dataset.option.toLowerCase() === option) {
						e[i].classList.add("checked-option");
					} else {
						e[i].classList.remove("checked-option");
					}
				}
				//提示变色
				let m = document.getElementById("question-items").children;
				for (let i = 0; i < m.length; i++) {
					if (i === index) {
						m[i].classList.add("checked-item");
					}
				}
			},
			submitAnswer() {
				if (
					this.choosedOptions.includes(undefined) ||
					this.choosedOptions.length != this.answers.length
				) {
					this.$message.error("还有题目没答！");
				} else {
					this.$message("提交中...");
					let score = this.allMarks;
					for (let i = 0; i < this.answers.length; i++) {
						if (this.answers[i] != this.choosedOptions[i].option) {
							score -= this.choosedOptions[i].mark;
						}
					}
					//将分数记录上传到服务器
					let o = [];
					this.choosedOptions.forEach(item => {
						o.push(item.option);
					});
					axios
						.post(`${domain}/exam/addfinishedexampaper`, {
							username: this.$store.state.username,
							finishedExampaper: this.ep,
							finishedScore: score,
							finishedOptions: o
						})
						.then(() => {
							if (score >= 60) {
								this.$message.closeAll();
								this.$alert(`你的成绩为${score},恭喜及格。`, "提交成功", {
									confirmButtonText: "我知道了",
									callback: () => {
										this.$router.replace("/exam");
									}
								});
							} else {
								this.$message.closeAll();
								this.$alert(
									`你的成绩为${score}，还需要继续努力啊！`,
									"提交成功",
									{
										confirmButtonText: "我知道了",
										callback: () => {
											this.$router.replace("/exam");
										}
									}
								);
							}
						})
						.catch(err => {
							this.$message.error("出错啦，请联系管理员。");
							console.error(err);
						});
				}
			}
		},
		beforeRouteEnter(to, from, next) {
			//进入全屏
			var e = document.documentElement;
			if (e.requestFullscreen) e.requestFullscreen();
			else if (e.mozRequestFullScreen) e.mozRequestFullScreen();
			else if (e.webkitRequestFullScreen) e.webkitRequestFullScreen();
			else if ("undefined" != typeof window.ActiveXObject) {
				var t = new ActiveXObject("WScript.Shell");
				t && t.SendKeys("{F11}");
			}
			next();
		},
		beforeRouteLeave(to, from, next) {
			//退出全屏
			var e = document;
			e.exitFullscreen
				? e.exitFullscreen()
				: e.mozCancelFullScreen
				? e.mozCancelFullScreen()
				: e.webkitCancelFullScreen && e.webkitCancelFullScreen();
			next();
		}
	};
</script>
