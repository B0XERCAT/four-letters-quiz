<template>
  <button>{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
  width: 270px;
  height: 45px;
  font-size: 25px;
  font-weight: 900;
  color: black;
  background-color: rgb(250, 190, 30);
  border: 3px solid rgba(80, 55, 0, 0.616);
  border-bottom: 5px solid rgba(80, 55, 0, 0.616);
  border-radius: 10px;
  text-shadow: -1px 1px 0 rgba(80, 55, 0, 0.616),
    1px 1px 0 rgba(80, 55, 0, 0.616);
}
button:hover {
  opacity: 0.8;
}
</style>
