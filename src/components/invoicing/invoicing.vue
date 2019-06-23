<template>
    <div class="invic">
        <div class="heard">
          <div class="goup" @click="goup">
              <img src="../../assets/img/icon_left.png" alt="">
          </div>
          <h2>买单</h2>         
        </div>
        <div class="uidinfo">
            <h1>桌号：{{downfoos.name}}</h1>
            <span></span>
            <h2>菜品数量：{{downfoos.goodsnum}}</h2> 
        </div>
        <div class="downfood" >
            <ul>
                <li v-for="(item,index) in downfoos.dataList" class="right-item right-item-hook" :key="index">
                    <div class="foodimg">
                        <img :src="item.goodsimage" alt="">
                    </div>
                    <div class="info">
                        <h2>{{item.goodsname}}</h2>
                        <h3>数量：{{item.carnum}}份</h3>
                        <div class="money">
                            <span class="fen"> 会员：</span><span>￥</span>{{item.mprice}}<span class="fen2">{{item.price}} /份</span>
                        </div>
                    </div>                        
                    <hr>
                </li>
            </ul>
        </div>
        <div class="footer_box">
            <h1>会员价:￥{{downfoos.allmprice}}</h1>
            <h2>原价:￥{{downfoos.allprice}}</h2>
            <button class="btn_two" @click="pays">联系服务员</button>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    data () {
        return {
            downfoos:[],
        }
    },
    computed:{
        shopid(){
            return this.$route.query.shopid
        },
        uid(){
            return this.$route.query.uid
        },
    },
    created(){
        this.getdownfood();
    },
    methods: {
        //路由返回上一页
        goup(){
            this.$router.go(-1)
        },
        //获取已下单商品
        getdownfood(){
           let data={
                cmd:"getNowOrderDetail",
                uid:this.uid,//餐桌id            
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                   console.log("111",res.data)
                   this.downfoos=res.data;
                    
               }
            }) 
        },
        //结账
        pays(){
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
        }
    }
}
</script>
<style lang="less" scoped>
.invic{
    width: 100%;
    overflow: hidden;
     .heard{
        width: 100%;
        height: 88px;
        overflow: hidden;
        .goup{
            width: 60px;
            height: 60px;
            margin: 14px 0 0 10px;
            position:relative;
            z-index: 2;
            left: 0;
            top: 0;
            img{
                max-width:20px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%)
            }
        }
        h2{
            text-align: center;
            font-size:17px;/*no*/
            font-weight:bold;
            color:rgba(0,0,0,1);
            line-height:88px;
            position: absolute;
            z-index:1;
            width: 100%;
            top: 0;
            left: 0;

        }
       
    }
    .uidinfo{
        width: 100%;
        height:50px;
        background:rgba(246,246,246,1);
        h1{
            font-size:12px;/*no*/
            font-weight:500;
            color:rgba(102,102,102,1);
            line-height: 50px;
            float: left;
            margin-left: 30px;
        }
        span{
            width:1px;/*no*/
            height:16px;
            background:rgba(153,153,153,1);
            float: left;
            margin-left: 46px;
            margin-top: 16px;
        }
        h2{
            float: left;
            font-size:12px;/*no*/
            font-weight:500;
            color:rgba(102,102,102,1);
            line-height: 50px;
            margin-left: 30px;
        }
    }
    .downfood{
            width: 100%;
            margin-top: 20px;
            padding: 0 30px;
            margin-bottom: 100px;
            .right-item{
                position: relative;
                overflow: hidden;
                margin-bottom: 20px;
                .foodimg{
                    float: left;
                    width: 120px;
                    height: 120px;
                    border-radius: 10px;
                    overflow: hidden;
                    img{
                        height: 100%;
                    }
                }
            .info{
                float: left;
                width:80%;
                position: relative;
                h2{
                    font-size:15px;/*no*/
                    color: #1d2023;
                    font-weight: 600;
                    margin: 8px 0 0 20px;
                }
                h3{
                   font-size:11px;/*no*/
                    color:rgba(153,153,153,1);
                    font-weight: 600;
                    margin: 8px 0 0 20px;
                    position: absolute;
                    top: 0;
                    right: 0;  
                }
                .money{
                    clear: left;
                    font-size: 20px;/*no*/
                    color:#ff0000;
                    margin: 20px 0 0 20px;
                    span{
                        font-size: 14px;/*no*/
                    }
                    .fen{
                        color: #999999;
                        font-size: 12px;/*no*/
                    }
                    .fen2{
                        color: #999999;
                        font-size: 12px;/*no*/
                        text-decoration:line-through;
                        margin-left: 10px;
                    }
                }
            }
            hr{
                clear: left;
                margin:24px 0 0px 0;
                background-color: #f2f2f2;
                float: left;
                width: 100%;
                height: 1px;/*no*/
                border: none;
            }                        
        }
    }
    .footer_box{
        width: 100%;
        height:100px;
        background:rgba(37,43,46,1);
        position: fixed;
        left: 0;
        bottom: 0;
        h1{
            float: left;
            font-size:14px;/*no*/
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:100px;
            margin-left: 30px;
        }
        h2{
            font-size:11px;/*no*/
            font-weight:500;
            color:rgba(255,255,255,1);
            opacity:0.3;
            float: left;
            margin-left: 30px;
            padding-left: 30px;
            border-left: 1px solid rgba(255,255,255,1);/*no*/
            margin-top: 33px;
        }       
        .btn_two{
            float: right;
            width:230px;
            height:70px;
            background:url('../../assets/img/bj.png') no-repeat top left;
            font-size:14px;/*no*/
            font-weight:bold;
            color:rgba(255,255,255,1);
            border:none;
            border-radius: 70px;
            margin-top: 15px;
            margin-right: 30px;
        }
    }    
}
</style>


