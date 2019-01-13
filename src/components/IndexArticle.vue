<template>
    <div>
        <div class="article">
            <img src="../assets/index/back.svg" alt="" @click="$router.go(-1)">
            <h4 v-text="article.articleTitle"></h4>
            <div class="text-muted">{{article.articleAuthor}} {{article.articleCategory}} {{article.addtime}}</div>
            <hr>
            <br>
            <div v-html="article.articleBody"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .article {
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
    import domain from '../libs/domain';
    export default {
        name: 'indexarticle',
        props: ['id'],
        data: () => {
            return {
                article: {}
            }
        },
        mounted() {
            axios.get(`${domain}/articles/${this.id}`).then((data) => {
                let t = new Date(data.data.addtime);
                data.data.addtime = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                data.data.articleAuthor = `${data.data.articleAuthor} |`;
                data.data.articleCategory = `${data.data.articleCategory} |`;
                this.article = data.data;
            })
        }
    }
</script>
