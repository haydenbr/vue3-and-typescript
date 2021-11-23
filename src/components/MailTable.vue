<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in emails"
        :key="email.id"
        class="clickable"
        :class="{'read': email.read}"
        @click="markEmailAsRead(email.id)"
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
          <button @click.stop="archiveEmail(email.id)">Archive</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import DateFormat from '@/components/DateFormat.vue'
import DateFormatSlot from '@/components/DateFormatSlot.vue'
import { Email } from '@/types'
import { pureSort } from '@/util'
import { compareDesc } from 'date-fns'

const _emails: Email[] = [
  {
    "id": 1,
    "from": "team@vuemastery.com",
    "subject": "What's up with Vue 3.0? Here's how to find out from Evan You",
    "body": "The opening keynote of VueConf US this year was Evan You (the creator of Vue), giving his State of the Vuenion address. He walked us through the journey of getting Vue 3 from a prototype to a reality the past year. He also dove into Vue's overall growth in the community.",
    "sentAt": "2020-03-27T18:25:43.511Z",
    "archived": false,
    "read": true
  },
  {
    "id": 2,
    "from": "jeffrey@vuetraining.net",
    "subject": "Learn by doing - Vue 3 Zero to Intermediate in 8 weeks",
    "body": "Building projects is one of the most effective ways to learn - and _the_ most effective way _remember_ what you've learned - but it can be frustrating.\n\nThis 8-week course takes the pain out of 'learning by doing'.\n\nEach week we give you\n\n* a project that will grow your skills without overwhelming you\n* links to hand-picked resources, such as Vue Mastery videos, that share the knowledge you'll need for the project (no more useless rabbit holes)\n* answers to any and all questions you have while working\n* feedback on your completed code (so you're only learning good habits)\n\nOur instructors are standing by to answer your questions.\n\nReady to learn?",
    "sentAt": "2020-05-20T18:25:43.511Z",
    "archived": false,
    "read": false
  },
  {
    "id": 3,
    "from": "damian@dulisz.com",
    "subject": "#177: Updated Vue.js Roadmap; Vuex v4.0.0-alpha.1 has been released; Kia King Ishii join the core team; Nuxt v2.12 released; Videos from Vue.js Amsterdam 2020 are here!",
    "body": "First of all, lets congratulate Kia King Ishii on joining the Vue.js core team! 🎉 He has been doing an incredible job building vuex-orm and will now focus on working on the next versions of Vuex.\n\nSpeaking of which – Vuex v4.0.0-alpha.1 has just been released! This is the version of Vuex that will work with Vue 3.0 but keep the familiar API you know from the current version.",
    "sentAt": "2020-03-18T18:25:43.511Z",
    "archived": false,
    "read": false
  },
  {
    "id": 4,
    "from": "anthony@vuejsdevelopers.com",
    "subject": "'Vue 3 Release Roadmap' + 6 more must-read articles from this week",
    "body": "Newsletter Issue #161",
    "sentAt": "2020-03-24T18:25:43.511Z",
    "archived": true,
    "read": false
  }
]

export default defineComponent({
  components: {DateFormat, DateFormatSlot},
  setup() {
    const emails = ref(_emails)

    function _updateEmail(emailId: number, updater: (e: Email) => void) {
      emails.value = emails.value.map(e => {
        if (e.id !== emailId) {
          return e;
        } else {
          const updatedEmail = {...e}
          updater(updatedEmail)
          return updatedEmail
        }
      });
    }

    function markEmailAsRead(emailId: number) {
      _updateEmail(emailId, e => e.read = true)
    }

    function archiveEmail(emailId: number) {
      _updateEmail(emailId, e => e.archived = true)
    }

    const sortedEmails = computed(() => pureSort(emails.value, (a,b) => compareDesc(new Date(a.sentAt), new Date(b.sentAt))))
    const unarchivedEmails = computed(() => sortedEmails.value.filter(e => !e.archived))
    const archivedEmails = computed(() => sortedEmails.value.filter(e => e.archived))

    return { emails: unarchivedEmails, markEmailAsRead, archiveEmail }
  },
})
</script>
