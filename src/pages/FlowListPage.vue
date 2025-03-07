<script setup lang="ts">
    import { ref } from 'vue';

    const rssFlowLink = ref('')
    const rssFlowTitle = ref('')
    const rssFlows:any = ref([])

    let localStorageIsEmpty = localStorage.length == 0 ? true : false
    const localItems = JSON.parse(localStorage.getItem("Flux Rss") || '{}')

    if (!localStorageIsEmpty){
        for (let index in localItems){
        rssFlows.value.push({
            link: localItems[index].link,
            title: localItems[index].title,
            date: localItems[index].date
        })
        }
    }

    const addRssFlow = () => {
        rssFlows.value.push({
            link: rssFlowLink.value, 
            title: rssFlowTitle.value,
            date: Date.now()
        })
        localStorage.setItem("Flux Rss", JSON.stringify(rssFlows.value))
        localStorageIsEmpty = localStorage.length == 0 ?  true : false
        rssFlowLink.value = ''
        rssFlowTitle.value = ''
    }

    const deleteRssFeed = (id:any) => {
        const preferences = JSON.parse(localStorage.getItem("Preferences") || '{}')
        const rssFlowCopy:any = []
        const prefCopy:any = []
        for (let index=0; index<rssFlows.value.length; index++){
            if (rssFlows.value[index].date != id){
                rssFlowCopy.push(rssFlows.value[index])
            }
        }
        for (let prefIndex=0; prefIndex<preferences.length; prefIndex++) {
            if (preferences[prefIndex].feedId != id){
                prefCopy.push(preferences[prefIndex])
            }
        }
        rssFlows.value = rssFlowCopy
        localStorage.setItem("Flux Rss", JSON.stringify(rssFlows.value))
        localStorage.setItem("Preferences", JSON.stringify(prefCopy))
        console.log("Flux RSS supprimé avec succès")
    }

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

    <div v-if="rssFlows.length == 0">
        Vous n'avez pas encore enregistré de flux rss.
    </div>
    <div v-else>
        <ul>
            <li v-for="rssFlow in rssFlows" :key="rssFlow.date">
                <RouterLink :to="{name: 'flow.details', params: {id: rssFlow.date}}">
                    {{ rssFlow.title }}
                </RouterLink>
                <button @click="deleteRssFeed(rssFlow.date)">Supprimer ce flux</button>
            </li>
        </ul>
    </div>
</template>