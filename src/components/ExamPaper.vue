<template>
    <div class="body">
        <div v-if="questions.length>0" class="exampaper">
            <img src="../assets/index/back.svg" alt="" @click="$router.go(-1)">
            <h4 v-text="questions[0].question_exampaper"></h4>
            <div class="text-muted">总分 {{allMarks}} 分 | 共 {{questions.length}} 题</div>
            <hr>
            <br>
            <div class="question-container">
                <div v-if="questions.length>=1" class="question" v-for="(item, index) in questions" :key="index">
                    <h6>{{index+1}}、 {{item.question_title}}</h6>
                    <hr>
                    <div v-if="item.question_category=='选择题'" class="options">
                        <div class="row">
                            <div class="col-6">
                                <div class="option" data-option="a" v-if="item.option_a" @click="chooseOption(index,'a',item.question_mark,$event)"><span>A</span>{{item.option_a}}</div>
                                <div class="option" data-option="c" v-if="item.option_c" @click="chooseOption(index,'c',item.question_mark,$event)"><span>C</span>{{item.option_c}}</div>
                            </div>
                            <div class="col-6">
                                <div class="option" data-option="b" v-if="item.option_b" @click="chooseOption(index,'b',item.question_mark,$event)"><span>B</span>{{item.option_b}}</div>
                                <div class="option" data-option="d" v-if="item.option_d" @click="chooseOption(index,'d',item.question_mark,$event)"><span>D</span>{{item.option_d}}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.question_category=='判断题'" class="options">
                        <div class="row">
                            <div class="col-6">
                                <div class="option" data-option="t" @click="chooseOption(index,'t',item.question_mark,$event)"><span>True</span></div>
                            </div>
                            <div class="col-6">
                                <div class="option" data-option="f" @click="chooseOption(index,'f',item.question_mark,$event)"><span>False</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="btn btn-success w-100" @click="submitAnswer()" v-text="submitMsg"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $tcuColor:rgb(4, 60, 122);
.body{
    min-height: 100%;
    background: $tcuColor;
    padding: 30px 0;
    .exampaper {
        position: relative;
        // box-shadow: 2px 2px 10px lightgray;
        width: 90%;
        margin: auto;
        padding: 66px;
        border-radius: 10px;
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
                        height: 40px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        span {
                            color: lightgray;
                            font-style: italic;
                            font-weight: 900;
                            font-size: 60px;
                            display: inline-block;
                            width: 80px;
                            text-align: center;
                            height: 84px;
                        }
                        &:hover {
                            background: gainsboro;
                            border-radius: 10px;
                            color: white;
                            span {
                                color: white;
                            }
                        }
                    }
                    .checked-option {
                        background: gainsboro;
                        border-radius: 10px;
                        color: white;
                        span {
                            color: white;
                        }
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
                questions: [],
                answers: [],
                chooseOptions: [],
                submitMsg: '我已确认完成，提交'
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
            axios.get(`${domain}/exam/getexamquestions?exampaper=${this.ep}`).then((data) => {
                if (data.data.length != 0) {
                    for (let i = 0; i < data.data.length; i++) {
                        let t = new Date(data.data[i].addtime);
                        data.data[i].addtime = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
                        this.answers.push(data.data[i].question_answer);
                    }
                    this.questions = data.data;
                }
            })
        },
        methods: {
            chooseOption(index, option, mark, event) {
                this.chooseOptions[index] = {
                    option,
                    mark
                };
                let e = event.currentTarget.parentNode.parentNode.getElementsByClassName('option');
                for (let i = 0; i < e.length; i++) {
                    if (e[i].dataset.option.toLowerCase() === option) {
                        e[i].classList.add('checked-option');
                    } else {
                        e[i].classList.remove('checked-option');
                    }
                }
            },
            submitAnswer() {
                if (this.chooseOptions.includes(undefined) || this.chooseOptions.length == 0) {
                    this.submitMsg = '还有题目没答喔！';
                    setTimeout(() => {
                        this.submitMsg = '我已确认完成，提交';
                    }, 2000);
                } else {
                    this.submitMsg = '提交中...';
                    let score = this.allMarks;
                    for (let i = 0; i < this.answers.length; i++) {
                        if (this.answers[i] != this.chooseOptions[i].option) {
                            score -= this.chooseOptions[i].mark;
                        }
                    }
                    this.submitMsg = `你的得分为${score}分`;
                }
            }
        }
    }
</script>
