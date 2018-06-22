# vue-sync-props 



## Installation

```bash
yarn add vue-sync-props
npm install vue-sync-props
```
```js
// Global mixin
import Vue from 'vue'
import VueSyncProps from 'vue-sync-props'

Vue.use(VueSyncProps)
```
```js
// For a single component
import { mixin as VueSyncProps } from 'vue-sync-props'

export default {
  mixins: [VueSyncProps]
}
```

## Usage

Imagine that we have a component with a prop that need to be stored and updated inside a component but we also should keep our data updated when this prop is changed.  
Just add a `sync` option to your prop instead of writing tons of watchers:

```diff
export default {
  props: {
    tabs: { type: Array, required: true },
-   active: { default: null }
+   active: { default: null, sync: 'activeTab' }
  },
  data () {
    return {
      activeTab: null
    }
  },
- watch: {
-   active: {
-     immediate: true,
-     handler (val) {
-       this.activeTab = val
-     }
-   },
-   activeTab (val) {
-     if (val !== this.active) {
-       this.$emit('update:active', val)
-     }
-   }
- },
  methods: {
    setActive (idx) {
      this.activeTab = idx
    }
  }
}
```

It will update `activeTab` on `active` prop update and update `myTab` prop when `activeTab` is updated.  
So you can write your tabs, forms or whatever else and don't care about props/data sync:

```vue
<template>
  <div>
    <tabs :active.sync="myTab" :tabs="[1, 2, 3, 4, 5]" />
    <div>Current tab is: {{myTab}}</div>
    <button @click="() => { myTab = 5 }">Set 5</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myTab: 1
    }
  }
}
</script>
```

## `watch` option

Customizable alternative: you can define watcher in props instead of adding `watcher` option:

```js
export default {
  props: {
    items: {
      type: Array,
      watch (newItems) {
        this.form.items = newItems.map(item => ({ id: item.id, title: item.title }))
      }
    }
  },
  data () {
    return {
      form: {
        smth: 'lol',
        items: []
      }
    }
  }
}
```
