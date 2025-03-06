<script setup lang="ts">
import { ref } from 'vue'

    const rssFlowLink = ref('')
    const rssFlowTitle = ref('')
    const newRssFlow:any = ref([])

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
</template>