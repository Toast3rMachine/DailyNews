<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { getValueFromLocalStorage } from '../lib/utils'

    const rssFlowLink = ref('')
    const rssFlowTitle = ref('')
    const rssFlows:any = ref([])

    const addRssFlow = () => {
        rssFlows.value.push({
            link: rssFlowLink.value, 
            title: rssFlowTitle.value,
            date: Date.now()
        })
        localStorage.setItem("Flux Rss", JSON.stringify(rssFlows.value))
        rssFlowLink.value = ''
        rssFlowTitle.value = ''
    }

    onMounted(() => {
        rssFlows.value = getValueFromLocalStorage()
    })

</script>

<template>
    <form action="" @submit.prevent="addRssFlow">
        <fieldset role="group">
            <input v-model="rssFlowLink" type="text" placeholder="Lien du flux rss">
            <input v-model="rssFlowTitle" type="text" placeholder="Titre du flux rss">
            <button :disabled="rssFlowLink.length == 0 || rssFlowTitle.length == 0">Enregistrer un flux rss</button>
            <p v-if="rssFlowLink.length == 0 || rssFlowTitle.length == 0">
                Veuillez renseigner les deux champs du formulaire pour ajouter le flux rss de votre choix.
            </p>
        </fieldset>
    </form>
</template>