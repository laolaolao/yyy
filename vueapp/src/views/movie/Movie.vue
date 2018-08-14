<template>
    <div>
        <div>
            <ul>
                <li class="movie" v-for="movie in  movieList" :key="movie.id">
                    <div class="movie-img">
                        <img :src="movie.images.large" alt="">
                </div>
                  <div class="movie-into">
                      <div class="movie-into-title">{{movie.title}}</div>
                      <div>观众评分：<span class="movie-into-average">{{movie.rating.average}}</span></div>
                      <div class="movie-into-star">
                        <span v-for="item in movie.casts" :key="item.id">{{item.name}}&nbsp</span>
                      </div>
                  </div>
                </li>
            </ul>
        </div>
        <div class="loading" v-show="isLoading">
            <img src="@/assets/img/timg.gif" alt="">
        </div>
        <div class="end" v-show="isEnd">
            <h3>最后了</h3>
        </div>
    </div>
    
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
           movieList:[],
           isLoading:true,
           isEnd:false,
        }
    },
    methods:{
    getData(){
         // let url1= "https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/top250?start=0&count=5";
        let url2="https://api.myjson.com/bins/oydx8";
        this.isLoading = true;
        axios.get(url2).then(res=>{
           this.movieList= this.movieList.concat(res.data.subjects.slice(this.movieList.length,this.movieList.length + 5));
           this.isLoading= false;
          // console.log (res.data);
             let getList = res.data.subjects.slice(
          this.movieList.length,
          this.movieList.length + 5
        );
        if (getList.length < 5) {
          this.isEnd = true;
        }
           
        })
    }
    },
   
    created(){
        this.$emit('switchTab','movie'); 
        // console.log('book')
         this.getData();
    },
    mounted(){
        window.onscroll=() =>{
            let scrollTop = document.documentElement.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight;
            let clientHeight = document.documentElement.clientHeight;
            if(scrollHeight==scrollTop + clientHeight &&!this.isEnd ){
                this.getData();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
 .movie{
     display: flex;
     padding: 0.2rem;
     border-bottom: 0.02rem solid #ccc;
     &-img{
         flex-grow: 1;
         width: 0;
         img{
             width: 100%;
         }
     }
     &-into{
         flex-grow: 3;
         width: 0;
         margin-left: 0.2rem;
         &-title{
             font-weight: 700;
             font-size: 0.34rem;
             color: #333;
         }
         &-average{
             color:#faff00;
             font-weight: 700;
         }
         &-star {
             color: #666;
             font-size: 0.26rem;
         }
     }
 }
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.2rem;
  height: 2.2rem;
  img {
    width: 90%;
    position: absolute;
    padding: 0.1rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 0.2rem;
  }
}
.end{
    text-align: center;
}
</style>
