<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { getNewsPreference } from '../lib/utils'
    import Notification from '../components/Notification.vue'

    const newsPreference:any = ref([])
    const newsSearch = ref('')
    const notif = ref(false)

    const removeFromPreference = (id:any) => {
        const firstHalf = newsPreference.value.slice(0, id)
        const secondHalf = newsPreference.value.slice(id+1)
        newsPreference.value = firstHalf.concat(secondHalf)
        localStorage.setItem("Preferences", JSON.stringify(newsPreference.value))
    }

    const filteredNews = () => {
        const div = document.querySelectorAll<HTMLElement>("div.news")
        const titles = document.querySelectorAll("h1.title")
        const descriptions = document.querySelectorAll("p.desc")
        for (let i=0; i<newsPreference.value.length; i++){
            if (titles[i]?.textContent?.toLowerCase().includes(newsSearch.value.toLowerCase()) || 
                descriptions[i].textContent?.toLowerCase().includes(newsSearch.value.toLowerCase())){
                div[i].style.visibility = "visible"
                div[i].style.position = "relative"
            } else {
                div[i].style.visibility = "hidden"
                div[i].style.position = "absolute"
            }
        }
    }

    const showNotif = () => {
        notif.value = true
        setTimeout(() => notif.value = false, 1500)
    }

    onMounted(() => {
        newsPreference.value = getNewsPreference()
    })

</script>

<template>
    <div class="bg-slate-500 min-h-screen h-full text-2xl p-4 space-y-4">
        <h1 class="text-4xl">Vos préférences</h1>
        <transition name="notif">
            <Notification v-if="notif" text="News supprimée de vos préférences"/>
        </transition>
        <input type="text" id="search" v-model="newsSearch" placeholder="Rechercher..." class="bg-white rounded-xl px-2 py-1 mr-2 w-fit text-rosewood">
        <button @click="filteredNews" class="bg-rosewood w-fit p-2 rounded-xl text-white cursor-pointer hover:bg-red-900 mr-4">Filtrer</button>
        <div v-for="(news, index) in newsPreference" :key="news.title">
            <div :id="'news'+index.toString()" class="news text-white bg-slate-700 py-2 px-4 space-y-2 rounded-xl shadow-lg shadow-slate-700">
                <h1 class="title">{{ news.title }}</h1>
                <img :src="news.img">
                <p class="desc">{{ news.description }}</p>
                <p class="pubDate text-lg text-slate-300">{{ news.pubDate }}</p>
                <a :href="news.link" class="bg-rosewood w-fit p-2 rounded-xl text-white cursor-pointer hover:bg-red-900 mr-4">Lire l'article</a>
                <button @click="removeFromPreference(index); showNotif()" class="bg-rosewood w-fit p-2 rounded-xl text-white cursor-pointer hover:bg-red-900">Supprimer de vos préférences</button>
            </div>
        </div>
    </div>
</template>