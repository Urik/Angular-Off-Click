(function() {
    /**
    * Used in order to detect clicks outside an element and execute a callback. The usage goes as:
    * <div off-click="hideMenu()">, where hideMenu() is a javascript expression to be executed in the scope the directive
    * is associated with.
    * hideMenu() will be executed if a click is done outside the div element.
    * There are opportunities on which we don't want to execute the callback when a click is done on elements
    * other than the one the directive is associated with. For these cases, we can group these elements using
    * the "data-off-click-group" attribute. If we have:
    * <div off-click="hideMenu()" data-off-click-group="header"> ... </div>
    * <button id="menu-trigger" data-off-click-group="header"></button>
    * Then uppon a click at the button, hideMenu() won't be executed because the directive and the buttons
    * are linked together by the data-off-click-group attribute.
    */
    'use strict';

    function createUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    
    Directive.$inject = ['$document'];
    function Directive($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var offClickAction = attrs.offClick;
                var offClickGroup = attrs.offClickGroup || createUuid();
                element.attr('data-off-click-group', offClickGroup);

                var elementClickHandler = function(event) {
                    //Used in order to identify on the document level click handler if the click event was originated by
                    //an element associated with this directive and click group.
                    event.originalEvent.offClickGroup = offClickGroup;
                    return true;
                };
                var documentClickHandler = function(event) {
                    if (!event.originalEvent.offClickGroup || event.originalEvent.offClickGroup !== offClickGroup) {
                        scope.$apply(offClickAction);
                    }
                    return true;
                };

                var elementsSelector = '[data-off-click-group="{group}"]'.replace('{group}', offClickGroup);
                angular.element(elementsSelector).on('click', elementClickHandler);
                $document.on('click', documentClickHandler);

                //We gotta destroy the click event when the scope is destroyed in order to stop firing the directive's callback after the user changes its state.
                scope.$on('$destroy', function() {
                    $document.off('click', documentClickHandler);
                    angular.element(elementsSelector).off('click', elementClickHandler);
                });
            }
        };
    }

    angular
        .module('offClick', [])
        .directive('offClick', Directive);
})();
