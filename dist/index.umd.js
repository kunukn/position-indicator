/*!
 * position-indicator v0.0.12
 * (c) kunukn
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.positionIndicator = {}));
}(this, (function (exports) { 'use strict';

  var _getFullDocumentHeight = function () {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  };
  var _getViewPortHeight = function () { return window.innerHeight; };
  var _getScrollYPosition = function () { return window.pageYOffset; };
  var _hasScroll = function () { return _getFullDocumentHeight() > _getViewPortHeight(); };
  var _clamp = function (value, min, max) {
      return Math.min(Math.max(value, min), max);
  };
  var _onUpdate = function (eventType, memory) {
      var fullDocumentHeight = _getFullDocumentHeight();
      var viewPortHeight = _getViewPortHeight();
      var scrollYPosition = _getScrollYPosition();
      var relative = fullDocumentHeight - viewPortHeight;
      var position = _clamp(scrollYPosition / (relative || 1), 0, 1);
      var prevPosition = memory.prevPosition;
      memory.prevPosition = position;
      return {
          position: position,
          prevPosition: prevPosition,
          hasUpdated: position !== prevPosition,
          eventType: eventType,
          hasScroll: _hasScroll(),
          eventDate: Date.now(),
      };
  };
  var _init = function (_a, events, memory) {
      var initCallback = _a.onInit, updateCallback = _a.onUpdate, _b = _a.useResizeListener, useResizeListener = _b === void 0 ? true : _b, _c = _a.useResizeObserver, useResizeObserver = _c === void 0 ? true : _c;
      events.onScroll = function () {
          if (updateCallback) {
              updateCallback(_onUpdate('scroll', memory));
          }
      };
      if (useResizeListener) {
          events.onResize = function () {
              if (updateCallback) {
                  updateCallback(_onUpdate('resize', memory));
              }
          };
      }
      if (useResizeObserver) {
          events.onHeightChange = function () {
              if (updateCallback) {
                  updateCallback(_onUpdate('heightChange', memory));
              }
          };
          if (typeof ResizeObserver !== 'undefined') {
              events.resizeObserver = new ResizeObserver(events.onHeightChange);
              events.resizeObserver.observe(document.body);
          }
      }
      /**
       * Throttling for event is not used.
       * Because it has the same effect same as rAF.
       * https://stackoverflow.com/a/44779316/815507
       */
      window.addEventListener('scroll', events.onScroll);
      window.addEventListener('resize', events.onResize);
      initCallback && initCallback(_onUpdate('init', memory));
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
      var memory = {};
      return {
          init: function () { return _init(options, events, memory); },
          destroy: function () {
              _destroy(events);
              events = {};
              memory = {};
          },
      };
  };

  exports.createPositionIndicator = createPositionIndicator;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
