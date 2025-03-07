<script setup lang="ts">
    import { onMounted, ref } from 'vue'

    const newsList:any = ref([])
    
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

    onMounted(() => {
        getNews()
    })

</script>

<template>
    <h1>Vos préférences</h1>
    <div v-for="(news, index) in newsList" :key="news.title">
        <div :id="'news'+index.toString()">
            <h1>{{ news.title }}</h1>
            <a :href="news.link">Lire l'article</a>
            <img :src="news.img">
            <p class="desc">{{ news.description }}</p>
            <p class="pubDate">{{ news.pubDate }}</p>
            <!-- <button @click="addToPreference(index.toString())">Ajouter à vos préférences</button> -->
        </div>
    </div>
</template>