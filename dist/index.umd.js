/*!
 * position-indicator v0.0.1
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
  var _onUpdate = function (updateType, memory) {
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
          updateType: updateType,
          hasScroll: _hasScroll(),
          lastUpdated: Date.now(),
      };
  };
  var _init = function (_a, events, memory) {
      var initCallback = _a.onInit, updateCallback = _a.onUpdate;
      events.onScroll = function () {
          if (updateCallback) {
              updateCallback(_onUpdate('scroll', memory));
          }
      };
      events.onResize = function () {
          if (updateCallback) {
              updateCallback(_onUpdate('resize', memory));
          }
      };
      events.onHeightChange = function () {
          if (updateCallback) {
              updateCallback(_onUpdate('heightChange', memory));
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
      var memory = {
          prevPosition: null,
      };
      return {
          init: function () { return _init(options, events, memory); },
          destroy: function () {
              _destroy(events);
              events = {};
              memory = {
                  prevPosition: null,
              };
          },
      };
  };

  exports.createPositionIndicator = createPositionIndicator;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
