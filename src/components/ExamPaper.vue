<template>
    <div>
        <div class="exampaper">
            <img src="../assets/index/back.svg" alt="" @click="$router.go(-1)">
            <h4 v-text="questions[0].question_exampaper"></h4>
            <div class="text-muted">总分 {{allMarks}} 分 | 共 {{questions.length == 1 ? 0 : questions.length}} 题</div>
            <hr>
            <br>
            <form class="question-container">
                <div v-if="questions.length>=2" class="question" v-for="(item, index) in questions" :key="index">
                    <h5>{{index+1}}、 {{item.question_title}}</h5>
                    <hr>
                    <div v-if="item.question_category=='选择题'" class="options">
                        <div class="option" v-if="item.option_a" @click="chooseOption(index,'a')"><span>A</span>{{item.option_a}}</div>
                        <div class="option" v-if="item.option_a" @click="chooseOption(index,'b')"><span>B</span>{{item.option_b}}</div>
                        <div class="option" v-if="item.option_a" @click="chooseOption(index,'c')"><span>C</span>{{item.option_c}}</div>
                        <div class="option" v-if="item.option_a" @click="chooseOption(index,'d')"><span>D</span>{{item.option_d}}</div>
                    </div>
                    <div v-if="item.question_category=='判断题'" class="options">
                        <div class="option" @click="chooseOption(index,'t')"><span>True</span></div>
                        <div class="option" @click="chooseOption(index,'f')"><span>False</span></div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .exampaper {
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
                        height: 50px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        span {
                            color: lightgray;
                            font-weight: 900;
                            font-size: 80px;
                            display: inline-block;
                            width: 80px;
                            height: 110px;
                        }
                        &:hover {
                            background: gainsboro;
                            border-radius: 10px;
                            span {
                                color: white;
                            }
                        }
                    }
                    .checked-option {
                        background: gainsboro;
                        border-radius: 10px;
                        span {
                            color: white;
                        }
                    }
                }
            }
        }
    }
</style>


<script>
    import axios from 'axios';
    import domain from '../domain';
    export default {
        name: 'exampaper',
        props: ['ep'],
        data: () => {
            return {
                questions: [{
                    question_exampaper: '出错了，请检查网络或联系开发者。'
                }],
                optionClass:'option',
                checkedOptionClass:'checked-option',
                chooseOptions: []
            }
        },
        computed: {
            allMarks: function() {
                let m = 0;
                for (let i in this.questions) {
                    m += this.questions[i].question_mark;
                }
                return m;
            }
        },
        mounted() {
            axios.get(`${domain}/exam/getquestions?exampaper=${this.ep}`).then((data) => {
                if (data.data.length != 0) {
                    for (let i = 0; i < data.data.length; i++) {
                        let t = new Date(data.data[i].addtime);
                        data.data[i].addtime = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                    }
                    this.questions = data.data;
                    console.log(data.data);
                }
            })
        },
        methods: {
            chooseOption(index, option) {
                this.questions[index].checkedOption = option;
                this.chooseOptions[index] = option;
                let o = document.getElementsByClassName
            }
        }
    }
</script>
