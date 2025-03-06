<script setup lang="ts">
import { ref } from 'vue'

    const rssFlowLink = ref('')
    const rssFlowTitle = ref('')
    const newRssFlow:any = ref([])
    const newsLimit = ref('Tout')
    const newsList:any = ref([])

    const props = defineProps({
        id: String
    })

    let localItems = JSON.parse(localStorage.getItem("Flux Rss") || '{}')
    const index = localItems.findIndex((item: { date: string | undefined }) => item.date == props.id)
    
    let rssFlow = ({
        link: localItems[index].link,
        title: localItems[index].title,
        id: props.id
    })

    const updateRssFlow = () => {
        newRssFlow.value.push({
            link: rssFlowLink.value,
            title: rssFlowTitle.value,
            date: props.id
        })
        localItems[index] = newRssFlow.value[0] //On récupère les valeurs du premier élément du tableau car c'est à cet emplacement que sont faite les modifications
        newRssFlow.value.pop() //On supprime le dernier élément pour garder newRssFlow vide.
        localStorage.setItem("Flux Rss", JSON.stringify(localItems))
        rssFlowLink.value = ''
        rssFlowTitle.value = ''
    }

    const updateData = () => {
        localItems = JSON.parse(localStorage.getItem("Flux Rss") || '{}')
        rssFlow = ({
            link: localItems[index].link,
            title: localItems[index].title,
            id: props.id
        })
    }

    const fetchRSSFeed = async (): Promise<any> => {
        const fetchUrl = rssFlow.link

        // Proxy à utiliser dans le cas d'erreur CORS. A activer en ajoutant en allant sur https://cors-anywhere.herokuapp.com/corsdemo
        // const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
        // const url = CORS_PROXY+fetchUrl

        try {
            // console.log('Fetching URL:', url); // Debugging 1: Log the request URL
            const response = await fetch(fetchUrl); // Changez fetchUrl par url si le proxy est utilisé.
            const data = await response.text();
            
            // console.log('Data fetched:', data); // Debugging 2: Log the raw data
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            // console.log('Parsed XML:', xmlDoc); // Debugging 3: Log the parsed XML

            return Array.from(xmlDoc.querySelectorAll("item")).map(item => {
                const description = item.querySelector("description")?.textContent || '';
                const pubDate = item.querySelector("pubDate") ? item.querySelector("pubDate")!.textContent : '';
                const title = item.querySelector("title")?.textContent || '';
                const link = item.querySelector("link")?.textContent || '';
                const img = item.querySelector("image")?.querySelector("url") || ''; // Image doesn't work

                return { title, link, description, pubDate, img };
            })
        } catch (error) {
            console.error('Error fetching the RSS feed:', error);
            throw error
        }
    }

    // document.addEventListener('DOMContentLoaded', fetchRSSFeed);

    const showNews = async () => {
        newsList.value = (await fetchRSSFeed()).slice(0, newsLimit.value === "Tout" ? newsList.value.lenght : parseInt(newsLimit.value, 10))
        console.log(newsList.value)
    }

</script>


<template>
    <h1>Ici Details d'un flux rss en particulier : {{ props.id }}</h1>
    <p>Nom du flux rss : {{ rssFlow.title }}</p>
    <p>Lien actuel du flux rss : {{ rssFlow.link }}</p>
    <form action="" @submit.prevent="updateRssFlow(); updateData()">
        <fieldset>
            <h2>Modification du flux rss</h2>
            <input v-model="rssFlowLink" type="text" placeholder="Nouveau Lien du Flux rss">
            <input v-model="rssFlowTitle" type="text" placeholder="Nouveau Nom du Flux rss">
            <button :disabled="rssFlowLink.length == 0 || rssFlowTitle.length == 0">Enregistrer un flux rss</button>
            <p v-if="rssFlowLink.length == 0 || rssFlowTitle.length == 0">
                Veuillez renseigner les deux champs du formulaire pour ajouter le flux rss de votre choix.
            </p>
        </fieldset>
    </form>
    <select v-model="newsLimit" @change="showNews">
        <option value="10" selected>10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="Tout">Tout</option>
    </select>
    <div v-for="news in newsList">
        <div>
            <h1>{{ news.title }}</h1>
            <a :href="news.link">Lire l'article</a>
            <img :src="news.img">
            <p>{{ news.description }}</p>
            <p>{{ news.pubDate }}</p>
        </div>
    </div>
</template>