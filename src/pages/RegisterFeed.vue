<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { getValueFromLocalStorage } from '../lib/utils'
    import Notification from '../components/Notification.vue'

    const rssFlowLink = ref('')
    const rssFlowTitle = ref('')
    const rssFlows:any = ref([])
    const notif = ref(false)

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

    const showNotif = () => {
        notif.value = true
        setTimeout(() => notif.value = false, 1500)
    }

    onMounted(() => {
        rssFlows.value = getValueFromLocalStorage()
    })

</script>

<template>
    <div class="bg-slate-500 h-screen text-2xl p-4">
        <h1 class="text-4xl mb-4">Enregistrer un flux</h1>
        <transition name="notif">
            <Notification v-if="notif" text="Flux enregistré"/>
        </transition>
        <form action="" @submit.prevent="addRssFlow(); showNotif()">
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

<style>
  /* enter transitions */
    .notif-enter-from {
        opacity: 0;
        transform: translateY(-60px);
    }
    .notif-enter-to {
        opacity: 1;
        transform: translateY(0);
    }
    .notif-enter-active {
        transition: all 0.3s ease;
    }
    /* leave transitions */
    .notif-leave-from {
        opacity: 1;
        transform: translateY(0);
    }
    .notif-leave-to {
        opacity: 0;
        transform: translateY(-60px);
    }
    .notif-leave-active {
        transition: all 0.3s ease;
    }
</style>