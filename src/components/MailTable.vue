<template>
  <table class="mail-table">
    <tbody>
    <ModalView
      v-for="email in emails"
      :key="email.id"
    >
      <template v-slot:modal-trigger="triggerProps">
        <MailListItem
          :email="email"
          @archive="archiveEmail(email.id)"
          @click="openEmail(email.id), triggerProps.openModal()"
        />
      </template>
      <template v-slot:modal-content>
        <MailView :email="currentEmail" />
      </template>
    </ModalView>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, ref, defineAsyncComponent } from 'vue'
import axios from 'axios'
import DateFormat from '@/components/DateFormat.vue'
import ModalView from '@/components/ModalView.vue'
import MailView from '@/components/MailView.vue'
import MailListItem from '@/components/MailListItem.vue'
import { Email } from '@/types'
import { pureSort } from '@/util'
import { compareDesc } from 'date-fns'

export default defineComponent({
  components: { DateFormat, MailView, ModalView, MailListItem },
  async setup () {
    const { data } = await axios.get<Email[]>('http://localhost:3000/emails')
    const emails = ref<Email[]>(data)
    const curentEmailId = ref<number>()

    function _updateEmail (emailId: number, updater: (e: Email) => void) {
      let updatedEmail: Email | undefined

      emails.value = emails.value.map(e => {
        if (e.id !== emailId) {
          return e
        } else {
          updatedEmail = { ...e }
          updater(updatedEmail)
          return updatedEmail
        }
      })

      if (updatedEmail) {
        axios.put(`http://localhost:3000/emails/${emailId}`, updatedEmail)
      }
    }

    function openEmail (emailId: number) {
      _updateEmail(emailId, e => e.read = true)
      curentEmailId.value = emailId
    }

    function archiveEmail (emailId: number) {
      _updateEmail(emailId, e => e.archived = true)
    }

    const currentEmail = computed(() => emails.value.find(e => e.id === curentEmailId.value))
    const sortedEmails = computed(() => pureSort(emails.value, (a, b) => compareDesc(new Date(a.sentAt), new Date(b.sentAt))))
    const unarchivedEmails = computed(() => sortedEmails.value.filter(e => !e.archived))
    const archivedEmails = computed(() => sortedEmails.value.filter(e => e.archived))

    return { emails: unarchivedEmails, openEmail, archiveEmail, currentEmail }
  }
})
</script>
