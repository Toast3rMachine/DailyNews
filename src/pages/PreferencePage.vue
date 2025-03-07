<script setup lang="ts">
    import { onMounted, ref } from 'vue'

    const newsList:any = ref([])
    const newsSearch = ref('')
    
    const getNews = () => {
        let localItems = JSON.parse(localStorage.getItem("Preferences") || '{}')
        for (let i=0; i<localItems.length; i++){
            newsList.value.push({
                title: localItems[i].title,
                link: localItems[i].link,
                description: localItems[i].description,
                pubDate : localItems[i].pubDate,
                img: localItems[i].img != '' ? localItems[i].img : '' 
            })
        }
    }

    const removeFromPreference = (id:any) => {
        const firstHalf = newsList.value.slice(0, id)
        const secondHalf = newsList.value.slice(id+1)
        newsList.value = firstHalf.concat(secondHalf)
        localStorage.setItem("Preferences", JSON.stringify(newsList.value))
    }

    const filteredNews = () => {
        const div = document.querySelectorAll<HTMLElement>("div.news")
        const titles = document.querySelectorAll("h1.title")
        const descriptions = document.querySelectorAll("p.desc")
        for (let i=0; i<newsList.value.length; i++){
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
        getNews()
    })

</script>

<template>
    <h1>Vos préférences</h1>
    <input type="text" id="search" v-model="newsSearch" placeholder="Rechercher...">
    <button @click="filteredNews">Filtrer</button>
    <div v-for="(news, index) in newsList" :key="news.title">
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