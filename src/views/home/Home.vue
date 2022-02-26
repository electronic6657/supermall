<template>
 <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <tab-control
     :titles="['流行','新款','精选']"
     @tabClick="tabClick"
     ref="tabControl1"
     class="tab-control"
     v-show="isTabFixd"
   />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadmore"
            :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="SwiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <goods-list :goods="ShowGoods"/>
    </scroll>
   <back-top @click.native="backClick" v-show="isshowcontent"/>
 </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {debounce} from '@/common/utils'



export default {
  name: "home",
  components:{
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    BackTop
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop': {page:0,list: []},
        'new': {page:0,list: []},
        'sell': {page:0,list: []},
      },
      currentType: 'pop',
      isshowcontent: false,
      taboffsettop: 0,
      isTabFixd: false,
      SaveY: 0
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted() {
    //传到防抖函数中
    //函数加不加括号的问题：函数如果不加括号相当于把函数存起来等着被调用，函数加括号相就会执行函数体
    const refresh = debounce(this.$refs.scroll.refresh,200)
    //监听item中图片加载完成
    this.$bus.$on('ItemImageLoad', () =>{
      // console.log('-----');
      refresh()
    })
    // 获取tabcontrol的offsettop
    // setTimeout(() =>{
    //   this.taboffsettop = this.$refs.tabControl.$el.offsetTop
    //   // console.log(this.$refs.tabControl.$el.offsetTop);
    // },100)
  },

  // destroyed() {
  //   this.$bus.$off()
  // },
  methods:{
    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      switch (index){
        case 0:
          this.currentType ='pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.isActive = index
      this.$refs.tabControl.isActive = index
      // this.currentType = (index < 1) ? 'pop' : (index == 1) ?'new' : 'sell'
    },
    //控制返回的地址和返回用的时间
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },

    contentScroll(position){
      //控制返回最上图标的显示
        this.isshowcontent = -position.y > 1000
      //控制tabcontrol的fixed布局是否生效（吸顶）
        this.isTabFixd = -position.y > this.taboffsettop
    },
    //下拉加载更多
    loadmore(){
      this.getHomeGoods(this.currentType)

    },
    // 获取tabcontrol的offsettop
    SwiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
      this.taboffsettop = this.$refs.tabControl.$el.offsetTop
    },


    /**
     * 网络请求相关的方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list

      })
    },
    getHomeGoods(type){
      const page =this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //写在网络请求这是因为要在网络请求完成之后在进行下一次上拉加载更多操作
         this.$refs.scroll.finishPullUp()
      })
    }
  },
  computed:{
    ShowGoods(){
      return this.goods[this.currentType].list
    },

  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.SaveY,1)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.SaveY = this.$refs.scroll.GetScrollY()
  }
}

</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
/*在使用浏览器原生滚动时才有用*/
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  /*position: sticky;*/
  /*top: 0;*/
  z-index: 9;
}
.tab-control{
  position: relative;
  z-index: 9;

}

.content{
  /*height: calc(100% - 44px - 49px);*/
  /*overflow: hidden;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;


}


</style>
