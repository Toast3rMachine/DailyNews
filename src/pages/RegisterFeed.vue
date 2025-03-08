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
    <div class="bg-slate-500 h-screen text-2xl p-4">
        <h1 class="text-4xl mb-4">Enregistrer un flux</h1>
        <form action="" @submit.prevent="addRssFlow">
            <fieldset role="group" class="flex flex-col max-w-1/3 items-center space-y-4 bg-slate-700 p-5 rounded-xl shadow-lg shadow-slate-700">
                <input v-model="rssFlowLink" type="text" placeholder="Lien du flux rss..." class="bg-white rounded-xl px-2 py-1 w-full text-rosewood">
                <input v-model="rssFlowTitle" type="text" placeholder="Titre du flux rss..." class="bg-white rounded-xl px-2 py-1 w-full text-rosewood">
                <button 
                    :disabled="rssFlowLink.length == 0 || rssFlowTitle.length == 0"
                    class="bg-rosewood w-fit p-2 rounded-xl text-white cursor-pointer hover:bg-red-900"
                    >
                    Enregistrer un flux rss
                </button>
            </fieldset>
        </form>
        <p v-if="rssFlowLink.length == 0 || rssFlowTitle.length == 0" class="mt-4 text-rosewood">
            Veuillez renseigner les deux champs du formulaire pour ajouter le flux rss de votre choix.
        </p>
    </div>
</template>