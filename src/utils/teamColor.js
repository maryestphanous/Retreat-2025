// Generate a deterministic HSL color from any string (team id or name)
// Works for hundreds of teams without visible repeats.
export default function teamColor(seed) {
    // 1) Hash the string to an integer
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // 2) Map hash to a hue (0‑359)
    const hue = Math.abs(hash) % 360;
  
    // 3) Return full‑brightness, medium‑saturation color
    return `hsl(${hue} 70% 50%)`;        // e.g. "hsl(212 70% 50%)"
  }
  