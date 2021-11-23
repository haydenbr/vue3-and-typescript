<template>
  {{formattedDate}}
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted, onUpdated } from 'vue'
import { format } from 'date-fns'
import { onMountOrUpdate } from '@/util'

export default defineComponent({
  name: 'DateFormatSlot',
  props: {
    format: {type: String, default: 'MMM do, yyyy'}
  },
  setup(props, { slots }) {
    const formattedDate = ref()
    let previousRawDate = ''

    onMountOrUpdate(() => {
      const rawDate = formattedDate.value = slots && slots.default && slots.default()[0].children as string

      if (!rawDate || rawDate === previousRawDate) {
        return
      }

      formattedDate.value = format(new Date(rawDate), props.format)
      previousRawDate = rawDate
    })

    return {formattedDate}
  }
})
</script>
