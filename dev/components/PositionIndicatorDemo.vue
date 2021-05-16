<template>
  <article>
    <h1>Position Indicator</h1>
    <h2>scroll down</h2>
    <p>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself
      transformed in his bed into a horrible vermin. He lay on his armour-like
      back, and if he lifted his head a little he could see his brown belly,
      slightly domed and divided by arches into stiff sections. The bedding was
      hardly able to cover it and seemed ready to slide off any moment. His many
      legs, pitifully thin compared with the size of the rest of him, waved
      about helplessly as he looked. "What's happened to me?" he thought.
    </p>
    <button @click="toggle1 = !toggle1" class="toggle area-one">
      Toggle {{ toggle1 ? 'expanded' : 'collapsed' }}
    </button>
    <p v-if="toggle1" class="area-one">
      It wasn't a dream. His room, a proper human room although a little too
      small, lay peacefully between its four familiar walls. A collection of
      textile samples lay spread out on the table - Samsa was a travelling
      salesman - and above it there hung a picture that he had recently cut out
      of an illustrated magazine and housed in a nice, gilded frame. It showed a
      lady fitted out with a fur hat and fur boa who sat upright, raising a
      heavy fur muff that covered the whole of her lower arm towards the viewer.
    </p>
    <button @click="toggle2 = !toggle2" class="toggle area-two">
      Toggle {{ toggle2 ? 'expanded' : 'collapsed' }}
    </button>
    <p v-if="toggle2" class="area-two">
      One morning, when Gregor Samsa woke from troubled dreams, he found himself
      transformed in his bed into a horrible vermin. He lay on his armour-like
      back, and if he lifted his head a little he could see his brown belly,
      slightly domed and divided by arches into stiff sections. The bedding was
      hardly able to cover it and seemed ready to slide off any moment. His many
      legs, pitifully thin compared with the size of the rest of him, waved
      about helplessly as he looked. "What's happened to me?" he thought.
    </p>
    <p>
      It wasn't a dream. His room, a proper human room although a little too
      small, lay peacefully between its four familiar walls. A collection of
      textile samples lay spread out on the table - Samsa was a travelling
      salesman - and above it there hung a picture that he had recently cut out
      of an illustrated magazine and housed in a nice, gilded frame. It showed a
      lady fitted out with a fur hat and fur boa who sat upright, raising a
      heavy fur muff that covered the whole of her lower arm towards the viewer.
    </p>
    <p>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself
      transformed in his bed into a horrible vermin. He lay on his armour-like
      back, and if he lifted his head a little he could see his brown belly,
      slightly domed and divided by arches into stiff sections. The bedding was
      hardly able to cover it and seemed ready to slide off any moment. His many
      legs, pitifully thin compared with the size of the rest of him, waved
      about helplessly as he looked. "What's happened to me?" he thought.
    </p>
    <p>
      It wasn't a dream. His room, a proper human room although a little too
      small, lay peacefully between its four familiar walls. A collection of
      textile samples lay spread out on the table - Samsa was a travelling
      salesman - and above it there hung a picture that he had recently cut out
      of an illustrated magazine and housed in a nice, gilded frame. It showed a
      lady fitted out with a fur hat and fur boa who sat upright, raising a
      heavy fur muff that covered the whole of her lower arm towards the viewer.
    </p>
    <p>
      One morning, when Gregor Samsa woke from troubled dreams, he found himself
      transformed in his bed into a horrible vermin. He lay on his armour-like
      back, and if he lifted his head a little he could see his brown belly,
      slightly domed and divided by arches into stiff sections. The bedding was
      hardly able to cover it and seemed ready to slide off any moment. His many
      legs, pitifully thin compared with the size of the rest of him, waved
      about helplessly as he looked. "What's happened to me?" he thought.
    </p>
    <p>
      It wasn't a dream. His room, a proper human room although a little too
      small, lay peacefully between its four familiar walls. A collection of
      textile samples lay spread out on the table - Samsa was a travelling
      salesman - and above it there hung a picture that he had recently cut out
      of an illustrated magazine and housed in a nice, gilded frame. It showed a
      lady fitted out with a fur hat and fur boa who sat upright, raising a
      heavy fur muff that covered the whole of her lower arm towards the viewer.
    </p>
  </article>

  <div class="indicator">
    <div
      class="indicator-width"
      :style="{ transform: calculatedLineWidth }"
    ></div>
    <div class="indicator-position">{{ position }}</div>
    <div class="indicator-info">
      <p>
        eventType: {{ eventType }}<br />
        prevEventType: {{ prevEventType }}<br />
        eventDate: {{ new Date(eventDate).toLocaleString() }}<br />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createPositionIndicator } from '../../dist/index.esm'

export default defineComponent({
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
      hasUpdated: false,
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
      if (hasUpdated) {
        this.position = position
        this.prevPosition = prevPosition
      }

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
      // window.positionIndicator.createPositionIndicator({
      createPositionIndicator({
        onInit,
        onUpdate,
        // useResizeListener: true,
        // useResizeObserver: true,
      })
    )

    this.positionIndicatorLibrary.init()
  },
  beforeUnmount() {
    if (this.positionIndicatorLibrary) {
      this.positionIndicatorLibrary.destroy()
    }
  },
})
</script>

<style scoped lang="scss">
h1,
h2 {
  margin-bottom: 2rem;
}

article {
  box-sizing: border-box;
  font-size: 16px;
  display: block;
  transition: 200ms;
  max-width: 96%;
  margin: 0 auto;
  padding: 0 2em;
}
article {
  p {
    line-height: 2;
    margin-bottom: 2em;
  }
  @media (min-width: 900px) {
    max-width: 70%;
  }
  @media (min-width: 1600px) {
    max-width: 60%;
  }
}

.toggle {
  border-radius: 2rem;
  padding: 1rem;
  width: 100%;
  box-shadow: inset 0 0 0 1px black;
  &.area-one {
    box-shadow: inset 0 0 0 1px orange;
  }
  &.area-two {
    box-shadow: inset 0 0 0 1px hotpink;
  }
}

.indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 8px;
}
.indicator-width {
  background: darkmagenta;
  position: fixed;
  top: 0;
  left: 0;
  height: 8px;
  width: 100%;
  transform-origin: 0 0;
  will-change: transform;
  transform: scaleX(0);
}

.indicator-position {
  position: fixed;
  top: 1rem;
  right: 8px;
  border-radius: 4px;
  color: white;
  width: 200px;
  background: rgba(0, 0, 0, 0.7);
  padding: 4px;
}

.indicator-info {
  position: fixed;
  top: 3rem;
  right: 8px;
  border-radius: 4px;
  color: white;
  width: 300px;
  background: rgba(0, 0, 0, 0.7);
  padding: 4px;
}

.area-one {
  background: bisque;
  margin-bottom: 1rem;
  padding: 1rem;
}
.area-two {
  background: lavenderblush;
  margin-bottom: 1rem;
  padding: 1rem;
}
</style>
