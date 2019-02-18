<template>
	<div class="body">
		<div v-if="loading" class="alert alert-success" role="alert">请稍后，正在加载中……</div>
		<div v-if="loadingFail" class="alert alert-danger" role="alert">加载失败！请检查网络或联系管理员。</div>
		<div
			class="article"
			v-for="(item, index) in articles"
			:key="index"
			@click="$router.push('/articles/'+item.id)"
		>
			<div class="title h5 article-title" v-text="item.articleTitle"></div>
			<div class="info text-muted">{{item.articleAuthor}} | {{item.articleCategory}} | {{item.addtime}}</div>
			<div class="context">
				<h5 class="d-inline-block">
					<span class="badge badge-light badge-pill">摘要</span>
				</h5>&nbsp;
				<span v-text="item.articleBody"></span>
			</div>
		</div>
		<div v-if="!(loading) && !(loadingFail)" class="hint text-muted">
			<!-- 没有更多啦！ -->
			<!-- 仅显示最新十条，更多内容请前往左侧文章分类查看。 -->
			<el-pagination
				@current-change="currentChange"
				:current-page="currentPage"
				layout="prev, pager, next"
				:page-count="pageCount"
				background
			></el-pagination>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.body {
		width: 90%;
		margin: auto;
		.article {
			box-shadow: 2px 2px 10px lightgray;
			height: 200px;
			margin: 16px auto;
			padding: 24px;
			border-radius: 5px;
			background: white;
			&:hover {
				box-shadow: 2px 2px 30px lightgray;
				cursor: pointer;
				transition: 0.4s;
			}
			.context {
				height: 80px;
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
			margin: 50px auto 10px auto;
			font-size: 18px;
		}
		.article-title {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
</style>


<script>
	import axios from "axios";
	import domain from "../libs/domain";
	import regexp from "../libs/regexp";
	import formatTime from '../libs/formatTime';
	export default {
		name: "indexcategory",
		props: ["cy"],
		data: () => {
			return {
				articles: [],
				loading: true,
				loadingFail: false,
				currentPage: 1,
				pageCount: 1
			};
		},
		mounted() {
			this.getArticles(1);
		},
		methods: {
			currentChange(c) {
				this.currentPage = c;
				this.getArticles(c);
			},
			getArticles(pageNum) {
				this.loading = true;
				this.loadingFail = false;
				this.articles = [];
				axios
					.get(`${domain}/articles/category/${this.cy}?pageNum=${pageNum}`)
					.then(data => {
						data.data.articleList.forEach((element, index, arr) => {
							let t = new Date(formatTime(element.addtime));
							element.addtime = `${t.getFullYear()}-${t.getMonth() +
								1}-${t.getDate()}`;
							element.articleBody = element.articleBody.match(regexp)
								? element.articleBody.match(regexp).join("")
								: element.articleBody;
						});
						this.articles = data.data.articleList;
						this.pageCount = data.data.pageCount;
						this.loading = false;
					})
					.catch(err => {
						this.loading = false;
						this.loadingFail = true;
						console.error(err);
					});
			}
		},
		watch: {
			$route(to, from) {
				this.getArticles(1);
			}
		}
	};
</script>
