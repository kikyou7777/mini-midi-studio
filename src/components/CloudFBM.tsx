import React, { useEffect, useRef } from 'react';
import { getAnalyser } from '../utils/audioUtils';

interface CloudFBMProps {
  isDarkMode?: boolean;
}

export const CloudFBM: React.FC<CloudFBMProps> = ({ isDarkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const frequencyDataRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Set up audio analyser from shared audio context
    const analyser = getAnalyser();
    if (analyser) {
      const bufferLength = analyser.frequencyBinCount;
      frequencyDataRef.current = new Uint8Array(bufferLength);
    }

    // Vertex shader - simple pass-through
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with FBM and Perlin noise
    const fragmentShaderSource = `
      precision highp float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_brightness;
      
      // Permutation table for Perlin noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      // Perlin noise function
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                                + i.x + vec3(0.0, i1.x, 1.0));
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

      // Ridged noise for cloud edges
      float ridgedNoise(vec2 p) {
        return 1.0 - abs(snoise(p));
      }

      // Fractal Brownian Motion
      float fbm(vec2 p, float octaves, float persistence, float lacunarity) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for(float i = 0.0; i < 8.0; i++) {
          if(i >= octaves) break;
          
          // Mix regular and ridged noise for cloud structure
          float n = mix(
            snoise(p * frequency),
            ridgedNoise(p * frequency),
            0.3
          );
          
          value += n * amplitude;
          frequency *= lacunarity;
          amplitude *= persistence;
        }
        
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;
        
        // Audio-reactive parameters (very gentle response)
        float bassInfluence = u_bass * 0.15;
        float midInfluence = u_mid * 0.1;
        float trebleInfluence = u_treble * 0.08;
        
        // Time-based animation with audio influence (much slower, smoother)
        float timeScale = 0.04 + bassInfluence * 0.02;
        float t = u_time * timeScale;
        
        // Add very gentle swirling motion
        float angle = t * 0.08 + length(p) * 0.15;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        vec2 pRotated = rot * p;
        
        // Multiple layers of FBM with different speeds and scales (much slower evolution)
        vec2 baseUV = pRotated * 2.0 + vec2(t * 0.03, t * 0.015);
        
        // Audio-reactive FBM parameters with very gentle variation
        float octaves = 6.0 + midInfluence * 0.8;
        float persistence = 0.5 + trebleInfluence * 0.08;
        float lacunarity = 2.0 + bassInfluence * 0.15;
        
        // Primary cloud layer
        float cloud1 = fbm(baseUV, octaves, persistence, lacunarity);
        
        // Secondary layer with different scale and speed (much slower drift)
        vec2 layer2UV = pRotated * 1.5 + vec2(t * 0.045, -t * 0.025);
        float cloud2 = fbm(layer2UV, octaves - 1.0, persistence, lacunarity);
        
        // Tertiary layer for depth (slowest)
        vec2 layer3UV = pRotated * 3.0 + vec2(-t * 0.02, t * 0.035);
        float cloud3 = fbm(layer3UV, octaves - 2.0, persistence, lacunarity);
        
        // Combine layers with very gentle audio reactivity
        float clouds = cloud1 * 0.5 + cloud2 * 0.3 + cloud3 * 0.2;
        clouds += bassInfluence * 0.1;
        
        // Add very subtle shimmer effect (much slower)
        float shimmer = snoise(baseUV * 8.0 + t * 0.25) * 0.02 * trebleInfluence;
        clouds += shimmer;
        
        // Add very gentle turbulence (much slower swirl)
        float turbulence = snoise(baseUV * 4.0 + t * 0.15) * 0.04 * midInfluence;
        clouds += turbulence;
        
        // Normalize and enhance contrast
        clouds = (clouds + 1.0) * 0.5;
        clouds = smoothstep(0.2, 0.8, clouds);
        
        // Define four cloud colors (soft sky blues to white)
        vec3 color1 = vec3(0.98, 0.99, 1.0);        // Soft white
        vec3 color2 = vec3(0.88, 0.93, 0.98);       // Very light sky blue
        vec3 color3 = vec3(0.70, 0.85, 0.98);       // Light sky blue
        vec3 color4 = vec3(0.53, 0.72, 1.0);        // Medium sky blue (#87b7ff)
        
        // Adjust brightness for dark/light mode
        float brightnessMod = u_brightness;
        color1 *= brightnessMod;
        color2 *= brightnessMod;
        color3 *= brightnessMod;
        color4 *= brightnessMod;
        
        // Smooth color blending using smoothstep
        vec3 finalColor;
        if(clouds < 0.33) {
          float t = smoothstep(0.0, 0.33, clouds);
          finalColor = mix(color4, color3, t);
        } else if(clouds < 0.66) {
          float t = smoothstep(0.33, 0.66, clouds);
          finalColor = mix(color3, color2, t);
        } else {
          float t = smoothstep(0.66, 1.0, clouds);
          finalColor = mix(color2, color1, t);
        }
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    // Set up vertices (full screen quad)
    const vertices = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const bassLocation = gl.getUniformLocation(program, 'u_bass');
    const midLocation = gl.getUniformLocation(program, 'u_mid');
    const trebleLocation = gl.getUniformLocation(program, 'u_treble');
    const brightnessLocation = gl.getUniformLocation(program, 'u_brightness');

    // Resize handler
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    let startTime = Date.now();
    const render = () => {
      if (!gl || !program) return;

      const currentTime = (Date.now() - startTime) / 1000;

      // Get audio frequency data
      let bass = 0;
      let mid = 0;
      let treble = 0;

      const analyser = getAnalyser();
      if (analyser && frequencyDataRef.current) {
        try {
          analyser.getByteFrequencyData(frequencyDataRef.current);
          const data = frequencyDataRef.current;
          const len = data.length;

          // Calculate bass (low frequencies)
          for (let i = 0; i < len / 4; i++) {
            bass += data[i];
          }
          bass = (bass / (len / 4)) / 255;

          // Calculate mid frequencies
          for (let i = len / 4; i < (len * 3) / 4; i++) {
            mid += data[i];
          }
          mid = (mid / (len / 2)) / 255;

          // Calculate treble (high frequencies)
          for (let i = (len * 3) / 4; i < len; i++) {
            treble += data[i];
          }
          treble = (treble / (len / 4)) / 255;
        } catch (error) {
          // Silently fail if audio isn't available
        }
      }

      // Set uniforms
      gl.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform1f(bassLocation, bass);
      gl.uniform1f(midLocation, mid);
      gl.uniform1f(trebleLocation, treble);
      gl.uniform1f(brightnessLocation, isDarkMode ? 0.9 : 1.2);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};
