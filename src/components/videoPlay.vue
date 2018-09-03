<template>
  <div>
    <div id="conta">
      <div class="navBox">
        <div class="info">
          <h3>{{typeItems.video_name}}</h3>
          <span>{{typeItems.big_category}}>{{typeItems.small_category}}>{{typeItems.video_name}}</span>
          <span>{{typeItems.createAt}}</span>
        </div>
      </div>
      <div class="play">
        <div class="shiPing">
          <span @click="jumpToAll" class="jumpToAll"><img src="../assets/返回.png" alt="">&nbsp;全部视频</span>
          <p>{{typeItems.description}}</p>
          <video id="myPlayer" v-bind:poster="typeItems.first_frame"
                 controls playsInline webkit-playsinline autoplay>
          </video>
        </div>
        <div class="infoRight">
          <p>出品人</p>
          <div class="userInfo">
            <img class="userImage" :src="typeItems.image">
            <span id="userName">{{typeItems.username}}</span>
          </div>
          <div class="saveAndyes">
            <div  v-if="flag7" class="inlineSave" @click="collection();flag7=!flag7">
              <img src="../assets/收藏1.png"/>
              <span>收藏</span>
            </div>
            <div  v-if="!flag7" class="inlineSave" @click="cancelcollection();flag7=!flag7">
              <img src="../assets/收藏.png"/>
              <span>已收藏</span>
            </div>
            <div v-if=flag6 class="inlineYes" @click="yes();flag6=!flag6">
              <img src="../assets/点赞1.png" />
              <span>点赞</span>
            </div>
            <div v-if=!flag6 class="inlineYes" @click="cancelyes();flag6=!flag6">
              <img src="../assets/点赞.png" />
              <span>已点赞</span>
            </div>
          </div>
          <div class="playMessage">
            <img src="../assets/playsum.png"  />
            <span>播放量 {{typeItems.play_sum}}</span>
            <img src="../assets/savanum.png"/>
            <span>收藏量 {{collection_sum == null?0:collection_sum}}</span>
            <img src="../assets/zannum.png" />
            <span>点赞量 {{yes_sum == null?0:yes_sum}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="commentSum">
      <p><b>全部评论</b> <span class="commentNum">共 {{ this.commetCount }} 条</span></p>
    </div>
    <div class="commentDiv">
      <comment class="commentBox" commentOrSub="super"  v-on:listenToCommentEvent="flagInsertComment"></comment>
      <div class= "line"></div>
      <div class="comment">
        <li v-for="item in this.typeItems.comments"
              :id="getId('comment',item.id)">
          <img  class="firstHead" v-bind:src="item.image"/>
          <div class="firstInfo">
            <p class="firstName"><b>{{item.username}}</b></p>
            <p class="firstComment">{{item.content}}</p>
            <div class="firstTool">
              <span class="firstTime"> {{item.createAt}}</span>
              <img v-if="item.isYes == 0" src="../assets/点赞1.png"
                   v-bind:data_id = item.id  @click="acceptComment"/>
              <img v-if="item.isYes == 1" src="../assets/点赞.png"
                   v-bind:data_id = item.id  @click="cancelComment"/>
              <span class="firstTime">{{item.yesCount}}</span>
              <button class="firstCommentBtn" v-bind:data_id=item.id @click="showCommentBoxFunc">回复</button>
              <button class="firstCommentBtn" v-show="item.username==username"
                      v-bind:data_id=item.id @click="showReplyBoxFunc">修改</button>
              <div class="firstCommentHead" v-show="commentBoxId == item.id">
                <img  v-show="showHeadImg" src="../assets/head.jpg">
                <img  v-show="!showHeadImg" v-bind:src="headImg">
                <comment v-bind:commentOrSub=item.id  v-on:listenToCommentEvent="flagInsertComment"></comment>
              </div>
              <div class="firstCommentHead" v-show="replyBoxId == item.id">
                <img  v-show="showHeadImg" src="../assets/head.jpg">
                <img  v-show="!showHeadImg" v-bind:src="headImg">
                <comment v-bind:replyId=item.id v-bind:replyContent=item.content
                         v-on:listenToReplyEvent="loadComment"></comment>
              </div>

              <ul>
                <li class="subCommentDiv" v-for="subItem in item.sub_comment">
                  <img  class="subHead" v-bind:src="subItem.image"/>
                  <div class="subInfo">
                    <p class="subName">{{subItem.username}}<span>回复</span><span class="subSuper">@{{ item.username }}</span></p>
                    <p class="subComment">{{subItem.content}}</p>
                    <div class="firstTool">
                      <span class="firstTime"> {{subItem.createAt}}</span>
                      <img v-if="subItem.isYes == 0" src="../assets/点赞1.png"
                           v-bind:data_id = subItem.id  @click="acceptComment"/>
                      <img v-if="subItem.isYes == 1" src="../assets/点赞.png"
                           v-bind:data_id = subItem.id  @click="cancelComment"/>
                      <span class="firstTime">{{subItem.yesCount}}</span>
                      <button class="firstCommentBtn" v-bind:data_id=subItem.id @click="showCommentBoxFunc">回复</button>
                      <button class="firstCommentBtn" v-show="subItem.username==username"
                              v-bind:data_id=subItem.id @click="showReplyBoxFunc">修改</button>
                    </div>
                    <div class="firstCommentHead" v-show="commentBoxId == subItem.id">
                      <img  v-show="showHeadImg" src="../assets/head.jpg">
                      <img  v-show="!showHeadImg" v-bind:src="headImg">
                      <comment v-bind:commentOrSub=subItem.id v-on:listenToCommentEvent="flagInsertComment"></comment>
                    </div>
                    <div class="firstCommentHead" v-show="replyBoxId == subItem.id">
                      <img  v-show="showHeadImg" src="../assets/head.jpg">
                      <img  v-show="!showHeadImg" v-bind:src="headImg">
                      <comment v-bind:replyId=subItem.id v-bind:replyContent=subItem.content
                               v-on:listenToReplyEvent="loadComment"></comment>
                    </div>
                    <ul>
                      <li class="subCommentDiv" v-for="subSub in subItem.sub_comment">
                        <img  class="subHead" v-bind:src="subSub.image"/>
                        <div class="subInfo">
                          <p class="subName">{{subSub.username}}<span>回复</span><span class="subSuper">@{{subItem.username}}</span></p>
                          <p class="subComment">{{subSub.content}}</p>
                          <div class="firstTool">
                            <span class="firstTime"> {{subSub.createAt}}</span>
                            <img v-if="subSub.isYes == 0" src="../assets/点赞1.png"
                                 v-bind:data_id = subSub.id  @click="acceptComment"/>
                            <img v-if="subSub.isYes == 1" src="../assets/点赞.png"
                                 v-bind:data_id = subSub.id  @click="cancelComment"/>
                            <span class="firstTime">{{subSub.yesCount}}</span>
                            <button class="firstCommentBtn" v-show="subSub.username==username"
                                    v-bind:data_id=subSub.id @click="showReplyBoxFunc">修改</button>
                            <div class="firstCommentHead" v-show="replyBoxId == subSub.id">
                              <img  v-show="showHeadImg" src="../assets/head.jpg">
                              <img  v-show="!showHeadImg" v-bind:src="headImg">
                              <comment v-bind:replyId=subSub.id v-bind:replyContent=subSub.content
                                       v-on:listenToReplyEvent="loadComment"></comment>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>


                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="line"></div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
  import comment from './Comment'
  import router from '../router/index'
  export default {

      name: "video-play",
      components :{
        comment,
      },
      data(){
        return{
          typeItems: '',
          yes_sum:'',
          flag6:true,
          collection_sum:'',
          flag7:true,
          commentSum:0,
          flagComment:0,
          commentAgree:0,
          showHeadImg:false,
          headImg:sessionStorage.getItem('headImg'),
          showCommentBox:'',
          commentId:-1,
          commentBoxId:-1,
          isModify:0,
          username:sessionStorage.getItem('username'),
          replyBoxId:-1,

        }
      },
      computed:{
        commetCount: function (){
          return this.typeItems.comment_sum;
        }
      },
      methods:{
        loadComment() {
          this.replyBoxId = -1;
          sessionStorage.setItem('replyBoxId', -1);
          this.$axios.get("/video/comment/"+this.videoId)
            .then(function (res) {
              this.typeItems =res.data.res;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getId(name, index) {
          return name +index;
        },
        flagInsertComment(){
          this.flagComment++;
        },
        insertComment(){
          this.$axios.get("/video/comment/"+this.videoId)
            .then(function(res){
              this.typeItems = res.data.res;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        showCommentBoxFunc(event) {
          this.replyBoxId = -1;
          sessionStorage.setItem('replyBoxId', -1);
          var target = event.target||window.event.srcElement;
          this.commentBoxId = target.getAttribute('data_id');
          if(this.commentBoxId == sessionStorage.getItem('boxId')){
            sessionStorage.setItem('boxId',-100);
            return this.commentBoxId = -1;
          }
          sessionStorage.setItem('boxId', this.commentBoxId);
        },
        showReplyBoxFunc(event) {
          this.commentBoxId = -1;
          sessionStorage.setItem('boxId',-1);
          var target = event.target||window.event.srcElement;
          this.replyBoxId = target.getAttribute('data_id');
          if(this.replyBoxId == sessionStorage.getItem('replyBoxId')){
            sessionStorage.setItem('replyBoxId',-100);
            return this.replyBoxId = -1;
          }
          sessionStorage.setItem('replyBoxId', this.replyBoxId);
        },
        acceptComment(event) {
          var target = event.target||window.event.srcElement;
          this.commentId = target.getAttribute('data_id');
          this.$axios.get("/comment/yes/"+this.commentId)
            .then(function (res) {
              this.loadComment();
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        cancelComment(event) {
          var target = event.target||window.event.srcElement;
          this.commentId = target.getAttribute('data_id');
          this.$axios.delete("/comment/yes/"+this.commentId)
            .then(function (res) {
              this.loadComment();
            }.bind(this))
            .catch(function (error) {
              console.log(error)
            })
        },
        //返回到videoPlay页面
        jumpToAll(){
          sessionStorage.removeItem('category1');
          sessionStorage.removeItem('category2');
          sessionStorage.removeItem('category4');
          sessionStorage.setItem('index','1');
          let player = new EZUIPlayer('myPlayer');
          player.on('pause', function(){
            console.log('pause');
          });
          router.go(-1);
        },
        //视频播放
        great(){
          this.$axios.get("/video/comment/"+this.videoId)
          .then(function (res) {
            console.log(res.data);
            this.typeItems =res.data.res;
            //判断是否点赞
            if(res.data.res.isYes == 0)
              this.flag6 = true;
            else
              this.flag6 = false;
            this.yes_sum = res.data.res.yes_sum;
            //判断是否收藏
            if(res.data.res.isCollection == 0)
              this.flag7 = true;
            else
              this.flag7 = false;
            this.collection_sum = res.data.res.collection_sum;
            document.getElementById("myPlayer").src = this.typeItems.url;
            let player = new EZUIPlayer('myPlayer');
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },

        //点击收藏的函数
        collection() {
          this.$axios.post("/video/collection/" + this.videoId)
            .then(function (res) {
              console.log(res.data);
              this.collection_sum += 1;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        //取消收藏
        cancelcollection() {
          this.$axios.delete("/video/collection/" + this.videoId)
            .then(function (res) {
              console.log(res.data);
              this.collection_sum -= 1;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        //点赞
        yes(){
          this.$axios.post("/video/yes/" + this.videoId)
            .then(function (res) {
              console.log(res.data);
              this.yes_sum += 1;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        //取消点赞
        cancelyes(){
          this.$axios.delete("/video/yes/" + this.videoId)
            .then(function (res) {
              console.log(res.data);
              this.yes_sum -= 1;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },

      },
      beforeCreate() {
        sessionStorage.setItem('boxId', -100);
        if(sessionStorage.getItem('headImg') == "null")
          this.showHeadImg = true;
      },
      created:function () {
        this.$store.state.videoId = this.$route.params.id;
        this.videoId = this.$route.params.id;  //获取路由传过来的值

        this.great();
      },
      watch:{
         flagComment:'insertComment',
      }
    }
</script>

<style scoped>
  *{
    margin: 0px;
    padding: 0px;
  }
  .navBox{
    width: 100%;
    height: 80px;
    margin-top: 40px;
    background-color: #f2f2f2;
  }
  .info{
    margin-left: 12%;
  }
  .info h3{
    padding: 10px 0px 8px 0px;
  }
  .info span{
    font-size: 13px;
    margin-right: 20px;
  }
  .shiPing p{
    margin-left: 12%;
    padding-top: 10px;
  }
  #myPlayer{
    width: 55%;
    height: 500px;
    float: left;
    margin: 0px 0px 0px 12%;
    background-color:black ;
  }
  .infoRight{
    width: 20.5%;
    height: 500px;
    background-color: #2d2d2d;
    float:left;
    position: relative;
  }
  .jumpToAll{
    /*display: block;*/
    margin-left: 10%;
  }
  .jumpToAll:hover{
    cursor: pointer;
    color: lightgreen;
  }
  .infoRight p{
    color: #dcdcdc;
    font-size: 16px;
    margin-top: 10px;
    margin-left: 10px;
  }
  .userInfo{
    margin-left: 18%;
    margin-top: 70px;
    position: relative;
  }
  .userImage{
    height: 75px;
    width: 75px;
    border-radius: 50%;
  }
  .userInfo span{
    display: block;
    position: absolute;
    top: 5px;
    left: 100px;
    color: gainsboro;
  }
  .userInfo span:hover {
    color: red;
  }
  .playMessage{
    width: 100%;
    height: 34px;
    background-color: white;
    position: absolute;
    top: 468px;
  }
  .playMessage img{
    height: 20px;
    width: 20px;
    margin-left: 11px;
    vertical-align: middle;
  }
  .playMessage span{
    display: inline-block;
    font-size: 13px;
  }
  .saveAndyes{
    margin-top: 80px;
    margin-left: 30px;
  }
  .saveAndyes img{
    vertical-align: middle;
  }
  .saveAndyes span{
    color: white;
  }
  .inlineSave{
    margin-left: 20px;
    float: left;
    cursor: pointer;
  }
  .inlineYes{
    float: left;
    margin-left: 20px;
    cursor: pointer;
  }



  .commentSum {
    margin-top: 38%;
    margin-left: 10%;
    width: 80%;
    border-bottom: 1px solid #dedede;
  }
  .commentSum p{
    color: rgb(48, 77, 255);
    font-size: 16px;
    padding: 20px;
  }
  .commentNum {
    margin-left: 85%;
  }

  .commentBox {
    margin-left: 12%;
  }

  .line{
    border-bottom: 1px solid #dedede;
    width: 80%;
    margin-left: 10%;
    margin-bottom: 15px;
  }
  .comment {
    width: 80%;
    margin-left: 10%;
  }
  .comment li {
    list-style-type: none;
  }

  .firstHead {
    float: left;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    margin-left: 2%;
  }
  .firstInfo {
    width: 80%;
    margin-left: 10%;
  }
  .firstName {
    font-size: 18px;
  }
  .firstComment {
    font-size: 16px;
    margin: 15px 0;
    width: 80%;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
  }
  .firstTool {
    display: inline;
  }
  .firstTime {
    vertical-align:middle;
    font-size: 12px;
  }
  .firstTool img {
    vertical-align:middle;
    margin-left: 20px;
    width: 20px;
  }
  .firstCommentBtn {
    background: transparent;
    border: 0;
    color: #4a68ff;
    margin-left: 20px;
    cursor: pointer;
  }
  .firstCommentHead img{
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 25px;
    margin: 20px;
  }

  .subCommentDiv {
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px dashed #dedede;
  }
  .subHead {
    float: left;

    width: 35px;
    border-radius: 25px;
    margin-left: 2%;
  }
  .subInfo {
    width: 80%;
    margin-left: 7%;
  }
  .subName {
    font-size: 14px;
  }
  .subName span{
    margin-left: 2%;
  }
  .subSuper{
    color: cornflowerblue;
  }
  .subComment {
    font-size: 14px;
    margin: 8px 0;
    width: 80%;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
  }

  .subCommentHead img{
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 25px;
    margin: 20px;
  }
</style>
