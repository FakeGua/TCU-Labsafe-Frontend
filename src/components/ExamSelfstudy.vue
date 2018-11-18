<template>
    <div>
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-4">自学模式</h1>
                <p class="lead">在题库中随机抽取二十道题，点击你要选的选项会立刻显示答案。</p>
                <el-switch v-model="showAnswersSwitch" active-color="#043c7a" active-text="显示答案" inactive-text="隐藏答案" @change="showAnswers"></el-switch>
            </div>
        </div>
        <div class="question-container">
            <div v-if="questions.length>=1" class="question" v-for="(item, index) in questions" :key="index">
                <h6>{{index+1}}、 {{item.question_title}}</h6>
                <hr>
                <div v-if="item.question_category=='选择题'" class="options">
                    <div class="row">
                        <div class="col-6">
                            <div class="option" data-option="a" v-if="item.option_a" @click="chooseOption(index,'a',item.question_answer,$event)"><span>A</span>{{item.option_a}}</div>
                            <div class="option" data-option="c" v-if="item.option_c" @click="chooseOption(index,'c',item.question_answer,$event)"><span>C</span>{{item.option_c}}</div>
                        </div>
                        <div class="col-6">
                            <div class="option" data-option="b" v-if="item.option_b" @click="chooseOption(index,'b',item.question_answer,$event)"><span>B</span>{{item.option_b}}</div>
                            <div class="option" data-option="d" v-if="item.option_d" @click="chooseOption(index,'d',item.question_answer,$event)"><span>D</span>{{item.option_d}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="item.question_category=='判断题'" class="options">
                    <div class="row">
                        <div class="col-6">
                            <div class="option" data-option="t" @click="chooseOption(index,'t',item.question_answer,$event)"><span>True</span></div>
                        </div>
                        <div class="col-6">
                            <div class="option" data-option="f" @click="chooseOption(index,'f',item.question_answer,$event)"><span>False</span></div>
                        </div>
                    </div>
                </div>
                <div class="explain d-none">
                    <hr>
                    <h6>解析：</h6>
                    <span v-text="item.question_explain? item.question_explain:'无'"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .question-container {
        .question {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 2px 2px 10px lightgray;
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
                .bingo-option {
                    background: green;
                    border-radius: 10px;
                    color: white;
                    span {
                        color: white;
                    }
                    &:hover {
                        background: green;
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
        name: 'examselfstudy',
        data: () => {
            return {
                questions: [],
                answers: [],
                showAnswersSwitch: false,
            }
        },
        computed: {},
        mounted() {
            axios.get(`${domain}/exam/getselfstudyquestions`).then((data) => {
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
            chooseOption(index, option, answer, event) {
                let e = event.currentTarget.parentNode.parentNode.getElementsByClassName('option');
                for (let i = 0; i < e.length; i++) {
                    if (e[i].dataset.option.toLowerCase() == option) {
                        e[i].classList.add('checked-option');
                    } else {
                        e[i].classList.remove('checked-option');
                    }
                    if (e[i].dataset.option == answer) {
                        e[i].classList.add('bingo-option');
                    }
                }
                let x = event.currentTarget.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('explain')[0];
                x.classList.remove('d-none');
            },
            showAnswers() {
                if (this.showAnswersSwitch == true) {
                    let e = document.getElementsByClassName('options');
                    for (let i = 0; i < e.length; i++) {
                        let o = e[i].getElementsByClassName('option');
                        for (let j = 0; j < o.length; j++) {
                            if (o[j].dataset.option.toLowerCase() == this.answers[i]) {
                                o[j].classList.add('bingo-option');
                            }
                        }
                        e[i].parentNode.querySelector('.explain').classList.remove('d-none');
                    }
                } else {
                    let e = document.getElementsByClassName('options');
                    for (let i = 0; i < e.length; i++) {
                        let o = e[i].getElementsByClassName('option');
                        for (let j = 0; j < o.length; j++) {
                            if (o[j].dataset.option.toLowerCase() == this.answers[i]) {
                                o[j].classList.remove('bingo-option');
                            }
                        }
                        e[i].parentNode.querySelector('.explain').classList.add('d-none');
                    }
                }
            }
        }
    }
</script>