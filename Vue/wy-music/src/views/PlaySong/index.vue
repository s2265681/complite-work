<template>
  <div class="play-page-container">
    <div
      class="bg"
      :style="{ backgroundImage: 'url(' + songDetail.picUrl + ')' }"
    ></div>
    <audio
      ref="audioDom"
      @timeupdate="updateTime"
      :src="songUrl"
      autoplay
    ></audio>
    <swiper ref="mySwiper" :options="swiperOptions" class="myswiper">
      <swiper-slide>
        <div class="play-header">
          <img
            class="logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEEElEQVR4Xu2XS2gVVxzGfyNWjaLEkFZIJXpBKcRFY7WL9NI2KcbXwqSuutNYshEXAXcu+gBBaHuhRdyIsY26uouaIhij0euzEasYgvigC1NRMUKb9JHSNOgtX3qOPZncCeliytQ5B4YzM+fM/3z/7/99Z2YCUt6ClOePJ8ArIOUMeAukXAB+E/QW8BZIOQPeAikXgH8LeAt4C6ScAW+BlAvAvwW8BbwFUs6At0DKBVD6LVDcsKGGsbGXpiDnZ8rK7gTHjv3+fydwkgWK2ex85s3rBVZMSq6uro/e3trx+8Xi2eDUqYbnj4A1a+qZMaPwLLHm5u8YHHyB1tZ+ystXUCiMsnfvG2Z8dXDy5DVgKbAlgowBoMOM1QNvh+YNm3H1H4XGngA/OkdPaFw4w0UotYZ97OMwxskKcAnYv7+XRYsqaWpaTnc3rFs38fmnTxuCnp6zgBYVePVuKwc03mZ6zSmacztvK/BDxPNhvIr1GbDKHN8Dp4ERM/Gcg0FrqTAiVkfJFk3A2rVX2LFjIZs2Laez8zZlZfL7a+TzR2lvf3c82mQCbgKVQB6oALYBf5jkBF6gREqng8aSFq5+FGZZ8EtgpTPhKxNTcW0c9e75vyQglyswNBRw8eIYc+Y8YXR0Adnsn9TUzKerCw4fXlWCAFVnp5HlVaALeNMhQNUuZZUvTAICrDkiS9Zxm66tmqIqqnFrR6tMxdC52jdAnxs0WgH5fB/9/cPcvy8PjlFVtZ7h4T4qVFhg9+76EgRsBz4A3gPagUOAfKfElIB6qwQlehRoMff/3lxhCFgYVX6HHJcgJS1lNZvnskCVs5FbAmz/LHw0AXv2nKGycjatrVlyuXNUVMyipaWOAwfOc+ECdHS8VYKAh8A7QDWQA64A7zsEaOHPzbXACrTdH0SISFBvE7FAXYkribshhYiAjPH/EjOm3FwL6JlXgV+mp4C5c3/jyJF73LjxmIMHFzMwsIx9+7rIZFazceOLEXvAJ8Bx4BXgDvA68KkDRIkJlGwgDytZkSBZKokoz2qeHbcKcqvpbsJaQ6pqCsX7ELgMdE9NQGNjLUFwfXxSJnOXXbseUV1dN35969a3tLXZV6C7CdrKqZpqLwMPTIICp/vWtwKoc+tRXetcG5jiiIQJPjXJSzm6r/k6XAuIRDWt8zWw2ahB1zrsXJEw4VVY8l+g2NhYIAjCr7SwLa8xMtIQXLr06xR+/a+H9E3wzzfMNFaP/Bkq6nsgqs2c+VNw4kT/NOInfor/G0x8iWIG6BUQM8GJD+8VkPgSxQzQKyBmghMf3isg8SWKGaBXQMwEJz68V0DiSxQzQK+AmAlOfHivgMSXKGaAXgExE5z48F4BiS9RzAC9AmImOPHhvQISX6KYAaZeAX8BRNshUN88eOkAAAAASUVORK5CYII="
            alt=""
            srcset=""
          />
          <div class="handle"></div>
        </div>
        <div class="play-content">
          <div class="song-disc-wrap">
            <div class="song-disc">
              <div class="song-turn" ref="playTurn">
                <div class="song-rollwrap">
                  <div class="song-img" @click="pauseSong">
                    <img :src="songDetail.picUrl" alt="" />
                  </div>
                </div>
              </div>
              <div class="play-btn" v-if="!isPlay" @click.stop="playSong"></div>
            </div>
          </div>
          <div class="song-lyric">
            <ul class="ul-list" ref="ulwrap">
              <li class="li-item li-active">{{ songDetail.name }}</li>
              <li
                class="li-item"
                :class="{ 'li-active': index == currentIndex }"
                v-for="(item, index) in songLyric"
                :key="index"
              >
                {{ item.lyric }}
              </li>
            </ul>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <sim-list :songId="songId"></sim-list>
        <sim-song-list :songId="songId"></sim-song-list>
      </swiper-slide>
    </swiper>
    <div class="play-footer">
      <div class="open"><span>打开</span></div>
      <div class="download"><span>下载</span></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import SimList from "./components/SimList.vue";
import SimSongList from "./components/SimSong.vue";

export default Vue.extend({
  data() {
    return {
      isPlay: false,
      currentIndex: 0,
      swiperOptions: {
        direction: "vertical",
        observer: true,
        observeParents: true,
        spaceBetween: 0,
        freeMode: true,
        autoHeight: true,
        on: {
          touchmove: function(event) {
            //你的事件
            event.preventDefault();
            //e.stopPropagation();
          }
        }
      },
      songId: null,
      lyricArr: [],
    };
  },
  computed: {
    ...mapState({
      loading: (state: { playSong }) => state.playSong.loading,
      songDetail: (state: { playSong }) => state.playSong.songDetail,
      songUrl: (state: { playSong }) => state.playSong.songUrl,
      songLyric: (state: { playSong }) => state.playSong.songLyric
    }),
  },
  created() {
    const songId = this.$route.params.songId;
    this.songId = String(songId);
    this.getMusicDetailA(songId);
    this.getSongUrlA(songId);
    this.getSongLyricA(songId);
  },
  components: {
    SimList,
    SimSongList
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.val = 0;
  },
  methods: {
    ...mapActions(["getMusicDetailA", "getSongUrlA", "getSongLyricA"]),
    // formatSongLyric() {
    //   this.songLyric.split("\n").forEach((item) => {
    //     if (item !== "") {
    //       item.replace(/\[(\d+):(\d+\.\d+)\](.+)/g, (_, $1, $2, $3) => {
    //         const time = parseFloat($1) * 60 + parseFloat($2);
    //         this.lyricArr.push({
    //           timeNum: time,
    //           lyric: $3,
    //         });
    //       });
    //     }
    //   });
    // },
    updateTime() {
      this.$nextTick(() => {
        const currentTime = this.$refs.audioDom.currentTime;
        let currentLine = 0;
        const ul = this.$refs.ulwrap;
        console.log(this.lyricArr);
        for (let j = currentLine, len = this.songLyric.length; j < len; j++) {
          console.log(this.songLyric[j])
          if (
            currentTime < this.songLyric[j + 1].timeNum &&
            currentTime > this.songLyric[j].timeNum
          ) {
            currentLine = j;
            this.currentIndex = j;
            let ppxx;
            console.log(this.songLyric[j].lyric.length);
            if (this.songLyric[j].lyric.length > 30) {
              ppxx = -currentLine * 45;
            } else {
              ppxx = -currentLine * 30;
            }
            ul.style.transform = "translateY(" + ppxx + "px)";
          }
        }
      });
    },
    init() {
      this.$nextTick(() => {
        this.$refs.playTurn.style.animationPlayState = "paused";
      });
    // this.formatSongLyric();

    },
    playSong() {
      this.$refs.playTurn.style.animationPlayState = "running";
      this.$refs.audioDom.play();
      console.log(this.$refs.audioDom.currentTime);
      this.isPlay = true;
      this.scrollSong()
    },
    pauseSong() {
      this.$refs.playTurn.style.animationPlayState = "paused";
      this.$refs.audioDom.pause();
      this.isPlay = false;
    },
    scrollSong(){
         const lyric = document.querySelectorAll(
          ".transform-lyric"
        ) as NodeListOf<HTMLElement>;
        setTimeout(() => {
          setInterval(() => {
            this.val -= 10;
            lyric[0].style.top = this.val + "px";
            console.log(this.val, "change+++++");
          }, 1000);
        }, 10000);
    }
  }
});
</script>

<style lang="less" scoped>
.play-page-container {
  width: 100%;
  height: 100%;

  .bg {
    z-index: -1;
    filter: blur(0.2rem);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: auto 100%;
    background: rgba(0, 0, 0, 0.8);
  }

  .myswiper {
    width: 100%;
    height: 6rem;
    padding-bottom: 0.07rem;
    opacity: 1;
    .play-header {
      width: 100%;
      height: 0.5rem;
      position: relative;
      .logo {
        position: absolute;
        top: -0.3rem;
        left: 0;
        width: 1rem;
      }
      .handle {
        position: absolute;
        width: 1rem;
        height: 1.4rem;
        position: absolute;
        left: 50%;
        top: 0%;
        transform: translate(-25%, 0%); /*50%为自身尺寸的一半*/
        background-image: url(https://s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862=);
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 99;
      }
    }
    .play-content {
      width: 100%;
      // height: 5.3rem;
      margin-top: 0.3rem;
      .song-disc-wrap {
        height: 3rem;
        width: 100%;
        padding: 0 0.375rem;
        box-sizing: border-box;
        .song-disc {
          height: 3rem;
          width: 3rem;
          position: relative;

          .song-turn {
            width: 100%;
            height: 100%;
            z-index: 5;
            background: url("https://s3.music.126.net/mobile-new/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48=");
            background-repeat: no-repeat;
            background-size: cover;
            box-sizing: border-box;
            padding: 0.5rem;
            animation: animations1 10s linear infinite forwards;
            animation-play-state: paused;
            .song-rollwrap {
              width: 100%;
              height: 100%;
              .song-img {
                width: 100%;
                height: 100%;
                img {
                  border-radius: 50%;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          .play-btn {
            width: 0.56rem;
            height: 0.56rem;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAABJlBMVEUAAAAAAAD////l5eX///9iYmKDg4Pn5+f///9YWFj////09PT////4+Pjt7e3///////9oaGhBQUH////////////////CwsIaGhr///8xMTEkJCT////7+/vp6en///////////////+srKyoqKienp58fHz////y8vKTk5P///8EBAT////////////////V1dW3t7f////////////////////v7++jo6N9fX3///////+UlJT////s7Oz////Nzc3///////+RkZGPj495eXkTExP////////29vb////k5OTPz882Njb////////////c3Nz///////9ycnJsbGz///9dXV3////////Q0ND///9QUFD///////////////////9FeiN6AAAAYXRSTlNmAP3c+oWT3ueB9vA19ealRId5EQbuurpu83RxD/nh05dfAquooo+M7JtzaSolE+vMspJ3Wj7w6KSQj6ucKeXNxLWnmpmObVYd8t3axXZRSt7TvbKLideCeSzHnn4V3Nh6YarbPAAABlRJREFUeNrU14lWEmEYh/GXcdj3HQTZRCkS913UNE2zbLd9Oc/930Q2LmVpwPAC03MD/M5835n/IC6dkqHnzcVoZvdkLp2HfHruZDcTXWw+DyVdOilAt6uNjI8782Ua1W2XjTShtdDSmzRdlH6zFKq5bKQBTS5H57gqXJrP1tsb7kShkBPJFQoJ90a7np0vhblqLrrc8R7oQ4vVPZOLIp8mp8flzsanJ59FuMjcqxZdHVKFxvYDWK1lPQXpooInu4ZVYD/m6pAWNLn0DSvvekJ6KLHuxerb0qyrQwrQViV/oZzKSc/lpi6sgUrLdSN16MyWARBcOBWbnS4EAYytj67r1KGtqMUseaSvPCWLGr14u+pDZysmwFhc+i4+BmBWZgcATTXTFvO9qOS3qOlmShu68g7A6xa13F6A7yuq0ORnA9jZENU2dgDjc1IPGvMB4QNR7+AJ4IspQVObBjDmF+Wur6qxmdKAbpeBoEcGlCcIlLf7hx7lOzxOlYeaP+oTmmoYQFsGWhswGql+oMUMEInLgItHgEzRPvS43OHYVY+/fGwXGvIBkzKU6oAvZA8aywOPZEg9AvIxO9AXAZg4lKF1OAGBF71DX5jw5EyG2NkTMJ/3Co2ZcM8tQ819D8xYb9CVgA2nijSw0gs0tArBzk59aRBWQ91Dj30QjssIiofBd9wttFiGiTMZSWcTUC52B629Bg5lRB0Cr2tdQRvAfRlZ94FGN9AjA+oywupgHHWGzuRhTEbaGORnOkFTZYj4ZaT5I1BOdYBuAnEZcXFg89/QmAFtGXltMGL/ghZ9I7+g19fUV/wHtAJBvzggfxAqd0NXDPCII/KAsXIXNPXOIQd/efjvUndAmxB2xMH/zB+G5u3Qr2k4EMd0AOmvt0IrsCMOagcqt0FbJkyLg5oGs3ULNApecVReiP4NnTHALY7KDcbHv6BbDno1XTUGW39CWwa8F4flB6P1B3TRgQ/UeqSLN6GzAQd83f1dHAKzN6AfoCQOrARLN6Andr9GpiITT9/KwPLAye/QGATFTusAxsOCDKogxH6D7sOC2GkNq+B9GVALsP8LWgzAqdjJ4LJXCRlIpxAoXkOrtteT6yYmH8gg8kL1GroHU/1CoTSQBZ6CvSto0oRc/1DM7GNRLwdm8hK6DF5RgMI9j6jnheVLaBTWdaAwPy7KrUP0Alqbg4QWlPCU6JaAuZoFDcGaqEHh6RdRLQIhC/oBsppQzAXVN1UWlixoBjyqUIhozr8H3vyE1lYhpwnVnv8CpH9CZyAi2lAIPtK8pDPn0Cp8UoWqz/8zqJ5DGzCpCdWf/0lonEMzMK0J1Z//acicQ30wrgnVn/9x8LkkCWFRherPfxiSEgKvLlR//r0QkmWY14Xqz/88LEsTsqpQ/fm3RlQWoa4L1Z//OixKFNq6UP35vw9RycDGMKAYD3P9vEhlF9y6UP35d8OuvISELlR//hPwUqxh0oTqz781TbIKueFB4em4rb/Mq5IfMpRn0nOPIS+ADBUatvcz/w/0B/X2VgMACMNQ9AMnWOADKwT/QuahyZYcDcte7e146X9W+vFmWmEzOeOJGfjMCmWOEubMYw7no7wizHPHvMuMAMFIOo5IxsiOjJDLSOOM2cDYN44hxliMjGnL2OAOWMCgGgz84uBEDKDFIG8ORLhzLPO2Y5kK6PpMdJiBsR28nQkMOBEMJtTixISY4JUTZWPCgVXevesgCINhGG7dZPLEIg7GRRsMTsaoMTEOnmLUuBgn+e//JuTHGt0aKT3y3QIFpj6vO9ctnbnAmr9PIysefn0E0PfhkjW92HFtnQHULn5AAG9aISZGF3NaQYxVrInRrcVYBW4H5vkPEPIfuIV5UGXhClHT8Qv9oXQ/MckoTfb+wVTGqK8ZUl9+4mmUnpGj03pOmzlH5y/w5w6ZiAil+G9qA0KpkfWMTxKsJ6530wel3try9CwjSscg27BTDcw321gHjzyuEjj9IbwP1hPeDqHo2abP0pn5XMR/NhTB/fyo2gv3q0gh1JSkEHCrUuMSG1VxCdxDOtfR1ZDr4AGUwIUACi5JJZMyx1RHUgY3kIn0LBuFQk2EFlv7J3t0+id7JPi86wlJsfm9FUVbQrZR1LrPmQ0hKZfSXC7Fzr5LeD7uGoYBQBCGV56PS2g5ewGy+NkUNbjr9gAAAABJRU5ErkJggg==");
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999;
          }
        }
      }
      .song-lyric {
        position: relative;
        width: 100%;
        height: 1.2rem;
        overflow: hidden;
        text-align: center;
        line-height: 1.5;
        font-size: 0.16rem;
        margin-top: 0.2rem;
        .ul-list {
          width: 100%;
          height: 100%;
          .li-item {
            width: 100%;
            color: #000;
          }
          .li-active {
            color: orange;
          }
        }
      }
    }
  }

  .play-footer {
    width: 100%;
    height: 0.6rem;
    box-sizing: border-box;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    .open {
      width: 1.5rem;
      height: 0.4rem;
      line-height: 0.4rem;
      border-radius: 0.2rem;
      border: 1px solid red;
      color: red;
      text-align: center;
      font-weight: 500;
      font-size: 0.2rem;
    }
    .download {
      width: 1.5rem;
      height: 0.4rem;
      line-height: 0.4rem;
      color: #fff;
      border-radius: 0.2rem;
      text-align: center;
      background-color: red;
      font-size: 0.2rem;
      font-weight: normal;
    }
  }
}
@keyframes animations1 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// @keyframes animations1 {
//   0% {
//     transform: trans
//   }

//   50% {
//     transform: rotate(180deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
</style>
