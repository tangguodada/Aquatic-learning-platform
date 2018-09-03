<template>
    <div id="personal">
      <div class="setUp">
        <div class="personalInfo">
          <img  v-show="!showHeadImg" src="../assets/photo_80.jpg" alt="头像" class="personalHead">
          <img v-show="showHeadImg"  v-bind:src="this.personalHeadImg" alt="头像" class="personalHead">
          <div class="spaceName">
            <p>{{personName}}</p>
            <router-link to="/home/personalSpace/setInfo">账号设置</router-link>
          </div>
        </div>
        <div class="spaceLine">
          <ul>
            <li><router-link @click.native="setclick" to="/home/personalSpace/personalCollection">我的收藏</router-link></li>
            <li><router-link @click.native="setclick" to="/home/personalSpace/personalUpload">我的上传</router-link></li>
          </ul>
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
      name: "personal-space",
      data(){
        return {
          personName:sessionStorage.getItem('personName'),
          showHeadImg:true,
          personalHeadImg:sessionStorage.getItem('headImg'),
        }
      },
      methods:{
        setclick(){
          sessionStorage.setItem('index','1');
        }
      },
      mounted(){
        if(sessionStorage.getItem('headImg')=='null'){
          this.showHeadImg=false;
        }
      }
    }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
#personal{
  /*padding-top: 10px;*/
}
  .setUp{
    clear: both;
    width: 18%;
    height: 500px;
    background-color: #f9f9f9;
    float: left;
    margin-top: 20px;
    margin-left: 6.5%;
  }
  .personalInfo{
    width: 100%;
    height: 200px;
    background: url("../assets/personalBg.jpg") no-repeat #faf7f5 bottom center;
  }
  .personalInfo img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    vertical-align: middle;
    margin-top: 20px;
    margin-left: 80px;
  }
  .spaceName{
    margin-top: 12px;
    text-align: center;
  }
  .spaceName a{
    display: inline-block;
    margin-top: 12px;
    width: 74px;
    height: 26px;
    border-radius: 20px;
    text-decoration: none;
    background: #faa046;
    line-height: 26px;
    color: #fff;
    font-size: 14px;
  }
.spaceLine ul{
  margin-top: 20px;
}
  .spaceLine ul li{
    list-style-type: none;
    margin-top: 20px;
    text-align: center;

  }
</style>
