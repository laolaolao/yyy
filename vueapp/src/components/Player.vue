<template>
<div>
    <div class="album">
        <div class="album-mask" :style="{background:'url('+albumImg+')no-repeat center/cover'}"></div>
        <div class="album-img">
            <img :src="albumImg" alt="">
        </div>
        <div class="album-info">
            <p class="album-info-title">{{albumTitle}}</p>
            <p class="album-info-author">{{albumAnthor}}</p>
            <div class="album-info-control clearfix">
                 <div class="album-info-control-icon">
                    <i class="iconfont icon-shangyishou" @click="prev"></i>
                    <i class="iconfont icon-bofang " v-show="!isPlay" @click="play"></i>
                    <i class="iconfont icon-zanting" v-show="isPlay" @click="pause"></i>
                    <i class="iconfont icon-xiayishou" @click="next"></i>
                    <span class="album-incon-control-menu" @click="toggleList=!toggleList"> 歌单</span>
                 </div>
            </div>
        </div>
    </div>
    <transition name="slide">
      <ul class="music-list"  v-show="toggleList">
        <li :class="['music-list-item',nowIndex == index? 'selected':'']" @click="selectMusic(index)" v-for="(music,index) in musicList" :key="index">
        <span >{{music.title}}&nbsp;-&nbsp;</span>
        <span>{{music.author}}</span>
    </li>
</ul>
    </transition>
    <div> <audio ref="musicAudio" :src="musicSrc" autoplay controls @play="isPlay=true" @pause="isPlay=false"></audio></div>
</div>

</template>
<script>

export default {
    props:["musicList"],
    data(){
        return{
            nowIndex:-1,
            albumImg:"http://img3.imgtn.bdimg.com/it/u=1039246244,1205520727&fm=27&gp=0.jpg",
            albumTitle:"",
            albumAnthor:"",
            isPlay:false,
            toggleList:true,
            musicSrc: "" 
        }; 
    },
    
    methods:{
           selectMusic(index) {
              this.nowIndex = index;
              
           },
         play() {
      this.$refs.musicAudio.play();
    },
         pause() {
      this.$refs.musicAudio.pause();
    },
        prev(){
            this.nowIndex--;
            if(this.nowIndex == -1){
                this.nowIndex = this.musicList.lenght - 1;
            }
        },
        next(){
            this.nowIndex++;
            if(this.nowIndex == this.musicList.lenght){
                this.nowIndex = 0;
            }
        }
        },
        watch:{
        nowIndex() {
      let nowMusic = this.musicList[this.nowIndex];
      this.albumImg = nowMusic.musicImgSrc;
      this.albumTitle = nowMusic.title;
      this.albumAuthor = nowMusic.author;
      this.musicSrc = nowMusic.src;
    }
    },
       
}
</script>
<style lang="scss" scoped>
.album{
    display: flex;
    position: relative;
    text-align: center;
    &-mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        filter:blur(10px);
        z-index: -1;
    }
    &-img{
        flex-grow: 1;
        width: 0;
        img {
            width: 100%;
        }
    }
    &-info{
        width: 0;
        flex-grow: 2;
        &-title{
            font-size: 0.5rem
        }
    }
}
.music-list{
    position: fixed;
    bottom: 1rem;
    width: 100%;
    height: 4rem;
    background-color: #2a2929;
    overflow-y: scroll;
    &-item{
        color: #dcdbdb;
        border-bottom: 0.02rem solid #343433;
        padding: 0.2rem;
        &.selected{
            color: #299557;
        }
    }
}
.slide{
    &-enter{
        transform: translateY(100%);
         &-to {
        transform: translateY(0);
    }
    &-active{
        transition:transform 1s ease;
    }
    }
   
    &-leave{
        transform: translateY(0);
         &-to{
        transform: translateY(100%);
    }
    &-active{
    transition:transform 1s ease;
     }
    }

 
}
</style>
