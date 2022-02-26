<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll  class="content" ref="scroll">
    <detail-swiper :top-image="topimage"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail,Goods,Shop,GoodsParam} from "@/network/datail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
export default {
  name: "Detail",
  components: {
    Scroll,
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo

  },
  data(){
    return{
      iid: null,
      topimage: [],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{}
    }
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then( res => {
      //获取数据
      console.log(res);
      const data = res.result
      //获取轮播图图片
      this.topimage = res.result.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //获取商品详情数据
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    })

    },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }

}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
