<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: string;
    color?: string;
    /** CSS offsets inside the slide, e.g. "38%". */
    top?: string;
    left?: string;
  }>(),
  {
    name: "Guest",
    color: "#1971c2",
    top: "50%",
    left: "50%",
  },
);
</script>

<template>
  <div class="collab-cursor" :style="{ top, left }" aria-hidden="true">
    <svg viewBox="0 0 24 24" :style="{ fill: color }">
      <path d="M5 3l14 8-6 1.5L10.5 19z" />
    </svg>
    <span class="collab-cursor__name" :style="{ background: color }">{{ name }}</span>
  </div>
</template>

<style scoped>
.collab-cursor {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 4;
}

.collab-cursor svg {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
}

.collab-cursor__name {
  position: absolute;
  top: 18px;
  left: 14px;
  padding: 2px 8px;
  border-radius: 8px;
  color: #fff;
  font-family: "Excalidraw Normal", sans-serif;
  font-size: 11px;
  white-space: nowrap;
}
</style>
