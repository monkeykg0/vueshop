<template>
    <div class="shoppingmall">
        <!-- search bar layout -->
        <div class="search-bar">
            <van-row>
                <van-col span="3"><img :src="locationIcon"  width="100%" alt=""> </van-col>
                <van-col span="16">search input</van-col>
                <van-col span="5">button </van-col>
            </van-row>  
        </div>
            
    </div>
</template>
<script>
export default {
    // name:''
    data(){
        return {
            locationIcon: require('../../assets/images/banglocation.png')
        }
    }
}
</script>
<style lang="less">
    .shoppingmall{
        .search-bar{
            height:50px;
            background:#e5017d;
            line-height:50px;
        }
    }
</style>


