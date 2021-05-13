export type updateType = 'init' | 'scroll' | 'resize' | 'heightChange'

export interface UpdateParams {
  position: number
  updateType: updateType
  hasScroll: boolean
  lastUpdated: number
}

export interface Options {
  onInit: (data: UpdateParams) => {} | void
  onUpdate: (data: UpdateParams) => {} | void
}

interface Events {
  onScroll?: () => void
  onResize?: () => void
  onHeightChange?: () => void
  resizeObserver?: ResizeObserver
}

let _getFullDocumentHeight = () =>
  Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)

let _getViewPortHeight = () => window.innerHeight

let _getScrollYPosition = () => window.pageYOffset

let _hasScroll = () => _getFullDocumentHeight() > _getViewPortHeight()

let _clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

let _onUpdate = (updateType: updateType): UpdateParams => {
  let fullDocumentHeight = _getFullDocumentHeight()
  let viewPortHeight = _getViewPortHeight()
  let scrollYPosition = _getScrollYPosition()

  let relative = fullDocumentHeight - viewPortHeight
  let position = _clamp(scrollYPosition / (relative || 1), 0, 1)
  return {
    position,
    updateType,
    hasScroll: _hasScroll(),
    lastUpdated: Date.now(),
  }
}

let _init = (
  { onInit: initCallback, onUpdate: updateCallback }: Options,
  events: Events
) => {
  events.onScroll = () => {
    if (updateCallback) {
      updateCallback(_onUpdate('scroll'))
    }
  }
  events.onResize = () => {
    if (updateCallback) {
      updateCallback(_onUpdate('resize'))
    }
  }
  events.onHeightChange = () => {
    if (updateCallback) {
      updateCallback(_onUpdate('heightChange'))
    }
  }

  /**
   * Throttling for event is not used.
   * Because it has the same effect same as rAF.
   * https://stackoverflow.com/a/44779316/815507
   */
  window.addEventListener('scroll', events.onScroll)
  window.addEventListener('resize', events.onResize)

  if (typeof ResizeObserver !== 'undefined') {
    events.resizeObserver = new ResizeObserver(events.onHeightChange)
    events.resizeObserver.observe(document.body)
  }

  initCallback && initCallback(_onUpdate('init'))
}

let _destroy = (events: Events) => {
  events.onScroll && window.removeEventListener('scroll', events.onScroll)
  events.onResize && window.removeEventListener('resize', events.onResize)
  events.resizeObserver && events.resizeObserver.unobserve(document.body)
}

export const createPositionIndicator = (options: Options) => {
  let events: Events = {
    onScroll: null,
    onResize: null,
    onHeightChange: null,
    resizeObserver: null,
  }

  return {
    hasScroll: () => _hasScroll(),
    getFullDocumentHeight: () => _getFullDocumentHeight(),
    getViewPortHeight: () => _getViewPortHeight(),
    getScrollYPosition: () => _getScrollYPosition(),
    init: () => _init(options, events),
    destroy: () => {
      _destroy(events)
      events = {}
    },
  }
}
