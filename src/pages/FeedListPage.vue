<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { getValueFromLocalStorage } from '../lib/utils';

    const rssFlows:any = ref([])

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

    onMounted(() => {
        rssFlows.value = getValueFromLocalStorage()
    })

</script>

<template>
    <div v-if="rssFlows.length == 0">
        Vous n'avez pas encore enregistré de flux rss.
        Pour enregistrer un flux, rendez-vous sur cette page :
        <RouterLink :to="{name:'registerFeed'}">
            Enregistrer un flux RSS.
        </RouterLink>
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