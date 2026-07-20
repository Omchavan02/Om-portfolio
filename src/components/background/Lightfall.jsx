import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const MAX_COLORS = 8;

const hexToRGB = (hex) => {
  const color = hex.replace("#", "").padEnd(6, "0");
  return [
    parseInt(color.slice(0, 2), 16) / 255,
    parseInt(color.slice(2, 4), 16) / 255,
    parseInt(color.slice(4, 6), 16) / 255,
  ];
};

const prepColors = (input) => {
  const base = (input?.length ? input : ["#A6C8FF", "#5227FF", "#FF9FFC"]).slice(
    0,
    MAX_COLORS,
  );
  const count = base.length;
  const colors = [];

  for (let index = 0; index < MAX_COLORS; index += 1) {
    colors.push(hexToRGB(base[Math.min(index, base.length - 1)]));
  }

  const average = [0, 0, 0];
  for (let index = 0; index < count; index += 1) {
    average[0] += colors[index][0];
    average[1] += colors[index][1];
    average[2] += colors[index][2];
  }

  average[0] /= count;
  average[1] /= count;
  average[2] /= count;
  return { colors, count, average };
};

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

uniform vec3  uBgColor;
uniform vec3  uMouseColor;
uniform float uSpeed;
uniform int   uStreakCount;
uniform float uStreakWidth;
uniform float uStreakLength;
uniform float uGlow;
uniform float uDensity;
uniform float uTwinkle;
uniform float uZoom;
uniform float uBgGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;

varying vec2 vUv;

vec3 palette(float h) {
  int count = uColorCount;
  if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0;
  if (idx == 1) return uColor1;
  if (idx == 2) return uColor2;
  if (idx == 3) return uColor3;
  if (idx == 4) return uColor4;
  if (idx == 5) return uColor5;
  if (idx == 6) return uColor6;
  return uColor7;
}

vec3 tanhv(vec3 x) {
  vec3 e = exp(-2.0 * x);
  return (1.0 - e) / (1.0 + e);
}

vec2 sceneC(vec2 frag, vec2 resolution) {
  vec2 point = (frag + frag - resolution) / resolution.x;
  float depth = 0.0;
  float distanceField = 1e3;
  vec4 orbit = vec4(0.0);

  for (int step = 0; step < 39; step++) {
    if (distanceField <= 1e-4) break;
    orbit = depth * normalize(vec4(point, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;
    distanceField = 1.0 - sqrt(length(orbit * orbit));
    depth += distanceField;
  }

  return vec2(orbit.x, atan(orbit.z, orbit.y));
}

void mainImage(out vec4 outputColor, vec2 coordinate) {
  vec2 resolution = iResolution.xy;
  vec2 baseUv = (coordinate + coordinate - resolution) / resolution.x;
  float time = 0.1 * iTime * uSpeed + 9.0;
  float angularRings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));
  vec2 cellSize = vec2(5e-3, 6.28318530718 / angularRings);

  vec2 scene = sceneC(coordinate, resolution);
  vec2 sceneDx = sceneC(coordinate + vec2(1.0, 0.0), resolution);
  vec2 sceneDy = sceneC(coordinate + vec2(0.0, 1.0), resolution);
  vec2 derivativeX = sceneDx - scene;
  vec2 derivativeY = sceneDy - scene;
  derivativeX.y -= 6.28318530718 * floor(derivativeX.y / 6.28318530718 + 0.5);
  derivativeY.y -= 6.28318530718 * floor(derivativeY.y / 6.28318530718 + 0.5);
  vec2 footprint = abs(derivativeX) + abs(derivativeY);
  coordinate = scene;

  vec2 backgroundPoint = vec2(2.0, 1.0) * baseUv - (resolution / resolution.x) * vec2(0.0, 1.0);
  vec4 glowField = vec4(
    uBgColor * 90.0 * uBgGlow / (1e3 * dot(backgroundPoint, backgroundPoint) + 6.0),
    0.0
  );

  float mouseGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mouseNormal = (iMouse + iMouse - resolution) / resolution.x;
    float mouseDistance = length(baseUv - mouseNormal);
    mouseGlow = exp(
      -mouseDistance * mouseDistance / max(uMouseRadius * uMouseRadius, 1e-4)
    ) * uMouseStrength;
    glowField.rgb += uMouseColor * mouseGlow * 0.25;
  }

  float streakRadius = 5e-4 * uStreakWidth;
  vec2 antialiasWidth = vec2(max(length(footprint), 1e-5));
  float tail = 19.0 / max(uStreakLength, 0.05);

  for (int streak = 0; streak < 16; streak++) {
    if (streak >= uStreakCount) break;
    float streakIndex = float(streak) + 1.0;
    float randomSeed = fract(
      sin(dot(vec2(streakIndex, floor(coordinate.x / cellSize.x + 0.5)), vec2(7.0, 11.0))) * 73.0
    );
    vec2 localPoint = coordinate - (time + time * randomSeed) * vec2(0.0, 1.0);
    localPoint -= floor(localPoint / cellSize + 0.5) * cellSize;
    float hue = fract(8663.0 * randomSeed);
    vec3 streakColor = palette(hue);
    float weight = mix(1.5, 1.0 + sin(time + 7.0 * hue + 4.0), uTwinkle);
    weight *= 1.0 + mouseGlow * 2.0;
    vec2 inner = vec2(
      length(max(localPoint, vec2(-1.0, 0.0))),
      length(localPoint) - streakRadius
    ) - streakRadius;
    vec2 smoothMask = vec2(1.0) - smoothstep(-antialiasWidth, antialiasWidth, inner);
    glowField.rgb += dot(smoothMask, vec2(exp(tail * localPoint.y), 3.0)) * streakColor * weight;
    coordinate.x += cellSize.x / 8.0;
  }

  vec3 finalColor = sqrt(
    tanhv(max(glowField.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0))
  );
  outputColor = vec4(finalColor, uOpacity);
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`;

const Lightfall = ({
  className,
  dpr,
  paused = false,
  colors = ['#A6C8FF', '#5227FF', '#FF9FFC'],
  backgroundColor = '#0A29FF',
  speed = 0.5,
  streakCount = 2,
  streakWidth = 1,
  streakLength = 1,
  glow = 1,
  density = 0.6,
  twinkle = 1,
  zoom = 3,
  backgroundGlow = 0.5,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.5,
  mouseRadius = 1,
  mouseDampening = 0.15,
  mixBlendMode
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const programRef = useRef(null);
  const meshRef = useRef(null);
  const geometryRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseTargetRef = useRef([0, 0]);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),
      alpha: true,
      antialias: true
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    const canvas = gl.canvas;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const { colors: arr, count, average: avg } = prepColors(colors);

    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uColor0: { value: arr[0] },
      uColor1: { value: arr[1] },
      uColor2: { value: arr[2] },
      uColor3: { value: arr[3] },
      uColor4: { value: arr[4] },
      uColor5: { value: arr[5] },
      uColor6: { value: arr[6] },
      uColor7: { value: arr[7] },
      uColorCount: { value: count },
      uBgColor: { value: hexToRGB(backgroundColor) },
      uMouseColor: { value: avg },
      uSpeed: { value: speed },
      uStreakCount: { value: Math.max(1, Math.min(16, Math.round(streakCount))) },
      uStreakWidth: { value: streakWidth },
      uStreakLength: { value: streakLength },
      uGlow: { value: glow },
      uDensity: { value: density },
      uTwinkle: { value: twinkle },
      uZoom: { value: zoom },
      uBgGlow: { value: backgroundGlow },
      uOpacity: { value: opacity },
      uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
      uMouseStrength: { value: mouseStrength },
      uMouseRadius: { value: mouseRadius }
    };

    const program = new Program(gl, { vertex, fragment, uniforms });
    programRef.current = program;

    const geometry = new Triangle(gl);
    geometryRef.current = geometry;
    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = e => {
      const rect = canvas.getBoundingClientRect();
      const scale = renderer.dpr || 1;
      const x = (e.clientX - rect.left) * scale;
      const y = (rect.height - (e.clientY - rect.top)) * scale;
      mouseTargetRef.current = [x, y];
      if (mouseDampening <= 0) {
        uniforms.iMouse.value = [x, y];
      }
    };
    if (mouseInteraction) {
      canvas.addEventListener('pointermove', onPointerMove);
    }

    const loop = t => {
      rafRef.current = requestAnimationFrame(loop);
      uniforms.iTime.value = t * 0.001;
      if (mouseDampening > 0) {
        if (!lastTimeRef.current) lastTimeRef.current = t;
        const dt = (t - lastTimeRef.current) / 1000;
        lastTimeRef.current = t;
        const tau = Math.max(1e-4, mouseDampening);
        let factor = 1 - Math.exp(-dt / tau);
        if (factor > 1) factor = 1;
        const target = mouseTargetRef.current;
        const cur = uniforms.iMouse.value;
        cur[0] += (target[0] - cur[0]) * factor;
        cur[1] += (target[1] - cur[1]) * factor;
      } else {
        lastTimeRef.current = t;
      }
      if (!paused && programRef.current && meshRef.current) {
        try {
          renderer.render({ scene: meshRef.current });
        } catch (e) {
          console.error(e);
        }
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (mouseInteraction) canvas.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
      const callIfFn = (obj, key) => {
        if (obj && typeof obj[key] === 'function') {
          obj[key].call(obj);
        }
      };
      callIfFn(programRef.current, 'remove');
      callIfFn(geometryRef.current, 'remove');
      callIfFn(meshRef.current, 'remove');
      callIfFn(rendererRef.current, 'destroy');
      programRef.current = null;
      geometryRef.current = null;
      meshRef.current = null;
      rendererRef.current = null;
    };
  }, [
    dpr,
    paused,
    colors,
    backgroundColor,
    speed,
    streakCount,
    streakWidth,
    streakLength,
    glow,
    density,
    twinkle,
    zoom,
    backgroundGlow,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    mouseDampening
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative ${className ?? ''}`}
      style={{
        ...(mixBlendMode && { mixBlendMode })
      }}
    />
  );
};

export default Lightfall;
