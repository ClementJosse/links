<template>
    <div class="flex flex-col items-center gap-[clamp(0px,1vw,5px)]">
        <button @click="openLink(props.link)"
            class="flex flex-row cursor-pointer items-center w-[clamp(0px,80vw,400px)] h-[clamp(0px,15vw,75px)] rounded-full backdrop-blur-[1px] relative active:scale-95 shadow-[0_0_20px_#1b2a7c80]">
            <div class="absolute inset-0 rounded-full"
                :style="{ backgroundImage: `url(${props.gif})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.7 }">
            </div>
            <div class="relative z-10 flex flex-row items-center w-full">
                <img class="w-[clamp(0px,7vw,35px)] m-[clamp(0px,4vw,20px)]" :src="props.icon">
                <div class="w-full font-semibold text-center mr-[clamp(0px,6vw,30px)]"
                    :style="{ color: '#ffffff', fontSize: 'clamp(0px, 5vw, 25px)', textShadow: `0 0 15px #000000` }">
                    {{ props.title }}
                </div>
            </div>
        </button>
        <div class="font-normal text-white opacity-80" style="font-size: clamp(0px, 3vw, 15px);">
            {{ props.text }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: String,
    gif: String,
    icon: String,
    text: String,
    titleColor: String,
    link: String,
});

function openLink(link) {
  setTimeout(function () {
    window.open(link, '_blank');
  }, 200);
}

</script>
