<template>
    <div class="footer">
        <div class="footerWrap">
        <p class="wrap">
          <a href="#">网站首页</a>
          -
          <a href="#">关于我们</a>
          -
          <a href="#">联系我们</a>
          -
          <a href="#">常见问题</a>
          -
          <a href="#">在线意见</a>
        </p>
        <p class="copyright">&copy;Copyright&nbsp;2018 &nbsp;DesignBy &nbsp;Web前端A组</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Footerarea"
    }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.footer{
  height: 120px;
  width: 100%;
  background-color: #0f253e;
  margin-top: 40px;
}
.footerWrap{
  margin-left: 33%;
}
.wrap{
  padding-top: 20px;
  color: #d4d4d4;
}
.wrap a{
  text-decoration:none;
  color: #d4d4d4;
  font-size: 15px;
  margin-right: 10px;
  margin-left: 10px;
}
.wrap a:hover{
  color: lightgreen;
  text-decoration-style: solid;
}
.copyright{
  clear: both;
  padding-top: 20px;
  color: #d4d4d4;
  font-size: 12px;
  margin-left: 13%;
}
</style>
