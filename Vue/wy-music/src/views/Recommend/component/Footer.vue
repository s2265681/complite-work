<template>
  <div class="footer">
    <div class="fwrap">
      <div class="logo">
        <div class="fwrap-top">
          <img src="../../../assets/image-footer/logo.jpg" alt="" />
          <div class="top-title">
            网易云音乐
          </div>
        </div>
      </div>
      <div class="openapp">
       打开APP，发现更多好音乐
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {};
</script>
<style lang="less">
@import "../../../style/minix.less";
.footer {
  background: url("../../../assets/image-footer/footer.png") no-repeat;
  padding-top: 53.3%;
  position: relative;
  // margin-top: 2.5rem;
  background-size: contain;

  .fwrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    display: flex;
     flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.30rem;
      padding-top: 0.9%;
      .fwrap-top {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.35rem;
      }
    }
    .openapp {
     width: 3.1rem;
      line-height: 38px;
      border: 1px solid #d33a31;
      border-radius: 38px;
      font-size: 16px;
      color: #d33a31;
      margin: 15px 37px 5px;
      }
  }
}
</style>
