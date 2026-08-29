/**
 * Builds a horizontally-repeating sine-like wave path, drawn twice back to
 * back (spanning 2x the visible width). Animating a translateX by exactly
 * one visible-width unit therefore loops seamlessly, regardless of the
 * chosen period — the two copies are pixel-identical.
 */
export function buildRepeatingWavePath(
  visibleWidth: number,
  totalHeight: number,
  baseline: number,
  amplitude: number,
  period: number,
): string {
  const totalWidth = visibleWidth * 2;
  const segments = Math.ceil(totalWidth / period);
  let d = `M0 ${baseline}`;
  for (let i = 0; i < segments; i++) {
    const x0 = i * period;
    const xMid = x0 + period / 2;
    const xEnd = x0 + period;
    const top = baseline - amplitude;
    const bottom = baseline + amplitude;
    d += ` C${x0 + period * 0.25} ${top}, ${x0 + period * 0.25} ${top}, ${xMid} ${baseline}`;
    d += ` C${xMid + period * 0.25} ${bottom}, ${xMid + period * 0.25} ${bottom}, ${xEnd} ${baseline}`;
  }
  d += ` L${totalWidth} ${totalHeight} L0 ${totalHeight} Z`;
  return d;
}
