<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="navbar"/>
    <scroll  class="content" ref="scroll" @scroll="contentscorll" :probe-type="3">
    <detail-swiper :top-image="topimage"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isshowcontent"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/datail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backTop/BackTop";
import {debounce} from "@/common/utils";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop

  },
  data(){
    return{
      iid: null,
      topimage: [],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopYs: [0,1000,3000],
      getThemeTop: null,
      currentIndex:0,
      isshowcontent: false,
    }
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then( res => {
      //获取数据
      // console.log(res);
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
      //取出评论的信息
      if(data.rate.cRata !== 0){
        this.commentInfo = data.rate.list[0]
      }
      this.getThemeTop = debounce(() =>{
        this.$nextTick(() =>{
          this.themeTopYs= []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs)
        })
      },300)

    })
    getRecommend().then(res =>{
      this.recommend = res.data.list
    })

    },
  mounted() {
    const newRefresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('detailItemImageLoad',() =>{
      newRefresh()
      this.getThemeTop()
    })


  },

  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },
    contentscorll(position){
      const positionY =-position.y
      for (let i=0; i<this.themeTopYs.length;i++){
        if( this.currentIndex!==i && ((i<this.themeTopYs.length-1 && positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) ||
          (i===this.themeTopYs.length-1 && positionY>this.themeTopYs[i]))){
          this.currentIndex =i
          this.$refs.navbar.isactive = this.currentIndex
        }
      }
      this.isshowcontent = -position.y > 1000
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    addToCart(){
      const product ={}
      product.image = this.topimage[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)

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
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>
