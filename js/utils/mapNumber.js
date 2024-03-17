let mapNumber = (input, inMin, inMax, outMin, outMax) => {
  return (outMin + ((outMax - outMin) * ((input - inMin) / (inMax - inMin))));
};

let clamp = (input, min, max) => Math.min(Math.max(input, min), max);
export { mapNumber, clamp };
