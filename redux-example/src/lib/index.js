const Iso = (to, from) => ({ to, from })

export const Celsius = Iso(f => ((f - 32) * 5) / 9, c => (c * 9) / 5 + 32)
