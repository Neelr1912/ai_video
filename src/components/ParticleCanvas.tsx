import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  type: 'ember' | 'petal' | 'gold';
  rotation: number;
  rotSpeed: number;
}

interface ParticleCanvasProps {
  embers?: boolean;
  petals?: boolean;
  gold?: boolean;
  density?: number;
  direction?: 'up' | 'down' | 'float';
}

export default function ParticleCanvas({ 
  embers = false, 
  petals = false, 
  gold = false,
  density = 1,
  direction = 'float'
}: ParticleCanvasProps) {
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

    let particles: Particle[] = [];
    
    const createParticle = (type: 'ember' | 'petal' | 'gold'): Particle => {
      const sizeBase = type === 'petal' ? 8 : type === 'ember' ? 2 : 1.5;
      return {
        x: Math.random() * width,
        y: direction === 'up' ? height + 20 : direction === 'down' ? -20 : Math.random() * height,
        size: Math.random() * sizeBase + (sizeBase * 0.5),
        speedX: (Math.random() - 0.5) * 2,
        speedY: direction === 'up' ? -(Math.random() * 2 + 1) : direction === 'down' ? (Math.random() * 2 + 1) : (Math.random() - 0.5) * 1,
        life: 0,
        maxLife: Math.random() * 200 + 100,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1
      };
    };

    const targetParticles = 100 * density;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const currentTypes: ('ember' | 'petal' | 'gold')[] = [];
      if (embers) currentTypes.push('ember');
      if (petals) currentTypes.push('petal');
      if (gold) currentTypes.push('gold');

      if (currentTypes.length > 0 && particles.length < targetParticles) {
        if (Math.random() > 0.5) {
           particles.push(createParticle(currentTypes[Math.floor(Math.random() * currentTypes.length)]));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (direction === 'float') {
          p.x += Math.sin(p.life * 0.05) * 0.5;
        } else if (direction === 'down') {
           p.x += Math.sin(p.life * 0.02) * 1; // wind
        }

        const opacity = Math.max(0, 1 - (p.life / p.maxLife));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'ember') {
          ctx.fillStyle = `rgba(255, 100, 0, ${opacity})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 100, 0, 1)';
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'gold') {
          ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(255, 215, 0, 1)';
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'petal') {
          ctx.fillStyle = `rgba(255, 165, 0, ${opacity * 0.8})`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(255, 69, 0, 0.5)';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (p.life >= p.maxLife || p.y < -50 || p.y > height + 50) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [embers, petals, gold, density, direction]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-20"
    />
  );
}
