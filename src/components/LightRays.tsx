'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './LightRays.css';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uRaysOrigin;
uniform vec3 uRaysColor;
uniform float uRaysSpeed;
uniform float uLightSpread;
uniform float uRayLength;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform float uNoiseAmount;
uniform float uDistortion;
uniform float uPulsating;
uniform float uFadeDistance;
uniform float uSaturation;

out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}

vec3 saturate(vec3 color, float sat) {
  float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
  return mix(vec3(lum), color, sat);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  // flip y so origin top = uv.y=1
  uv.y = 1.0 - uv.y;

  // origin in uv space
  vec2 origin = uRaysOrigin;
  // mouse influence
  vec2 mouseUV = uMouse / uResolution;
  mouseUV.y = 1.0 - mouseUV.y;
  origin = mix(origin, mouseUV, uMouseInfluence);

  vec2 dir = uv - origin;
  float dist = length(dir);
  float angle = atan(dir.y, dir.x);

  // pulsating
  float pulse = 1.0 + uPulsating * 0.15 * sin(uTime * uRaysSpeed * 2.0);

  // number of rays based on spread
  float rayCount = 12.0 / max(uLightSpread, 0.01);
  float rays = 0.0;
  for (float i = 0.0; i < 24.0; i++) {
    float rayAngle = (i / rayCount) * 3.14159 * 2.0;
    float angleOffset = uDistortion * noise(vec2(i * 1.7, uTime * uRaysSpeed * 0.3)) * 0.5;
    float a = mod(angle - rayAngle - angleOffset + 3.14159 * 4.0, 3.14159 * 2.0) - 3.14159;
    float spread = uLightSpread * 0.15;
    float ray = smoothstep(spread, 0.0, abs(a));
    float noiseVal = 1.0 - uNoiseAmount * noise(vec2(dist * 3.0 - uTime * uRaysSpeed, i * 2.3));
    rays += ray * noiseVal;
  }

  // fade with distance and ray length
  float fade = 1.0 - smoothstep(0.0, uRayLength * uFadeDistance, dist);
  fade *= fade;

  float intensity = rays * fade * pulse * 0.35;
  intensity = clamp(intensity, 0.0, 1.0);

  vec3 col = uRaysColor * intensity;
  col = saturate(col, uSaturation);

  // soft vignette
  float vignette = 1.0 - smoothstep(0.3, 1.2, dist * 1.5);
  col *= vignette;

  fragColor = vec4(col, intensity * 0.9);
}`;

interface LightRaysProps {
  raysOrigin?: [number, number];
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  pulsating?: number;
  fadeDistance?: number;
  saturation?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [1, 1, 1];
}

export default function LightRays({
  raysOrigin = [0.5, 0.0],
  raysColor = '#B497CF',
  raysSpeed = 0.4,
  lightSpread = 0.8,
  rayLength = 1.2,
  followMouse = false,
  mouseInfluence = 0.0,
  noiseAmount = 0.3,
  distortion = 0.4,
  pulsating = 0.5,
  fadeDistance = 1.0,
  saturation = 1.2,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<[number, number]>([0, 0]);
  const propsRef = useRef({
    raysOrigin, raysColor, raysSpeed, lightSpread, rayLength,
    mouseInfluence, noiseAmount, distortion, pulsating, fadeDistance, saturation,
  });
  propsRef.current = {
    raysOrigin, raysColor, raysSpeed, lightSpread, rayLength,
    mouseInfluence, noiseAmount, distortion, pulsating, fadeDistance, saturation,
  };

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, antialias: false, dpr: 1 } as any);
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const [r, g, b] = hexToRgb(raysColor);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uRaysOrigin: { value: raysOrigin },
        uRaysColor: { value: [r, g, b] },
        uRaysSpeed: { value: raysSpeed },
        uLightSpread: { value: lightSpread },
        uRayLength: { value: rayLength },
        uMouse: { value: [0, 0] },
        uMouseInfluence: { value: mouseInfluence },
        uNoiseAmount: { value: noiseAmount },
        uDistortion: { value: distortion },
        uPulsating: { value: pulsating },
        uFadeDistance: { value: fadeDistance },
        uSaturation: { value: saturation },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    const resize = () => {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      program.uniforms.uResolution.value = [ctn.offsetWidth, ctn.offsetHeight];
    };
    window.addEventListener('resize', resize);
    resize();

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = [e.clientX, e.clientY];
    };
    if (followMouse) window.addEventListener('mousemove', onMouse);

    let rafId = 0;
    const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      const p = propsRef.current;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uRaysOrigin.value = p.raysOrigin;
      program.uniforms.uRaysColor.value = hexToRgb(p.raysColor);
      program.uniforms.uRaysSpeed.value = p.raysSpeed;
      program.uniforms.uLightSpread.value = p.lightSpread;
      program.uniforms.uRayLength.value = p.rayLength;
      program.uniforms.uMouse.value = mouseRef.current;
      program.uniforms.uMouseInfluence.value = p.mouseInfluence;
      program.uniforms.uNoiseAmount.value = p.noiseAmount;
      program.uniforms.uDistortion.value = p.distortion;
      program.uniforms.uPulsating.value = p.pulsating;
      program.uniforms.uFadeDistance.value = p.fadeDistance;
      program.uniforms.uSaturation.value = p.saturation;
      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (followMouse) window.removeEventListener('mousemove', onMouse);
      try { ctn.removeChild(gl.canvas); } catch { /* ignore */ }
      (gl.getExtension('WEBGL_lose_context') as { loseContext: () => void } | null)?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="light-rays-container" />;
}
