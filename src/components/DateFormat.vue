<template>
  {{formattedDate}}
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { format } from 'date-fns'

export default defineComponent({
  name: 'DateFormat',
  props: {
    format: String,
    date: [String, Date] as PropType<string | Date>
  },
  setup(props) {
    const formattedDate = computed(() => {
      if (!props.date || !props.format) {
        return ''
      }

      const date = typeof props.date === 'string'
        ? new Date(props.date)
        : props.date
      return format(date, props.format)
    })

    return { formattedDate }
  }
})
</script>
