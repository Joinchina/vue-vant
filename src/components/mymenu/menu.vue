<template>
    <div class="menu_box">
        <header>
            <div class="goup" @click="goup">
                <img src="../../assets/img/icon_left.png" alt="">
            </div>
            <div class="tabvan">
                <van-tabs v-model="active" @click="onClick">
                    <van-tab title="待提交订单"></van-tab>
                    <van-tab title="已下单菜单"></van-tab>
                </van-tabs>
            </div>
        </header>
        <div class="content">
            <div class="commit" v-if="active==0">
                <ul>
                    <li v-for="item in right.dataList" class="right-item right-item-hook" :key="item.goodsid">
                        <div class="foodimg">
                            <img :src="item.goodsimage" alt="">
                        </div>
                        <div class="info">
                            <h2>{{item.goodsname}}</h2>
                            <div class="money">
                                <span class="fen"> 会员：</span><span>￥</span>{{item.mprice}}<span class="fen2">{{item.price}} /份</span>
                            </div>
                        </div>
                        <div class="reducebtn" v-if="item.carnum!=0"  @click.stop="jianfoods(item.goodsid,item.carnum)">
                            <img src="../../assets/img/jianshao.png" alt="">
                        </div>
                        <div class="number">
                            {{item.carnum}}
                        </div>
                        <div class="addbtn" @click.stop="addfoods(item.goodsid,item.carnum)">
                            <img src="../../assets/img/tianjia.png" alt="">
                        </div>
                        <hr>
                    </li>
                </ul>
            </div>
            <div class="downfood" v-else>
                <ul>
                    <li v-for="(item,index) in downfoos.dataList" class="right-item right-item-hook" :key="index">
                        <div class="foodimg">
                            <img :src="item.goodsimage" alt="">
                        </div>
                        <div class="info">
                            <h2>{{item.goodsname}}</h2>
                            <div class="money">
                                <span class="fen"> 会员：</span><span>￥</span>{{item.mprice}}<span class="fen2">{{item.price}} /份</span>
                            </div>
                        </div>                        
                        <hr>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer_box" v-if="active==0">
            <h1>会员价:￥{{right.allmprice}}</h1>
            <h2>原价:￥{{right.allprice}}</h2>
            <button class="btn_one" @click="addfoodsnav">继续加菜</button>
            <button class="btn_two" @click="pays">提交菜单</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: 0,
            right:[],
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
        this.getgowu();
    },
    methods:{
         //路由返回上一页
        goup(){
            this.$router.go(-1)
        },
        onClick(index,title){
            if(index==0){

            }else{
                this.getdownfood()
            }
        },
        //添加食品
        addfoods(id,num){
            num++
            let data={
                cmd:"addGoodsCar",
                goodsid:id,//商品id
                uid:this.uid,//餐桌id
                number:num,//最终数量             
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                    console.log(res.data);
                    this.getgowu()
               }
            })
        },
        //减少菜品
        jianfoods(id,num){
            num--
            let data={
                cmd:"addGoodsCar",
                goodsid:id,//商品id
                uid:this.uid,//餐桌id
                number:num,//最终数量             
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                    console.log(res.data);
                    this.getgowu()
               }
            })
        },
        //获取购物车信息
        getgowu(){
            let data={
                cmd:"getGoodsCarList",
                uid:this.uid,//餐桌id            
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                   console.log("111",res.data)
                   this.right=res.data
                    
               }
            })
        },
        //点击继续加菜
        addfoodsnav(){
            this.$router.push({
                path:'/order',
                query:{
                    shopid:this.shopid,
                    uid:this.uid,
                },
            })
        },
        //买单
        pays(){
             let data={
                cmd:"subGoodsCar",
                uid:this.uid,//餐桌id
                remarks:'',            
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                   console.log("111",res.data)
                   this.getgowu()
               }
            })
        },
        //获取已下单菜品
        getdownfood(){
           let data={
                cmd:"getNowOrderDetail",
                uid:this.uid,//餐桌id            
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                   console.log("111",res.data)
                   this.downfoos=res.data
                    
               }
            }) 
        },
    }
}
</script>
<style lang="less" >
.menu_box{
    width: 100%;
    overflow: hidden;
    background-color: #ffffff;
    header{
        width: 100%;
        height: 88px;
        overflow: hidden;
        position: relative;
        .goup{
            width: 60px;
            height: 60px;
            margin: 14px 0 0 10px;
            position: absolute;;
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
        .tabvan{
            width: 100%;
            overflow: hidden;
            position: absolute;
            z-index:1;
            .van-tabs{
                height: 88px;
            }
            .van-tabs--line .van-tabs__wrap {
                height: 88px;
            }
            .van-tab{
              
                font-size: 15px;/*no*/
                line-height: 88px;
            }
        }
        
    }
    .content{
        width: 100%;
        overflow: hidden;
        .commit,.downfood{

                width: 100%;
                margin-top: 20px;
                padding: 0 30px;
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
                    h2{
                            font-size:15px;/*no*/
                            color: #1d2023;
                            font-weight: 600;
                            margin: 8px 0 0 20px;
                        }
                        .money{
                            clear: left;
                            font-size: 20px;/*no*/
                            color:#ff0000;
                            margin: 30px 0 0 20px;
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
                .reducebtn{
                    position: absolute;
                    right: 120px;
                    bottom: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50px;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                .addbtn{
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50px;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                .number{
                    position: absolute;
                    right: 84px;
                    bottom: 20px;
                    font-size:17px;/*no*/
                    font-weight:bold;
                    color:rgba(0,0,0,1);
                    line-height:56px;
                   
                }
                
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
            margin-left: 20px;
        }
        h2{
            font-size:11px;/*no*/
            font-weight:500;
            color:rgba(255,255,255,1);
            opacity:0.3;
            float: left;
            margin-left: 10px;
            padding-left: 10px;
            border-left: 1px solid rgba(255,255,255,1);/*no*/
            margin-top: 33px;
        }
        .btn_one{
            float: left;
            width:143px;
            height:50px;
            background:rgba(65,87,98,1);
            font-size:14px;/*no*/
            font-weight:bold;
            color:rgba(255,255,255,1);
            border:none;
            border-top-left-radius: 70px;
            border-bottom-left-radius: 70px;
            margin-top: 25px;
            margin-left: 20px;
        }
        .btn_two{
            float: left;
            width:143px;
            height:50px;
            background:url('../../assets/img/bj.png') no-repeat top left;
            font-size:14px;/*no*/
            font-weight:bold;
            color:rgba(255,255,255,1);
            border:none;
            border-top-right-radius: 70px;
            border-bottom-right-radius: 70px;
            margin-top: 25px;
        }
    }
}
</style>


