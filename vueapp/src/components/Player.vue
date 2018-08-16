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
    <div class="audio"> <audio ref="musicAudio" class="audio-ctrl" :src="musicSrc" autoplay controls @play="isPlay=true" @pause="isPlay=false"></audio></div>
    <ul class="lrcList" ref="lrcList">
        <li :class=" lrcIndex==index? 'selected':'' "  v-for="(lrc,index) in lrcList" :key="index">{{lrc.lrc}}</li>
    </ul>
</div>

</template>
<script>
import axios from 'axios'
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
            musicSrc: "" ,
            lrcList:[],
            lrcIndex:-1,
           
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
                this.nowIndex = this.musicList.length - 1;
            }
        },
        next(){
            this.nowIndex++;
            if(this.nowIndex == this.musicList.length){
                this.nowIndex = 0;
            }
        },
        parseLrc(text){
            let line =text.split('\n');
            // console.log(line)
            line.forEach(elem => {
                let time = elem.match(/\[\d{2}:\d{2}.\d{2}\]/);
                // console.log(time)
                if(time!=null){
                    let lrc=elem.split(time)[1];
                    let timeReg = time[0].match(/(\d{2}):(\d{2}).(\d{2})/);
                    //   console.log(timeReg)
                  
                    let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000;
                    // console.log(time2Seconds)
                    this.lrcList.push({
                        time:time2Seconds,
                        lrc:lrc,
                    })
        }
            });
        }
        },
     watch: {
    nowIndex() {
      let nowMusic = this.musicList[this.nowIndex];
      this.albumImg = nowMusic.musicImgSrc;
      this.albumTitle = nowMusic.title;
      this.albumAuthor = nowMusic.author;
      this.musicSrc = nowMusic.src;
      this.lrcList = [];

      axios.get('/'+nowMusic.lrc).then(res=>{
          this.parseLrc(res.data)
      })
        }
  },
  mounted(){
      let musicAudio = this.$refs.musicAudio;
      this.$refs.musicAudio.addEventListener('timeupdate',()=>{
          let currentTime = musicAudio.currentTime
          this.lrcList.forEach((elem,index)=> {
    //  console.log(elem.time,currentTime)
            if(Math.ceil(elem.time)>=currentTime && Math.floor(elem.time)<currentTime){
                this.lrcIndex=index;
                // console.log(this.lrcIndex);
                this.$refs.lrcList.scrollTop = this.lrcIndex*25;
                console.log(  this.$refs.lrcList.scrollTop )
            }
          });
      })
  }
}
</script>
<style lang="scss" scoped>
.album{
    display: flex;
    position: relative;
    text-align: center;
    height: 2.3rem;

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
    bottom: 2rem;
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
.audio {
  background: #ccc;
  height: 1rem;
  position: fixed;
  bottom: 1rem;
  width: 100%;
  &-ctrl {
    width: 100%;
  }
};
    .lrcList{
    text-align: center;
    position: fixed;
    top: 3.3rem;
    left: 0;
    right: 0;
    bottom: 2rem;
    overflow-y: scroll;
    z-index: -1;
    padding-top: 2rem;
.selected{
        color:chocolate;
        font-size: 120%;
    }
    }
</style>
