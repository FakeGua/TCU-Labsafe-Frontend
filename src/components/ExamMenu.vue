<template>
    <menu>
        <ul>
            <li @click="$router.replace('/exam');checkMenu($event)" style="background:#032d5c">每日一测</li>
            <li @click="$router.replace('/exam/download');checkMenu($event)">课件资料</li>
            <li @click="$router.replace('/exam/category/自测');checkMenu($event)">自测</li>
            <li @click="$router.replace('/exam/category/考试');checkMenu($event)">考试</li>
            <li @click="$router.replace('/exam');checkMenu($event)">个人中心</li>
            <div class="exam" @click="$router.replace('/')">回到首页</div>
        </ul>
    </menu>
</template>

<style lang="scss" scoped>
    $tcuColor:rgb(4, 60, 122);
    menu {
        padding: 0;
        ul {
            font-size: 18px;
            padding: 0;
            text-align: center;
            list-style: none;
            li {
                padding: 10px 60px;
                margin: 5px 0;
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
            margin-top: 30px;
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
            return {
                categorys: ['课件资料', '自测', '考试', '个人中心']
            }
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

