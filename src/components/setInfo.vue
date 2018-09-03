<template>
  <div class="myInfo">
    <div class="xianShi">
      <br>
      <h3>账号设置</h3>
      <br>
      <hr>
      <ul>
        <li><span  @click="showPersonalMessage">基本资料</span></li>
        <li><span  @click="showPersonalPhoto" >我的头像</span></li>
        <li><span>密码管理</span></li>
        <li><span>应用管理</span></li>
      </ul>
      <div id="personalName" v-show="personalName">
        <label>昵称：</label>
        <div id="peName" >
          <p>{{personNmae}}</p>
        </div>
      </div>
      <div id="myPhoto" v-show="personalPhoto">
        <div class="viewPhoto">
          <img src="" alt="" id="portrait"style="width: 300px;height: 300px" />
        </div>
        <div class="listBox">
          <dl>
            <dt>请上传图片</dt>
            <dd>
              <input type="file"id="saveImage" name="myphoto" >
            </dd>
          </dl>
        </div>
        <div class="save">
          <input type="button"  value="保存图片" @click="imageSubmit">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import router from '../router/index'
    export default {
      name: "set-info",
      data(){
        return {
          personalName:true,
          personalPhoto:false,
          personNmae:sessionStorage.getItem("personName"),
          imageSave:''
        }
      },
      methods:{
        showPersonalMessage(){
          this.personalName = true;
          this.personalPhoto = false;
        },
        showPersonalPhoto(){
          this.personalPhoto = true;
          this.personalName = false;
        },
        great(){
          document.getElementById('saveImage').onchange = function () {
          var imgFile = this.files[0];
          var fr = new FileReader();
          fr.onload = function () {
            document.getElementById('portrait').src = fr.result;
          };
          fr.readAsDataURL(imgFile);
          }
        },
        imageSubmit(){
          let x = document.getElementById('saveImage').files[0];
          console.log(x);
          let params = new FormData() ; //创建一个form对象
          params.append('file',x,x.name);  //append 向form表单添加数据
          //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$axios.post("/user/image",params,config)
            .then(function(res){
              console.log(res);
              this.imageSave = res.data.image;
              sessionStorage.setItem('headImg',this.imageSave);
              router.go(0);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        }
      },
      mounted(){
        this.great();
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  /*账号设置*/
  .xianShi{
    width: 60%;
    margin-left: 40px;
    float:left;
    margin-top: 20px;
  }
  .xianShi p{
    margin-bottom: 10px;
  }
  .xianShi ul{
    margin-top: 20px;
    margin-left: 10px;
  }
  .xianShi ul li{
    float: left;
    margin-right: 20px;
    list-style-type: none;
  }
  .xianShi span{
    text-decoration: none;
    color: black;
    cursor: pointer;
    display: block;
    padding: 5px;
  }
  .xianShi span:hover{
    background-color: #faa046;
  }
  /*个人资料*/
  #personalName{
    width: 100%;
    height: 300px;
    display: block;
    margin-top: 105px;
  }
  label{
    display: inline-block;
    margin-left: 10px;
    width: 100px;
    padding: 10px;
    text-align: center;
    background-color: #f3f5f7;
    font-weight: 700;
  }
  #peName{
    margin-top: 10px;
    border-bottom: 1px dashed black;
    margin-left: 60px;
  }
  /*我的头像*/
  #myPhoto{
    position: relative;
    clear: both;
    margin-top: 20px;
    width: 100%;
    float: left;
  }
  .viewPhoto{
    position: relative;
    width: 300px;
    height: 300px;

    float: left;
    margin-left: 40px;
    margin-top: 30px;
    background-image: url("../assets/viewport_background.gif");
  }
  .listBox{
    float: left;
    width:230px ;
    height: 90px;
    background-color: #fffdea;
    margin-left: 40px;
    margin-top: 30px;
  }
  .listBox input{
    width: 220px;
    margin-top: 20px;
    margin-left: 15px;
  }
  .listBox dt{
    margin-left: 15px;
    color: #a7a7a7;
    font-size: 12px;
    margin-top: 10px;
  }
  .save{
    position: absolute;
    left: 350px;
    top: 310px;
  }
</style>
