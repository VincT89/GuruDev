export function debounce(fn, delay = 300) {
  // Initialize a timer variable to keep track of the timeout
  let timer;
  // Return a new function that will be debounced
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
