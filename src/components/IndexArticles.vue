<template>
    <div class="body">
        <div v-if="loading" class="alert alert-success" role="alert">
            请稍后，正在加载中……
        </div>
        <div v-if="loadingFail" class="alert alert-danger" role="alert">
            加载失败！请检查网络或联系管理员。
        </div>
        <div class="article" v-for="(item, index) in articles" :key="index" @click="$router.push('/article/'+item.id)">
            <div class="title h4" v-text="item.article_title"></div>
            <div class="info text-muted">
                {{item.article_author}} | {{item.article_category}} | {{item.addtime}}
            </div>
            <div class="context">
                <h5 class="d-inline-block"><span class="badge badge-light badge-pill">摘要</span></h5>&nbsp;<span v-text="item.article_body"></span>
            </div>
        </div>
        <div v-if="!(loading) && !(loadingFail)" class="hint text-muted">
            没有更多啦！
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
                transition: .4s;
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
    }
</style>


<script>
    import axios from 'axios';
    import domain from '../libs/domain';
    import regexp from '../libs/regexp';
    export default {
        name: 'indexcategory',
        props: ['cy'],
        data: () => {
            return {
                articles: [],
                loading: true,
                loadingFail: false
            }
        },
        mounted() {
            axios.get(`${domain}/article/getcategory?category=${this.cy}`).then((data) => {
                data.data.forEach((element, index, arr) => {
                    let t = new Date(element.addtime);
                    element.addtime = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                    element.article_body = element.article_body.match(regexp)? element.article_body.match(regexp).join(''): element.article_body;
                });
                this.articles = data.data;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
                this.loadingFail = true;
                console.error(err);
            })
        },
        watch: {
            '$route' (to, from) {
                axios.get(`${domain}/article/getcategory?category=${this.cy}`).then((data) => {
                    data.data.forEach((element, index, arr) => {
                        let t = new Date(element.addtime);
                        element.addtime = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                        // element.article_body = element.article_body.match(/[^<>/\'"-=:、（）宋体\w]/g).join('');
                        element.article_body = element.article_body.match(regexp).join('');
                    });
                    this.articles = data.data;
                    this.loading = false;
                }).catch((err) => {
                    this.loading = false;
                    this.loadingFail = true;
                    console.error(err);
                })
            }
        }
    }
</script>
