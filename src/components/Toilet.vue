<template>
  <div class="toilet-wrapper">
    <img
      :src="toiletImg"
      alt="Toilet"
      class="toilet-img"
      draggable="false"
    />
  </div>
</template>

<script setup>
import toiletImg from '../assets/toilet.png'
</script>

<style scoped>
.toilet-wrapper {
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  width: 16vmin;
  z-index: 5;
  user-select: none;
  -webkit-user-select: none;
}

.toilet-img {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3));
}
</style>
