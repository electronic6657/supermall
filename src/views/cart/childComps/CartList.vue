<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
    <cart-list-item v-for="item in getCartList" :key="item.iid" :item-info="item"></cart-list-item>
  </scroll>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";
export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(['getCartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 58px - 30px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>
