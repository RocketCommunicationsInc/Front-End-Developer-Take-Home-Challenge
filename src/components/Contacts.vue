<template>
  <div class="contacts">
    <div v-for="contact in contacts" :key="`contact-${contact.contactId}`">
      <div class="contact">
        <span>SI</span>
        <span>Message</span>
        <span>Category</span>
        <span>Time</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'grm-contacts',
  props: {
    contacts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props) {
    reactive(props);
    return {
      
    }
  }
}
</script>