<template>
    <div>
        <div class="article" v-for="(item, index) in articles" :key="index" @click="$router.push('/article/'+item.id)">
            <div class="title h4" v-text="item.article_title"></div>
            <div class="info text-muted">
                {{item.article_author}} | {{item.article_classify}} | {{item.article_time}}
            </div>
            <div class="context">
                <div v-text="item.article_body"></div>
            </div>
        </div>
        <div class="hint text-muted">
            仅显示最新十条，更多内容请前往左侧文章分类查看。
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .article {
        box-shadow: 2px 2px 10px lightgray;
        height: 200px;
        width: 90%;
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
  import axios from 'axios';
    export default {
        name:'indexarticle',
        data: () => {
            return {
                articles: []
            }
        },
        mounted() {
            axios.get('http://localhost:8086/article/getindex').then((data) => {
                data.data.forEach((element, index, arr) => {
                    let t = new Date(element.article_time);
                    element.article_time = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                    if (element.article_body.match(/[^<>/\'"-=:、（）宋体\w]/g)) {
                        element.article_body = element.article_body.match(/[^<>/\'"-=:、（）宋体\w]/g).join('');
                    }
                });
                this.articles = data.data;
            })
        },
    }
</script>
