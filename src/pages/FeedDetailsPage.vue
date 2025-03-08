<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { getFeedByIndex, getIndex, getLocalItems, getNewsPreference } from '../lib/utils'
    import Notification from '../components/Notification.vue'

    const rssFeedLink = ref('')
    const rssFeedTitle = ref('')
    const newsLimit = ref('Tout')
    const notif = ref(false)
    const notInPreference = ref(true)
    const inPreference = ref(false)
    const feedModification = ref(false)
    const newRssFeed:any = ref([])
    const newsList:any = ref([])
    const newsPreference:any = ref([])

    const props = defineProps({id: String})

    let rssFeed = getFeedByIndex(props.id)
    const localItems = getLocalItems("Flux Rss")
    const index = getIndex(props.id)

    const addToPreference = (id:String) => {
        const news = document.getElementById('news'+id)
        inPreference.value = false

        for (let index=0; index<newsPreference.value.length; index++){
            if (newsPreference.value[index].title == news?.querySelector('h1')?.textContent){
                inPreference.value = true
                notInPreference.value = false
                showNotif()
                break
            }
        }

        if (!inPreference.value){
            newsPreference.value.push({
                feedId: props.id,
                title: news?.querySelector('h1')?.textContent,
                link: news?.querySelector('a')?.getAttribute('href'),
                description: news?.querySelector('p.desc')?.textContent,
                pubDate : news?.querySelector('p.pubDate')?.textContent,
                img: news?.querySelector('img')?.textContent ? news?.querySelector('img')?.textContent : '' 
            })
            localStorage.setItem("Preferences", JSON.stringify(newsPreference.value))
            notInPreference.value = true
            showNotif()
        }
    }

    const updateRssFeed = () => {
        newRssFeed.value.push({
            link: rssFeedLink.value,
            title: rssFeedTitle.value,
            date: props.id
        })
        localItems[index] = newRssFeed.value[0] //On récupère les valeurs du premier élément du tableau car c'est à cet emplacement que sont faite les modifications
        newRssFeed.value.pop() //On supprime le dernier élément pour garder newRssFeed vide.
        localStorage.setItem("Flux Rss", JSON.stringify(localItems))
        rssFeedLink.value = ''
        rssFeedTitle.value = ''
        feedModification.value = true
        showNotif()
    }

    const updateData = () => {
        rssFeed = ({
            link: localItems[index].link,
            title: localItems[index].title,
            id: props.id
        })
        showNews()
    }

    const fetchRSSFeed = async (): Promise<any> => {
        const fetchUrl = rssFeed.link

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

    const showNotif = () => {
        notif.value = true
        setTimeout(() => notif.value = false, 1500)
        setTimeout(() => feedModification.value = false, 1500)
    }

    const showNews = async () => {
        newsList.value = (await fetchRSSFeed()).slice(0, newsLimit.value === "Tout" ? newsList.value.lenght : parseInt(newsLimit.value, 10))
    }

    onMounted(() => {
        showNews()
        newsPreference.value = getNewsPreference()
    })

</script>


<template>
    <div class="bg-slate-500 min-h-screen h-full text-2xl p-4 space-y-4">
        <div class="flex space-x-4">
            <div class="flex flex-col h-fit min-w-1/2 items-center space-y-4 text-white bg-slate-700 p-5 rounded-xl shadow-lg shadow-slate-700">
                <h1>Voici les news du flux {{ rssFeed.title }}</h1>
                <p>Lien actuel du flux rss : {{ rssFeed.link }}</p>
                <p>Id du flux rss : {{ props.id }}</p>
            </div>
            <transition name="notif">
                <Notification v-if="notif && notInPreference && !feedModification" text="Flux ajouté à vos préférences"/>
            </transition>
            <transition name="notif">
                <Notification v-if="notif && inPreference && !feedModification" text="Flux présent dans vos préférences"/>
            </transition>
            <transition name="notif">
                <Notification v-if="notif && feedModification" text="Flux modifié"/>
            </transition>
            <form action="" @submit.prevent="updateRssFeed(); updateData()" class="min-w-1/2">
                <fieldset role="group" class="flex flex-col items-center space-y-4 bg-slate-700 p-5 rounded-xl shadow-lg shadow-slate-700">
                    <h2 class="text-white">Modification du flux rss</h2>
                    <input v-model="rssFeedLink" type="text" placeholder="Nouveau Lien du Flux rss..." class="bg-white rounded-xl px-2 py-1 w-full text-rosewood">
                    <input v-model="rssFeedTitle" type="text" placeholder="Nouveau Nom du Flux rss..." class="bg-white rounded-xl px-2 py-1 w-full text-rosewood">
                    <button 
                        :disabled="rssFeedLink.length == 0 || rssFeedTitle.length == 0"
                        class="bg-rosewood w-fit p-2 rounded-xl text-white cursor-pointer hover:bg-red-900"
                        >
                        Enregistrer un flux rss
                    </button>
                </fieldset>
                <p v-if="rssFeedLink.length == 0 || rssFeedTitle.length == 0" class="mt-4 text-rosewood">
                    Veuillez renseigner les deux champs du formulaire pour ajouter le flux rss de votre choix.
                </p>
            </form>
        </div>
        <select v-model="newsLimit" @change="showNews" class="bg-slate-700 text-white py-1 px-2 rounded-xl shadow-lg shadow-slate-700 cursor-pointer">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="Tout">Tout</option>
        </select>
        <div v-for="(news, index) in newsList" :key="news.title">
            <div :id="'news'+index.toString()" class="text-white bg-slate-700 py-2 px-4 space-y-2 rounded-xl shadow-lg shadow-slate-700">
                <h1>{{ news.title }}</h1>
                <img :src="news.img">
                <p class="desc">{{ news.description }}</p>
                <p class="pubDate text-lg text-slate-300">{{ news.pubDate }}</p>
                <a :href="news.link" class="bg-rosewood w-fit p-2 rounded-xl text-white cursor-pointer hover:bg-red-900 mr-4">Lire l'article</a>
                <button @click="addToPreference(index.toString())" class="bg-rosewood w-fit p-2 rounded-xl text-white cursor-pointer hover:bg-red-900">Ajouter à vos préférences</button>
            </div>
        </div>
    </div>
</template>