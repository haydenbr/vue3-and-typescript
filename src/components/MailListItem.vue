<template>
  <tr
    v-if="email"
    class="clickable"
    :class="{'read': email.read}"
  >
    <td><input type="checkbox"/></td>
    <td>{{email.from}}</td>
    <td>
      <p><strong>{{email.subject}}</strong> - {{email.body}}</p>
    </td>
    <td class="date">
      <DateFormatSlot>{{email.sentAt}}</DateFormatSlot>
    </td>
    <td>
      <button @click.stop="archiveEmail()">Archive</button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Email } from '@/types'
import { defineComponent, PropType } from 'vue'
import DateFormatSlot from '@/components/DateFormatSlot.vue'

export default defineComponent({
  name: 'MailListItem',
  components: { DateFormatSlot },
  props: {
    email: Object as PropType<Email>
  },
  setup (props, context) {
    function archiveEmail () {
      context.emit('archive')
    }

    return { archiveEmail }
  }
})
</script>
