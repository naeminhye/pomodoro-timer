import { useEffect, useRef } from "react";
interface Particle {
    x: number
    y: number
    color: string
    radius: number
    alpha: number
    angle: number
    speed: number
    gravity: number
    fade: number
}

const FireworksCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        const particles: Particle[] = [];

        const colors = ["#ff4d4d", "#ffd93d", "#4d96ff", "#9d4edd", "#00f5d4", "#ff8fab"];

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const createFirework = () => {
            const x = random(100, w - 100);
            const y = random(h / 4, h / 2);
            const color = colors[Math.floor(Math.random() * colors.length)];

            for (let i = 0; i < 50; i++) {
                particles.push({
                    x,
                    y,
                    color,
                    radius: random(1, 3),
                    alpha: 1,
                    angle: random(0, 2 * Math.PI),
                    speed: random(1, 6),
                    gravity: 0.05,
                    fade: random(0.01, 0.03),
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed + p.gravity;
                p.alpha -= p.fade;
                p.speed *= 0.98;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
                ctx.fill();
            }

            requestAnimationFrame(draw);
        };

        const hexToRgb = (hex: string) => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `${r},${g},${b}`;
        };

        const interval = setInterval(createFirework, 300);
        draw();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ background: "transparent" }}
        />
    );
};

export default FireworksCanvas;
