/* homepage motion. needs js/vendor-three.min.js and js/home-data.js first.
   console: simzii.state(), simzii.tune({ ease }), simzii.remeasure(); H toggles the tuning panel. */
(() => {
  'use strict';
  const VERSION = '1.9';
  const S = { count: 30, cover: 0.56, soft: 0.48, drift: 1, billow: 1, push: 1, par: 1, ov: 0.42,
    light: false, plate: true, terrain: false, front: false, wash: true, birds: true, flock: 9, birdScale: 0.95, seed: 7 };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PALETTE = {
    dark: {
      bird: [0.20, 0.24, 0.21],
      bands: [
        { lit: [0.90, 0.91, 0.91], shade: [0.60, 0.64, 0.63], fog: [0.80, 0.82, 0.82], fogAmt: 0.30 },
        { lit: [0.93, 0.94, 0.94], shade: [0.62, 0.66, 0.65], fog: [0.82, 0.84, 0.84], fogAmt: 0.15 },
        { lit: [0.96, 0.96, 0.96], shade: [0.64, 0.68, 0.67], fog: [0, 0, 0], fogAmt: 0 }
      ],
      front: { lit: [0.97, 0.97, 0.97], shade: [0.70, 0.73, 0.72], fog: [0, 0, 0], fogAmt: 0 },
      ridges: [
        { col: [0.12, 0.19, 0.15], crest: [0.17, 0.25, 0.20] },
        { col: [0.085, 0.14, 0.11], crest: [0.14, 0.21, 0.17] },
        { col: [0.063, 0.106, 0.078], crest: [0.13, 0.19, 0.15] }
      ]
    },
    light: {
      bird: [0.16, 0.22, 0.18],
      bands: [
        { lit: [1.00, 1.00, 0.99], shade: [0.76, 0.80, 0.78], fog: [0.88, 0.90, 0.88], fogAmt: 0.30 },
        { lit: [1.00, 1.00, 0.99], shade: [0.74, 0.78, 0.76], fog: [0.86, 0.88, 0.86], fogAmt: 0.15 },
        { lit: [1.00, 1.00, 1.00], shade: [0.72, 0.76, 0.74], fog: [0, 0, 0], fogAmt: 0 }
      ],
      front: { lit: [1, 1, 1], shade: [0.82, 0.85, 0.83], fog: [0, 0, 0], fogAmt: 0 },
      ridges: [
        { col: [0.74, 0.79, 0.73], crest: [0.82, 0.86, 0.80] },
        { col: [0.56, 0.64, 0.56], crest: [0.66, 0.73, 0.65] },
        { col: [0.37, 0.45, 0.38], crest: [0.47, 0.55, 0.48] }
      ]
    }
  };

  // y: cloud centre in hero heights (0 top, 1 bottom), w: width in hero heights, off: scroll parallax factor
  const BANDS = [
    { share: 0.34, y: [0.02, 0.48], w: [0.60, 1.20], depth: [0.10, 0.35], opacity: 0.72, off: 0.45 },
    { share: 0.36, y: [0.30, 0.78], w: [0.80, 1.50], depth: [0.40, 0.65], opacity: 0.80, off: 0.25 },
    { share: 0.30, y: [0.62, 1.08], w: [1.00, 1.80], depth: [0.70, 0.90], opacity: 0.85, off: 0.08 }
  ];
  const FRONT = { count: 3, y: [0.98, 1.16], w: [1.3, 2.0], depth: [1.0, 1.0], opacity: 0.38, off: -0.35 };
  const RIDGES = [
    { base: 0.66, amp: 0.34, freq: 1.3, seed: 3.1, off: 0.42 },
    { base: 0.80, amp: 0.26, freq: 1.8, seed: 8.7, off: 0.22 },
    { base: 0.93, amp: 0.20, freq: 2.4, seed: 15.3, off: 0.06 }
  ];

  // shaders
  const NOISE = `
  float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
  float fbm(vec2 p){ float v=0., a=.5; mat2 r=mat2(.8,.6,-.6,.8);
    for(int i=0;i<5;i++){ v+=a*noise(p); p=r*p*2.02+17.; a*=.5; } return v; }
  float fbm4(vec2 p){ float v=0., a=.5; mat2 r=mat2(.8,.6,-.6,.8);
    for(int i=0;i<4;i++){ v+=a*noise(p); p=r*p*2.03+11.; a*=.45; } return v/0.92; }`;

  const VS_CLOUD = `#version 300 es
  precision highp float;
  layout(location=0) in vec2 aCorner;
  layout(location=1) in vec4 aCloud;
  layout(location=2) in vec2 aMeta;
  uniform vec2 uRes, uMouseN;
  uniform float uTime, uDrift, uScroll, uPar, uOff, uY0;
  out vec2 vUv, vScene; out float vSeed, vAsp;
  void main(){
    float asp = uRes.x/uRes.y;
    float w = aCloud.z, h = aCloud.w, d = aMeta.y;
    float span = asp + w;
    float xc = mod(aCloud.x*span + uTime*uDrift*0.012*(0.3+d), span) - w*0.5;
    float yc = aCloud.y + uScroll*uOff*uPar + uY0;
    vec2 c = vec2(xc, yc) + (uMouseN - 0.5)*vec2(-0.035, -0.018)*d;
    vec2 pos = c + aCorner*vec2(w, h)*0.5;
    vScene = pos;
    vUv = vec2(aCorner.x*0.5 + 0.5, 0.5 - aCorner.y*0.5);
    vSeed = aMeta.x; vAsp = w/h;
    gl_Position = vec4(pos.x/asp*2. - 1., 1. - pos.y*2., 0., 1.);
  }`;

  const FS_CLOUD = `#version 300 es
  precision highp float;
  in vec2 vUv, vScene; in float vSeed, vAsp;
  uniform float uTime, uSoft, uCover, uOpacity, uPush, uFogAmt, uBillow;
  uniform vec2 uRes; uniform sampler2D uTrail;
  uniform vec3 uLit, uShade, uFog;
  out vec4 o;
  ${NOISE}
  void main(){
    vec2 su = gl_FragCoord.xy/uRes;
    float tr = texture(uTrail, su).r;
    vec2 tg = vec2(texture(uTrail, su + vec2(.01, 0.)).r - texture(uTrail, su - vec2(.01, 0.)).r,
                   texture(uTrail, su - vec2(0., .01)).r - texture(uTrail, su + vec2(0., .01)).r);
    vec2 uv = vUv - tg*0.05*uPush/vec2(vAsp, 1.);
    float t = uTime*0.035*uBillow;
    vec2 p = vec2(uv.x*vAsp, uv.y)*1.45 + vSeed*13.7;
    vec2 wq = vec2(fbm4(p*0.8 + vec2(t, 0.)), fbm4(p*0.8 + vec2(5.2, 1.3) - vec2(0., t*0.7)));
    float n = fbm4(p*1.2 + wq*0.9 + vec2(t*0.5, 0.));
    float n2 = 1. - abs(2.*fbm4(p*3.2 + wq*0.6 - vec2(t*0.35, 0.)) - 1.);
    float detail = n*0.7 + n2*0.3;
    vec2 c = uv - vec2(0.5, 0.42);
    float e = 1.0 - length(c*vec2(2.3, 3.0));
    float dens = e*1.15 + (detail - 0.5)*1.75*smoothstep(-0.45, 0.25, e) - tr*0.7*uPush;
    float thr = 0.5 - uCover*0.45;
    float a0 = smoothstep(thr, thr + uSoft, dens);
    a0 *= smoothstep(0.0, 0.26, uv.y + (n - 0.5)*0.1);
    a0 *= smoothstep(0., .15, uv.x)*smoothstep(1., .85, uv.x)*smoothstep(1., .85, uv.y);
    float l = clamp(0.3 + uv.y*0.55 + (n - 0.5)*0.45 + clamp(dens - thr, 0., 1.)*0.2 + (1. - a0)*0.22, 0., 1.);
    vec3 col = mix(uShade, uLit, l);
    col = mix(col, uFog, uFogAmt);
    float a = a0*uOpacity;
    o = vec4(col*a, a);
  }`;

  const FS_TRAIL = `#version 300 es
  precision highp float;
  uniform sampler2D uPrev; uniform vec2 uRes, uA, uB; uniform float uAsp, uDecay, uStrength, uRadius;
  out vec4 o;
  void main(){
    vec2 uv = gl_FragCoord.xy/uRes; vec2 px = 1./uRes;
    float prev = (texture(uPrev, uv).r*4. + texture(uPrev, uv + vec2(px.x, 0.)).r + texture(uPrev, uv - vec2(px.x, 0.)).r
                + texture(uPrev, uv + vec2(0., px.y)).r + texture(uPrev, uv - vec2(0., px.y)).r)/8.;
    vec2 s = vec2(uv.x*uAsp, 1. - uv.y);
    vec2 pa = s - uA, ba = uB - uA;
    float h = clamp(dot(pa, ba)/max(dot(ba, ba), 1e-6), 0., 1.);
    float d = length(pa - ba*h);
    float splat = exp(-d*d/(uRadius*uRadius))*uStrength;
    o = vec4(min(prev*uDecay + splat, 1.), 0., 0., 1.);
  }`;

  const VS_FULL = `#version 300 es
  void main(){ vec2 p = vec2((gl_VertexID<<1)&2, gl_VertexID&2); gl_Position = vec4(p*2.-1., 0., 1.); }`;

  const FS_RIDGE = `#version 300 es
  precision highp float;
  uniform vec2 uRes;
  uniform float uBase, uAmp, uFreq, uSeed, uShift;
  uniform vec3 uCol, uCrest;
  out vec4 o;
  ${NOISE}
  void main(){
    vec2 uv = gl_FragCoord.xy/uRes; float asp = uRes.x/uRes.y;
    vec2 s = vec2(uv.x*asp, 1. - uv.y);
    float x = s.x*uFreq + uSeed + uShift;
    float n = fbm(vec2(x, uSeed));
    float r = pow(1. - abs(2.*fbm(vec2(x*0.8 + 3., uSeed + 1.)) - 1.), 2.2);
    float y = uBase - (n - 0.45)*uAmp*0.8 - r*uAmp;
    float px = 1.5/uRes.y;
    float inside = smoothstep(y - px, y + px, s.y);
    vec3 col = mix(uCrest, uCol, smoothstep(0., 0.045, s.y - y));
    col *= 0.96 + 0.07*fbm(s*14. + uSeed);
    o = vec4(col*inside, inside);
  }`;

  // birds: instanced silhouettes, weights body to wing tip drive a travelling flap wave
  const VS_BIRD = `#version 300 es
  precision highp float;
  layout(location=0) in vec3 aPos;
  layout(location=1) in vec2 aW;
  layout(location=2) in vec4 aInst;
  uniform mat4 uProj; uniform vec3 uFlock, uDir; uniform float uTime, uScale, uRoll, uFlapF;
  out float vZ;
  void main(){
    vec3 p = aPos;
    float time = uTime + aInst.w;
    float glide = smoothstep(0.72, 0.95, sin(time*0.35));
    float wd = aW.x, td = aW.y;
    float flap = sin(time*uFlapF - wd*1.6)*0.62*wd;
    float glid = sin(time*1.1 - wd)*0.08*wd + 0.06*wd;
    p.y += mix(flap, glid, glide);
    p.y += mix(sin(time*uFlapF - td)*0.05*td, sin(time*1.1 - td)*0.03*td, glide);
    p.y -= sin(time*uFlapF + 0.25)*0.07*(1. - glide);
    float cr = cos(uRoll), sr = sin(uRoll);
    p = vec3(p.x, p.y*cr - p.z*sr, p.y*sr + p.z*cr);
    vec3 f = normalize(vec3(sign(uDir.x)*0.45, uDir.y*0.3/max(abs(uDir.x), 1e-3), -1.)), up = normalize(vec3(0., 1., 0.6));
    vec3 r = normalize(cross(f, up)); vec3 u = cross(r, f);
    float sc = uScale*(0.85 + 0.3*fract(aInst.w*7.31));
    vec3 drift = vec3(sin(time*0.1), cos(time*0.15), sin(time*0.12))*0.6;
    vec3 world = uFlock + aInst.xyz + drift + (f*p.x + u*p.y + r*p.z)*sc;
    vZ = -world.z;
    gl_Position = uProj*vec4(world, 1.);
  }`;
  const FS_BIRD = `#version 300 es
  precision highp float;
  in float vZ; uniform vec3 uCol, uFog; uniform float uOpacity;
  out vec4 o;
  void main(){
    vec3 c = mix(uCol, uFog, smoothstep(40., 110., vZ)*0.3);
    o = vec4(c*uOpacity, uOpacity);
  }`;

  function birdGeometry(){
    const v = [], w = [];
    const tri = (a, b, c, wa, wb, wc) => { v.push(...a, ...b, ...c); w.push(...wa, ...wb, ...wc); };
    // body fan
    const ctr = [0, 0, 0], body = [[0.42, 0, 0], [0.1, 0, 0.08], [-0.25, 0, 0.05], [-0.3, 0, 0], [-0.25, 0, -0.05], [0.1, 0, -0.08]];
    for (let i = 0; i < body.length; i++) tri(ctr, body[i], body[(i + 1) % body.length], [0, 0], [0, 0], [0, 0]);
    // wings
    const N = 6;
    for (const side of [1, -1]){
      const pt = (s, edge) => {
        const z = (0.07 + s * 0.93) * side;
        const lead = 0.12 - 0.16 * s - 0.1 * s * s;
        const chord = 0.30 * (1 - s) + 0.05;
        return [edge ? lead - chord : lead, 0, z];
      };
      for (let i = 0; i < N; i++){
        const s0 = i / N, s1 = (i + 1) / N;
        const a = pt(s0, 0), b = pt(s0, 1), c = pt(s1, 0), d = pt(s1, 1);
        tri(a, b, c, [s0, 0], [s0, 0], [s1, 0]); tri(b, d, c, [s0, 0], [s1, 0], [s1, 0]);
      }
    }
    // tail
    tri([-0.27, 0, 0.04], [-0.58, 0, 0.14], [-0.27, 0, -0.04], [0, 0], [0, 1], [0, 0]);
    tri([-0.27, 0, -0.04], [-0.58, 0, 0.14], [-0.58, 0, -0.14], [0, 0], [0, 1], [0, 1]);
    return { pos: new Float32Array(v), w: new Float32Array(w), n: v.length / 3 };
  }

  function perspective(fov, asp, near, far){
    const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
    return new Float32Array([f / asp, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
  }

  function rng(seed){ let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const lerp = (a, b, t) => a + (b - a) * t;
  const between = (r, [a, b]) => lerp(a, b, r());

  function compile(gl, vs, fs){
    const mk = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const p = gl.createProgram(); gl.attachShader(p, mk(gl.VERTEX_SHADER, vs)); gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    const u = {}; const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++){ const name = gl.getActiveUniform(p, i).name; u[name] = gl.getUniformLocation(p, name); }
    return { p, u };
  }

  class Layer {
    constructor(canvas, scale, withRidges){
      this.canvas = canvas; this.scale = scale; this.withRidges = withRidges;
      const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: withRidges });
      if (!gl) throw new Error('no webgl2');
      this.gl = gl;
      this.cloud = compile(gl, VS_CLOUD, FS_CLOUD);
      if (withRidges) this.ridge = compile(gl, VS_FULL, FS_RIDGE);
      this.quad = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
      this.emptyVao = gl.createVertexArray();
      this.groups = [];
      this.trailProg = compile(gl, VS_FULL, FS_TRAIL);
      this.trail = [0, 1].map(() => {
        const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const fb = gl.createFramebuffer(); return { tex, fb, w: 0, h: 0 };
      });
      this.ti = 0;
      if (withRidges){
        this.birdProg = compile(gl, VS_BIRD, FS_BIRD);
        const g = birdGeometry(); this.birdN = g.n;
        this.birdVao = gl.createVertexArray(); gl.bindVertexArray(this.birdVao);
        const b0 = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b0); gl.bufferData(gl.ARRAY_BUFFER, g.pos, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        const b1 = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b1); gl.bufferData(gl.ARRAY_BUFFER, g.w, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
        this.birdInst = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, this.birdInst);
        gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, 0); gl.vertexAttribDivisor(2, 1);
        gl.bindVertexArray(null);
        this.birdCount = 0;
      }
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }
    setGroups(defs){
      const gl = this.gl;
      this.groups.forEach(g => { gl.deleteBuffer(g.buf); gl.deleteVertexArray(g.vao); });
      this.groups = defs.map(def => {
        const data = new Float32Array(def.items.flat());
        const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
        gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 24, 0); gl.vertexAttribDivisor(1, 1);
        gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 24, 16); gl.vertexAttribDivisor(2, 1);
        gl.bindVertexArray(null);
        return { ...def, vao, buf, n: def.items.length };
      });
    }
    setBirds(items){
      const gl = this.gl; gl.bindBuffer(gl.ARRAY_BUFFER, this.birdInst);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(items.flat()), gl.STATIC_DRAW); this.birdCount = items.length;
    }
    drawBirds(st){
      const f = st.flock; if (!f || !this.birdCount) return;
      const gl = this.gl, { p, u } = this.birdProg, W = this.canvas.width, H = this.canvas.height;
      gl.useProgram(p);
      gl.uniformMatrix4fv(u.uProj, false, perspective(35 * Math.PI / 180, W / H, 1, 200));
      gl.uniform3fv(u.uFlock, f.pos); gl.uniform3fv(u.uDir, f.dir);
      gl.uniform1f(u.uTime, st.time); gl.uniform1f(u.uScale, S.birdScale * Math.min(1, 0.35 + 0.45 * W / H)); gl.uniform1f(u.uRoll, f.roll); gl.uniform1f(u.uFlapF, 13);
      gl.uniform3fv(u.uCol, st.pal.bird); gl.uniform3fv(u.uFog, st.pal.bands[0].fog); gl.uniform1f(u.uOpacity, 1);
      gl.bindVertexArray(this.birdVao); gl.drawArraysInstanced(gl.TRIANGLES, 0, this.birdN, this.birdCount);
    }
    resize(){
      const r = this.canvas.getBoundingClientRect();
      const k = Math.min(Math.max(Math.min(devicePixelRatio || 1, 2) * this.scale, this.scale + 0.15), 0.9);
      const w = Math.max(2, Math.round(r.width * k)), h = Math.max(2, Math.round(r.height * k));
      if (this.canvas.width !== w || this.canvas.height !== h){ this.canvas.width = w; this.canvas.height = h; }
      const tw = 192, th = Math.max(16, Math.round(192 * r.height / Math.max(r.width, 1)));
      if (this.trail[0].w !== tw || this.trail[0].h !== th){
        const gl = this.gl;
        this.trail.forEach(T => {
          T.w = tw; T.h = th; gl.bindTexture(gl.TEXTURE_2D, T.tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, tw, th, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
          gl.bindFramebuffer(gl.FRAMEBUFFER, T.fb); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, T.tex, 0);
          gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
        });
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
    }
    stepTrail(st){
      const gl = this.gl, src = this.trail[this.ti], dst = this.trail[1 - this.ti], { p, u } = this.trailProg;
      gl.disable(gl.BLEND);
      gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fb); gl.viewport(0, 0, dst.w, dst.h); gl.useProgram(p);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, src.tex); gl.uniform1i(u.uPrev, 0);
      gl.uniform2f(u.uRes, dst.w, dst.h); gl.uniform1f(u.uAsp, this.canvas.width / this.canvas.height);
      gl.uniform2f(u.uA, st.trailA[0], st.trailA[1]); gl.uniform2f(u.uB, st.trailB[0], st.trailB[1]);
      gl.uniform1f(u.uDecay, st.decay); gl.uniform1f(u.uStrength, st.splat); gl.uniform1f(u.uRadius, 0.09);
      gl.bindVertexArray(this.emptyVao); gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.enable(gl.BLEND);
      this.ti = 1 - this.ti;
    }
    draw(st){
      const gl = this.gl, W = this.canvas.width, H = this.canvas.height;
      if (st.trailStep) this.stepTrail(st);
      gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.trail[this.ti].tex);
      this.groups.forEach((g, i) => {
        if (g.n && !g.hidden){
          const { p, u } = this.cloud; gl.useProgram(p);
          gl.uniform2f(u.uRes, W, H); gl.uniform2f(u.uMouseN, st.mouseN[0], st.mouseN[1]);
          gl.uniform1f(u.uTime, st.time); gl.uniform1f(u.uDrift, S.drift); gl.uniform1f(u.uScroll, st.scroll);
          gl.uniform1f(u.uPar, S.par); gl.uniform1f(u.uOff, g.off); gl.uniform1f(u.uY0, g.y0 || 0);
          gl.uniform1f(u.uSoft, g.soft != null ? g.soft : S.soft); gl.uniform1f(u.uCover, g.cover != null ? g.cover : S.cover); gl.uniform1f(u.uOpacity, g.opacity);
          gl.uniform1f(u.uPush, S.push); gl.uniform1f(u.uBillow, S.billow); gl.uniform1i(u.uTrail, 0);
          gl.uniform3fv(u.uLit, g.pal.lit); gl.uniform3fv(u.uShade, g.pal.shade); gl.uniform3fv(u.uFog, g.pal.fog);
          gl.uniform1f(u.uFogAmt, g.pal.fogAmt);
          gl.bindVertexArray(g.vao); gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, g.n);
        }
        if (this.withRidges && S.terrain && !S.plate && RIDGES[i]){
          const R = RIDGES[i], pal = st.pal.ridges[i], { p, u } = this.ridge; gl.useProgram(p);
          gl.uniform2f(u.uRes, W, H);
          gl.uniform1f(u.uBase, R.base + st.scroll * R.off * S.par);
          gl.uniform1f(u.uAmp, R.amp); gl.uniform1f(u.uFreq, R.freq); gl.uniform1f(u.uSeed, R.seed + S.seed * 0.37);
          gl.uniform1f(u.uShift, (st.mouseN[0] - 0.5) * 0.06 * (i + 1));
          gl.uniform3fv(u.uCol, pal.col); gl.uniform3fv(u.uCrest, pal.crest);
          gl.bindVertexArray(this.emptyVao); gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        if (i === 0 && this.withRidges && S.birds) this.drawBirds(st);
      });
      gl.bindVertexArray(null);
    }
  }

  function makeItems(def, n, r){
    const items = [];
    for (let i = 0; i < n; i++){
      const w = between(r, def.w), h = w * lerp(0.30, 0.42, r());
      items.push([ (i + r() * 0.8) / Math.max(n, 1), between(r, def.y), w, h, r() * 10, between(r, def.depth) ]);
    }
    return items.sort((a, b) => a[5] - b[5]);
  }

  function flockItems(){
    const r = rng(S.seed * 131 + 5), items = [];
    for (let i = 0; i < S.flock; i++){
      const a = r() * Math.PI * 2, rad = Math.sqrt(r());
      items.push([Math.cos(a) * rad * 3.2 + (r() - 0.5) * 1.5, Math.sin(a) * rad * 1.1, (r() - 0.5) * 3.5, r() * 40]);
    }
    return items;
  }
  const FLY = 24, GAP = 7;
  function flockAt(t, asp){
    const pass = Math.floor(t / (FLY + GAP)), u = (t - pass * (FLY + GAP)) / FLY;
    if (u > 1) return null;
    const r = rng(pass * 7919 + S.seed), dir = pass % 2 ? -1 : 1;
    const tanH = Math.tan(17.5 * Math.PI / 180);
    const zs = -(24 + r() * 6), ze = -(70 + r() * 20);
    const hw = z => -z * tanH * asp + 6;
    const wy = (sy, z) => (0.5 - sy) * 2 * -z * tanH;
    const zm = (zs + ze) * 0.45;
    const P = [[hw(zs) * dir, wy(0.20 + r() * 0.05, zs), zs], [hw(zs) * 0.25 * dir, wy(0.13 + r() * 0.04, zm), zm],
               [-hw(ze) * 0.3 * dir, wy(0.17 + r() * 0.04, ze * 0.95), ze * 0.95], [-hw(ze) * dir, wy(0.12 + r() * 0.05, ze), ze]];
    const bez = (k, v) => { const m = 1 - v; return m*m*m*P[0][k] + 3*m*m*v*P[1][k] + 3*m*v*v*P[2][k] + v*v*v*P[3][k]; };
    const v = u, e = 0.002;
    const pos = [0, 1, 2].map(k => bez(k, v)), nxt = [0, 1, 2].map(k => bez(k, Math.min(v + e, 1)) - bez(k, Math.max(v - e, 0)));
    const prevD = [0, 1, 2].map(k => bez(k, Math.max(v - 0.03, 0)));
    const climb = Math.atan2(nxt[1], Math.hypot(nxt[0], nxt[2]));
    return { pos, dir: nxt, roll: -climb * 0.6 * dir };
  }

  // 3D forest
  // terrain: Mapzen terrain tiles (Copernicus EU-DEM, USGS SRTM/GMTED2010), reshaped into a fictional valley.
  // trees: "High-res tree textures" by rubberduck, CC0. three.js r160, MIT.
  function startForest(canvas){
    const T = window.THREE; if (!T) throw new Error('three missing');
    const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1;
    renderer.autoClear = false;
    const NOISE = `float hash2(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.345);return fract(p.x*p.y);}
float noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash2(i),hash2(i+vec2(1.,0.)),f.x),mix(hash2(i+vec2(0.,1.)),hash2(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float a=.5,v=0.;mat2 r=mat2(.8,-.6,.6,.8);for(int i=0;i<5;i++){v+=a*noise2(p);p=r*p*2.03+vec2(7.1,3.4);a*=.5;}return v;}`;
    const FOG = 0x5f6a6b;
    const scene = new T.Scene(); scene.fog = new T.FogExp2(FOG, .11);
    const camera = new T.PerspectiveCamera(40, 16 / 9, .05, 60);
    // sky: gradient and glow only, the fog layer does the clouds
    const skyScene = new T.Scene(), skyCam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const skyU = { uBot: { value: new T.Color() }, uTop: { value: new T.Color() } };
    skyScene.add(new T.Mesh(new T.PlaneGeometry(2, 2), new T.ShaderMaterial({ depthTest: false, depthWrite: false, uniforms: skyU,
      vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
      fragmentShader: `uniform vec3 uBot,uTop;varying vec2 vUv;void main(){vec3 c=mix(uBot,uTop,vUv.y);
        c+=vec3(.02,.02,.016)*exp(-length((vUv-vec2(.25,.65)))*3.);gl_FragColor=vec4(c,1.);}` })));
    scene.add(new T.HemisphereLight(0xd6e8dc, 0x253b2c, 1.4));
    const sun = new T.DirectionalLight(0xf4f4d9, 1.9); sun.position.set(-4, 7, 2); scene.add(sun);
    const fill = new T.DirectionalLight(0xc3dfd0, .5); fill.position.set(3, 2, -3); scene.add(fill);

    // terrain: 385 x 385 Uint16 heights
    const N = 385, LO = -0.6411289572715759, HI = 2.3170838356018066;
    const raw = atob(window.SIMZII_HOME_DATA.heights);
    const q = new Uint16Array(N * N); for (let i = 0; i < q.length; i++) q[i] = raw.charCodeAt(i * 2) | (raw.charCodeAt(i * 2 + 1) << 8);
    const pos = new Float32Array(N * N * 3), heights = new Float32Array(N * N);
    for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++){
      const i = iz * N + ix, x = -3.6 + ix * 7.2 / (N - 1), z = -3.6 + iz * 7.2 / (N - 1), orig = LO + q[i] / 65535 * (HI - LO);
      const vx = x - .35 * Math.sin(z * .7);
      const h = 1.70 * Math.exp(-Math.pow((vx + 2.35) / 1.12, 2)) + 1.25 * Math.exp(-Math.pow((vx - 2.5) / 1.4, 2)) + .14 * orig + .12 * Math.sin(z * .55 + x * .8) + .10;
      pos[i * 3] = x * 1.6; pos[i * 3 + 1] = h; pos[i * 3 + 2] = z * 1.6; heights[i] = h;
    }
    const idx = new Uint32Array((N - 1) * (N - 1) * 6); let k = 0;
    for (let iz = 0; iz < N - 1; iz++) for (let ix = 0; ix < N - 1; ix++){ const a = iz * N + ix, b = a + 1, c = a + N, d = c + 1; idx[k++] = a; idx[k++] = c; idx[k++] = b; idx[k++] = b; idx[k++] = c; idx[k++] = d; }
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setIndex(new T.BufferAttribute(idx, 1)); geo.computeVertexNormals();
    const ground = (x, z) => {
      const gx = (x / 1.6 + 3.6) / 7.2 * 384, gz = (z / 1.6 + 3.6) / 7.2 * 384;
      const ix = Math.max(0, Math.min(383, Math.floor(gx))), iz = Math.max(0, Math.min(383, Math.floor(gz))), fx = gx - ix, fz = gz - iz;
      return (heights[iz * N + ix] * (1 - fx) + heights[iz * N + ix + 1] * fx) * (1 - fz) + (heights[(iz + 1) * N + ix] * (1 - fx) + heights[(iz + 1) * N + ix + 1] * fx) * fz;
    };
    const mat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .97, metalness: 0 });
    mat.onBeforeCompile = sh => {
      sh.vertexShader = 'varying vec3 vTerrain;varying vec3 vTerrainNormal;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvTerrain=position;vTerrainNormal=normal;');
      sh.fragmentShader = 'varying vec3 vTerrain;varying vec3 vTerrainNormal;\n' + NOISE + '\n' + sh.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
        float detail=fbm(vTerrain.xz*14.);float slope=normalize(vTerrainNormal).y;
        vec3 moss=mix(vec3(.035,.07,.045),vec3(.085,.13,.07),detail);vec3 rock=vec3(.085,.10,.09);
        diffuseColor.rgb=mix(rock,moss,smoothstep(.45,.8,slope));`);
    };
    scene.add(new T.Mesh(geo, mat));

    // trees: 14,500 camera facing cutouts; atlas cropped to the three silhouettes used
    let seed = 86421; const rand = () => (seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296;
    const tex = new T.TextureLoader().load(window.SIMZII_HOME_DATA.trees);
    tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const count = 14500, tg = new T.InstancedBufferGeometry(), plane = new T.PlaneGeometry(1, 1);
    tg.index = plane.index; tg.attributes.position = plane.attributes.position; tg.attributes.uv = plane.attributes.uv;
    const V = [[.469, .620, 0, .405451], [.777, .862, .405451, .633731], [.862, .998, .633731, 1]];   // source u range, atlas u range
    const roots = [], sizes = [], rects = [], shades = [];
    for (let i = 0; i < count; i++){
      const x = (rand() - .5) * 11.3, z = (rand() - .5) * 11.3, h = ground(x, z);
      const v = V[Math.floor(rand() * V.length)], height = .23 + Math.pow(rand(), 1.7) * .28;
      roots.push(x, h - .017, z); sizes.push(height * (v[1] - v[0]) * 3157 / 1024 * (.85 + rand() * .3), height);
      rects.push(v[2], v[3], rand() > .5 ? 1 : 0); shades.push(.64 + rand() * .53);
    }
    tg.setAttribute('root', new T.InstancedBufferAttribute(new Float32Array(roots), 3));
    tg.setAttribute('size', new T.InstancedBufferAttribute(new Float32Array(sizes), 2));
    tg.setAttribute('crop', new T.InstancedBufferAttribute(new Float32Array(rects), 3));
    tg.setAttribute('shade', new T.InstancedBufferAttribute(new Float32Array(shades), 1)); tg.instanceCount = count;
    const leaf = new T.ShaderMaterial({ uniforms: { map: { value: tex }, right: { value: new T.Vector3(1, 0, 0) }, time: { value: 0 }, fogColor: { value: new T.Color(FOG) } },
      vertexShader: `attribute vec3 root,crop;attribute vec2 size;attribute float shade;uniform vec3 right;uniform float time;varying vec2 vUv;varying float vShade,vDepth;
        void main(){float u=mix(uv.x,1.-uv.x,crop.z);vUv=vec2(mix(crop.x,crop.y,u),uv.y);vShade=shade;
        float sway=sin(time*.5+root.x*8.+root.z*3.)*.002*uv.y*uv.y;
        vec3 p=root+right*(position.x*size.x+sway)+vec3(0.,uv.y*size.y,0.);
        vec4 mv=modelViewMatrix*vec4(p,1.);vDepth=-mv.z;gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `uniform sampler2D map;uniform vec3 fogColor;varying vec2 vUv;varying float vShade,vDepth;
        void main(){vec4 t=texture2D(map,vUv);if(t.a<.24)discard;vec3 c=t.rgb*vec3(.71,.93,.72)*vShade;float l=dot(c,vec3(.3,.59,.11));c=mix(vec3(l),c,.75);c=c/(1.+c*.9);
        c=mix(c,fogColor,1.-exp(-.0121*vDepth*vDepth));gl_FragColor=vec4(c,1.);
        #include <colorspace_fragment>
        }` });
    const trees = new T.Mesh(tg, leaf); trees.frustumCulled = false; scene.add(trees);

    const look = new T.Vector3(0, .65, -.8);
    let yaw = .06, pitch = .22, radius = 6.5, panX = 0, panY = 0, t = 10;
    function resize(){
      const r = canvas.getBoundingClientRect(), w = Math.max(2, r.width), h = Math.max(2, r.height);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25)); renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.fov = w < 680 ? 51 : 40; camera.updateProjectionMatrix();
    }
    function render(dt, mouseN, still){
      if (!still){ t += dt; const e = 1 - Math.exp(-dt * 3); panX += ((mouseN[0] - .5) * .05 - panX) * e; panY += ((mouseN[1] - .5) * .03 - panY) * e; }
      camera.position.set(Math.sin(yaw + panX) * radius, look.y + Math.sin(pitch - panY) * radius, Math.cos(yaw + panX) * radius); camera.lookAt(look);
      leaf.uniforms.time.value = t; leaf.uniforms.right.value.setFromMatrixColumn(camera.matrixWorld, 0);
      renderer.clear(); renderer.render(skyScene, skyCam); renderer.clearDepth(); renderer.render(scene, camera);
    }
    // horizon colour matches the fog so distant trees melt into the sky
    const LOOKS = {
      gpt:     { bot: [.76, .83, .81], top: [.57, .68, .67], fog: [.725, .784, .784], ov: .8 },
      neutral: { bot: [.70, .74, .74], top: [.55, .60, .61], fog: [.70, .74, .74], ov: .7 },
      slate:   { bot: [.55, .60, .62], top: [.38, .43, .46], fog: [.55, .60, .62], ov: .6 },
      moss:    { bot: [.64, .69, .64], top: [.47, .53, .49], fog: [.64, .69, .64], ov: .72 }
    };
    function setLook(name){
      const L = LOOKS[name] || LOOKS.gpt;
      skyU.uBot.value.setRGB(...L.bot); skyU.uTop.value.setRGB(...L.top);
      scene.fog.color.setRGB(...L.fog, T.SRGBColorSpace); leaf.uniforms.fogColor.value.setRGB(...L.fog, T.SRGBColorSpace);
      return L;
    }
    setLook('gpt');
    resize();
    return { resize, render, renderer, setLook, LOOKS };
  }

  // page: smooth scroll, parallax, reveals, hero fog, wisps

  const smooth = document.getElementById('smooth');
  const hero = document.getElementById('hero');
  const hFrame = document.querySelector('.h-frame');
  const coarse = matchMedia('(pointer: coarse)').matches;
  const native = reduce || coarse;
  if (native) document.body.classList.add('native');

  const K = { ease: 0.085, wisp: 1 };          // scroll lerp
  let target = 0, cur = 0, vh = innerHeight, vw = innerWidth, maxScroll = 0, smoothMax = 0;

  // measure
  let P = [], INNER = [], REV = [], SECTIONS = {}, steps = null;
  function docTop(el){ return el.getBoundingClientRect().top + (native ? scrollY : cur); }
  function remeasure(){
    if (typeof forest !== 'undefined' && forest) forest.resize();
    vh = innerHeight; vw = innerWidth;
    document.querySelectorAll('[data-speed]').forEach(el => el.style.transform = '');
    document.querySelectorAll('[data-inner] > img').forEach(el => el.style.transform = '');
    if (!native) document.body.style.height = smooth.offsetHeight + 'px';
    maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
    P = [...document.querySelectorAll('[data-speed]')].map(el => {
      const r = el.getBoundingClientRect();
      return { el, top: r.top + cur, h: r.height, speed: parseFloat(el.dataset.speed) / 10, end: el.hasAttribute('data-end'), fade: el.classList.contains('h-copy') || el.classList.contains('strip') };
    });
    INNER = [...document.querySelectorAll('[data-inner]')].map(el => {
      const r = el.getBoundingClientRect(); return { img: el.querySelector('img'), top: r.top + cur, h: r.height };
    });
    REV = [...document.querySelectorAll('[data-r]')].filter(el => !el.classList.contains('in')).map(el => ({ el, top: docTop(el) }));
    ['hero', 'intro', 'dest', 'route', 'how', 'faq', 'foot'].forEach(id => {
      const el = document.getElementById(id); SECTIONS[id] = { top: docTop(el), h: el.offsetHeight };
    });
    const tr = document.getElementById('trail');
    steps = { top: docTop(tr), h: tr.offsetHeight, path: document.getElementById('trailDraw'), marks: [...tr.querySelectorAll('.tm')], items: [...tr.querySelectorAll('.step')] };
    if (!steps.len) { steps.len = steps.path.getTotalLength(); steps.path.style.strokeDasharray = steps.len; }
    placeWisps();
    if (!smoothMax) smoothMax = maxScroll;
    if (typeof applyScroll === 'function') applyScroll();      // apply at once so nothing flashes
  }

  // scroll
  function applyScroll(){
    if (!native){ const d = devicePixelRatio || 1; smooth.style.transform = `translate3d(0, ${-Math.round(cur * d) / d}px, 0)`; }   // whole device pixels, so section edges never blend
    if (reduce) return;
    const mid = cur + vh / 2;
    for (const p of P){
      if (p.top > cur + vh * 1.6 || p.top + p.h < cur - vh * 0.6) continue;
      let d = (mid - (p.top + p.h / 2));
      if (p.end) d = smoothMax - cur;
      if (p.el.hasAttribute('data-self') && p.el.closest('.hero')) d = Math.max(0, cur);
      p.el.style.transform = `translate3d(0, ${(-d * p.speed).toFixed(2)}px, 0)`;
      if (p.fade) p.el.style.opacity = Math.max(0, 1 - cur / (vh * 0.55)).toFixed(3);
      if (p.fade && p.el.classList.contains('strip') && hFrame) hFrame.style.opacity = (0.3 * Math.max(0, 1 - cur / (vh * 0.35))).toFixed(3);
    }
    for (const m of INNER){
      if (m.top > cur + vh || m.top + m.h < cur) continue;
      const pr = (cur + vh - m.top) / (vh + m.h);
      m.img.style.transform = `translate3d(0, ${((pr - 0.5) * m.h * -0.14).toFixed(2)}px, 0)`;
    }
    for (let i = REV.length - 1; i >= 0; i--){
      if (REV[i].top < cur + vh * 0.88){ REV[i].el.classList.add('in'); REV.splice(i, 1); }
    }
    if (steps){
      const pr = Math.min(1, Math.max(0, (cur + vh * 0.75 - steps.top) / (steps.h * 0.9)));
      steps.path.style.strokeDashoffset = (steps.len * (1 - pr)).toFixed(1);
      const at = [0.2, 0.43, 0.64, 0.86];
      at.forEach((a, i) => { const on = pr >= a; steps.marks[i].classList.toggle('on', on); steps.items[i].classList.toggle('on', on); });
    }
  }

  // canvases
  let back = null, wisps = null, forest = null;
  let plate = 'forest';
  const forestCanvas = document.getElementById('forest');
  document.body.classList.add('plate-forest');
  const PERF = {};
  function bootForest(){
    if (forest || plate !== 'forest') return;
    try { const t = performance.now(); forest = startForest(forestCanvas); forest.resize(); forest.setLook('gpt'); PERF.forestBuildMs = Math.round(performance.now() - t);
      if (reduce) forest.render(0, [0.5, 0.5], true);
      requestAnimationFrame(() => requestAnimationFrame(() => forestCanvas.classList.add('on'))); }
    catch (e) { console.warn('[simzii] forest plate unavailable, using the film', e); setPlate('film'); }
  }
  try { if (!window.THREE) throw new Error('three missing'); }
  catch (e) { console.warn('[simzii] forest plate unavailable, using the film', e); plate = 'film'; document.body.classList.remove('plate-forest'); }
  try {
    back = new Layer(document.getElementById('back'), 0.6, true);
    wisps = new Layer(document.getElementById('wisps'), 0.5, false);
  } catch (e) { console.warn('[simzii] WebGL2 unavailable, fog and wisps off', e); }

  const mkState = () => ({ time: reduce ? 40 : 12, scroll: 0, mouse: [-5, -5], mouseT: [-5, -5], mouseN: [0.5, 0.5], mouseNT: [0.5, 0.5], inside: false,
    trailA: [-9, -9], trailB: [-9, -9], splat: 0, decay: 1, trailStep: false, pal: PALETTE.dark });
  const stH = mkState(), stW = mkState();

  // mist joins: [upper section, lower section, palette]
  const JOINS = [
    { a: 'hero', b: 'intro', lit: [0.82, 0.85, 0.83], shade: [0.40, 0.46, 0.43], op: 0.5 },
    { a: 'dest', b: 'route', lit: [0.97, 0.96, 0.93], shade: [0.74, 0.76, 0.72], op: 0.85 },
    { a: 'route', b: 'how', lit: [0.96, 0.95, 0.92], shade: [0.66, 0.70, 0.66], op: 0.8 },
    { a: 'how', b: 'faq', lit: [0.97, 0.96, 0.93], shade: [0.74, 0.76, 0.72], op: 0.85 }
  ];
  function placeWisps(){
    if (!wisps) return;
    const r = rng(4242);
    wisps.setGroups(JOINS.map((j, gi) => {
      const anchor = SECTIONS[j.b].top;
      const items = [];
      for (let i = 0; i < 8; i++){
        const w = 0.7 + r() * 0.7;
        items.push([ (i + r() * 0.8) / 8, (r() - 0.5) * 0.3, w, w * (0.2 + r() * 0.08), r() * 10 + gi * 3, 0.5 + r() * 0.5 ]);
      }
      return { anchor, off: 0, soft: 0.9, cover: 0.42, opacity: j.op * K.wisp, baseOp: j.op, pal: { lit: j.lit, shade: j.shade, fog: [0, 0, 0], fogAmt: 0 }, items, y0: 0 };
    }));
  }
  function updateWisps(){
    if (!wisps) return;
    wisps.groups.forEach(g => {
      const y = (g.anchor - cur) / vh;   // viewport heights
      g.hidden = y < -0.6 || y > 1.6;
      g.y0 = y - (y - 0.5) * 0.04;
    });
  }

  function setMouse(st, x, y, w, h){
    const nx = x / w, ny = y / h, tx = nx * (w / h);
    if (!st.inside){ st.mouse = [tx, ny]; st.mouseT = [tx, ny]; st.inside = true; }
    st.mouseT = [tx, ny]; st.mouseNT = [nx, ny];
  }
  addEventListener('pointermove', e => {
    if (reduce) return;
    setMouse(stW, e.clientX, e.clientY, vw, vh);
    const r = hero.getBoundingClientRect();
    if (e.clientY >= r.top && e.clientY <= r.bottom) setMouse(stH, e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    else { stH.inside = false; stH.mouseNT = [0.5, 0.5]; }
  }, { passive: true });
  document.addEventListener('pointerleave', () => { stW.inside = stH.inside = false; });

  function stepState(st, dt){
    if (!reduce) st.time += dt;
    const k = 1 - Math.pow(0.001, dt);
    const prevM = st.mouse.slice();
    st.mouse = [lerp(st.mouse[0], st.mouseT[0], k * 0.7), lerp(st.mouse[1], st.mouseT[1], k * 0.7)];
    st.mouseN = [lerp(st.mouseN[0], st.mouseNT[0], k * 0.5), lerp(st.mouseN[1], st.mouseNT[1], k * 0.5)];
    const speed = dt > 0 ? Math.hypot(st.mouse[0] - prevM[0], st.mouse[1] - prevM[1]) / dt : 0;
    st.trailA = prevM; st.trailB = st.mouse;
    st.splat = st.inside && !reduce ? Math.min(0.25, speed * 0.12) * Math.min(dt * 60, 2) : 0;
    st.decay = Math.pow(0.18, dt);
    st.trailStep = !reduce;
  }

  // hero fog layout
  function layoutHero(){
    if (!back) return;
    const f = plate === 'forest'; S.count = f ? 20 : 30; S.cover = f ? 0.46 : 0.56;
    const r = rng(S.seed * 9973 + S.count), pal = PALETTE.dark;
    back.setGroups(BANDS.map((b, i) => ({ ...b, pal: pal.bands[i], items: makeItems(b, Math.round(S.count * b.share), r) })));
    back.setBirds(flockItems());
  }

  // film plays only while the hero is in view
  const film = document.getElementById('film');
  let heroVisible = true;
  function filmState(){
    if (!film) return;
    if (reduce || !heroVisible || plate !== 'film'){ if (!film.paused){ film.pause(); } if (!heroVisible) film.currentTime = 0; return; }
    if (!film.src) { film.src = film.dataset.src; film.load(); }
    if (film.paused) film.play().catch(() => {});
  }
  if (film){ film.addEventListener('playing', () => film.classList.add('on')); }

  // loop
  let last = performance.now(), frames = 0;
  function frame(now){
    const dt = Math.min((now - last) / 1000, 0.05); last = now; frames++;
    target = native ? scrollY : Math.min(scrollY, maxScroll);
    smoothMax = Math.abs(maxScroll - smoothMax) < 0.05 ? maxScroll : lerp(smoothMax, maxScroll, native ? 1 : 1 - Math.pow(1 - K.ease, dt * 60));
    const k = native ? 1 : 1 - Math.pow(1 - K.ease, dt * 60);
    cur = Math.abs(target - cur) < 0.05 ? target : lerp(cur, target, k);
    applyScroll();
    const hv = cur < SECTIONS.hero.top + SECTIONS.hero.h;
    if (hv !== heroVisible){ heroVisible = hv; filmState(); }
    if (forest && plate === 'forest' && heroVisible){ forest.render(dt, stH.mouseN, reduce); }
    if (back && heroVisible){
      stepState(stH, dt); stH.scroll = 0;
      stH.flock = S.birds ? flockAt(reduce ? 6 : stH.time, back.canvas.width / back.canvas.height) : null;
      back.resize(); back.draw(stH);
    }
    if (wisps){
      stepState(stW, dt); updateWisps();
      wisps.groups.forEach(g => g.opacity = g.baseOp * K.wisp);
      const anyW = wisps.groups.some(g => !g.hidden);
      if (anyW || wisps.dirty){ wisps.resize(); wisps.draw(stW); wisps.dirty = anyW; }
    }
    if (!reduce) requestAnimationFrame(frame);
  }

  // anchors, carousel, accordion
  // page rides a fixed layer, so hash links resolve against measured sections
  function goTo(id, behaviour){ if (!SECTIONS[id]) return false; scrollTo({ top: SECTIONS[id].top, behavior: behaviour || (native ? 'smooth' : 'instant') }); return true; }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]'); if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname && !/\/(index\.html)?$/.test(url.pathname)) return;
    if (goTo(url.hash.slice(1))){ e.preventDefault(); const hd = document.getElementById('site-header'); if (hd && hd.classList.contains('site-header--menu-open')) hd.querySelector('.menu-toggle').click(); }
  });

  const track = document.getElementById('track'), count = document.getElementById('count');
  let idx = 0, busy = false; const N = track.children.length;
  const CE = 'cubic-bezier(.77,0,.18,1)', CD = 1000, STAG = 70;
  function rollCount(dir){
    const txt = String(idx + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
    if (reduce || !dir || !count.animate){ count.textContent = txt; return; }
    count.animate([{ transform: 'none', opacity: 1 }, { transform: `translateY(${-dir * 12}px)`, opacity: 0 }], { duration: 260, easing: 'ease-in' }).onfinish = () => {
      count.textContent = txt; count.animate([{ transform: `translateY(${dir * 12}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' });
    };
  }
  function slide(dir){
    if (busy) return; busy = true;
    const cards = [...track.children], gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = cards[0].getBoundingClientRect().width + gap;
    idx = (idx + dir + N) % N; rollCount(dir);
    const leaving = dir > 0 ? cards[0] : cards[N - 1];
    const arriving = leaving.cloneNode(true); arriving.classList.add('in');
    const aMedia = arriving.querySelector('.media'), aImg = arriving.querySelector('img'), lMedia = leaving.querySelector('.media');
    aMedia.style.clipPath = dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
    aImg.style.transform = 'scale(1.25)'; aImg.style.transition = 'none';
    arriving.querySelectorAll('h3, .meta').forEach(e => { e.style.opacity = 0; e.style.transform = 'translateY(16px)'; });
    if (dir > 0) track.appendChild(arriving); else track.insertBefore(arriving, track.firstChild);
    const all = [...track.children];
    if (dir < 0) all.forEach(c => { c.style.transition = 'none'; c.style.transform = `translateX(${-step}px)`; });
    track.offsetWidth;
    const order = dir > 0 ? all : all.slice().reverse();
    order.forEach((c, i) => { c.style.transition = `transform ${CD}ms ${CE} ${i * STAG}ms`; c.style.transform = dir > 0 ? `translateX(${-step}px)` : 'translateX(0)'; });
    lMedia.style.transition = `clip-path ${CD * .8}ms ${CE}`; lMedia.style.clipPath = dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
    leaving.querySelectorAll('h3, .meta').forEach(e => { e.style.transition = 'opacity .4s, transform .6s ' + CE; e.style.opacity = 0; e.style.transform = 'translateY(-10px)'; });
    const t0 = (N * STAG) + 120;
    aMedia.style.transition = `clip-path ${CD}ms ${CE} ${t0}ms`; aMedia.style.clipPath = 'inset(0 0 0 0)';
    aImg.style.transition = `transform 1.6s cubic-bezier(.16,1,.3,1) ${t0}ms`; aImg.style.transform = 'scale(1)';
    arriving.querySelectorAll('h3, .meta').forEach((e, i) => { e.style.transition = `opacity .8s ease ${t0 + 300 + i * 90}ms, transform 1s cubic-bezier(.16,1,.3,1) ${t0 + 300 + i * 90}ms`; e.style.opacity = 1; e.style.transform = 'none'; });
    setTimeout(() => {
      leaving.remove();
      [...track.children].forEach(c => { c.style.transition = 'none'; c.style.transform = ''; c.querySelectorAll('.media, img, h3, .meta').forEach(e => { e.style.transition = ''; e.style.clipPath = ''; e.style.opacity = ''; e.style.transform = ''; }); });
      busy = false; remeasure();
    }, t0 + CD + 700);
  }
  document.getElementById('next').addEventListener('click', () => slide(1));
  document.getElementById('prev').addEventListener('click', () => slide(-1));

  document.querySelectorAll('.qa > button').forEach(b => b.addEventListener('click', () => {
    const q = b.parentElement, open = q.classList.contains('open');
    document.querySelectorAll('.qa').forEach(x => x.classList.remove('open'));
    if (!open) q.classList.add('open');

  }));

  // tuning panel and console
  const panel = document.getElementById('panel');
  const bind = (id, get, set) => { const el = document.getElementById(id), v = document.getElementById('v-' + id);
    const show = () => { el.value = get(); v.textContent = (+get()).toFixed(3).replace(/0+$/, '').replace(/\.$/, ''); };
    el.addEventListener('input', () => { set(parseFloat(el.value)); show(); }); show(); };
  bind('ease', () => K.ease, x => K.ease = x);
  bind('ov', () => S.ov, x => { S.ov = x; document.documentElement.style.setProperty('--ov', x); });
  bind('wisp', () => K.wisp, x => K.wisp = x);
  const plateSel = document.getElementById('plate'); plateSel.value = plate;
  function setPlate(p){ plate = p; if (p === 'forest') bootForest(); if (p === 'forest' && !forest) plate = p = 'film'; layoutHero(); S.ov = p === 'forest' ? 0.8 : 0.42; document.documentElement.style.setProperty('--ov', S.ov); plateSel.value = p; document.body.classList.toggle('plate-forest', p === 'forest'); if (p === 'forest' && forest) forest.resize(); filmState(); }
  plateSel.addEventListener('change', () => setPlate(plateSel.value));
  addEventListener('keydown', e => { if ((e.key === 'h' || e.key === 'H') && !e.metaKey && !e.ctrlKey) panel.classList.toggle('show'); });

  window.simzii = {
    version: () => VERSION,
    perf: () => ({ ...PERF }),
    state: () => ({ version: VERSION, plate, scroll: Math.round(cur), target: Math.round(target), max: Math.round(maxScroll), native, reduce, currency: Store.currency(),
      film: film ? { paused: film.paused, t: +film.currentTime.toFixed(2), src: film.currentSrc.split('/').pop() } : null, frames,
      wisps: wisps ? wisps.groups.map(g => ({ y: +g.y0.toFixed(2), hidden: !!g.hidden })) : null }),
    tune: o => { Object.assign(K, o); return { ...K }; },
    remeasure: () => { remeasure(); return 'ok'; },
    currency: c => Store.setCurrency(c),
    plate: setPlate,
    look: n => { if (!forest) return; const L = forest.setLook(n); S.ov = L.ov; document.documentElement.style.setProperty('--ov', L.ov); return n; }
  };

  // boot
  if (plate === 'forest') S.ov = 0.8;
  document.documentElement.style.setProperty('--ov', S.ov);
  layoutHero();
  const boot = () => {
    remeasure();
    rollCount(0);
    if (location.hash) goTo(location.hash.slice(1), 'instant');
    filmState();
    requestAnimationFrame(t => { last = t; frame(t); });
    requestAnimationFrame(() => requestAnimationFrame(() => { document.body.classList.add('ready'); PERF.readyMs = Math.round(performance.now());
      (window.requestIdleCallback || (f => setTimeout(f, 120)))(() => { bootForest(); }, { timeout: 600 }); }));
    if (reduce){ document.querySelectorAll('[data-r]').forEach(el => el.classList.add('in')); if (steps){ steps.path.style.strokeDashoffset = 0; steps.marks.concat(steps.items).forEach(e => e.classList.add('on')); } }
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(boot);
  addEventListener('resize', () => { if (forest) forest.resize(); remeasure(); if (reduce) requestAnimationFrame(frame); });
  addEventListener('load', remeasure);
  let settle;
  new ResizeObserver(() => {
    if (!native) document.body.style.height = smooth.offsetHeight + 'px';
    maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
    clearTimeout(settle); settle = setTimeout(remeasure, 120);
  }).observe(smooth);
  document.addEventListener('visibilitychange', () => { if (document.hidden && film) film.pause(); else filmState(); });
  console.log('[simzii] home ' + VERSION + ' ready. simzii.state(), simzii.tune({ease}), simzii.remeasure(). H toggles the tuning panel.');
})();
