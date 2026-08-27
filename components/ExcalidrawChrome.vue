<script setup lang="ts">
/**
 * Purely decorative Excalidraw UI: the tool island, the zoom controls and the
 * collaborator avatars. Non-interactive, hidden when printing.
 */
const tools = [
  { key: "lock", d: "M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13v9h-13z" },
  { key: "hand", d: "M8 12V6.5a1.5 1.5 0 0 1 3 0V11m0-.5V5.5a1.5 1.5 0 0 1 3 0V11m0-.5v-4a1.5 1.5 0 0 1 3 0V15a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-3" },
  { key: "select", d: "M5 3l14 8-6 1.5L10.5 19z" },
  { key: "rect", d: "M4 5h16v14H4z" },
  { key: "diamond", d: "M12 3l9 9-9 9-9-9z" },
  { key: "ellipse", d: "M12 5c4.4 0 8 3.1 8 7s-3.6 7-8 7-8-3.1-8-7 3.6-7 8-7z" },
  { key: "arrow", d: "M4 18L20 6M20 6h-6M20 6v6" },
  { key: "line", d: "M4 18L20 6" },
  { key: "draw", d: "M4 20l3-.7L19 7.3a2 2 0 0 0-2.8-2.8L4.3 16.5z" },
  { key: "text", d: "M4 20L12 4l8 16M7.5 14h9" },
  { key: "image", d: "M4 5h16v14H4zM8 11l3 3 3-4 4 5" },
  { key: "eraser", d: "M8 20h11M6 16l7-7 5 5-6 6H8z" },
];

const active = "rect";
</script>

<template>
  <div class="chrome" aria-hidden="true">
    <div class="chrome__island chrome__menu">
      <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    </div>

    <div class="chrome__island chrome__tools">
      <span
        v-for="tool in tools"
        :key="tool.key"
        class="chrome__tool"
        :class="{ 'is-active': tool.key === active }"
      >
        <svg viewBox="0 0 24 24"><path :d="tool.d" /></svg>
      </span>
    </div>

    <div class="chrome__island chrome__share">
      <span class="chrome__avatar" style="background: #1971c2">M</span>
      <span class="chrome__avatar" style="background: #2f9e44">A</span>
      <span class="chrome__share-btn">Share</span>
    </div>

    <div class="chrome__island chrome__zoom">
      <svg viewBox="0 0 24 24"><path d="M6 12h12" /></svg>
      <span class="chrome__zoom-level">100%</span>
      <svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12" /></svg>
    </div>

    <div class="chrome__island chrome__history">
      <svg viewBox="0 0 24 24"><path d="M9 7L4 12l5 5M4 12h10a6 6 0 0 1 0 12" /></svg>
      <svg viewBox="0 0 24 24"><path d="M15 7l5 5-5 5M20 12H10a6 6 0 0 0 0 12" /></svg>
    </div>
  </div>
</template>

<style scoped>
.chrome {
  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;
  z-index: 5;
  font-family: "Excalidraw Normal", ui-sans-serif, sans-serif;
}

.chrome__island {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 5px;
  background: #ffffff;
  border: 1px solid #e9e9ed;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.09);
  opacity: 0.92;
}

.chrome__island svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: #343a40;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.chrome__menu {
  top: 14px;
  left: 14px;
  padding: 7px;
}

.chrome__tools {
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
}

.chrome__tool {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  border-radius: 7px;
}

.chrome__tool.is-active {
  background: #e0dfff;
}

.chrome__tool.is-active svg {
  stroke: #4a47b1;
}

.chrome__share {
  top: 14px;
  right: 14px;
  gap: 6px;
  padding: 5px 6px;
}

.chrome__avatar {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
}

.chrome__share-btn {
  padding: 3px 10px;
  border-radius: 7px;
  background: #6965db;
  color: #fff;
  font-size: 11px;
}

.chrome__zoom {
  bottom: 14px;
  left: 14px;
  gap: 6px;
  padding: 5px 8px;
}

.chrome__zoom-level {
  font-size: 11px;
  color: #343a40;
  min-width: 30px;
  text-align: center;
}

.chrome__history {
  bottom: 14px;
  left: 132px;
  gap: 6px;
  padding: 6px 8px;
}

@media print {
  .chrome {
    display: none;
  }
}
</style>
