<template>
  <div class="home">
    <div class="body">
      <Header></Header>
      <div class="carousel">
        <el-carousel :interval="4000" height="250px">
          <el-carousel-item v-for="(carousel, index) in carousels" :key="index">
            <img :src="carousel" alt="" width="100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <br>
      <el-button class="enter-exam" type="primary" round @click="enterExam">进入考试系统</el-button>
      <div class="content">
      </div>
      <!-- ** 内容 ** -->
      <br>
      <article>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card header="通识类" shadow="hover">
              <router-link :to="'/page/'+item.id" class="article_title" v-for="(item, index) in articleTitles.one" :key="index">-&nbsp;&nbsp;&nbsp;{{item.article_title}}</router-link>
              <br>
              <el-button>查看更多</el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card header="消防安全" shadow="hover">
              <router-link :to="'/page/'+item.id" class="article_title" v-for="(item, index) in articleTitles.two" :key="index">-&nbsp;&nbsp;&nbsp;{{item.article_title}}</router-link>
              <br>
              <el-button>查看更多</el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card header="化学安全" shadow="hover">
              <router-link :to="'/page/'+item.id" class="article_title" v-for="(item, index) in articleTitles.three" :key="index">-&nbsp;&nbsp;&nbsp;{{item.article_title}}</router-link>
              <br>
              <el-button>查看更多</el-button>
            </el-card>
          </el-col>
        </el-row>
      </article>
      <br>
      <br>
      <br>
      <Footer></Footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $tcuColor:rgb(4, 60, 122);
  .body {
    width: 1100px;
    margin: auto;
    .enter-exam {
      width: 95%;
      margin: auto;
      display: block;
      background-color: $tcuColor;
      border-color: $tcuColor;
      &:hover {
        background-color: lighten($tcuColor, 6);
      }
    }
    article {
      .article_title {
        font-size: 16px;
        display: block;
        margin-bottom: 10px;
        color: black;
        text-decoration: none;
        &:hover {
          color: dimgrey;
        }
      }
    }
  }
</style>


<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import Axios from 'axios';
  export default {
    name: 'home',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        carousels: {
          one: require('../assets/carousels/1.jpg'),
          two: require('../assets/carousels/2.jpg'),
          three: require('../assets/carousels/3.jpg')
        },
        articleTitles: {
          one: [],
          two: [],
          three: []
        }
      };
    },
    methods: {
      enterExam() {
        this.$message({
          message: '敬请期待',
          center: true,
          type: 'warning'
        })
      }
    },
    computed: {

    },
    mounted() {
      Axios.get('http://localhost:8086/article/getindex').then((result) => {
        for (let i in result.data) {
          switch (result.data[i].article_classify) {
            case '通识类':
              this.articleTitles.one.push(result.data[i]);
              break;
            case '消防安全':
              this.articleTitles.two.push(result.data[i]);
              break;
            case '化学安全':
              this.articleTitles.three.push(result.data[i]);
              break;
            default:
              console.log('Fail.', result.data[i].article_classify);
              break;
          }
        }
      }).catch((err) => {
        console.error(err);
      })
    },
  }
</script>
