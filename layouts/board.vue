<template>
  <div class="slidev-layout board">
    <slot />
  </div>
</template>

<style scoped>
.board {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.5rem 3rem;
}

/* Without this the flex column stretches the heading, and its hand-drawn
   underline runs the full width of the slide. */
.board :deep(h1) {
  align-self: flex-start;
  margin-bottom: 1.6rem;
}
</style>
