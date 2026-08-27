<script setup lang="ts">
import { computed } from "vue";

const palette: Record<string, string> = {
  yellow: "#ffec99",
  blue: "#a5d8ff",
  green: "#b2f2bb",
  red: "#ffc9c9",
  violet: "#d0bfff",
};

const props = withDefaults(
  defineProps<{
    color?: keyof typeof palette | string;
    /** Degrees of tilt; small values read as "placed by hand". */
    tilt?: number;
    seed?: number;
  }>(),
  {
    color: "yellow",
    tilt: -1.5,
  },
);

const fill = computed(() => palette[props.color] ?? props.color);
</script>

<template>
  <RoughBox
    class="sticky"
    :style="{ transform: `rotate(${tilt}deg)` }"
    :fill="fill"
    fill-style="solid"
    color="#1e1e1e"
    :roughness="1.6"
    :stroke-width="1.6"
    :radius="6"
    :seed="seed"
    padding="1rem 1.1rem"
  >
    <slot />
  </RoughBox>
</template>

<style scoped>
.sticky {
  filter: drop-shadow(2px 3px 2px rgba(30, 30, 30, 0.16));
}

.sticky :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
