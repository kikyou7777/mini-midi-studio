import React, { useEffect, useRef } from 'react';
import { getAnalyser } from '../utils/audioUtils';

export const SandDune: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for(int i = 0; i < 5; i++) {
          value += amplitude * snoise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 p = (uv * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);
        
        // Desert colors - darker for better contrast
        vec3 darkSand = vec3(0.35, 0.22, 0.12);
        vec3 sand = vec3(0.55, 0.4, 0.25);
        vec3 lightSand = vec3(0.7, 0.55, 0.35);
        vec3 sky = vec3(0.6, 0.45, 0.3);
        
        // Wind patterns (audio reactive, much slower for very smooth motion)
        float windSpeed = 0.025 + u_treble * 0.05;
        vec2 windDir = vec2(u_time * windSpeed, u_time * windSpeed * 0.3);
        
        // Dune shapes with parallax layers (gentler drift)
        float dune1 = fbm(vec2(p.x * 2.0 + windDir.x * 0.25, (p.y + 0.3) * 3.0));
        float dune2 = fbm(vec2(p.x * 3.0 + windDir.x * 0.15, (p.y + 0.5) * 4.0));
        float dune3 = fbm(vec2(p.x * 4.0 + windDir.x * 0.1, (p.y + 0.7) * 5.0));
        
        // Sand ripples (wind texture, subtler)
        float ripples = snoise(vec2(p.x * 20.0 - windDir.x, p.y * 15.0)) * 0.025;
        
        // Heat shimmer effect (audio reactive, much slower and gentler)
        float shimmer = sin(p.y * 8.0 + u_time * 0.4 + p.x * 3.0) * 0.008 * u_mid;
        shimmer += sin(p.y * 5.0 + u_time * 0.25) * 0.005 * u_mid;
        p.x += shimmer;
        
        // Layer dunes
        float height = p.y;
        vec3 color = sky;
        
        if(height < 0.2 + dune1 * 0.3) {
          color = mix(darkSand, sand, smoothstep(-0.3, 0.5, dune1));
        }
        if(height < 0.0 + dune2 * 0.2) {
          color = mix(sand, lightSand, smoothstep(-0.2, 0.6, dune2));
        }
        if(height < -0.2 + dune3 * 0.15) {
          color = mix(lightSand, sand, smoothstep(-0.1, 0.4, dune3));
        }
        
        // Add ripple detail
        color += vec3(ripples);
        
        // Sun glow (bass reactive, gentler)
        vec2 sunPos = vec2(0.3, 0.5);
        float sunDist = length(p - sunPos);
        float sunGlow = (1.0 / (sunDist * 3.0 + 1.0)) * (0.3 + u_bass * 0.15);
        color += vec3(1.0, 0.8, 0.5) * sunGlow;
        
        // Heat haze at horizon
        float haze = smoothstep(0.3, -0.5, p.y) * 0.2;
        color = mix(color, sky, haze);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const bassLocation = gl.getUniformLocation(program, 'u_bass');
    const midLocation = gl.getUniformLocation(program, 'u_mid');
    const trebleLocation = gl.getUniformLocation(program, 'u_treble');

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let startTime = Date.now();
    const frequencyData = new Uint8Array(128);

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      let bass = 0, mid = 0, treble = 0;

      const analyser = getAnalyser();
      if (analyser) {
        analyser.getByteFrequencyData(frequencyData);
        const len = frequencyData.length;
        for (let i = 0; i < len / 4; i++) bass += frequencyData[i];
        bass = (bass / (len / 4)) / 255;
        for (let i = len / 4; i < (len * 3) / 4; i++) mid += frequencyData[i];
        mid = (mid / (len / 2)) / 255;
        for (let i = (len * 3) / 4; i < len; i++) treble += frequencyData[i];
        treble = (treble / (len / 4)) / 255;
      }

      gl.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform1f(bassLocation, bass);
      gl.uniform1f(midLocation, mid);
      gl.uniform1f(trebleLocation, treble);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }} />;
};
