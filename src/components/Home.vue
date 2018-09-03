<template>
  <div id="homenav">
    <div class="navLeft">
      <img class="header-icon" src="../assets/icon.png"/>
      <img class="header-font" src="../assets/header-font.png"/>
    </div>
    <div class="navContent">
      <ul>
        <li>
          <router-link @click.native="setClick" to="/home/fenlei/video">在线课堂</router-link>
        </li>
        <li><a>在线实验室</a></li>
        <li><a>任务广场</a></li>
      </ul>
    </div>
    <div class="navSearch">
      <input class="search" type="text" v-model="insearch"
             @keyup.enter="searchVideo" >
    </div>
    <div class="navRight">
      <img class="message" src="../assets/message.png">
      <div class="touxiang">
        <div class="modifymenu">
          <img class="img-circle headp" v-show="!showImg" src="../assets/head.jpg">
          <img class="img-circle headp" v-show="showImg" v-bind:src="this.headImg">
          <ul class="submenu">
            <li>
              <router-link to="/home/personalSpace/setInfo"><p>个人空间</p></router-link>
            </li>
            <li>
              <p @click="loginout">注销登录</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: "homenav",
    data(){
      return {
        insearch:"",
        showImg:true,
        headImg:sessionStorage.getItem('headImg'),
      }
    },
    methods:{
      loginout() {
        store.state.token = null;
        sessionStorage.clear();
        this.$router.push('/');
      },
      searchVideo() {
        sessionStorage.setItem('searchText',this.insearch);
        sessionStorage.setItem('category3', "search");
        this.$router.push({path:'/home/fenlei/video',query:{"search":this.insearch}});
      },
      setClick(){
        sessionStorage.removeItem('category1');
        sessionStorage.removeItem('category2');
        sessionStorage.removeItem('category4');
        sessionStorage.setItem('index','1');
      }
    },
    mounted() {
      if(sessionStorage.getItem('headImg') == 'null') {
        this.showImg = false;
      }
    },
  }

</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  #homenav {
    padding-top: 13px;
    height: 45px;
    width: 100%;
    background-color: #12263d;
  }

  .navLeft {
    width: 180px;
    margin-left: 20px;
    float: left;
  }

  .header-icon {
    margin-left: 20px;
    height: 30px;
  }

  .header-font {
    height: 35px;
  }

  .navContent {
    margin-top: 5px;
    width: 35%;
    margin-left: 4%;
    float: left;
  }

  .navContent ul li {
    list-style-type: none;
    float: left;
    margin-right: 12%;
  }

  .navContent li a {
    text-decoration: none;
    font-size: 16px;
    display: inline;
    color: #cdcdd5;
  }

  .navContent li a:hover {
    color: #FFFFFF;
    cursor: pointer;
  }

  .search {
    width: 100%;
    height: 28px;
    border: 0;
    border-radius: 25px;
    padding-left: 15px;
    background: white url("../assets/search.png") no-repeat 95%;
  }

  .navSearch {
    width: 17%;
    margin-left: 8%;
    float: left;
  }

  .message {
    display: inline-block;
    position: absolute;
    right: 13%;
    top: 10px;
  }

  .touxiang {
    display: inline-block;
    position: absolute;
    right: 2%;
    top: 10px;
  }

  .headp {
    height: 40px;
    border-radius: 25px;
    width: 40px;
  }

  .modifymenu {
    list-style: none;
    padding: 0;
    margin: 0;
    min-width: 100px;
    display: block;
    float: left;
    position: relative;
    background: transparent;
    z-index: 999;
    top: 0;
  }

  .modifymenu p {
    color: #F0F0F0;
    display: block;
    font-size: 16px;
    line-height: 30px;
    padding: 0 20px;
    text-decoration: none;
    text-transform: uppercase;
  }

  /* onhover styles */
  .modifymenu:hover {
    color: #F5F5F5;

  }

  /* submenu styles */
  .submenu {
    margin-top: 5px;
    left: -25%;
    max-height: 0;
    position: absolute;
    top: 100%;
    z-index: 0;

    -webkit-perspective: 400px;
    -moz-perspective: 400px;
    -ms-perspective: 400px;
    -o-perspective: 400px;
    perspective: 400px;
  }

  .submenu li {
    background: #FFFFFF;
    list-style-type: none;
    opacity: 0;

    -webkit-transform: rotateY(90deg);
    -moz-transform: rotateY(90deg);
    -ms-transform: rotateY(90deg);
    -o-transform: rotateY(90deg);
    transform: rotateY(90deg);

    -webkit-transition: opacity .4s, -webkit-transform .5s;
    -moz-transition: opacity .4s, -moz-transform .5s;
    -ms-transition: opacity .4s, -ms-transform .5s;
    -o-transition: opacity .4s, -o-transform .5s;
    transition: opacity .4s, transform .5s;
  }

  .submenu li p {
    color: #909090;
    font-size: 14px;
  }

  .submenu li:hover {
    background: #ECECFF;
    border-radius: 3px;
    cursor: pointer;
  }

  .submenu li:hover p {
    color: #ACD0FF;
  }

  .modifymenu:hover .submenu li, .modifymenu:focus .submenu li {
    opacity: 1;

    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
  }
</style>
