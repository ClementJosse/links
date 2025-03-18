<template>
  <div class="flex flex-col items-center font-medium gap-[clamp(0px,10vw,50px)] mt-[clamp(0px,20vw,100px)]">
    <h1 style="font-size: clamp(0px, 10vw, 50px);" class="text-white font-bold">cjosse.com</h1>
    <h3 style="font-size: clamp(0px, 4vw, 20px);" class="rainbow font-normal">Lien de mes projets actuellement en ligne:
    </h3>
    <ButtonLink :title="'Portfolio'" :gif="portfolioGif" :icon="portfolioPng"
      :text="'Mes expériences, mes projets, mes compétences..'"
      :link="'https://portfolio.cjosse.com'" />
    <ButtonLink :title="'Loups Garous sans cartes'" :gif="loupsgarousGif" :icon="loupsgarousPng"
      :text="'Jouer au jeu du Loups garou en local sans besoin des cartes.'" 
      :link="'https://lg.cjosse.com'" />
    <ButtonLink :title="'Dico Scrabble'" :gif="dicoscrabbleGif" :icon="dicoscrabblePng"
      :text="'Dictionnaire en ligne ergonomique de l’officiel du Scrabble.' "
      :link="'https://dicoscrabble.cjosse.com'" />
    <ButtonLink :title="'Score Scrabble'" :gif="scorescrabbleGif" :icon="scorescrabblePng"
      :text="'Mémorise les scores et fait des stats de vos parties de Scrabble.' "
      :link="'https://dicoscrabble.cjosse.com'" />


    <div class="flex flex-row gap-[clamp(0px,10vw,50px)] mb-[clamp(0px,20vw,100px)]">

      <div class="flex flex-col text-white font-normal text-center" style="font-size: clamp(0px, 3vw, 15px);">
        <button @click="openLink('https://github.com/ClementJosse')">
          <img :src="github" class="h-[clamp(0px,10vw,50px)] active:scale-95 cursor-pointer">
        </button>
        <div class="text-[#D4F0FA]">Github</div>
      </div>

      <div class="flex flex-col text-white font-normal text-center" style="font-size: clamp(0px, 3vw, 15px);">
        <button @click="openLink('https://www.linkedin.com/in/clement-josse/')">
          <img :src="linkedin" class="h-[clamp(0px,10vw,50px)] active:scale-95 cursor-pointer">
        </button>
        <div class="text-[#D4F0FA]">LinkedIn</div>
      </div>

      <div class="flex flex-col text-white font-normal text-center" style="font-size: clamp(0px, 3vw, 15px);">
        <button @click="copyLink('clement.b.josse@gmail.com')" class="relative">
          <div v-if="tooltipVisible"
            class="absolute left-1/2 -translate-x-1/2 -translate-y-1/1 bg-black opacity-75 text-white px-2 py-1 rounded-full text-sm whitespace-nowrap"
            style="font-size: clamp(0px, 3vw, 15px);">
            Email Copié !
          </div>
          <img :src="mail" class="h-[clamp(0px,10vw,50px)] active:scale-95 cursor-pointer">
        </button>
        <div class="text-[#D4F0FA]">Mail</div>
      </div>

    </div>
  </div>
</template>


<script setup>
import ButtonLink from './components/ButtonLink.vue';

import portfolioGif from './assets/portfolio.gif';
import portfolioPng from './assets/portfolio.png';

import loupsgarousGif from './assets/loupsgarous.gif';
import loupsgarousPng from './assets/loupsgarous.png';

import dicoscrabbleGif from './assets/dicoscrabble.gif';
import dicoscrabblePng from './assets/dicoscrabble.png';

import scorescrabbleGif from './assets/scorescrabble.gif';
import scorescrabblePng from './assets/scorescrabble.png';

import github from './assets/github.svg';
import linkedin from './assets/linkedin.svg';
import mail from './assets/mail.svg';

import { Clipboard } from "v-clipboard";
import { ref } from 'vue'; // Importez ref pour créer une variable réactive

// Créez une variable réactive pour l'état du tooltip
const tooltipVisible = ref(false);

function copyLink(link) {
  Clipboard.copy(link);
  tooltipVisible.value = true; // Notez .value pour modifier une ref
  console.log("tooltip shown!");
  setTimeout(() => {
    tooltipVisible.value = false; // Notez .value pour modifier une ref
    console.log("tooltip hidden!");
  }, 1000);
}

function openLink(link) {
  setTimeout(function () {
    window.open(link, '_blank');
  }, 200);
}

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
