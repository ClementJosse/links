<template>
  <div class="flex flex-col items-center font-medium gap-[clamp(0px,10vw,50px)] mt-[clamp(0px,20vw,100px)]">
    <h1 style="font-size: clamp(0px, 10vw, 50px);" class="text-white font-bold">cjosse.com</h1>
    <h3 style="font-size: clamp(0px, 4vw, 20px);" class="rainbow font-normal">Lien de mes projets actuellement en ligne:</h3>
    <ButtonLink :title="'Portfolio'" :gif="portfolioGif" :icon="portfolioPng" :text="'Mes expériences, mes projets, mes compétences..'" :titleColor="'#ffffff'" />
  </div>
</template>


<script setup>
import ButtonLink from './components/ButtonLink.vue';
import portfolioGif from './assets/portfolio.gif';
import portfolioPng from './assets/portfolio.png';

</script>

<style scoped>
.rainbow {
  animation: colorRotate 2s linear 0s infinite;
}

@keyframes colorRotate {
  from {
    color: #ff8989;
  }

  25% {
    color: #90ff9f;
  }

  50% {
    color: #9bdfff;
  }

  75% {
    color: #d781ff;
  }

  100% {
    color: #ff8989;
  }
}
</style>
