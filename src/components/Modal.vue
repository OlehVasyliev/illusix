<template lang="pug">
  .modal

    .modal__content
      slot
    .modal__overlay
    
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .modal{
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &__header{
      display: flex;
      justify-content: flex-end;
    }
    &__close{
      cursor: pointer;
    }
    &__content{
      position: absolute;
      background: #fff;
      z-index: 2;
      padding: 32px 24px;
      max-height: 80vh;
      max-width: 80%;
      overflow: auto;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @media(max-width: 520px) {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &__overlay{
      width: 100%;
      height: 100%;
      opacity: 0.3;
      background-color: #000;
      z-index: 1;
    }
  }
</style>
