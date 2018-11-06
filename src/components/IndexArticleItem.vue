<template>
    <div>
        <div class="article-item">
            <img src="../assets/back.svg" alt="" @click="$router.go(-1)">
            <h4 v-text="article.article_title"></h4>
            <div class="text-muted">{{article.article_author}} | {{article.article_classify}} | {{article.article_time}}</div>
            <hr>
            <br>
            <div v-html="article.article_body"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .article-item {
        position: relative;
        box-shadow: 2px 2px 10px lightgray;
        width: 90%;
        margin: auto;
        padding: 66px;
        border-radius: 5px;
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
    }
</style>


<script>
    import axios from 'axios';
    export default {
        name: 'indexarticleitem',
        props: ['id'],
        data: () => {
            return {
                article: {}
            }
        },
        mounted() {
            axios.get(`http://localhost:8086/article/getarticle?id=${this.id}`).then((data) => {
                let t = new Date(data.data[0].article_time);
                data.data[0].article_time = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                this.article = data.data[0];
            })
        }
    }
</script>
