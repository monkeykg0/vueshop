<template>
    <div class="shoppingmall">
        <!-- 搜索条区域 -->
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3"><img :src="locationIcon"  width="80%" alt="" class="location-icon"> </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5"><van-button size="mini">查找</van-button></van-col>
            </van-row>  
        </div>
        <!--轮播区域  -->
        <div class="swiper-area">
            <van-swipe :autoplay="10000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img :src="banner.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 商品分类区域 -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- 广告区域 -->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" alt="">
        </div>
        <!-- 推荐商品区域 -->
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <!-- <swiper :options="swiperOption" class="swiper">
                    <swiper-side v-for="(item,index) in recommendGoods" :key="index" class="swiper-slide" >
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-side>
                </swiper> -->
                <swiperDefault :recommendGoods="recommendGoods"></swiperDefault>
            </div>
        </div>
        <!-- 楼层区域 -->
        <!-- <div class="floor">
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="floor1_0.image" alt="" width="100%">
                </div>
                <div>
                    <div class="floor-two"><img :src="floor1_1.image" width="100%" /></div>
                    <div><img :src="floor1_2.image" width="100%" /></div>
                </div> 
            </div>
            <div class="floor-rule">
                <div v-for="(item,index) in floor1.slice(3)":key="index">
                    <img :src="item.image" width="100%"alt="">
                </div>
            </div>
        </div> -->
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <!-- 热卖区域 -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                          <goodsInfo :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfo>  
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
import swiperDefault from '../swiper/swiperDefault'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
export default {
    created(){
        axios({
            method:'get',
            url:'/data'
        }).then((response)=>{
            console.dir(response)
            if(response.status==200){
                this.category=response.data.data.category;//分类
                this.adBanner=response.data.data.advertesPicture;//广告
                this.bannerPicArray=response.data.data.slides;//轮播图
                this.recommendGoods=response.data.data.recommend;  //推荐商品
                this.floor1=response.data.data.floor1;//楼层1数据
                this.floor2 = response.data.data.floor2              //楼层2数据
                this.floor3 = response.data.data.floor3              //楼层3数据
                this.floorName = response.data.data.floorName;//楼层名称
                this.hotGoods= response.data.data.hotGoods;
            }
        })
    },
    data(){
        return {
            locationIcon: require('../../assets/images/banglocation.png'),
            bannerPicArray:[],
            category:[],
            adBanner:{},
            recommendGoods:[],
            floor1:[],
            floor2:[],
            floor3:[],
            // floor1_0:{},
            // floor1_1:{},
            // floor1_2:{},
            floorName:{},
            hotGoods:[]
        }
    },
    components:{swiperDefault,floorComponent,goodsInfo},

}
</script>
<style lang="less">
    .shoppingmall{
        width:100%;
        overflow-x: hidden;
        .search-bar{
            height:2.2rem;
            background:#e5017d;
            line-height:2.2rem;
            width:100%;
            overflow: hidden;
            .location-icon{
                padding-top:0.2rem;
                padding-left:0.3rem;
            }
            .search-input{
                width:100%;
                height: 1.3rem;
                border-top:0px;
                border-left:0px;
                border-right:0px;
                border-bottom: 1px solid !important ;
                background-color: #e5017d;
                color:#fff;
            }
        }
        .swiper-area{
            width:20rem;
            clear:both;   
        }
        .type-bar{
            display: flex;
            flex-direction: row;
            flex-wrap:nowrap;
            background-color:#fff;
            margin:0 .3rem .3rem .3rem;
            border-radius: .3rem;
            font-size:14px;
            &>div{
                flex:1;
                padding:0.3rem;
                font-size:12px;
                text-align: center;
            }
        }
        .recommend-area{
            background: #fff;
            margin-top:0.3rem;
            .recommend-title{
                border-bottom:1px solid #eee;
                font-size:14px;
                padding:.2rem;
                color:#e5017d;
            }
            .recommend-body{
                border-bottom:1px solid #eee;
                .recommend-item{
                    width:99%;
                    border-right: 1px solid #eee;
                    font-size: 12px;
                    text-align: center;
                }
            }
        }
        // .floor{
        //     .floor-anomaly{
        //         display: flex;
        //         flex-direction:row;
        //         background-color: #fff;
        //         border-bottom:1px solid #ddd;
        //         & div{
        //             width:10rem;
        //             box-sizing: border-box;
        //             -webkit-box-sizing: border-box;
        //         }
        //         .floor-one{
        //             border-right:1px solid #ddd;
        //         }
        //         .floor-two{
        //             border-bottom:1px solid #ddd;
        //         }
        //     }
        //     .floor-rule{
        //         display: flex;
        //         flex-direction: row;
        //         flex-wrap:wrap;
        //         background-color: #fff;
        //         & div{
        //             -webkit-box-sizing: border-box;
        //             box-sizing: border-box;
        //             width:10rem;
        //             border-bottom:1px solid #ddd;
        //         }
        //         & div:nth-child(odd){
        //              border-right: 1px solid #ddd;
        //         }
        //     }
        // }
        .hot-area{
            text-align: center;
            font-size:14px;
            height: 1.8rem;
            line-height:1.8rem;
        }
    }
</style>


