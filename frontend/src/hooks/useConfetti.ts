import confetti from "canvas-confetti";

export const fireConfetti = () =>
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.7 },
    zIndex: 9999,
  }); 