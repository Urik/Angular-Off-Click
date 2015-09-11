# Angular-Off-Click
An AngularJS directive to detect clicks outside of an element.

#Installation
Simply include the development version or the minified version, and add the "offClick" dependency to the modules you're going to use the directive in.

#Usage
Used in order to detect clicks oustide an element and execute a callback. The usage goes as:
```html
<div off-click="hideMenu()">
```
where hideMenu() is a javascript expression to be executed in the scope the directive is associated with. hideMenu() will be executed if a click is done outside the div element.
There are opportunities on which we don't want to execute the callback when a click is done on elements other than the one the directive is associated with. For these cases, we can group these elements using the "data-off-click-group" attribute. If we have:
```html
<div off-click="hideMenu()" data-off-click-group="header"> ... </div>
<button id="menu-trigger" data-off-click-group="header"></button>
```
Then uppon a click at the button, hideMenu() won't be executed because the directive and the buttons are linked together by the data-off-click-group attribute.
