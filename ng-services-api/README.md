
### Note
In AngularJS 1.3+ ther is a breaking change that is not described in the MEAN machine. To fix it, add a config

```js
angular.module('appName', ['optionalParam'])
	.config(
		['controllerProvider', function($controllerProvider) {
			$controllerProvider.allowGlobals();
		}],
		function(...) { ... }
	);
```
