/**
 *  HTZ RAF WRAPPERS
 *
 * `requestAnimationFrame`-based replacements for `setTimeout` and `setInterval`
 *
 * @module htz-rAF-wrappers
 * @license MIT
 */


/**
 * A `requestAnimationFrame`-based replacement for `setInterval`, for better performance
 * @param {Function} fn - The callback function to execute.
 * @param {Integer} delay The delay in milliseconds
 * @param {Arglist} [args] - arguments to be passed to the callback function
 *
 * @return {Integer|Object} The id used to cancel the interval.
 */
function requestInterval(fn, delay, ...args) {
  function cb() {
    return args ? fn.apply(this, args) : fn();
  }

  if (!window.requestAnimationFrame) return window.setInterval(cb, delay);

  let start = new Date().getTime();
  const handle = {};

  function loop() {
    handle.value = requestAnimationFrame(loop);

    const current = new Date().getTime();
    const delta = current - start;

    if (delta >= delay) {
      cb();
      start = new Date().getTime();
    }
  }

  handle.value = requestAnimationFrame(loop);

  return handle;
}


/**
 * Cancels a requestInterval
 * @param {Integer|Object} handle - The returned value of `requestInterval`
 */
function clearRequestInterval(handle) {
  cancelAnimationFrame ?
    cancelAnimationFrame(handle.value) :
    clearInterval(handle);
}


/**
 * A `requestAnimationFrame`-based replacement for `setTimeout`, for better performance
 * @param {Function} fn - The callback function to execute.
 * @param {Integer} delay The delay in milliseconds
 * @param {Array} [args] - arguments to be passed to the callback function
 *
 * @return {Integer|Object} The id used to cancel the timeout.
 */
function requestTimeout(fn, delay, ...args) {
  function cb() {
    return args ? fn.apply(this, args) : fn();
  }

  if (!window.requestAnimationFrame) return window.setTimeout(cb, delay);

  const start = new Date().getTime();
  const handle = {};

  function loop() {
    const current = new Date().getTime();
    const delta = current - start;

    delta >= delay ? cb() : handle.value = requestAnimationFrame(loop);
  }

  handle.value = requestAnimationFrame(loop);

  return handle;
}

/**
 * Cancels a requestTimeout
 * @param {Integer|Object} handle - The returned value of `requestTimeout`
 */
function clearRequestTimeout(handle) {
  cancelAnimationFrame ?
    cancelAnimationFrame(handle.value) :
    clearTimeout(handle);
}

export { requestInterval, requestTimeout, clearRequestInterval, clearRequestTimeout };
