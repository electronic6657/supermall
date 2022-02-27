<template>
    <div class="bottom-bar">
      <div class="check-content">
      <check-button class="check-button"  :is-checkd="checkall" @click.native="checkclick"/>
        <span>全选</span>
      </div>
      <div class="total"> 总价{{totalprice}}</div>
      <div class="calculate">去结算: ({{checklength}})</div>
    </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",

  components: {
    CheckButton
  },
  computed:{
    totalprice(){
      return '¥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checklength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    checkall(){
      return this.$store.state.cartList.every(item => item.checked)
    }
  },
  methods:{
    checkclick(){
      if(this.checkall){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)

      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
  font-size: 15px;


}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 70px;
  margin-right: 10px;
}
.check-button{
  width: 20px;
  height: 20px;
  margin-right: 5px;

}

.total{
  align-items: center;
  padding-top: 10px;
  flex: 1;
}
.calculate{
  align-items: center;
  text-align: center;
  margin-left: auto;
  padding-top: 10px;
  background-color: red;
  width: 90px;

}

</style>
