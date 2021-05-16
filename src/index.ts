export type eventType = 'init' | 'scroll' | 'resize' | 'heightChange'

export interface Memory {
  prevPosition?: number | null
}

export interface UpdateParams {
  position: number
  prevPosition: number
  hasUpdated: boolean
  eventType: eventType
  hasScroll: boolean
  eventDate: number
}

export interface PositionIndicatorInstance {
  init: () => void
  destroy: () => void
}

export interface Options {
  onInit?: (data: UpdateParams) => {} | void
  onUpdate: (data: UpdateParams) => {} | void
  useResizeListener?: boolean
  useResizeObserver?: boolean
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

let _onUpdate = (eventType: eventType, memory: Memory): UpdateParams => {
  let fullDocumentHeight = _getFullDocumentHeight()
  let viewPortHeight = _getViewPortHeight()
  let scrollYPosition = _getScrollYPosition()

  let relative = fullDocumentHeight - viewPortHeight
  let position = _clamp(scrollYPosition / (relative || 1), 0, 1)
  let prevPosition = memory.prevPosition
  memory.prevPosition = position
  return {
    position,
    prevPosition,
    hasUpdated: position !== prevPosition,
    eventType,
    hasScroll: _hasScroll(),
    eventDate: Date.now(),
  }
}

let _init = (
  {
    onInit: initCallback,
    onUpdate: updateCallback,
    useResizeListener = true,
    useResizeObserver = true,
  }: Options,
  events: Events,
  memory: Memory
) => {
  events.onScroll = () => {
    if (updateCallback) {
      updateCallback(_onUpdate('scroll', memory))
    }
  }
  if (useResizeListener) {
    events.onResize = () => {
      if (updateCallback) {
        updateCallback(_onUpdate('resize', memory))
      }
    }
  }

  if (useResizeObserver) {
    events.onHeightChange = () => {
      if (updateCallback) {
        updateCallback(_onUpdate('heightChange', memory))
      }
    }

    if (typeof ResizeObserver !== 'undefined') {
      events.resizeObserver = new ResizeObserver(events.onHeightChange)
      events.resizeObserver.observe(document.body)
    }
  }

  /**
   * Throttling for event is not used.
   * Because it has the same effect same as rAF.
   * https://stackoverflow.com/a/44779316/815507
   */
  window.addEventListener('scroll', events.onScroll)
  window.addEventListener('resize', events.onResize)

  initCallback && initCallback(_onUpdate('init', memory))
}

let _destroy = (events: Events) => {
  events.onScroll && window.removeEventListener('scroll', events.onScroll)
  events.onResize && window.removeEventListener('resize', events.onResize)
  events.resizeObserver && events.resizeObserver.unobserve(document.body)
}

export const createPositionIndicator = (
  options: Options
): PositionIndicatorInstance => {
  let events: Events = {
    onScroll: null,
    onResize: null,
    onHeightChange: null,
    resizeObserver: null,
  }
  let memory: Memory = {}

  return {
    init: () => _init(options, events, memory),
    destroy: () => {
      _destroy(events)
      events = {}
      memory = {}
    },
  }
}
