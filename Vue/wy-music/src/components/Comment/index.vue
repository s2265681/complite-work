<template>
  <section class="comment-page-container">
    <ul class="m-comments">
      <li
        v-for="(item, index) in dataSource"
        :key="index"
        class="cmt_item"
        @click="comment(item)"
      >
        <div class="cmt_head">
          <img :src="item.user.avatarUrl" />
        </div>
        <div class="cmt_wrap scale-1px-bottom">
          <div class="header">
            <div class="cmt_meta">
              <span class="cmt_user ellipsis">{{ item.user.nickname }}</span>
              <span class="cmt_user ellipsis">{{ transTime(item.time) }}</span>
            </div>
            <div class="cmt_like">
              <div class="comment-item-top-digg">
                {{ item.likedCount }}
              </div>
            </div>
          </div>
          <div class="cmt_content">
            {{ item.content }}
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import {toDataTime} from '../../util/index'

export default Vue.extend({
  name: "Comment",
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  created() {
    console.log(this, "created");
  },
  methods: {
    comment: function(item) {
      this.$emit("comment", item);
    },
    transTime:function(val){
        return toDataTime(val)
    }
  }
});
</script>

<style lang="less" scoped>
@import "../../style/minix.less";
.comment-page-container {
  .m-comments {
    .cmt_item {
      padding-top: 0.1rem;
      width: 100%;
      display: flex;
      flex-direction: row;
      .cmt_head {
        flex: none;
        margin:0rem 0.1rem;
        img {
          display: block;
          border-radius: 50%;
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .cmt_wrap {
        box-sizing: border-box;
        width: 100%;
        padding-right: 0.1rem;
       padding-bottom: 0.11rem;

        .header {
          display: flex;
          flex-direction: row;
              justify-content: space-between;
          .cmt_meta {
            // width: 2.5rem;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 0.38rem;
            .cmt_user{
                  font-size: 0.14rem;
                  color: #666;
                  line-height: 0.20rem;
                  flex: auto;
            }
          }
          .cmt_like {
             
            .comment-item-top-digg {
              margin-left: auto;
              // font-size: 0.28rem;
              // line-height: 0.4rem;
              display: flex;
              align-items: center;
              font-size: 0.14rem;
                  color: #666;
                  line-height: 0.20rem;
                  flex: auto;
              &::after {
                content: "";
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
                margin-left: -0.08rem;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUxpcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOV/WOUAAAAQdFJOUwDvvxAgP99ggJ/PUHCPkK/5nOnBAAAAtElEQVR42u3TwQ7CIBCE4YUuu2xtdd7/aU2xCUY0w8GDB/8Lh37JJDTIb6VzzBMQC3eKlA3GpWMTCVQKV6jIkoy5gvzgDAb8ODKDChMOG/B22meoRzuytGDaGtmKlp2fDGfxYityRO5/RKN1G66+oog4fJi6os7AfvUUyopJCJuDF8QcDJQ5mEw47MscBgqBfZnDvsxhoHDYlzncECO8ugfCn9uRdHx870pFhnSrQ77Iv293B+jXCylQ6FAKAAAAAElFTkSuQmCC)
                  no-repeat 50%;
                background-size: contain;
                transform: scale(.5);
              }
            }
          }
        }
        .cmt_content {
          position: relative;
          color: #333;
          font-size: 0.15rem;
          line-height: 0.22rem;
          margin-top: 0.05rem;
        }
      }
    }
  }
}
</style>
