<template>
  <div class="collectvideo">
    <div>
      <ul>
        <li v-for="videoItem in items">
          <div class="videoList">
            <router-link @click.native="addplaysum(videoItem.id)" :to="'/home/videoPlay/' + videoItem.id"><img v-bind:src=videoItem.first_frame alt=""><span>{{videoItem.subject}}</span></router-link>
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
    <div class="fenYe">
      <pagenation :current=parseInt(index) :total=Total v-on:sendindex="showindex"></pagenation>
    </div>
  </div>
</template>

<script>
  import pagenation from './Fenye'
    export default {
      name: "collect-video",
      data() {
        return {
          videoItems: '',
          index:sessionStorage.getItem('index'),
          Total:parseInt(sessionStorage.getItem('total')),
          searchFlag:false,
        }
      },
      computed:{
        items (){
          return this.videoItems;
        }
      },
      methods:{
        collectvideo() {
          if(sessionStorage.getItem('category3') == "search"){
            this.searchFlag= true;
            this.$axios.post("/search/text?text="+this.searchText)
              .then(function (res) {
                this.videoItems = res.data.res;
                console.log(res.data)
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
            sessionStorage.setItem('category3', null);
            return false;
          }
          if(this.searchFlag== true) {
            this.$router.push('/home/fenlei/video');
            this.searchFlag = false;
            return false;
          }

          // this.$axios.get("/video/collection/list?page_num=" + this.index + "&page_size=5").then(function (res) {
          //   console.log(res.data.res);
          //   this.videoItems = res.data.res.list;
          //   this.Total = res.data.res.pages;
          // }.bind(this))
          //   .catch(function (error) {
          //     console.log(error);
          //   })

          this.$axios.get("/video/user/xxxxy?page_num=" + this.index + "&page_size=5").then(function (res) {
            console.log(res.data.res);
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
      },
      components: {
        'pagenation': pagenation,
      },
      watch: {
        '$route': 'collectvideo',
        'index':'collectvideo',
      },
      mounted() {
        this.collectvideo();
      }
    }
</script>

<style scoped>
  .collectvideo {
    margin-top: 40px;
  }

  .videoList {
    height: 190px;
    margin-top: 20px;
    /*padding-top: 20px;*/
    position: relative;
    float: left;
  }

  .collectvideo ul li {
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

  .videoList span {
    position: absolute;
    left: 2px;
    bottom: 11px;
    background-color: #8f8f88;
    color: white;
    display: inline-block;
    padding: 5px;
    border-radius: 25px;
  }
  .videoList span:hover{
    color: red;
  }
  .caption img {
    width: 19px;
    height: 15px;
  }
</style>
