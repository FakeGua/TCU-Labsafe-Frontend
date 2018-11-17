<template>
    <form class="question-container">
        <div v-if="questions.length>=2" class="question" v-for="(item, index) in questions" :key="index">
            <h5>{{index+1}}、 {{item.question_title}}</h5>
            <hr>
            <div v-if="item.question_category=='选择题'" class="options">
                <div class="option" data-option="a" v-if="item.option_a" @click="chooseOption(index,'a',item.question_mark,$event)"><span>A</span>{{item.option_a}}</div>
                <div class="option" data-option="b" v-if="item.option_b" @click="chooseOption(index,'b',item.question_mark,$event)"><span>B</span>{{item.option_b}}</div>
                <div class="option" data-option="c" v-if="item.option_c" @click="chooseOption(index,'c',item.question_mark,$event)"><span>C</span>{{item.option_c}}</div>
                <div class="option" data-option="d" v-if="item.option_d" @click="chooseOption(index,'d',item.question_mark,$event)"><span>D</span>{{item.option_d}}</div>
            </div>
            <div v-if="item.question_category=='判断题'" class="options">
                <div class="option" data-option="t" @click="chooseOption(index,'t',item.question_mark,$event)"><span>True</span></div>
                <div class="option" data-option="f" @click="chooseOption(index,'f',item.question_mark,$event)"><span>False</span></div>
            </div>
        </div>
    </form>
</template>