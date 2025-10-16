import React, { useEffect, useRef } from 'react';
import { getAnalyser } from '../utils/audioUtils';

export const ForestScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) return;
    glRef.current = gl;

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
        for(int i = 0; i < 6; i++) {
          value += amplitude * snoise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 p = (uv * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);
        
        // Wind animation
        float wind = sin(u_time * 0.3 + p.x * 2.0) * 0.1 * u_treble;
        
        // Layered forest depth
        vec3 darkForest = vec3(0.05, 0.15, 0.08);   // Deep forest
        vec3 midForest = vec3(0.1, 0.3, 0.15);      // Mid trees
        vec3 lightForest = vec3(0.15, 0.45, 0.2);   // Foreground
        vec3 leaves = vec3(0.3, 0.6, 0.25);         // Sunlit leaves
        
        // Multiple tree layers with parallax
        float layer1 = fbm(vec2(p.x * 3.0 + wind, p.y * 2.0 - u_time * 0.02));
        float layer2 = fbm(vec2(p.x * 5.0 + wind * 0.5, p.y * 3.0 - u_time * 0.05));
        float layer3 = fbm(vec2(p.x * 8.0 + wind * 0.3, p.y * 4.0 - u_time * 0.08));
        
        // Fireflies/light particles (audio reactive)
        float fireflies = 0.0;
        for(float i = 0.0; i < 5.0; i++) {
          vec2 fireflyPos = vec2(
            sin(u_time * 0.5 + i * 2.0) * 0.8,
            cos(u_time * 0.3 + i * 1.5) * 0.6 - 0.2
          );
          float dist = length(p - fireflyPos);
          fireflies += (1.0 / (dist * 50.0 + 1.0)) * (0.5 + u_mid * 0.5);
        }
        
        // Combine layers
        float depth = smoothstep(-0.5, 1.0, p.y);
        vec3 color = mix(darkForest, midForest, smoothstep(-0.3, 0.3, layer1));
        color = mix(color, lightForest, smoothstep(-0.2, 0.4, layer2));
        color = mix(color, leaves, smoothstep(0.0, 0.6, layer3) * (0.5 + u_bass * 0.5));
        
        // Add fireflies
        color += vec3(0.8, 0.9, 0.5) * fireflies;
        
        // Atmospheric fog
        color = mix(color, vec3(0.2, 0.3, 0.25), depth * 0.3);
        
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
