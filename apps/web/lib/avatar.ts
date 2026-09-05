const GRADIENTS = [
  ["#187e75", "#0b3f3b"],
  ["#1968f0", "#0d2c66"],
  ["#166560", "#062725"],
  ["#2f87fb", "#16407a"],
  ["#249e92", "#0f4f49"],
  ["#1554dd", "#0d2a5e"],
];

export function initialsOf(name: string) {
  const cleaned = name.replace(/^Dr\.?\s*/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function gradientFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}
