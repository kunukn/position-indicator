/* eslint-disable no-undef */

new Vue({
  el: '#app',
  data() {
    return {
      positionIndicatorLibrary: null,

      fullDocumentHeight: null,
      viewPortHeight: null,
      scrollYPosition: null,
      hasScroll: null,
      eventDate: null,
      eventType: null,
      isOpen: true,
      position: 0,
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
        useResizeListener: true,
        useResizeObserver: false,
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
