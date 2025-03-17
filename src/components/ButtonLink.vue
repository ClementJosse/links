<template>
    <div class="flex flex-col items-center gap-[clamp(0px,1vw,5px)]">
        <button
            class="flex flex-row items-center w-[clamp(0px,80vw,400px)] h-[clamp(0px,15vw,75px)] rounded-full backdrop-blur-[1px] relative active:scale-105 shadow-[0_0_20px_#1b2a7c80]">
            <div class="absolute inset-0 rounded-full"
                :style="{ backgroundImage: `url(${props.gif})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6 }">
            </div>
            <div class="relative z-10 flex flex-row items-center w-full">
                <img class="h-[clamp(0px,7vw,35px)] m-[clamp(0px,4vw,20px)]" :src="props.icon">
                <div class="w-full font-semibold text-center mr-[clamp(0px,7vw,35px)]"
                    :style="{ color: props.titleColor, fontSize: 'clamp(0px, 5vw, 25px)', textShadow: `0 0 25px ${shadowColor}` }">
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
});

const shadowColor = computed(() => {
    return invertColor(props.titleColor);
});

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16).padStart(2, '0');
    const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16).padStart(2, '0');
    const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}
</script>
