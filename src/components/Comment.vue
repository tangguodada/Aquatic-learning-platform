<template>
  <div class="sendCommentDiv">
    <textarea class="sendComment"   placeholder="文明上网，理性发言" maxlength="200" height="75px"
    @input="descInput" v-model="inComment">
    </textarea>
    <span>{{this.surplus}}/200</span>
    <button class="sendCommentBtn" @click="sendComment()">发布</button>
  </div>
</template>

<script>
    export default {
      name: "comment",
      props:["commentOrSub","replyId", "replyContent"],
      data(){
        return{
          surplus:200,
          inComment:'',
          videoId:-1,
        }
      },
      created:function () {
        this.videoId = this.$store.state.videoId;
      },
      methods:{
        descInput(){
          this.surplus = 200 - this.inComment.length;
        },
        sendComment(){
          if(this.commentOrSub==null) {
            this.$axios.put("/comment/update/"+this.replyId,
              {
                "content": this.inComment,
              }
            )
              .then(function (res) {
                this.$emit("listenToReplyEvent");
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
          }else {
            if(this.inComment == ''){
              alert("评论不能为空！");
            }
            else{
              if(this.commentOrSub=="super") {
                this.$axios.post("/comment/insert/"+this.videoId+"?content="+this.inComment)
                  .then(function (res) {
                    this.inComment = '';
                    this.surplus = 200;
                    this.$emit("listenToCommentEvent");
                    console.log(res);
                  }.bind(this))
                  .catch(function (error) {
                    console.log(error);
                  })
              }
              else {
                this.$axios.post("/comment/comment/"+this.commentOrSub+"?video_id="+this.videoId+"&content="+this.inComment)
                  .then(function (res) {
                    this.inComment = '';
                    this.surplus = 200;
                    this.$emit("listenToCommentEvent");
                  }.bind(this))
                  .catch(function (error) {
                    console.log(error);
                  })
              }
            }
          }
        },
        reply(){
          this.inComment = this.replyContent;
          this.surplus = 200 - this.inComment.length;
        }
      },
      beforeMount() {
        if(this.replyId != null) {
          this.inComment = this.replyContent;
          this.surplus = 200 - this.inComment.length;
        }
      },
      watch:{
        replyContent:'reply',
      }
    }
</script>

<style scoped>
  .sendCommentDiv {
    width: 70%;
    display: inline-block;
  }
  .sendComment {
    border:solid 1px cornflowerblue;
    height: 40px;
    width: 85%;
    border-radius: 10px;
    padding: 15px 10px;
    margin-top: 10px;
    margin-bottom: 15px;
    resize:none;
    overflow: hidden;
  }
  .sendCommentDiv span {
    margin-left: -70px;
    font-size: 9px;
    color: gray;
    padding: 10px;
  }
  .sendCommentBtn {
    float: right;
    margin-top: 1%;
    height: 70px;
    width: 8%;
    font-size: 16px;
    background: white;
    color: rgb(48, 77, 255);
    border: solid 1px cornflowerblue;
    border-radius: 5px;
    cursor: pointer;
  }
  .sendCommentBtn:hover {
    color: white;
    background:  rgb(48, 77, 255) ;
  }
</style>
