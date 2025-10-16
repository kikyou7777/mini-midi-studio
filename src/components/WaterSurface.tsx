import React, { useEffect, useRef } from 'react';

export const WaterSurface: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with water surface effect
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      
      // Noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      // Water ripple function
      float waterRipple(vec2 p, float time) {
        float wave1 = sin(p.x * 3.0 + time * 1.5) * 0.3;
        float wave2 = sin(p.y * 2.5 - time * 1.2) * 0.3;
        float wave3 = sin((p.x + p.y) * 2.0 + time * 0.8) * 0.2;
        
        return wave1 + wave2 + wave3;
      }
      
      // Caustics pattern (light rays through water)
      float caustics(vec2 p, float time) {
        vec2 uv = p * 4.0;
        
        float c = 0.0;
        for(int i = 0; i < 3; i++) {
          float fi = float(i);
          vec2 offset = vec2(sin(time * 0.3 + fi), cos(time * 0.2 + fi)) * 0.5;
          uv += offset;
          
          float r1 = length(sin(uv + time * 0.5));
          float r2 = length(sin(uv.yx + time * 0.6));
          
          c += sin(r1 * 8.0) * sin(r2 * 7.0);
        }
        
        return abs(c) * 0.3;
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 p = (uv * 2.0 - 1.0) * vec2(u_resolution.x / u_resolution.y, 1.0);
        
        // Underwater turquoise/cyan colors
        vec3 deepWater = vec3(0.0, 0.3, 0.4);
        vec3 midWater = vec3(0.0, 0.5, 0.6);
        vec3 shallowWater = vec3(0.3, 0.7, 0.8);
        vec3 surfaceWater = vec3(0.5, 0.85, 0.95);
        
        // Time with bass influence
        float time = u_time + u_bass * 2.0;
        
        // Create water ripples (reactive to mid frequencies)
        float ripples = waterRipple(p, time) * (0.7 + u_mid * 0.3);
        
        // Depth gradient
        float depth = uv.y + ripples * 0.15;
        
        // Mix water colors based on depth
        vec3 waterColor = mix(deepWater, midWater, smoothstep(0.0, 0.4, depth));
        waterColor = mix(waterColor, shallowWater, smoothstep(0.4, 0.7, depth));
        waterColor = mix(waterColor, surfaceWater, smoothstep(0.7, 1.0, depth));
        
        // Add caustics (light rays) - reactive to treble
        float causticsPattern = caustics(p, time);
        causticsPattern *= (0.4 + u_treble * 0.6);
        
        vec3 lightColor = vec3(0.7, 0.95, 1.0);
        waterColor += lightColor * causticsPattern * 0.6;
        
        // Add subtle noise/bubbles
        float bubbles = noise(p * 8.0 + time * 0.3) * 0.1;
        waterColor += vec3(bubbles) * 0.3;
        
        // Add surface sparkle at the top (treble reactive)
        if(uv.y > 0.7) {
          float sparkle = noise(p * 20.0 + time) * u_treble;
          sparkle = smoothstep(0.6, 1.0, sparkle);
          waterColor += vec3(0.9, 1.0, 1.0) * sparkle * 0.5;
        }
        
        // Add water surface waves at top
        if(uv.y > 0.8) {
          float surfaceWaves = sin(p.x * 10.0 + time * 2.0) * 0.05;
          surfaceWaves += sin(p.x * 15.0 - time * 1.5) * 0.03;
          waterColor += vec3(surfaceWaves) * 0.3;
        }
        
        // Vignette for depth
        float vignette = 1.0 - length(p) * 0.3;
        waterColor *= vignette;
        
        gl_FragColor = vec4(waterColor, 1.0);
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

    // Create buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const bassLocation = gl.getUniformLocation(program, 'u_bass');
    const midLocation = gl.getUniformLocation(program, 'u_mid');
    const trebleLocation = gl.getUniformLocation(program, 'u_treble');

    // Audio analysis setup
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;

    const initAudio = () => {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        // Connect to destination to analyze output
        const destination = audioContext.destination;
        if (destination) {
          const source = audioContext.createMediaStreamDestination();
          analyser.connect(audioContext.destination);
        }
      } catch (e) {
        console.log('Audio context not available');
      }
    };

    initAudio();

    // Animation loop
    let startTime = Date.now();
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      // Get audio data
      let bass = 0;
      let mid = 0;
      let treble = 0;

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        
        // Divide frequency spectrum into bass, mid, treble
        const third = Math.floor(dataArray.length / 3);
        
        for (let i = 0; i < third; i++) {
          bass += dataArray[i];
        }
        for (let i = third; i < third * 2; i++) {
          mid += dataArray[i];
        }
        for (let i = third * 2; i < dataArray.length; i++) {
          treble += dataArray[i];
        }
        
        bass = (bass / third) / 255;
        mid = (mid / third) / 255;
        treble = (treble / third) / 255;
      }

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform1f(bassLocation, bass);
      gl.uniform1f(midLocation, mid);
      gl.uniform1f(trebleLocation, treble);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: '#003344' }}
    />
  );
};
