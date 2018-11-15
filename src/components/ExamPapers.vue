<template>
    <div>
        <div class="exampaper" v-for="(item, index) in exampapers" :key="index" @click="$router.push('/exam/exampaper/'+item.exampaper_title)">
            <div class="title h4" v-text="item.exampaper_title"></div>
            <div class="info text-muted">
                {{item.addtime}}
            </div>
            <!-- <div class="context">
                <div v-text="item.article_body"></div>
            </div> -->
        </div>
        <div class="hint text-muted">
            没有更多啦
        </div>
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
    import domain from '../domain';
    export default {
        props: ['cy'],
        name: 'exampapers',
        data: () => {
            return {
                exampapers: []
            }
        },
        mounted() {
            axios.get(`${domain}/exam/getexampapers?category=${this.cy}`).then((data) => {
                data.data.forEach((element, index, arr) => {
                    let t = new Date(element.addtime);
                    element.addtime = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                });
                this.exampapers = data.data;
            })
        },
        watch: {
            '$route' (to, from) {
                axios.get(`${domain}/exam/getexampapers?category=${this.cy}`).then((data) => {
                    data.data.forEach((element, index, arr) => {
                        let t = new Date(element.addtime);
                        element.addtime = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                    });
                    this.exampapers = data.data;
                })
            }
        }
    }
</script>
