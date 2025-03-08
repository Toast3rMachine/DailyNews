import { ref } from 'vue'

export function isLocalStorageEmpty():boolean {
    return localStorage.length == 0 ? true : false
}

export function getLocalItems(itemName:string) {
    return JSON.parse(localStorage.getItem(itemName) || '{}')
}

export function getIndex(id:any) {
    return getLocalItems("Flux Rss").findIndex((item: { date: string | undefined }) => item.date == id) 
}

export function getFeedByIndex(id:any):any {
    const localItems = getLocalItems("Flux Rss")
    const index = localItems.findIndex((item: { date: string | undefined }) => item.date == id)
    
    const rssFeed = ({
        link: localItems[index].link,
        title: localItems[index].title,
        id: id
    })

    return rssFeed
}

export function getValueFromLocalStorage():any {
    const rssFlows:any = ref([])
    const localItems = getLocalItems("Flux Rss")

    if (!isLocalStorageEmpty()){
        for (let index in localItems){
        rssFlows.value.push({
            link: localItems[index].link,
            title: localItems[index].title,
            date: localItems[index].date
        })
        }
    }
    return rssFlows.value
}

export function getNewsPreference():any {
    const newsPreference:any = ref([])
    let localItems = getLocalItems("Preferences")
    for (let i=0; i<localItems.length; i++){
        newsPreference.value.push({
            feedId: localItems[i].feedId,
            title: localItems[i].title,
            link: localItems[i].link,
            description: localItems[i].description,
            pubDate : localItems[i].pubDate,
            img: localItems[i].img != '' ? localItems[i].img : '' 
        })
    }
    return newsPreference.value
}