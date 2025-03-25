<template>
    <div class="flex flex-col justify-center text-white">
        <button @click="triggerAnimation"
            class="font-bold active:scale-95 rounded-lg cursor-pointer pb-[clamp(0px,3vw,15px)] overpass-mono">
            <div class="flex gap-[clamp(0px,2.5vw,12.5px)]">
                <template v-for="(letter, index) in letters" :key="index">
                    <div class="letter-container" style="font-size: clamp(0px, 10vw, 50px);">
                        <div class="letter" :class="{
                            'flipped': isFlipped[index],
                            'sequential-flip': hasCompletedFlip && isInSequence[index]
                        }">
                            <div class="letter-front overpass-mono"
                                :style="hasAnimated ? letterStyles[index] : { color: 'white', textShadow: 'none' }">
                                {{ letter }}
                            </div>
                            <div class="letter-back"
                                style="color: white; font-size: clamp(0px, 8vw, 40px); text-shadow: none;">
                                ⍟
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </button>
        <div v-if="showTirages" class="text-right overpass-mono text-[#4871C9] h-[clamp(0px,10vw,50px)]" style="font-size: clamp(0px, 2.5vw, 12.5px)">
            Nombre de tirages:
            <div class="text-[#8BB0FF]" style="font-size: clamp(0px, 4vw, 20px)">
                {{ tirage }}
            </div>
        </div>
        <div v-else class="h-[clamp(0px,10vw,50px)]">

        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getDatabase, ref as dbRef, onValue, update } from 'firebase/database';

// Texte à animer
const text = "cjosse·com";
const letters = computed(() => text.split(''));

// États pour l'animation
const isFlipped = ref(Array(text.length).fill(false));
const isInSequence = ref(Array(text.length).fill(false));
const hasCompletedFlip = ref(false);
const isAnimating = ref(false);
const hasAnimated = ref(false);
const letterStyles = ref(Array(text.length).fill({
    color: '#FFFFFF',
    textShadow: 'none'
}));

var showTirages = false;
const tirage = ref('-');

// Couleurs selon la répartition demandée
const colors = {
    '#FFFFFF': 40,    // 40%
    '#97CDFF': 27.5,  // 27.5%
    '#BD87FF': 17.5,  // 17.5%
    '#F06463': 10,    // 10%
    '#FFD900': 5      // 5%
};

// Intensités et opacités pour chaque couleur
const intensities = {
    '#FFFFFF': { shadow: 'none', opacity: 1 },
    '#97CDFF': { shadow: '10px', opacity: 0.3 },
    '#BD87FF': { shadow: '15px', opacity: 0.5 },
    '#F06463': { shadow: '20px', opacity: 0.75 },
    '#FFD900': { shadow: '25px', opacity: 1 }
};

// Fonction pour convertir une couleur hex en rgba
const hexToRgba = (hex, opacity) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Fonction pour obtenir une couleur aléatoire selon la distribution
const getRandomColor = () => {
    const random = Math.random() * 100; // Valeur entre 0 et 100
    let threshold = 0;

    for (const [color, probability] of Object.entries(colors)) {
        threshold += probability;
        if (random <= threshold) {
            return color;
        }
    }

    return '#FFFFFF'; // Couleur par défaut au cas où
};

// Fonction pour générer des couleurs aléatoires pour toutes les lettres
const generateRandomColors = () => {
    return Array(text.length).fill().map(() => {
        const color = getRandomColor();
        const { shadow, opacity } = intensities[color];
        const textShadow = color === '#FFFFFF' ? 'none' : `0 0 ${shadow} ${hexToRgba(color, opacity)}`;
        return {
            color: color,
            textShadow: textShadow
        };
    });
};

// Animation principale
const triggerAnimation = () => {
    showTirages = true;

    if (isAnimating.value) return;
    isAnimating.value = true;

    // Signaler que l'animation a démarré au moins une fois
    hasAnimated.value = true;

    // Réinitialiser l'état si nécessaire
    if (hasCompletedFlip.value) {
        isFlipped.value = Array(text.length).fill(false);
        isInSequence.value = Array(text.length).fill(false);
        hasCompletedFlip.value = false;
        isAnimating.value = false;
        return;
    }

    // Première phase: toutes les lettres se retournent ensemble
    isFlipped.value = Array(text.length).fill(true);

    // Deuxième phase: après un délai, les lettres se retournent séquentiellement
    setTimeout(() => {
        const database = getDatabase();
        const rootRef = dbRef(database, '/');
        
        // Increment tirage in Firebase and locally
        update(rootRef, { tirage: tirage.value + 1 });

        hasCompletedFlip.value = true;
        // Générer de nouvelles couleurs aléatoires pour chaque lettre
        letterStyles.value = generateRandomColors();

        // Animation séquentielle de gauche à droite
        letters.value.forEach((_, index) => {
            setTimeout(() => {
                isInSequence.value[index] = true;

                // Réinitialiser l'état d'animation après la dernière lettre
                if (index === letters.value.length - 1) {
                    isFlipped.value = Array(text.length).fill(false);
                    isInSequence.value = Array(text.length).fill(false);
                    hasCompletedFlip.value = false;
                    isAnimating.value = false;
                }
            }, index * 50); // délai entre chaque lettre
        });
    }, 300); // délai avant de commencer la séquence
};

onMounted(() => {
    const database = getDatabase();
    const rootRef = dbRef(database, '/');

    onValue(rootRef, (snapshot) => {
        // Update local tirage with the value from Firebase
        tirage.value = snapshot.val()?.tirage || 0;
    });
});

</script>

<style scoped>
@font-face {
    font-family: 'Overpass Mono';
    src: url('@/assets/overpass-mono.bold.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
}

.overpass-mono {
    font-family: 'Overpass Mono', monospace;
    font-weight: bold;
}

.letter-container {
    display: inline-block;
    perspective: 600px;
    text-align: center;
}

.letter {
    position: relative;
    display: inline-block;
    transform-style: preserve-3d;
    transition: transform 0.2s;
    min-width: 1ch;
}

.letter-front,
.letter-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.letter-back {
    transform: rotateY(180deg);
}

.flipped {
    transform: rotateY(180deg);
}

.sequential-flip {
    transform: rotateY(0deg);
}
</style>
