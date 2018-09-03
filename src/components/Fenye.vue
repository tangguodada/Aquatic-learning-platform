<template>
  <div class="pagenation">
    <ul>
      <li @click="pre"><a> < </a></li>
      <li v-for="item in show_page_numbers" :class="{active: item==current_index}" @click="setIndex(item)"><a>{{item}}</a></li>
      <li @click="next"><a> > </a> </li>
      <li>共{{parseInt(total)}}页</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name:'pagenation',
    props:{
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number
      },
      currentChange: {
        type: Function
      }
    },
    data: function(){
      return {
        show_page_numbers:[],
        display_limit:8,
        current_index: parseInt(sessionStorage.getItem('index')),
        index: 0,
        vif:true
      }
    },
    mounted(){
      this.refreshPage();
    },
    methods:{
      refreshPage(){
        this.show_page_numbers=[];

        for(let i=1; i<=this.total; i++){
          this.show_page_numbers.push(i);
        }

        if (this.total <= this.display_limit) { return; }
        let begin = this.current_index - 3;
        let end = this.current_index + 3;
        begin = begin <= 1 ? 1 : begin;
        end = end <= this.display_limit ? this.display_limit : end;
        begin = begin >= this.total - this.display_limit ? this.total - this.display_limit : begin;
        end = end >= this.total ? this.total : end;

        let arr = this.show_page_numbers.slice(begin-1,end);
        this.show_page_numbers = arr;

      },
      pre(){
        let current = this.current_index;
        if(current<=1){
          return;
        }
        this.setIndex(current-1);

      },
      next(){
        let current = this.current_index;
        if(parseInt(current)>=parseInt(this.total)){
          this.setIndex(1);
        } else {
          this.setIndex(current + 1);
        }
      },
      setIndex(index){
        this.current_index = index;
        this.refreshPage();
        this.index = index;
        sessionStorage.setItem('index', this.index);
        this.$emit('sendindex',this.index);
      }
    },
    watch:{
      total:function () {
        this.refreshPage();
      },
      '$route':function(){
        this.setIndex(1);
      }
    }
  }
</script>
<style scoped>
  ul{
    position: relative;
  }
  li{
    list-style: none;
    display: inline-block;
    margin:0 3px;
    border: 1px solid #2c3e50;
    padding: 4px;
    min-width: 20px;
    min-height: 20px;
    line-height: 200%;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    color:#0E90D2;
    border-radius: 50%;
  }
  .active, li:hover{
    border-color: rgba(65, 182, 131, .5);
    background:#0E90D2;
    color:#fff;
  }
  a{
    display: inline-block;
    color: inherit;
    padding:.1rem .9rem;
  }
  .clearfix{
    clear: both;
  }
</style>
