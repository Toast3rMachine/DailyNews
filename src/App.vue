<script setup lang="ts">
  import { ref } from 'vue';

  const rssFlowLink = ref('')
  const rssFlowTitle = ref('')
  const rssFlows:any = ref([])

  const addRssFlow = () => {
    console.log(rssFlowLink.value)
    console.log(rssFlowTitle.value)
    rssFlows.value.push({
      link: rssFlowLink.value, 
      title: rssFlowTitle.value,
      date: Date.now()
    })
    console.log(rssFlows.value)
  }
</script>

<template>
  <form action="" @submit.prevent="addRssFlow">
    <fieldset role="group">
      <input v-model="rssFlowLink" type="text" placeholder="Lien du flux rss">
      <input v-model="rssFlowTitle" type="text" placeholder="Titre du flux rss">
      <button>Enregistrer un flux rss</button>
    </fieldset>
  </form>

  <div v-if="rssFlows.length == 0">
    Vous n'avez pas encore enregistré de flux rss.
  </div>
  <div v-else>
    <ul>
      <li v-for="rssFlow in rssFlows" :key="rssFlow.date">
        {{ rssFlow.title }}
      </li>
    </ul>
  </div>
</template>
