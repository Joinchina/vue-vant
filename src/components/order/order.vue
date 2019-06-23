<template>
    <div class="order_box">
        <div class="heard">
          <div class="goup" @click="goup">
              <img src="../../assets/img/icon_left.png" alt="">
          </div>
          <h2>开始点餐</h2>
          <div class="godpwn" @click="gomymenu">
              <h3>我的菜单</h3>
          </div>  
        </div>
        <div class="content">
            <div class="left" ref="left">
                <ul>
                    <li v-for="(item,index) in left" :class="{current:currentid==index}" :key="index" @click="getnowlist(item.typeid,index)">
                        <span class="left-item">{{item.typename}}</span>
                    </li>
                </ul>
            </div>
            <div class="right" ref="right">
                <ul>
                    <li v-for="item in right" class="right-item right-item-hook" :key="item.goodsid" @click="godetail(item.goodsid)">
                        <div class="foodimg">
                            <img :src="item.goodsimage" alt="">
                        </div>
                        <div class="info">
                            <h2>{{item.goodsname}}</h2>
                            <div class="money">
                                <span>￥</span>{{item.mprice}}<span class="fen"> /份</span>
                            </div>
                        </div>
                        <div class="addbtn" @click.stop="addfoods(item.goodsid)">
                            <img src="../../assets/img/tianjia.png" alt="">
                        </div>
                        <hr>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    data () {
        return {
           left:[],
           right:[],
           listHeight:[],
           scrollY:0,//实时获取当前Y的高度
           lefts:{},
           rights:{},
           currentid:0,
        }
    },
    computed:{
        shopid(){
            return this.$route.query.shopid
        },
        uid(){
            return this.$route.query.uid
        },
        index(){
            return this.$route.query.index
        }
    },
    created(){
        
        this.getshoplist()
    },
    mounted(){
         
    },
    methods:{
        //获取商品分类
        getshoplist(){
            let data={
                cmd:"getTypeList",
                shopid:this.shopid,             
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                    console.log(res.data.dataList);
                    this.left=res.data.dataList;
                    // 默认获取第一个商品
                    if(this.index){
                        this.getnowlist(res.data.dataList[this.index].typeid)
                        this.currentid=this.index;
                    }else{
                        this.getnowlist(res.data.dataList[0].typeid)
                        this.currentid=0;
                    }
                    
               }
            })
        },
        //获取当前分类下的菜
        getnowlist(val,index){
            this.currentid=index;
            let data={
                cmd:"getTypeGoodsList",
                shopid:this.shopid,
                uid:this.uid,
                typeid:val,             
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                    console.log(res.data);
                    this.right=res.data.dataList
               }
            })
        },
        //路由返回上一页
        goup(){
            this.$router.push({
                path:"/index",
                query:{
                    shopid:this.shopid,
                    uid:this.uid,
                }, 
            })
        },
        //路由跳转我的菜单
        gomymenu(){
            this.$router.push({path:"/menu",query:{
                    shopid:this.shopid,
                    uid:this.uid,
                }, })
        },
        //跳转商品详情
        godetail(foodid){
            this.$router.push({
                path:'/orderdetail',
                query:{
                    shopid:this.shopid,
                    uid:this.uid,
                    foodid:foodid,
                    index:this.currentid
                },
            })
        },
        //商品加入购物车
        addfoods(id){
            let data={
                cmd:"addGoodsCar",
                goodsid:id,//商品id
                uid:this.uid,//餐桌id
                number:1,//最终数量             
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                    console.log(res.data);
                    Toast('添加成功~');
               }
            })
        },
    },
}
</script>
<style lang="less" scoped>
.order_box{
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
        .godpwn{
            position: absolute;
            z-index: 2;
            font-size:12px;/*no*/
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:88px;
            margin-right:20px;
            top: 0;
            right:0; 
        }
    }
    .content{
        display: flex;
        position: absolute;
        top: 88px;
        bottom:0;
        width: 100%;
        overflow: hidden;
        background:rgba(247,247,247,1);
        .left{
            flex: 0 0 160px;
            width: 160px;
            background-color: #f3f5f7;
            li{
                width: 100%;
                height:100px;
                line-height: 100px;
                font-size:13px;/*no*/
                font-weight:500;
                color:rgba(102,102,102,1);
                text-align:center;
            }
        }
        .current{
            background:rgba(255,255,255,1);
            font-size:13px;/*no*/
            font-weight:bold!important;
            color:rgba(0,0,0,1)!important;
            border-left: 5px solid #3b87ed;
           
        }
        // .left-item{
        //     display: block;
        //     width: 100%;
        //     height: 100%;
        //     line-height: 100px;
        //     text-align: center;
        //     font-size:13px;/*no*/
        //     font-weight:500;
        //     color:rgba(102,102,102,1);
        // }
        .right{
            flex: 1;
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
                            color: #999999
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
               .addbtn{
                   position: absolute;
                   right: 20px;
                   bottom: 10px;
                   width: 50px;
                   height: 50px;
                   border-radius: 50px;
                   img{
                       max-width: 100%;
                       max-height: 100%;
                   }
               }
            }
        }
    }
}
</style>


