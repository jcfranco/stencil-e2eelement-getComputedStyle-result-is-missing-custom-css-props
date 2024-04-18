# stencil-e2eelement-getComputedStyle-result-is-missing-custom-css-props

This is a repro case showing custom CSS props that are inherited from light DOM are not accessible via `getComputedStyle` + `getPropertyValue` in a shadow DOM `E2EElement`.

## Steps to reproduce

1. Clone this repo
2. `npm install`
3. `npm test`

Notice how the test using `E2EElement` APIs fails. The workaround test passes.

## Additional info

There is a way to workaround this (see `getComputedStylePropertyValue` in the workaround test) , but relies on accessing internal properties of the `E2EElement` instance. A built-in way to do this would be preferred and not prone to breaking in a future Stencil release.