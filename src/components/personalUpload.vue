<template>
  <div class="personalUpload">
    <br>
    <h3>我的上传</h3>
    <el-button type="button" @click="dialogFormVisible = true">我要上传</el-button>
    <el-dialog title="视频信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="视频的名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="所属大类别" :label-width="formLabelWidth">
          <select id="s1" class="el-input__inner" v-model="form.bigcategory" style="width: 50%" @change="move1">
            <option selected label="请选择" value="请选择"></option>
            <option label="种植业" value="种植业"></option>
            <option label="畜牧业" value="畜牧业"></option>
            <option label="水产业" value="水产业"></option>
          </select>
        </el-form-item>
        <el-form-item label="所属小类别" :label-width="formLabelWidth">
          <select id="s2" class="el-input__inner" v-model="form.smallcategory" placeholder="请先选择大类别" style="width: 50%" @change="move2">
          </select>
        </el-form-item>
        <el-form-item label="所属的类别" :label-width="formLabelWidth">
          <select id="s3" class="el-input__inner" v-model="form.subject" placeholder="请先选择小类别" style="width: 50%"></select>
        </el-form-item>
        <el-form-item label="具体的描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" auto-complete="off" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="视频" :label-width="formLabelWidth">
          <el-input name="f" id="f" type="file" style="width: 50%"></el-input>
        </el-form-item>
      </el-form>
      <div  v-show="progressshow" class="progress" :style="{backgroundImage:'linear-gradient(to right,#C0C7CB 0%,#C0C7CB '+progress+',#E1E6E9 '+progress+',#E1E6E9 100%)'}"></div>
      <div style="text-align: center">{{progress}}</div>
      <div  slot="footer" class="dialog-footer" >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="handleSubmit();dialogFormVisible = dialogflag;">确 定</el-button>
      </div>
    </el-dialog>
    <br>
    <hr>
    <div v-show=isUpload>
      <h3>您还没有上传任何视频</h3>
    </div>
    <div v-show=!isUpload>
      <ul>
        <li v-for="videoItem in items">
          <div class="videoList">
            <router-link @click.native="addplaysum(videoItem.id)" :to="videoItem.status!=0?'/home/videoPlay/' + videoItem.id:'/home/personalSpace/personalUpload'"><img v-bind:src=videoItem.first_frame alt=""><span class="span1">{{videoItem.subject}}</span><span class="span2" v-show="videoItem.status==0?true:false">未通过</span></router-link>
            <div class="caption">
              <h5>{{videoItem.video_name}}</h5>
              <div  v-show="!searchFlag" class="seeNum"><img  src="../assets/eye.png">{{videoItem.play_sum?videoItem.play_sum:0}}</div>
            </div>
            <div  class="videoDescript">
              <h6 >{{videoItem.description}}</h6>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-show=!isUpload class="fenYe">
      <pagenation :current=parseInt(index) :total=Total v-on:sendindex="showindex"></pagenation>
    </div>
  </div>
</template>

<script>
  import pagenation from './Fenye'
  import ElInput from "element-ui/packages/input/src/input";
  import router from '../router/index'
    export default {
        name: "personal-upload",
      data() {
        return {
          videoItems: '',
          index:sessionStorage.getItem('index'),
          Total:parseInt(sessionStorage.getItem('total')),
          searchFlag:false,
          isUpload:true,
          dialogTableVisible: false,
          dialogFormVisible: false,
          warnflag:false,
          c1:true,
          c2:true,
          c3:true,
          form: {
            name: '',
            bigcategory: '',
            smallcategory:'',
            subject:'',
            description:'',
          },
          formLabelWidth: '120px',
          progress:'',
          dialogflag:true,
          progressshow:false,
        }
      },
      computed:{
        items (){
          return this.videoItems;
        }
      },
      methods:{
        move1(){
          var s1=document.getElementById("s1");
          var s2=document.getElementById("s2");
          var add;
          console.log(s1.value);
          if(s1.value == "种植业") {
            add = new Array("蔬菜","粮食","水果");
          } else if(s1.value == "畜牧业"){
            add = new Array("家畜","家禽");
          } else if(s1.value == "水产业"){
            add = new Array("鱼类","虾类","蟹类");
          } else {
            add = null;
          }
          s2.length = 0;
          for(var i=0;i<add.length;i++)
          {
            var ss=new Option();
            ss.text=add[i].split()[0];
            s2.add(ss);
          }
        },
        move2(){
          var s2=document.getElementById("s2");
          var s3=document.getElementById("s3");
          var add;
          console.log(s1.value);
          if(s2.value == "蔬菜") {
            add = new Array("白菜","萝卜","黄瓜","青椒","生菜");
          } else if(s2.value == "粮食"){
            add = new Array("小麦","水稻","玉米","大豆");
          } else if(s2.value == "水果"){
            add = new Array("苹果","香蕉","柑橘","梨子");
          } else if(s2.value == "家畜"){
            add = new Array("牛","羊","猪");
          } else if(s2.value == "家禽"){
            add = new Array("鸡","鸭","鹅");
          } else if(s2.value == "鱼类"){
            add = new Array("鲤鱼","青鱼","草鱼");
          } else if(s2.value == "虾类"){
            add = new Array("河虾","小龙虾","对虾");
          } else if(s2.value == "鱼类"){
            add = new Array("青蟹","河蟹","大闸蟹");
          } else {
            add = null;
          }
          s3.length = 0;
          for(var i=0;i<add.length;i++)
          {
            var ss=new Option();
            ss.text=add[i].split()[0];
            s3.add(ss);
          }
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        handleSubmit(){
          this.progressshow = true;
          let f=document.getElementById("f").files;
          console.log("名称:" + this.form.name);
          console.log("大类别:" + this.form.bigcategory);
          console.log("小类别:" + this.form.smallcategory);
          console.log("类别:" + this.form.subject);
          console.log("描述 :" + this.form.description);
          console.log("文件:" + JSON.stringify(f[0]));
          if (this.form.name == ''||this.form.bigcategory == ''||this.form.smallcategory == ''||this.form.subject == ''||this.form.description == ''||typeof(f[0]) == 'undefined'){
            this.$alert('请按要求将信息填写完整', '友情提示', {
              confirmButtonText: '确定',
              callback: action => {
                console.log('不通过');
              }
            });
            return;
          }
          let params = new FormData(); //创建form对象
          params.append('request', f[0], f[0].name);//通过append向form对象添加数据
          params.append('video_name', this.form.name);
          params.append('big_category', this.form.bigcategory);
          params.append('small_category', this.form.smallcategory);
          params.append('subject', this.form.subject);
          params.append('description', this.form.description);

          var config = {
            onUploadProgress: progressEvent => {
              var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
              this.progress = complete
            },
            headers:{
              'Content-Type':'multipart/form-data'
            },
          };
          this.$axios.post("/video/upload",params,config)
            .then(function (res) {
              console.log(res.data);
              if (res.data.message == "视频成功插入未审核列表") {
                this.dialogflag = false;
                this.$message({
                  message: '上传成功待审核！',
                  type: 'success'
                });
                router.go(0);
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
              this.$message.error("文件过大，上传失败！");
              var timeout = setTimeout("this.$message.error(\"文件过大，上传失败！\");",2000);
              router.go(0);
            }.bind(this));
        },
        setcfalse(){
          this.c1=false;
          this.c2=false;
          this.c3=false;
        },
        focusfunction(){
          if(this.form.bigcategory == '种植业') {
            this.setcfalse();
            this.c1 = true;
          } else if(this.form.bigcategory == '畜牧业'){
            this.setcfalse();
            this.c2 = true;
          } else if(this.form.bigcategory == '水产业'){
            this.setcfalse();
            this.c3 = true;
          } else {
            this.setcfalse();
          }
        },
        uploadvideo() {
          if(sessionStorage.getItem('category3') == "search"){
            this.searchFlag= true;
            this.$axios.post("/search/text?text="+this.searchText)
              .then(function (res) {
                this.videoItems = res.data.res;
                console.log(res.data)
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              });
            sessionStorage.setItem('category3', null);
            return false;
          }
          if(this.searchFlag== true) {
            this.$router.push('/home/fenlei/video');
            this.searchFlag = false;
            return false;
          }
          this.$axios.post("/video/myupload" + "?page_num=" + this.index + "&page_size=6").then(function (res) {
            console.log(res.data.res);
            if(res.data.res.total != 0) {
              this.isUpload = false;
            } else {
              this.isUpload = true;
              return;
            }
            this.videoItems = res.data.res.list;
            this.Total = res.data.res.pages;
          }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        showindex(index) {
          this.index = index;
        },
        addplaysum(id) {
          this.$axios.get("/video/play/" + id).then(function (res) {
            console.log(res.data);
          })
            .catch(function (error) {
              console.log(error);
            })
        }
      },
      components: {
        ElInput,
        'pagenation': pagenation,
      },
      watch: {
        '$route': 'uploadvideo',
        'index':'uploadvideo',
        'form.bigcategory':'focusfunction',
      },
      mounted() {
        this.uploadvideo();
      }
    }
</script>

<style scoped>
  .personalUpload {
    margin-top: 40px;
  }

  .videoList {
    height: 190px;
    margin-top: 20px;
    /*padding-top: 20px;*/
    position: relative;
    float: left;
  }

  .personalUpload ul li {
    list-style-type: none;
    float: left;
    margin-left: 3.2%;
    margin-right: 8px;
    margin-bottom: 50px;
  }
  .videoList img:hover{
    border: 1px red solid;
  }
  .videoList img {
    width: 260px;
    height: 180px;
    border-radius: 20px;
    /*padding-top: 20px;*/
  }

  .caption h5 {
    /*margin-top: -5px;*/
    width: 70%;
    margin-top: 5px;
    display:block;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    float: left;
    font-size: 16px;
    margin-bottom: 4px;

  }
  .videoDescript{
    clear: both;
  }
  .videoDescript h6{
    margin-top: -20px;
    margin-bottom: 0px;
    font-size: 14px;
  }
  .seeNum {
    margin-top: 5px;
    width: 30%;
    float: right;
    text-align: center;
  }
  .seeNum img {
    margin-right: 5%;
  }
  .fenYe {
    clear: both;
    padding-top: 50px;
    margin-left: 34%;
  }

  .span1 {
    position: absolute;
    left: 2px;
    bottom: 11px;
    background-color: #8f8f88;
    color: white;
    display: inline-block;
    padding: 5px;
    border-radius: 25px;
  }
  .span2 {
    position: absolute;
    right: 2px;
    bottom: 11px;
    background-color: #8f8f88;
    color: white;
    display: inline-block;
    padding: 5px;
    border-radius: 25px;
  }
  .videoList .span1:hover{
    color: red;
  }
  .caption img {
    width: 19px;
    height: 15px;
  }
  .progress{
    height: 30px;
  }
</style>
