<template>
    <div class="index_box">
        <header>
            <h1>{{ramadhin}}</h1>
        </header>
        <div class="banner_box">
            <img src="../../assets/img/banner.png" alt="">
        </div>
        <div class="btn_nav_box">
            <div class="left_btn" @click="order">
                <div class="">
                    <img src="../../assets/img/left_btn.png" alt="">
                </div>                
            </div>
            <div class="right_btn" @click="menu">
                <div>
                    <img src="../../assets/img/right_btn.png" alt="">
                </div>
            </div>
        </div>
        <div class="btn_hint_box">
            <h2><img src="../../assets/img/title.png" alt=""></h2>
            <ul>
                <li @click="call">
                    <div>
                        <i><img src="../../assets/img/1.png" alt=""></i>
                        <h3>服务员</h3>
                    </div>
                </li>
                <li @click="reminder">
                    <div>
                        <i><img src="../../assets/img/2.png" alt=""></i>
                        <h3>催单</h3>
                    </div>
                </li>
                <li>
                    <div @click="invic">
                        <i><img src="../../assets/img/3.png" alt=""></i>
                        <h3>结账</h3>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import MD5 from 'md5'
import { Toast } from 'vant';
import storage from '@/assets/utils/storage.js';
export default {
    data () {
        return {
            ramadhin:'',
            shopid:'',//店铺id
            uid:'',//餐桌id
            tishi:'',
            istishi:false,
        }
    },
    computed:{
        phone(){
            return this.$route.query.phone
        },
        password(){
            return this.$route.query.password
        },
    },
    created(){
        
        
    },
    mounted(){
        this.getlogin();
    },
    methods:{
       //获取登录数据
       getlogin(){
            
            let data={
                cmd:"userLogin",
                phone:this.phone, //账号
                password:MD5(this.password),   //密码
            };            
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                   console.log(res.data.dataobject);
                   this.shopid=res.data.dataobject.shopid;
                   this.uid=res.data.dataobject.uid;
                   this.ramadhin=res.data.dataobject.name;
                   let obj={};
                    obj.phone=this.phone;
                    obj.password=this.password;
                    storage.set("login",obj);
               }
            })
       },
       close(){
            this.tishi=""
            this.istishi=false; 
       },
       //呼叫服务员
       call(){
            let data={
                cmd:"callWaiter",
                uid:this.uid,
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                   console.log(res.data.resultNote)
                   Toast('呼叫成功~');
               }
            })
            .catch(err=>{
                console.log(err)
            })
       },
       //催单
       reminder(){
           let data={
                cmd:"reminder",
                uid:this.uid,
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                   console.log(res.data.resultNote)
                   Toast('催单成功~');
               }
            })
            .catch(err=>{
                console.log(err)
            })
       },
       //跳转点餐
       order(){
           this.$router.push({
                path:"/order",
                query:{
                    shopid:this.shopid,
                    uid:this.uid
                },
               })
       },
       //跳转菜单
       menu(){
           this.$router.push({
                path:"/menu",
                query:{
                    shopid:this.shopid,
                    uid:this.uid
                },
           })
       },
       //跳转结账
       invic(){
           this.$router.push({
                path:"/invoic",
                query:{
                    shopid:this.shopid,
                    uid:this.uid
                },
               })
       }     
    },
}
</script>
<style lang="less" scoped>
.index_box{
    width: 100%;
    overflow: hidden;
    background-color: #ffffff;
    header{
        width: 100%;
        height: 88px;
        background-color: #ffffff;
        h1{
            text-align: center;
            font-size:18px;/*no*/
            font-weight:bold;
            color:rgba(29,32,35,1);
            line-height:88px;
        }
    }
    .banner_box{
        width: 100%;
        height: 500px;
        overflow: hidden;
        img{
            max-width: 100%;
        }
    }
    .btn_nav_box{
        width: 100%;
        overflow: hidden;
        margin-top: 30px;
        .left_btn{
            width:50%;
            float: left;
            height: 180px;
            padding: 0 15px 0 30px;
            div{
                width: 100%;
                height: 100%;
                img{
                    max-width:100%;
                }
            }
        }
        .right_btn{
            width: 50%;
            float: left;
            height: 180px;
            padding: 0 30px 0 15px;
            div{
                width: 100%;
                height: 100%;
                img{
                    max-width:100%;
                }
            }
        }
    }
    .btn_hint_box{
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 50px;
        h2{
            width:224px;
            margin: 0 auto;
            img{
                max-width:100%;
            }
        }
        ul{
            width: 100%;
            overflow: hidden;
            li{
                width: 33.33%;
                float: left;
                div{
                    width:214px;
                    height:220px;
                    background: #ffffff;;
                    box-shadow:0px 5px 20px 0px rgba(182,182,182,0.4);
                    border-radius:16px;
                    margin: 0 auto;
                    margin-top: 37px;
                    margin-bottom: 40px;
                    cursor: pointer;
                    i{
                        width: 85px;
                        height: 81px;
                        border: 1px dashed #dddddd;
                        float: left;
                        margin-top: 50px;
                        margin-left: 64.5px;
                        img{
                            max-width: 100%;
                        }
                    }
                    h3{
                        clear: left;
                        font-size:15px;/*no*/
                        font-weight:bold;
                        color:rgba(29,32,35,1);
                        line-height:90px;
                        text-align: center;
                    }
                } 
            }
        }
    }
}
</style>


