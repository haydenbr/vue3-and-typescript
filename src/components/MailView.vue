<template>
  <div class="email-display" v-if="email">
    <h2 class="mb-0">Subject: <strong>{{email.subject}}</strong></h2>
    <div>
      <em>
        From {{email.from}} on <DateFormatSlot>{{email.sentAt}}</DateFormatSlot>
      </em>
    </div>
    <Marked :content="email.body" />
  </div>
</template>
<script lang="ts">
import { Email } from '@/types'
import DateFormatSlot from '@/components/DateFormatSlot.vue'
import Marked from '@/components/Marked.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MailView',
  props: {
    email: Object as PropType<Email>
  },
  components: { DateFormatSlot, Marked }
})
</script>
