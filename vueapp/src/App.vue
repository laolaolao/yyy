<template>
  <div id="app">
     <commonHeader :selectMenu="selectMenu"></commonHeader>
    <router-view class="content" @switchTab="switchTab"/>
   <CommonFooter :menuList="menuList" @changeTitle="changeTitle" :footerBgColor="selectMenu.bgColor"></CommonFooter>
  </div>
</template>
<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonFooter from '@/components/CommonFooter.vue'
export default {
  components:{
    CommonHeader,CommonFooter
  },
  methods:{
    changeTitle(menu){
      this.selectMenu = menu;
    },
    switchTab(menuName){
      this.menuList.forEach(menu=>{
        if(menu.name===menuName){
          this.selectMenu = menu;
        }
      })
   }
  },
 data () {
    return {
      menuList: [
        {
          title: '电影',
          bgColor: '#e54847',
          name: 'movie',
          path: '/movie'
        },{
          title: '音乐',
          bgColor: '#009688',
          name: 'music',
          path: '/music'
        },{
          title: '书籍',
          bgColor: '#795548',
          name: 'book',
          path: '/book'
        },{
          title: '图片',
          bgColor: '#3f51b5',
          name: 'photo',
          path: '/photo'
        }
      ],
      selectMenu:{},
    }
  }
}
</script>

<style lang="scss">
.content{
  margin: 1rem 0;
}
</style>
