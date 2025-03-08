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
    <div class="text-white text-2xl p-4 bg-slate-500 min-h-screen h-full">
        <h1 class="text-4xl text-black mb-4">Liste des flux</h1>
        <div v-if="rssFlows.length == 0">
            Vous n'avez pas encore enregistré de flux rss. <br>
            Pour enregistrer un flux, rendez-vous sur cette page :
            <div class="bg-rosewood w-fit p-2 rounded-xl">
                <RouterLink :to="{name:'registerFeed'}">
                    Enregistrer un flux RSS.
                </RouterLink>
            </div>
        </div>
        <div v-else>
            <ul class="space-y-4">
                <li v-for="rssFlow in rssFlows" :key="rssFlow.date" class="bg-slate-700 py-3 px-4 w-fit space-x-4 rounded-xl shadow-lg shadow-slate-700 hover:bg-slate-500">
                    <RouterLink :to="{name: 'flow.details', params: {id: rssFlow.date}}" class="">
                        {{ rssFlow.title }}
                    </RouterLink>
                    <button @click="deleteRssFeed(rssFlow.date)" class="bg-rosewood w-fit p-2 rounded-xl text-white text-lg cursor-pointer hover:bg-red-900">Supprimer ce flux</button>
                </li>
            </ul>
        </div>
    </div>
</template>