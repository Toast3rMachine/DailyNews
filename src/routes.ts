import App from "./App.vue";
import FeedDetailsPage from "./pages/FeedDetailsPage.vue";
import FeedListPage from "./pages/FeedListPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import PreferencePage from "./pages/PreferencePage.vue";
import RegisterFeed from "./pages/RegisterFeed.vue";

export const routes = [
    {path: '/', redirect:'/list',component: App, name: 'home'},
    {path: '/list', component: FeedListPage, name: 'flow.list'},
    {
        path: '/details/:id(\\d+)', 
        component: FeedDetailsPage, 
        props:true,
        name: 'flow.details'
    },
    {path: '/registerFeed', component: RegisterFeed, name: 'registerFeed'},
    {path: '/preference', component: PreferencePage, name: 'preference'},
    {path: '/:pathMatch(.*)*', component: NotFoundPage}
]