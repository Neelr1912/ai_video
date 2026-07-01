import { useEffect, useRef } from 'react';

interface RainCanvasProps {
  intensity?: number; // 0 to 1
  lightning?: boolean;
}

export default function RainCanvas({ intensity = 1, lightning = false }: RainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const drops: { x: number, y: number, len: number, speed: number }[] = [];
    const maxDrops = 1000 * intensity;

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        len: Math.random() * 20 + 10,
        speed: Math.random() * 15 + 15
      });
    }

    let lightningFlash = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Lightning
      if (lightning && Math.random() > 0.98) {
        lightningFlash = 1;
      }
      if (lightningFlash > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${lightningFlash * 0.3})`;
        ctx.fillRect(0, 0, width, height);
        lightningFlash -= 0.1;
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.2, d.y + d.len);
        d.y += d.speed;
        d.x += d.speed * 0.2; // wind
        
        if (d.y > height) {
          d.y = -20;
          d.x = Math.random() * width;
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, lightning]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
