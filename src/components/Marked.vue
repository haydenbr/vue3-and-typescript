<template>
  <p v-html="content"></p>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import * as marked from 'marked'

export default defineComponent({
  name: 'Marked',
  props: {
    content: String
  },
  setup (props) {
    const content = computed(() => props.content)

    return { content }
  }
})
</script>
