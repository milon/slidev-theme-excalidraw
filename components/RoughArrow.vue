<script setup lang="ts">
import rough from "roughjs";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

let instances = 0;

const props = withDefaults(
  defineProps<{
    direction?: "right" | "left" | "down" | "up";
    color?: string;
    strokeWidth?: number;
    roughness?: number;
    /** Sideways bend of the shaft, in px. 0 is straight. */
    curve?: number;
    seed?: number;
  }>(),
  {
    direction: "right",
    color: "#1e1e1e",
    strokeWidth: 2,
    roughness: 1.3,
    curve: 10,
  },
);

const seed = props.seed ?? ((instances += 1) * 6421) % 9973;

const host = ref<HTMLElement>();
const canvas = ref<SVGSVGElement>();
const width = ref(0);
const height = ref(0);

function endpoints(w: number, h: number): [number, number, number, number] {
  const pad = 6;

  switch (props.direction) {
    case "left":
      return [w - pad, h / 2, pad, h / 2];
    case "down":
      return [w / 2, pad, w / 2, h - pad];
    case "up":
      return [w / 2, h - pad, w / 2, pad];
    default:
      return [pad, h / 2, w - pad, h / 2];
  }
}

function draw(): void {
  const svg = canvas.value;
  const w = width.value;
  const h = height.value;

  if (!svg || w < 4 || h < 4) {
    return;
  }

  svg.replaceChildren();

  const generator = rough.svg(svg);
  const options = {
    stroke: props.color,
    strokeWidth: props.strokeWidth,
    roughness: props.roughness,
    bowing: 1.2,
    seed,
  };

  const [x1, y1, x2, y2] = endpoints(w, h);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  const mx = (x1 + x2) / 2 + nx * props.curve;
  const my = (y1 + y2) / 2 + ny * props.curve;

  svg.appendChild(generator.path(`M${x1},${y1} Q${mx},${my} ${x2},${y2}`, options));

  // Arrowhead, angled off the tangent at the end point.
  const angle = Math.atan2(y2 - my, x2 - mx);
  const size = 11 + props.strokeWidth * 2;
  const spread = 0.42;

  for (const sign of [1, -1]) {
    const hx = x2 - size * Math.cos(angle + sign * spread);
    const hy = y2 - size * Math.sin(angle + sign * spread);
    svg.appendChild(generator.line(x2, y2, hx, hy, options));
  }
}

let observer: ResizeObserver | undefined;

onMounted(() => {
  observer = new ResizeObserver((entries) => {
    const rect = entries[0]?.contentRect;

    if (!rect) {
      return;
    }

    width.value = Math.round(rect.width);
    height.value = Math.round(rect.height);
  });

  if (host.value) {
    observer.observe(host.value);
  }
});

onBeforeUnmount(() => observer?.disconnect());

watch([width, height, () => props.color, () => props.direction], draw);
</script>

<template>
  <div ref="host" class="rough-arrow">
    <svg
      ref="canvas"
      :viewBox="`0 0 ${width} ${height}`"
      :width="width"
      :height="height"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.rough-arrow {
  position: relative;
  min-width: 2rem;
  min-height: 2rem;
}

.rough-arrow svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
