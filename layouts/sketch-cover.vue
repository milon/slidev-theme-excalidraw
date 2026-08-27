<template>
  <div class="slidev-layout sketch-cover">
    <div class="sketch-cover__tape" />
    <div class="sketch-cover__inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sketch-cover {
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  position: relative;
}

/* Deliberately not a positioning context, so `<Cursor top left>` inside the
   slide is placed against the whole canvas. */
.sketch-cover__inner {
  max-width: 46rem;
}

.sketch-cover__inner :deep(h1) {
  font-size: 4rem;
  line-height: 1.1;
}

/* A strip of masking tape above the title, like a poster on a whiteboard. */
.sketch-cover__tape {
  position: absolute;
  top: calc(50% - 10.5rem);
  left: 50%;
  width: 9rem;
  height: 2.1rem;
  transform: translateX(-50%) rotate(-2.5deg);
  background: rgba(255, 236, 153, 0.72);
  border-left: 1px dashed rgba(0, 0, 0, 0.12);
  border-right: 1px dashed rgba(0, 0, 0, 0.12);
}
</style>
