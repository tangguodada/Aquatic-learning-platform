<template>
  <div class="video">
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
    <div v-show="!searchFlag" class="fenYe">
      <pagenation :current=parseInt(index) :total=Total v-on:sendindex="showindex"></pagenation>
    </div>
    <footer>
      <footerarea></footerarea>
    </footer>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import pagenation from './Fenye'
  import router from '../router/index'
  import footerarea from './Footerarea'
  export default {
    name: 'shiping',
    data() {
      return {
        title1: '',
        title2: '',
        flag: 1,
        videoItems: '',
        //videoItem: '',
        index: sessionStorage.getItem('index'),
        Total:parseInt(sessionStorage.getItem('total')),
        searchText:"",
        searchFlag:false,
      }
    },
    computed:{
      items (){
        return this.videoItems;
      }
    },
    mounted() {
      this.great();
      if (sessionStorage.getItem('load') == '1') {
        router.go(0);
        sessionStorage.setItem('load','2');
      };
    },
    methods: {
      great() {
        if (this.index == null)
          this.index = 1;
        this.searchText = sessionStorage.getItem('searchText');
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
        if (sessionStorage.getItem('category1') == null)
          this.title1 = '全部';
        else
          this.title1 = sessionStorage.getItem('category1');
        if (sessionStorage.getItem('category2') == null) {
          this.title2 = '最新';
          this.flag = 0;
        } else {
          this.title2 = sessionStorage.getItem('category2');
          if (sessionStorage.getItem('category2') == '最新') {
            this.flag = 0;
          } else
            this.flag = 1;
        }
        if (this.title1 == '全部') {
          this.$axios.post("/video/all/" + this.flag + "?page_num=" + this.index + "&page_size=8")
            .then(function (res) {
              console.log(res.data);
              console.log(this.flag);
              console.log(sessionStorage.getItem('category4'));
              console.log(sessionStorage.getItem('category1'));
              this.videoItems = res.data.res.list;
              if (res.data.res.total%8 == 0) {
                sessionStorage.setItem('total', (res.data.res.total / 8).toString());
                this.Total = res.data.res.total / 8;
              }
              else {
                sessionStorage.setItem('total', ((res.data.res.total / 8) + 1).toString());
                this.Total = res.data.res.total / 8 + 1;
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        }
        else {
          if (sessionStorage.getItem('category4') == null) {
            this.$axios.post("/video/big/" + this.flag + "?page_num=" + this.index + "&page_size=8&big_category=" + this.title1)
              .then(function (res) {
                console.log(res.data);
                console.log(this.flag);
                console.log(sessionStorage.getItem('category4'));
                console.log(sessionStorage.getItem('category1'));
                this.videoItems = res.data.res.list;
                if (res.data.res.total % 8 == 0) {
                  sessionStorage.setItem('total', (res.data.res.total / 8).toString());
                  this.Total = res.data.res.total / 8;
                }
                else {
                  sessionStorage.setItem('total', ((res.data.res.total / 8) + 1).toString());
                  this.Total = res.data.res.total / 8 + 1;
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
          } else {
            this.$axios.post("/video/small/" + this.flag + "?page_num=" + this.index + "&page_size=8&big_category=" + this.title1 + "&small_category=" + sessionStorage.getItem('category4'))
              .then(function (res) {
                console.log(res.data);
                console.log(this.flag);
                this.videoItems = res.data.res.list;
                if (res.data.res.total % 8 == 0) {
                  sessionStorage.setItem('total', (res.data.res.total / 8).toString());
                  this.Total = res.data.res.total / 8;
                }
                else {
                  sessionStorage.setItem('total', ((res.data.res.total / 8) + 1).toString());
                  this.Total = res.data.res.total / 8 + 1;
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
          }
        }

      },
      showindex(index) {
        this.index = index;
        // router.go(0);
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
    watch: {
      '$route': 'great',
      'index':'great',
    },
    components: {
      'pagenation': pagenation,
      footerarea,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .video {
    margin-top: 40px;
  }

  .videoList {
    height: 190px;
    margin-top: 20px;
    /*padding-top: 20px;*/
    position: relative;
    float: left;
  }

  .video ul li {
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

  footer{
    clear: both;
  }


</style>
