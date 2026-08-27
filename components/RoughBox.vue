<script setup lang="ts">
import rough from "roughjs";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

let instances = 0;

const props = withDefaults(
  defineProps<{
    /** Stroke colour. */
    color?: string;
    /** Fill colour. Empty means transparent. */
    fill?: string;
    /** roughjs fill style: hachure | solid | zigzag | cross-hatch | dots. */
    fillStyle?: string;
    /** 0 is a clean line, 3 is very scribbly. */
    roughness?: number;
    strokeWidth?: number;
    /** Corner radius for the rectangle shape. */
    radius?: number;
    shape?: "rect" | "ellipse";
    dashed?: boolean;
    /** Fix the seed to keep a shape identical across reloads. */
    seed?: number;
    padding?: string;
  }>(),
  {
    color: "#1e1e1e",
    fill: "",
    fillStyle: "hachure",
    roughness: 1.4,
    strokeWidth: 2,
    radius: 14,
    shape: "rect",
    dashed: false,
    padding: "0.9rem 1.15rem",
  },
);

const seed = props.seed ?? ((instances += 1) * 7919) % 9973;

const host = ref<HTMLElement>();
const canvas = ref<SVGSVGElement>();
const width = ref(0);
const height = ref(0);

function roundedRect(x: number, y: number, w: number, h: number, r: number): string {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  return [
    `M${x + radius},${y}`,
    `L${x + w - radius},${y}`,
    `Q${x + w},${y} ${x + w},${y + radius}`,
    `L${x + w},${y + h - radius}`,
    `Q${x + w},${y + h} ${x + w - radius},${y + h}`,
    `L${x + radius},${y + h}`,
    `Q${x},${y + h} ${x},${y + h - radius}`,
    `L${x},${y + radius}`,
    `Q${x},${y} ${x + radius},${y}`,
    "Z",
  ].join(" ");
}

function draw(): void {
  const svg = canvas.value;
  const w = width.value;
  const h = height.value;

  if (!svg || w < 4 || h < 4) {
    return;
  }

  svg.replaceChildren();

  const options: Record<string, unknown> = {
    stroke: props.color,
    strokeWidth: props.strokeWidth,
    roughness: props.roughness,
    bowing: 1.4,
    seed,
    fillStyle: props.fillStyle,
    fillWeight: 2,
    hachureGap: 8,
  };

  if (props.fill) {
    options.fill = props.fill;
  }

  if (props.dashed) {
    options.strokeLineDash = [9, 8];
  }

  const inset = props.strokeWidth + 3;
  const generator = rough.svg(svg);
  const node =
    props.shape === "ellipse"
      ? generator.ellipse(w / 2, h / 2, w - inset * 2, h - inset * 2, options)
      : generator.path(roundedRect(inset, inset, w - inset * 2, h - inset * 2, props.radius), options);

  svg.appendChild(node);
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

watch([width, height, () => props.color, () => props.fill, () => props.roughness], draw);
</script>

<template>
  <div ref="host" class="rough-box" :style="{ padding }">
    <svg
      ref="canvas"
      class="rough-box__ink"
      :viewBox="`0 0 ${width} ${height}`"
      :width="width"
      :height="height"
      aria-hidden="true"
    />
    <div class="rough-box__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.rough-box {
  position: relative;
}

.rough-box__ink {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.rough-box__body {
  position: relative;
}
</style>
