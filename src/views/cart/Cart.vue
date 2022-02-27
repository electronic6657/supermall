<template>
<div class="cart">
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
<!--  商品展示-->
  <cart-list></cart-list>
<!--  底部汇总-->
  <cart-bottom-bar/>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {mapGetters} from 'vuex'
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
export default {
  name: "cart",
  components: {
    CartBottomBar,
    NavBar,
    CartList
  },
  computed:{
    // ...mapGetters(['getCartList','cartLength'])
    ...mapGetters({
      length:'cartLength',
    })
  }
}
</script>

<style scoped>

.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;

}
</style>
