<template>
  <div class="whole">
    <header>
      <div class="webName">产学研</div>
    </header>
    <div class="container">
      <div class="register">
        <p>账号注册</p>
        <section>
          <form action="">
            <div class="register-box">
              <label>
                <span>账 号 </span>
                <input maxlength="20" type="text" name="username" placeholder="Account" v-model="inaccount"
                       @click="showmsgaccount=false;showmsgcode= false"/>
              </label>
              <div class="tips" v-show="showmsgaccount">{{msgaccount}}</div>
              <div class="tips" v-show="showmsgcode">{{msgcode}}</div>
            </div>
            <div class="register-box">
              <label>
                <span>设置密码 </span>
                <input maxlength="20" type="password" name="password1" placeholder="Password" v-model="inpwd1"
                       @click="showmsgpwd1=false;showmsgpwd2=false"/>
              </label>
              <div class="tips" v-show="showmsgpwd1">{{msgpwd1}}</div>
            </div>
            <div class="register-box">
              <label>
                <span>确认密码 </span>
                <input maxlength="20" type="password" name="password2" placeholder="Password Again" v-model="inpwd2"
                       @click="showmsgpwd2=false"/>
              </label>
              <div class="tips" v-show="showmsgpwd2">{{msgpwd2}}</div>
            </div>
            <div class="submit_btn">
              <button type="button" id="submit_btn" @click="register">注 册</button>
            </div>
          </form>
        </section>
      </div>
    </div>
    <footer>
      <p>Copyright &copy; web-A</p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        msgcode: "该用户名已存在",
        msgaccount: "账号不能为空",
        msgpwd1: "密码不能为空",
        msgpwd2: "两次密码输入不一致",
        showmsgaccount: false,
        showmsgpwd1: false,
        showmsgpwd2: false,
        showmsgcode: false,
        inaccount: "",
        inpwd1: "",
        inpwd2: "",
        flag: 0,
      }
    },
    methods: {
      register() {
        if ((this.inaccount == "" || this.inpwd1 == "" || this.inpwd2 == "") || this.inpwd1 != this.inpwd2) {
          if (this.inaccount == "")
            this.showmsgaccount = true;
          if (this.inpwd1 == "")
            this.showmsgpwd1 = true;
          if (this.inpwd1 != this.inpwd2)
            this.showmsgpwd2 = true;
          return;
        }
        this.$axios.get("/user/" + this.inaccount)
          .then(function (res) {
            this.flag = res.data.code;
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
        if (this.flag == 0) {
          this.showmsgcode = true;
          return;
        }
        this.$axios.post("/auth/register", {
          username: this.inaccount,
          password: this.inpwd1,
          role: "ROLE_USER"
        })
          .then(function (res) {
            console.log(res);
            alert("注册成功！");
            this.$router.push('/');
          }.bind(this))
          .catch(function (error) {
            console.log(error)
          })
      }
    }
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

  .container {
    width: 650px;
    margin: 80px auto;
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 2px ridge rgba(238, 238, 238, 0.13);
    border-radius: 5px;
    box-shadow: 0 0 18px 0 rgba(57, 141, 238, 0.12);
  }

  .register {
    width: 50%;
    margin-left: 25%;
  }

  .register p {
    margin-bottom: 30px;
    padding-left: 7px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(33, 33, 33, 0.2);
    border-radius: 5px;
    font-size: 20px;
    color: #333333;
  }

  form {
    width: 350px;
    margin: 70px auto auto auto;
  }

  .register-box {
    border: 1px solid #ddd;
    margin-bottom: 20px;
  }

  .register-box label {
    height: 52px;
    line-height: 52px;
    padding-left: 20px;
    display: inline-block;
  }

  .register-box input {
    width: 190px;
    height: 19px;
    padding-bottom: 11px;
    padding-left: 20px;
    padding-top: 16px;
    font-size: 14px;
    color: #666;
    border: 0;
    outline: none;
    background: transparent;
  }

  .register-box .tips {
    position: absolute;
    margin-top: 3px;
    font-size: 5px;
    color: rgba(255, 33, 28, 0.84);
  }

  .register-box span {
    display: inline-block;
    width: 77px;
    height: 52px;
    border-right: 1px solid #ddd;
  }

  .submit_btn button {
    width: 100%;
    height: 54px;
    padding: 10px 0;
    margin-top: 120px;
    margin-bottom: 50px;
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

  .submit_btn button:hover {
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
