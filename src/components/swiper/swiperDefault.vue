<template>
    <div>
        <swiper :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item,index) in recommendGoods" :key="index">
                <!-- slide{{item}} -->
                <div class="recommend-item">
                            <img :src="item.image" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice |moneyFilter}})</div>
                        </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css' 
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {toMoney} from '@/filter/moneyFilter.js'
export default {
    name:'swiperDefault',
    props:{
        recommendGoods:Array,
    },
    data(){
        return{
            slide:[1,2,3,4,5,6],
            swiperOption:{
                slidesPerView:3,
                pagination:{
                    // el:".swiper-pagination"
                }
            }
        }
    },
    components:{swiper,swiperSlide},
    filters:{
            moneyFilter(money){
            return toMoney(money)
        }  
    }
}
</script>
<style >
  .swiper-slide{
      /* height: 4rem; */
      text-align: center;
      /* padding-top: 3rem; */
      border-bottom: 1px solid #ccc;
  }
  .swiper{
       height: 7rem;
      border-top:1px solid #ccc;
      border-bottom:1px solid #ccc;
  }
</style>
