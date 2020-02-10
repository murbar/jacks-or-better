import confetti from 'canvas-confetti';
import config from 'config';

export default function fireworks() {
  if (config.env === 'test') return;

  const end = Date.now() + 5000;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      shapes: ['square'],
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2
      }
    });
  }, 200);
}
