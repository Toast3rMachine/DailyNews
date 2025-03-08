<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { getNewsPreference } from '../lib/utils'

    const newsPreference:any = ref([])
    const newsSearch = ref('')

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

    onMounted(() => {
        newsPreference.value = getNewsPreference()
    })

</script>

<template>
    <h1>Vos préférences</h1>
    <input type="text" id="search" v-model="newsSearch" placeholder="Rechercher...">
    <button @click="filteredNews">Filtrer</button>
    <div v-for="(news, index) in newsPreference" :key="news.title">
        <div :id="'news'+index.toString()" class="news">
            <h1 class="title">{{ news.title }}</h1>
            <a :href="news.link">Lire l'article</a>
            <img :src="news.img">
            <p class="desc">{{ news.description }}</p>
            <p class="pubDate">{{ news.pubDate }}</p>
            <button @click="removeFromPreference(index)">Supprimer de vos préférences</button>
        </div>
    </div>
</template>