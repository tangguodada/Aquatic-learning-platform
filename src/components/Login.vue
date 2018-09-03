<template>
  <div class="whole">
    <header>
      <div class="webName">产学研</div>
    </header>
    <div class="contain">
      <div class="login">
        <p>账号登录</p>
        <form action="">
          <input type="text" name="username" placeholder="账号" required="required" v-model="inuser"
                 @click="showmsg=false">
          <input type="password" name="password" placeholder="密码" required="required" v-model="inpwd"
                 @click="showmsg=false">
          <div v-show="showmsg" class="msg">{{msg}}</div>
          <div class="send-button">
            <button type="button" id="loginbtn" @click="getinfo">登录</button>
            <button type="button" id="registerbtn" @click="jumpToRegister">注册</button>
          </div>
        </form>
      </div>
    </div>

    <footer>
      <p>Copyright &copy; web-A</p>
    </footer>
  </div>
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: "login",
    data() {
      return {
        username: "",
        password: "",
        inuser: "",
        inpwd: "",
        msg: "输入的账号或密码有误",
        showmsg: false,

      }
    },
    methods: {
      getinfo() {
        this.username = this.inuser;
        this.password = this.inpwd;
        if (this.username == "" || this.password == "") {
          this.showmsg = true;
          return;
        }
        this.$axios.post("/auth", {
          'username': this.username,
          'password': this.password
        })
          .then(function (res) {
            this.$store.state.token = res.data.res.token;
            console.log(res.data);
            console.log("登陆成功");
            sessionStorage.setItem('headImg',res.data.res.image);
            sessionStorage.setItem('token', res.data.res.token);
            sessionStorage.setItem('personName',res.data.res.username);
            sessionStorage.setItem('username',res.data.res.username);
            // sessionStorage.setItem('load', '1');
            sessionStorage.setItem('index', '1');
            this.$router.push('/home/fenlei/video');
          }.bind(this))
          .catch(function (error) {
            this.showmsg = true
            console.log(error);
          }.bind(this))
      },
      jumpToRegister() {
        this.$router.push('/register');
      }
    },
  }
</script>

<style scoped>
  .whole {
    background: url("../assets/back.jpg") no-repeat fixed center;
    background-size: cover;
  }

  header {
    background-color: rgba(0, 0, 0, 0.37);
    line-height: 50px;
    width: 100%;
    height: 50px;
    color: white;
  }

  .webName {
    margin-left: 20%;
    font-size: 18px;
  }

  .contain {
    width: 500px;
    height: 300px;
    margin: 80px auto;
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 2px ridge rgba(238, 238, 238, 0.13);
    border-radius: 5px;
    box-shadow: 0 0 18px 0 rgba(57, 141, 238, 0.12);
  }

  .login {
    width: 80%;
    margin-left: 10%;
    float: left;
    text-align: left;
  }

  .login p {
    margin-bottom: 30px;
    font-size: 20px;
  }

  input[type="text"], input[type="password"] {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    float: left;
    background-color: transparent;
    border: none;
    font-size: 15px;
    border-bottom: 1px solid rgba(100, 100, 0, 0.9);
    outline: none;
    color: #000;
  }

  .msg {
    height: 10px;
    color: rgba(255, 33, 28, 0.84);
    font-size: 10px;
  }

  .send-button {
    margin-top: 30px;
  }

  .send-button button[type='button'] {
    width: 30%;
    padding: 10px 0;
    margin: 40px 30px;
    font-size: 16px;
    font-weight: 100;
    background-color: transparent;
    color: #000;
    border: 1px solid rgba(57, 141, 238, 0.41);
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    text-decoration: none;
  }

  .send-button button[type='button']:hover {
    background-color: #398DEE;
    border: 1px solid #FFF;
    color: #FFFFFF;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    text-decoration: none;
  }

  footer {
    text-align: center;
    margin: 124px 0 0 0;
  }

  footer p {
    font-size: 12px;
    color: #000;
    line-height: 25px;
  }
</style>
