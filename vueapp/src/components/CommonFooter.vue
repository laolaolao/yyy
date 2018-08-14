<template>
    <ul class="footer" :style="{background:footerBgColor}">
        <li class="footer-menu" v-for="(menu,index) in menuList" :key="index">
            <router-link @click.native="selectMenu(menu)" :to="menu.path">{{menu.title}}</router-link>
        </li>
    </ul>
</template>
<script>
export default {
     data() {
    return {
     
    };
  },
   props:["menuList","footerBgColor"],
   methods:{
       selectMenu(menu){
          
           this.$emit('changeTitle',menu )
       }
   }
}

</script>
<style lang="scss" scoped>
.footer{
    position: fixed;
    background-color: #e54847;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    display: flex;
    &-menu{
        flex-grow: 1;
        text-align:center;
        a{
            color: #ccc;
            outline: none;
            &.router-link-active{
                color: #fff;
            }
        }        
    }
}
</style>
