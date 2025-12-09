"use client";

import { useEffect } from "react";

export default function MatrixBackground() {
  useEffect(() => {
    const canvas = document.getElementById("matrix");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    const fontSize = 14;
    const binary = "01";
    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22c55e";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (
          drops[i] * fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 40);

    function handleResize() {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}
