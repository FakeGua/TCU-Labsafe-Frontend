<template>
    <menu>
        <ul>
            <li @click="$router.replace('/exam');checkMenu($event)" style="background:#032d5c">个人中心</li>
            <li @click="$router.replace('/exam/selfstudyquestions');checkMenu($event)">自学</li>
            <li @click="$router.replace('/exam/exampapers/自测');checkMenu($event)">自测</li>
            <li @click="$router.replace('/exam/exampapers/考试');checkMenu($event)">考试</li>
            <li @click="$router.replace('/exam/files');checkMenu($event)">课件资料</li>
            <div class="exam" @click="$router.replace('/')">回到首页</div>
        </ul>
    </menu>
</template>

<style lang="scss" scoped>
    $tcuColor:rgb(4, 60, 122);
    menu {
        padding: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        ul {
            font-size: 16px;
            padding: 0;
            text-align: center;
            list-style: none;
            li {
                padding: 6px 60px;
                margin: 6px 0;
                border-radius: 10px;
                transition: .2s;
                &:hover {
                    background: darken($tcuColor, 6);
                    transition: .2s;
                    cursor: pointer;
                }
            }
        }
        .exam {
            color: white;
            padding: 10px 60px;
            border-radius: 30px;
            border: 2px solid white;
            margin-top: 10px;
            transition: .2s;
            &:hover {
                color: $tcuColor;
                background: white;
                transition: .2s;
            }
        }
    }
</style>

<script>
    export default {
        name: 'exammenu',
        data: () => {
            return {}
        },
        mounted() {
        },
        methods: {
            checkMenu(event) {
                let ul = event.target.parentNode;
                let li = ul.children;
                for (let i = 0; i < li.length; i++) {
                    li[i].style.background = '';
                }
                event.target.style.background = '#032d5c';
            }
        }
    }
</script>

