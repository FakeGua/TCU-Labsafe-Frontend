<template>
    <div>
        <footer>
            <div class="friend">
                天津城建大学 | 天津城建大学教务处 | 联系我们
            </div>
            <hr>
            <div>
                地址：天津市西青区津静公路26号天津城建大学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮编：300384
            </div>
            <br>
            <div class="copyright">
               ©天津城建大学 2018 All Right Reserved. Powered by Pan.
            </div>
        </footer>
    </div>
</template>

<style scoped lang="scss">
    $tcuColor:rgb(4, 60, 122);
    footer {
        hr {
            border-color: whitesmoke;
        }
        height: 150px;
        width: 100%; // background-color: whitesmoke;
        font-size: 14px;
        .copyright {
            color: whitesmoke;
            height: 20px;
            padding: 20px;
            background-color: $tcuColor;
        }
    }
</style>

<script>
    export default {
        name: 'Footer'
    }
</script>

