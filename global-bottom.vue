<template>
  <ExcalidrawChrome
    v-if="$slidev.nav.currentSlideRoute?.meta?.slide?.frontmatter?.chrome !== false"
  />
</template>
