# htz rAF wrappers

requestAnimationFrame-based replacements for setTimeout and setInterval

### Installation
```bash
jspm install github:haaretz/htz-rAF-wrappers
```

### Usage

Import the wrappers
```js
import { 
  requestInterval, 
  requestTimeout, 
  clearRequestInterval, 
  clearRequestTimeout 
} from 'htz-rAF-wrappers'
```

And use them just as you'd use `setTimeout`, `setInterval`, `clearTimeout` and `clearInterval`,
including the ability to pass arguments to the callback:

```j
function add(a, b) { return a + b; }

requestTimeout(add, 1000, 2, 3); // -> Returns 5 after one second
```
