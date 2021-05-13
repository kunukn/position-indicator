/* eslint-disable no-undef */
new Vue({
  el: '#app',
  data() {
    return {
      resizeObserver: null,

      fullDocumentHeight: null,
      viewPortHeight: null,
      fixedViewPortHeight: null,
      fixedScrollHeight: null,
      scrollYPosition: null,
      innerHeight: null,
      outerHeight: null,
      innerWidth: null,

      lastUpdated: null,
      updateType: null,
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
    onScroll() {
      this.onUpdate('onScroll')
    },
    onResize() {
      this.onUpdate('onResize')
    },
    onHeightChange() {
      this.onUpdate('onHeightChange')
    },
    round(number) {
      return Math.round((number + Number.EPSILON) * 100) / 100
    },
    onUpdate(type) {
      /**
       * Throttling for event is not used.
       * Because it has the same effect same as rAF.
       * https://stackoverflow.com/a/44779316/815507
       */

      this.fullDocumentHeight = getFullDocumentHeight()
      this.fixedViewPortHeight = getFixedViewPortHeight()
      this.viewPortHeight = getViewPortHeight()
      this.fixedViewPortHeight = getFixedViewPortHeight()
      this.fixedScrollHeight = getFixedScrollHeight()
      this.scrollYPosition = getScrollYPosition()
      this.innerWidth = window.innerWidth
      this.innerHeight = window.innerHeight
      this.outerHeight = window.outerHeight

      this.updateType = type || 'unknown'

      let relative = this.fullDocumentHeight - this.innerHeight
      this.position = clamp(this.scrollYPosition / relative, 0, 1)

      this.lastUpdated = new Date().toLocaleString()
    },
  },
  beforeMount() {
    this.onUpdate()
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
    this.resizeObserver = new ResizeObserver(this.onHeightChange)
    this.resizeObserver.observe(document.body)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    this.resizeObserver && this.resizeObserver.unobserve(document.body)
  },
})
