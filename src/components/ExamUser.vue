<template>
    <div class="body">
        <div class="header">
            <div class="head">
            </div>
            <div class="h3">欢迎你,{{this.$store.state.username}}</div>
        </div>
        <br>
        <div class="content">
            <div>
                <h3>未完成试卷</h3>
                <hr>
                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="exampapers" v-for="(item, index) in oddInFinishedExampapers" :key="index">
                                <div class="h5">{{item.exampaper_title}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="exampapers" v-for="(item, index) in evenInFinishedExampapers" :key="index">
                                <div class="h5">{{item.exampaper_title}}</div>
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
                                <div class="h5">{{item.exampaper_title}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="exampapers" v-for="(item, index) in evenFinishedExampapers" :key="index">
                                <div class="h5">{{item.exampaper_title}}</div>
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
            height: 500px;
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
                inFinishedExampapers: [],
                finishedExampapers: [],
                exampapers: []
            }
        },
        computed: {
            oddInFinishedExampapers() {
                let oddInFinishedExampapers = [];
                for (let i = 0; i < this.inFinishedExampapers.length; i++) {
                    if (i % 2 == 0) {
                        oddInFinishedExampapers.push(this.inFinishedExampapers[i]);
                    }
                }
                return oddInFinishedExampapers;
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
            evenInFinishedExampapers() {
                let evenInFinishedExampapers = [];
                for (let i = 0; i < this.inFinishedExampapers.length; i++) {
                    if (i % 2 != 0) {
                        evenInFinishedExampapers.push(this.inFinishedExampapers[i]);
                    }
                }
                return evenInFinishedExampapers;
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
                    axios.get(`${domain}/exam/getfinishedexampapers?username=${this.$store.state.username}`).then((data) => {
                        this.finishedExampapers = data.data;
                    })
                    for (let i = 0; i < this.exampapers.length; i++) {
                        if (this.exampapers[i].exampaper_category != '考试') {
                            continue;
                        }
                        for (let j = 0; j < this.finishedExampapers.length; j++) {
                            if (this.exampapers[i].exampaper_title == this.finishedExampapers[j].exampaper_title) {
                                continue;
                            }
                        }
                        this.inFinishedExampapers.push(this.exampapers[i]);
                    }
                })
            }
        },
    }
</script>
