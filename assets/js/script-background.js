const CONFIGS = [
  { colorB: [0, 255, 180] },   // verde água
  { colorB: [0, 255, 100] },   // verde neon para partículas do segundo canvas
  { colorB: [0, 180, 255] }    // azul-esverdeado
];

const BASE_CONFIG = {
  particleCount: 100,
  baseSize: 4,
  sizeVariance: 6,
  speed: 0.25,
  glowIntensity: 25,
  colorA: [220, 255, 220],
  colorShiftSpeed: 0.8,
  twinkle: true,
};

class Particle {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
    this.reset(true);
  }

  reset(init = false) {
    const { canvas, config } = this;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    const angle = Math.random() * Math.PI * 2;
    const speed = (0.2 + Math.random() * 1.2) * config.speed * 1.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed * 0.5;
    this.size = Math.max(1, config.baseSize + (Math.random() - 0.5) * config.sizeVariance);
    this.life = init ? Math.random() * 200 : 200 + Math.random() * 200;
    this.maxLife = this.life;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.colorPhase = Math.random();
  }

  update(dt) {
    const { canvas } = this;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.y += Math.sin((Date.now() / 1000 + this.x * 0.001)) * 0.05;

    if (this.x < -50) this.x = canvas.width + 50;
    if (this.x > canvas.width + 50) this.x = -50;
    if (this.y < -50) this.y = canvas.height + 50;
    if (this.y > canvas.height + 50) this.y = -50;

    this.life -= dt * 0.06;
    if (this.life <= 0) this.reset();
  }

  draw(ctx, t) {
    const { config } = this;
    const lt = Math.max(0, Math.min(1, this.life / this.maxLife));

    let tw = 1;
    if (config.twinkle) {
      tw = 0.7 + 0.3 * Math.abs(Math.sin(this.twinklePhase + (t * 0.002)));
    }

    const ct = Math.sin(t * 0.001 * config.colorShiftSpeed + this.colorPhase * Math.PI * 2) * 0.5 + 0.5;
    const col = [
      Math.round(config.colorA[0] + (config.colorB[0] - config.colorA[0]) * ct),
      Math.round(config.colorA[1] + (config.colorB[1] - config.colorA[1]) * ct),
      Math.round(config.colorA[2] + (config.colorB[2] - config.colorA[2]) * ct),
    ];

    const alpha = lt * 0.8 * tw;
    const size = this.size * (1 + (1 - lt) * 0.2);

    ctx.beginPath();
    ctx.shadowBlur = config.glowIntensity * (size / 10);
    ctx.shadowColor = `rgba(${col[0]},${col[1]},${col[2]},${alpha * 1.4})`;
    ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;

    ctx.ellipse(this.x, this.y, size, size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initCanvasAnimation(canvas, configIndex) {
  const ctx = canvas.getContext("2d");
  const config = { ...BASE_CONFIG, ...CONFIGS[configIndex] };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle(canvas, config));
  }

  let last = performance.now();
  function frame(now) {
    const dt = now - last;
    last = now;

    // fundo verde-ciano escuro apenas no segundo canvas (índice 1)
    if (configIndex === 1) {
      ctx.fillStyle = "#008E80"; // verde-ciano escuro
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // overlay ciano suave para glow
      ctx.fillStyle = "rgba(0,200,180,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.25)"; // fundo escuro para outros canvas
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    for (const p of particles) {
      p.update(dt);
      p.draw(ctx, now);
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.querySelectorAll("canvas.parallax-back").forEach((canvas, i) => {
  initCanvasAnimation(canvas, i);
});
