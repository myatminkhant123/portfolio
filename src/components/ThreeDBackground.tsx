import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  isBright: boolean;
}

export const ThreeDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let t = 0;

    // Mouse parallax
    let mouseX = 0;
    let targetParallaxX = 0;
    let parallaxX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - W / 2) / (W / 2);
      targetParallaxX = mouseX * 25;
    };

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // ── Monochrome Stars ──────────────────────────────────────────
    const NUM_STARS = 200;
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.54,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.75 + 0.25,
      speed: Math.random() * 0.02 + 0.005,
      isBright: Math.random() > 0.85,
    }));

    // Grid config
    const HORIZON_Y_RATIO = 0.55;
    const GRID_LINES_H = 18;
    const GRID_LINES_V = 26;
    const SCROLL_SPEED = 0.65;
    let scrollOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      t++;
      scrollOffset = (scrollOffset + SCROLL_SPEED) % (H * 0.45 / GRID_LINES_H);
      parallaxX += (targetParallaxX - parallaxX) * 0.05;

      const horizonY = H * HORIZON_Y_RATIO;
      const vpX = W / 2 + parallaxX;

      // ── 1. Sky Gradient (Deep Obsidian Black to Titanium Night) ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0.0, '#000000');
      skyGrad.addColorStop(0.65, '#050508');
      skyGrad.addColorStop(1.0, '#121217');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, horizonY);

      // ── 2. Ground Gradient (Titanium Void) ────────────────────────
      const groundGrad = ctx.createLinearGradient(0, horizonY, 0, H);
      groundGrad.addColorStop(0.0, '#121217');
      groundGrad.addColorStop(0.35, '#060608');
      groundGrad.addColorStop(1.0, '#000000');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, horizonY, W, H - horizonY);

      // ── 3. Monochrome Stars ──────────────────────────────────────
      stars.forEach((s) => {
        const twinkle = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.speed + s.x));
        ctx.globalAlpha = s.opacity * twinkle;
        ctx.fillStyle = s.isBright ? '#ffffff' : '#d4d4d8';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * twinkle, 0, Math.PI * 2);
        ctx.fill();

        // Cross sparkle on brightest stars
        if (s.isBright && twinkle > 0.88) {
          ctx.globalAlpha = 0.4;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.6;
          const len = s.r * 2.8;
          ctx.beginPath();
          ctx.moveTo(s.x - len, s.y); ctx.lineTo(s.x + len, s.y);
          ctx.moveTo(s.x, s.y - len); ctx.lineTo(s.x, s.y + len);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;

      // ── 4. Glowing Monochrome Celestial Orb at Horizon ───────────
      const sunR = Math.min(W, H) * 0.16;

      // Outer ethereal white halo
      const haloGrad = ctx.createRadialGradient(vpX, horizonY, sunR * 0.4, vpX, horizonY, sunR * 2.2);
      haloGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.22)');
      haloGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.08)');
      haloGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(vpX, horizonY, sunR * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Sun disc — clipped to sky area
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, horizonY);
      ctx.clip();

      const sunGrad = ctx.createLinearGradient(vpX, horizonY - sunR, vpX, horizonY);
      sunGrad.addColorStop(0.00, '#ffffff');
      sunGrad.addColorStop(0.40, '#e4e4e7');
      sunGrad.addColorStop(0.75, '#a1a1aa');
      sunGrad.addColorStop(1.00, '#3f3f46');

      ctx.beginPath();
      ctx.arc(vpX, horizonY, sunR, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Precision horizontal laser cuts through the orb
      const stripeCount = 7;
      ctx.fillStyle = '#050508';
      for (let i = 0; i < stripeCount; i++) {
        const frac = (i + 1) / (stripeCount + 1);
        const eased = Math.pow(frac, 1.5);
        const stripeY = (horizonY - sunR) + eased * sunR * 1.95;
        const thickness = Math.max(1.5, (1 - frac) * 6);
        ctx.fillRect(vpX - sunR - 4, stripeY, (sunR + 4) * 2, thickness);
      }
      ctx.restore();

      // ── 5. Monochrome Perspective Grid (White & Titanium lines) ──
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizonY, W, H - horizonY);
      ctx.clip();

      // Horizontal grid lines scrolling toward the viewer
      for (let i = 0; i <= GRID_LINES_H; i++) {
        const rawFrac = (i + scrollOffset / (H * 0.45 / GRID_LINES_H)) / GRID_LINES_H;
        const perspFrac = Math.pow(rawFrac, 2.4);
        const lineY = horizonY + perspFrac * (H - horizonY);

        if (lineY < horizonY || lineY > H) continue;

        const alpha = Math.pow(perspFrac, 0.45) * 0.45;
        const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
        lineGrad.addColorStop(0.00, 'rgba(255, 255, 255, 0)');
        lineGrad.addColorStop(0.20, `rgba(255, 255, 255, ${alpha * 0.5})`);
        lineGrad.addColorStop(0.50, `rgba(255, 255, 255, ${alpha})`);
        lineGrad.addColorStop(0.80, `rgba(255, 255, 255, ${alpha * 0.5})`);
        lineGrad.addColorStop(1.00, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(W, lineY);
        ctx.stroke();
      }

      // Vertical convergence lines radiating from horizon center
      for (let i = 0; i <= GRID_LINES_V; i++) {
        const frac = i / GRID_LINES_V;
        const groundX = vpX + (frac - 0.5) * 2 * (W * 0.55);

        const edgeFade = 1 - Math.abs(frac - 0.5) * 1.5;
        if (edgeFade <= 0) continue;
        const alpha = 0.35 * edgeFade;

        const lineGrad2 = ctx.createLinearGradient(vpX, horizonY, groundX, H);
        lineGrad2.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
        lineGrad2.addColorStop(0.3, `rgba(255, 255, 255, ${alpha * 0.6})`);
        lineGrad2.addColorStop(1.0, `rgba(255, 255, 255, ${alpha})`);

        ctx.strokeStyle = lineGrad2;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(groundX, H);
        ctx.stroke();
      }

      // Horizon Laser Beam
      const laserGrad = ctx.createLinearGradient(0, 0, W, 0);
      laserGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
      laserGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
      laserGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
      laserGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');
      laserGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      ctx.strokeStyle = laserGrad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(W, horizonY);
      ctx.stroke();

      ctx.restore();

      // ── 6. Soft Horizon Fog ──────────────────────────────────────
      const fogGrad = ctx.createLinearGradient(0, horizonY - 45, 0, horizonY + 45);
      fogGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
      fogGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      fogGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, horizonY - 45, W, 90);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
