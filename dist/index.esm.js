/*!
 * position-indicator v0.0.1
 * (c) kunukn
 * Released under the MIT License.
 */

var _getFullDocumentHeight = function () {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
};
var _getViewPortHeight = function () { return window.innerHeight; };
var _getScrollYPosition = function () { return window.pageYOffset; };
var _hasScroll = function () { return _getFullDocumentHeight() > _getViewPortHeight(); };
var _clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};
var _onUpdate = function (updateType) {
    var fullDocumentHeight = _getFullDocumentHeight();
    var viewPortHeight = _getViewPortHeight();
    var scrollYPosition = _getScrollYPosition();
    var relative = fullDocumentHeight - viewPortHeight;
    var position = _clamp(scrollYPosition / (relative || 1), 0, 1);
    return {
        position: position,
        updateType: updateType,
        hasScroll: _hasScroll(),
        lastUpdated: Date.now(),
    };
};
var _init = function (_a, events) {
    var initCallback = _a.onInit, updateCallback = _a.onUpdate;
    events.onScroll = function () {
        if (updateCallback) {
            updateCallback(_onUpdate('scroll'));
        }
    };
    events.onResize = function () {
        if (updateCallback) {
            updateCallback(_onUpdate('resize'));
        }
    };
    events.onHeightChange = function () {
        if (updateCallback) {
            updateCallback(_onUpdate('heightChange'));
        }
    };
    /**
     * Throttling for event is not used.
     * Because it has the same effect same as rAF.
     * https://stackoverflow.com/a/44779316/815507
     */
    window.addEventListener('scroll', events.onScroll);
    window.addEventListener('resize', events.onResize);
    if (typeof ResizeObserver !== 'undefined') {
        events.resizeObserver = new ResizeObserver(events.onHeightChange);
        events.resizeObserver.observe(document.body);
    }
    initCallback && initCallback(_onUpdate('init'));
};
var _destroy = function (events) {
    events.onScroll && window.removeEventListener('scroll', events.onScroll);
    events.onResize && window.removeEventListener('resize', events.onResize);
    events.resizeObserver && events.resizeObserver.unobserve(document.body);
};
var createPositionIndicator = function (options) {
    var events = {
        onScroll: null,
        onResize: null,
        onHeightChange: null,
        resizeObserver: null,
    };
    return {
        hasScroll: function () { return _hasScroll(); },
        getFullDocumentHeight: function () { return _getFullDocumentHeight(); },
        getViewPortHeight: function () { return _getViewPortHeight(); },
        getScrollYPosition: function () { return _getScrollYPosition(); },
        init: function () { return _init(options, events); },
        destroy: function () {
            _destroy(events);
            events = {};
        },
    };
};

export { createPositionIndicator };
//# sourceMappingURL=index.esm.js.map
