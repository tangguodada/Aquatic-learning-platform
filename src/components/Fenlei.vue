<template>
  <div id="classify">
    <div class="line">
      <ul id="c1">
        <li>方向:</li>
        <li class="l1" >
          <router-link :class="{'active':flag1==tt8}" @click.native="clickset('category1', tt8);clickshow(true);isshow1=true;isshow2=true;isshow3=true;flag4=false" :to="{path:'/home/fenlei/video',query:{category1:'全部'}}">{{tt8}}</router-link>
        </li>
        <li class="l1">
          <router-link :class="{'active':flag1==tt1}" @click.native="clickset('category1', tt1);clickshow(true);isshow1=true" :to="{path:'/home/fenlei/video',query:{category1:'种植业'}}">{{tt1}}</router-link>
        </li>
        <li class="l1">
          <router-link :class="{'active':flag1==tt2}" @click.native="clickset('category1', tt2);clickshow(true);isshow2=true" :to="{path:'/home/fenlei/video',query:{category1:'畜牧业'}}">{{tt2}}</router-link>
        </li>
        <li class="l1">
          <router-link :class="{'active':flag1==tt3}" @click.native="clickset('category1', tt3);clickshow(true);isshow3=true" :to="{path:'/home/fenlei/video',query:{category1:'水产业'}}">{{tt3}}</router-link>
        </li>
      </ul>
    </div>
    <div class="lineOne">
      <ul id="c3">
        <li>分类:</li>
        <div v-show=isshow1>
        <li>
          <router-link :class="{'active':flag4==tt9}" @click.native="clickset('category4', tt9);clickset1('category1',tt1);clickshow(false);isshow1=true" :to="{path:'/home/fenlei/video',query:{category1:'蔬菜'}}">{{tt9}}</router-link>
        </li>
        <li>
          <router-link :class="{'active':flag4==tt10}" @click.native="clickset('category4', tt10);clickset1('category1',tt1);clickshow(false);isshow1=true" :to="{path:'/home/fenlei/video',query:{category1:'粮食'}}">{{tt10}}</router-link>
        </li>
        </div>
        <div v-show=isshow2>
          <li>
            <router-link :class="{'active':flag4==tt11}" @click.native="clickset('category4', tt11);clickset1('category1',tt2);clickshow(false);isshow2=true" :to="{path:'/home/fenlei/video',query:{category1:'家畜'}}">{{tt11}}</router-link>
          </li>
          <li>
            <router-link :class="{'active':flag4==tt12}" @click.native="clickset('category4', tt12);clickset1('category1',tt2);clickshow(false);isshow2=true" :to="{path:'/home/fenlei/video',query:{category1:'家禽'}}">{{tt12}}</router-link>
          </li>
        </div>
        <div v-show=isshow3>
          <li>
            <router-link :class="{'active':flag4==tt13}" @click.native="clickset('category4', tt13);clickset1('category1',tt3);clickshow(false);isshow3=true" :to="{path:'/home/fenlei/video',query:{category1:'鱼类'}}">{{tt13}}</router-link>
          </li>
          <li>
            <router-link :class="{'active':flag4==tt14}" @click.native="clickset('category4', tt14);clickset1('category1',tt3);clickshow(false);isshow3=true" :to="{path:'/home/fenlei/video',query:{category1:'虾类'}}">{{tt14}}</router-link>
          </li>
          <li>
            <router-link :class="{'active':flag4==tt15}" @click.native="clickset('category4', tt15);clickset1('category1',tt3);clickshow(false);isshow3=true" :to="{path:'/home/fenlei/video',query:{category1:'蟹类'}}">{{tt15}}</router-link>
          </li>
        </div>
      </ul>
    </div>
    <div class="lineTwo">
      <ul id="c2">
        <li><router-link :class="{'active':flag2==tt6}" @click.native="clickset('category2', tt6)" :to="{path:'/home/fenlei/video',query:{category2:'最新'}}">{{tt6}}</router-link></li>
        <li><router-link :class="{'active':flag2==tt7}" @click.native="clickset('category2', tt7)" :to="{path:'/home/fenlei/video',query:{category2:'最热'}}">{{tt7}}</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import router from '../router/index'
  export default {
    name: "fenlei",
    data(){
      return {
        flag1:false,
        flag2:false,
        flag4:false,
        isshow1:true,
        isshow2:true,
        isshow3:true,
        tt1:"种植业",
        tt2:"畜牧业",
        tt3:"水产业",
        tt4:"农夫加工",
        tt5:"鱼类",
        tt6:"最新",
        tt7:"最热",
        tt8:"全部",
        tt9:"蔬菜",
        tt10:"粮食",
        tt11:"家畜",
        tt12:"家禽",
        tt13:"鱼类",
        tt14:"虾类",
        tt15:"蟹类"
      }
    },
    methods:{
      loading(){
        this.flag1 = sessionStorage.getItem('category1');
        this.flag2 = sessionStorage.getItem('category2');
        this.flag4 = sessionStorage.getItem('category4');
      },
      clickset(category,tt) {
        sessionStorage.setItem(category,tt);
        //router.go(0);
        sessionStorage.setItem('index', '1');
        this.flag1 = sessionStorage.getItem('category1');
        this.flag2 = sessionStorage.getItem('category2');
        this.flag4 = sessionStorage.getItem('category4');
      },
      clickset1(category,tt) {
        sessionStorage.setItem(category,tt);
        //router.go(0);
        sessionStorage.setItem('index', '1');
      },
      clickshow(flag){
        this.isshow1 = false;
        this.isshow2 = false;
        this.isshow3 = false;
        if (flag)
          sessionStorage.removeItem('category4');
      }
    },
    mounted(){
      this.loading();
    },
    watch:{
      flag4:'loading',
    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  .active {
    background: black;
    color: white;
  }

  #classify {
    margin-top: 40px;
    width: 100%;
    height: 100px;
    background: #f2f2f2;
  }

  .line ul {
    margin-left: 8%;
    padding-top: 10px;
  }

  .line ul li {
    list-style-type: none;
    float: left;
    margin-right: 4%;
  }

  .line ul li a {
    text-decoration: none;
    font-size: 16px;
    padding: 6px;
  }

  .line li a:hover {
    color: #ff912d;
    cursor: pointer;
  }

  .lineTwo ul {
    margin-left: 8%;
    padding-top: 10px;
  }

  .lineTwo ul li {
    list-style-type: none;
    float: left;
    margin-right: 4%;
  }

  .lineTwo ul li a {
    text-decoration: none;
    font-size: 16px;
    padding: 3px;
  }

  .lineTwo {
    clear: both;
  }

  .lineTwo li a:hover {
    color: red;
    cursor: pointer;
  }

  .lineOne ul {
    margin-left: 8%;
    padding-top: 10px;
  }

  .lineOne ul li {
    list-style-type: none;
    float: left;
    margin-right: 4%;
  }

  .lineOne ul li a {
    text-decoration: none;
    font-size: 16px;
    padding: 4px;
  }

  .lineOne {
    clear: both;
  }

  .lineOne li a:hover {
    color: red;
    cursor: pointer;
  }

</style>
