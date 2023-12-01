<template>
  <button type="button" class="button">{{ text }}</button>
</template>

<script>
export default {
  props:{
    text: String,
  },
};
</script>

<style scoped>
.button {
  cursor: pointer;
  width: 270px;
  height: 45px;
  font-size: 25px;
  font-weight: 900;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: yellow;
  background-color: rgba(255, 0, 0, 0.808);
  border: 2px solid rgba(255, 255, 0, 0.733);
  border-radius: 10px;
}
.button:hover {
  background-color: rgba(255, 0, 0, 0.5);
  color: rgb(252, 252, 122);
}
@media screen and (min-width: 376px) {
  .button{
    width: 300px;
  }
}
</style>