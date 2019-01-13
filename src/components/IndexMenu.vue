<template>
    <menu>
        <ul>
            <li @click="$router.replace('/');checkMenu($event)" style="background:#032d5c">首页</li>
            <li v-for="(item, index) in categorys" :key="index" v-text="item" @click="$router.replace('/articles/category/'+item);checkMenu($event)"></li>
            <div class="exam" @click="$router.replace('/exam')">考试中心</div>
        </ul>
        <!-- <div class="exam" onclick="alert('敬请期待～')">考试中心</div> -->
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
        name: 'indexmenu',
        data: () => {
            return {
                categorys: ['通识类', '消防安全', '化学安全', '电气安全', '辐射安全', '特种设备']
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

