<template>
    <div class="home">
        <div class="body">
            <Header></Header>
            <div class="article">
                <el-row>
                    <el-col :offset="21" :span='3'>
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item><a href="/">{{article.article_classify}}</a></el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <header class="article_title">{{article.article_title}}</header>
                    </el-col>
                </el-row>
                <div class="article_smalltitle">发布时间：{{articleTime}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;作者：{{article.article_author}}</div>
                <br>
                <hr>
                <br>
                <article class="article_body">
                    <div v-html="article.article_body"></div>
                </article>
            </div>
            <br>
            <br>
            <br>
            <Footer></Footer>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $tcuColor:rgb(4, 60, 122);
    .body {
        width: 1100px;
        margin: auto;
        .article_title {
            font-size: 28px;
            padding: 20px;
            text-align: center;
        }
        .article_smalltitle {
            color: gray;
        }
        .article_body {
            overflow: auto;
            //TODO：换行处理
        }
    }
</style>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'
    import Axios from 'axios';
    // import Axios from 'axios';
    export default {
        name: 'articlePage',
        props: [],
        components: {
            Header,
            Footer
        },
        data() {
            return {
                article: {}
            }
        },
        computed: {
            articleTime: function() {
                let t = new Date(this.article.article_time);
                return `${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`
            }
        },
        created() {
            Axios.get(`http://localhost:8086/article/getarticle?id=${this.$route.params.id}`).then((result) => {
                this.article = result.data[0];
            }).catch((err) => {
                console.error(err);
            })
        },
    }
</script>

