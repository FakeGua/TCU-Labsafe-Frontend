<template>
    <div class="body">
        <div class="header">
            <div class="head" @click="updateUsername">
            </div>
            <div class="h3">你好 ，{{this.$store.state.name}} 。</div>
        </div>
        <br>
        <div class="content">
            <div>
                <h3>未完成试卷</h3>
                <hr>
                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="exampapers" v-for="(item, index) in oddUnFinishedExampapers" :key="index">
                                <div class="h5">{{item.exampaper_title}}</div>
                                <div class="h6 text-muted">发布日期：{{item.addtime}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="exampapers" v-for="(item, index) in evenUnFinishedExampapers" :key="index">
                                <div class="h5">{{item.exampaper_title}}</div>
                                <div class="h6 text-muted">发布日期：{{item.addtime}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div>
                <h3>已完成试卷</h3>
                <hr>
                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="exampapers" v-for="(item, index) in oddFinishedExampapers" :key="index">
                                <div class="h5">{{item.finished_exampaper}}</div>
                                <div class="h6 text-muted">得分：<span class="text-warning">{{item.finished_score}}</span>&nbsp;&nbsp;&nbsp;完成日期：{{item.addtime}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="exampapers" v-for="(item, index) in evenFinishedExampapers" :key="index">
                                <div class="h5">{{item.finished_exampaper}}</div>
                                <div class="h6 text-muted">得分：<span class="text-warning">{{item.finished_score}}</span>&nbsp;&nbsp;&nbsp;完成日期：{{item.addtime}}</div>
                            </div>
                        </div>
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
            height: 300px;
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
                }
                &:hover {
                    box-shadow: 2px 2px 30px lightgray;
                    cursor: pointer;
                    transition: .4s;
                }
            }
        }
    }
</style>

<script>
    import axios from 'axios'
    import domain from '../domain'
    export default {
        name: 'examuser',
        data() {
            return {
                unFinishedExampapers: [],
                finishedExampapers: [],
                exampapers: []
            }
        },
        methods: {
            updateUsername() {
            }
        },
        computed: {
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
            if (this.$store.state.username) {
                axios.get(`${domain}/exam/getexampapers`).then((data) => {
                    this.exampapers = data.data;
                    this.exampapers.forEach(item => {
                        let t = new Date(item.addtime);
                        item.addtime = `${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`;
                    })
                    axios.get(`${domain}/exam/getfinishedexampapers?username=${this.$store.state.username}`).then((data) => {
                        this.finishedExampapers = data.data;
                        this.finishedExampapers.forEach(item => {
                            let t = new Date(item.addtime);
                            item.addtime = `${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`;
                        })
                        //筛选出未完成试卷
                        this.unFinishedExampapers = this.exampapers;
                        this.unFinishedExampapers.forEach((item, index) => {
                            this.finishedExampapers.forEach(item2 => {
                                if (item.exampaper_title == item2.finished_exampaper) {
                                    this.unFinishedExampapers.splice(index, 1);
                                }
                            })
                        })
                        //赋值到store
                        let c = [];
                        this.unFinishedExampapers.forEach(item => {
                            c.push(item.exampaper_title);
                        })
                        this.$store.state.unFinishedExampapers = c;
                    })
                }).catch(err => {
                    console.error(err);
                    this.$message.error('出错了，请检查网络或联系管理员。');
                })
            }
        },
    }
</script>
