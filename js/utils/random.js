/* Returns arbitrary random number */
let getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

/* Returns arbitrary random integer */
let getRandomArbitraryInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  /* The maximum is exclusive and the minimum is inclusive */
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export { getRandomArbitrary, getRandomArbitraryInt };
