<template>
    <div class="detail_box">
        <div class="foodimg_box">
            <div class="fan" @click="goup">
                <img src="../../assets/img/fanhui.png" alt="">
            </div>
            <div class="imgbg">
                <img :src="foodinfo.goodsimage" alt="">
            </div>
        </div>
        <div class="foodinfo">
            <h1>{{foodinfo.goodsname}}</h1>
            <button>{{foodinfo.type | foodtype}}</button>
            <div class="jiage">
                <div class="jiagebox">
                    <h2>原价：<span>￥</span>{{foodinfo.price}}</h2>
                    <h3>会员价：<span>￥</span>{{foodinfo.mprice}}</h3>
                </div>
                <div class="addfoods" @click="addfoods">
                    <img src="../../assets/img/addfoods.png" alt="">
                </div>
            </div>
            <p>{{foodinfo.goodsdesc}}</p>
        </div>
        <div class="gowu">
            <img src="../../assets/img/caidan.png" alt="">
            <div class="num">
                {{number}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            foodinfo:{},
            number:0,
            gowu:{},  
        }
    },
    filters:{
        foodtype(val){
            if(val==1){
                return '普通商品'
            };
            if(val==2){
                return '特价商品'
            }
        }
    },
    computed:{
        shopid(){
            return this.$route.query.shopid
        },
        uid(){
            return this.$route.query.uid
        },
        foodid(){
            return this.$route.query.foodid
        },
        index(){
            return this.$route.query.index
        },
    },
    created(){
        this.getfooddetail();
        this.getgowu();
    },
    methods:{
        //获取商品详情
        getfooddetail(){
            let data={
                cmd:"getGoodsDetail",
                goodsid:this.foodid,//商品id
                uid:this.uid,//餐桌id            
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                   console.log(res.data.dataobject)
                    this.foodinfo=res.data.dataobject
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
                   this.gowu=res.data;
                   this.number=res.data.dataList.length;
                    
               }
            })
        },
        //返回上一页
        goup(){
            this.$router.push({
                path:"/order",
                query:{
                    shopid:this.shopid,
                    uid:this.uid,
                    index:this.index,
                }, 
            })
        },
        //商品加入购物车
        addfoods(){
            let data={
                cmd:"addGoodsCar",
                goodsid:this.foodid,//商品id
                uid:this.uid,//餐桌id
                number:1,//最终数量             
            };
            this.$get(this.API.urls.getdata+"/?json="+encodeURIComponent(JSON.stringify(data)),{})
            .then(res => {
               if(res.status==200 && res.data.result==0){
                    console.log(res.data);
                    this.getgowu()
               }
            })
        },
    }
}
</script>
<style lang="less" scoped>
.detail_box{
    width: 100%;
    overflow: hidden;
    .foodimg_box{
        width: 100%;
        height: 580px;
        position: relative;
        overflow: hidden;
        .fan{
            width: 50px;
            height: 50px;
            position: absolute;
            z-index: 2;
            top: 60px;
            left: 30px;
            img{
                max-width: 100%;
            }
        }
        .imgbg{
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            img{
                display: block;
                max-height: 100%;
                margin: 0 auto;
            }
        }

    }
    .foodinfo{
        width: 100%;
        overflow: hidden;
        h1{
            color:#1d2023;
            font-size: 18px;/*no*/
            margin: 30px 0 0 30px;
        }
        button{
            width: 128px;
            height: 38px;
            background-color: #ffffff;
            border: 1px solid #ec1f40;/*no*/
            border-radius: 4px;
            color: #ec1f40;
            font-size: 10px;/*no*/
             margin: 10px 0 0 30px;
        }
        .jiage{
            width: 100%;
            overflow: hidden;
            margin-top: 58px;
            .jiagebox{
                float: left;
                overflow: hidden;
                h2{
                    font-size:11px;/*no*/
                    color: #606972;
                    margin-left:30px;

                }
                h3{
                    color: #1d2023;
                     font-size:15px;/*no*/
                      margin-left:30px;
                      font-weight: 600;
                      margin-top: 10px;
                }
            }
            .addfoods{
                width: 150px;
                height: 50px;
                float: right;
                img{
                    max-width:100%;
                    margin-top: 10px;
                }
            }
        }
        p{
            font-size:12px;/*no*/
            color: #606972;
            margin-left:30px;
            margin-top: 40px; 
        }
    }
    .gowu{
        width:100px;
        height: 100px;
        border-radius: 100px;
        position: fixed;
        bottom: 20%;
        right: 30px;
        img{
            max-width:100%;
        }
        .num{
            width: 30px;
            height: 30px;
            border-radius: 30px;
            background-color: #ec1f40;
            text-align: center;
            line-height: 30px;
            color: #ffffff;
            font-size: 10px;/*no*/
            position: absolute;
            top: 10px;
            right:10px;
        }
    }
}
</style>


