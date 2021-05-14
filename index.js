/* eslint-disable no-undef */

new Vue({
  el: '#app',
  data() {
    return {
      toggle1: true,
      toggle2: true,
      positionIndicatorLibrary: null,

      hasScroll: null,
      eventDate: null,
      eventType: null,
      prevEventType: null,
      position: 0,
      prevPosition: 0,
    }
  },
  computed: {
    calculatedLineWidth() {
      return `scaleX(${this.position})`
    },
  },
  methods: {
    round(number) {
      return Math.round((number + Number.EPSILON) * 100) / 100
    },
    onPositionUpdate({
      position,
      prevPosition,
      eventType,
      hasScroll,
      eventDate,
      hasUpdated,
    }) {
      console.log(eventType, eventDate)

      this.position = position
      this.prevPosition = prevPosition
      this.hasUpdated = hasUpdated
      this.prevEventType = this.eventType + ''
      this.eventType = eventType
      this.hasScroll = hasScroll
      this.eventDate = eventDate
    },
  },
  beforeMount() {
    let onInit = (data) => this.onPositionUpdate(data)
    let onUpdate = (data) => this.onPositionUpdate(data)

    this.positionIndicatorLibrary = Object.freeze(
      window.positionIndicator.createPositionIndicator({
        onInit,
        onUpdate,
        // useResizeListener: true,
        // useResizeObserver: true,
      })
    )

    this.positionIndicatorLibrary.init()
  },
  beforeDestroy() {
    if (this.positionIndicatorLibrary) {
      this.positionIndicatorLibrary.destroy()
    }
  },
})
