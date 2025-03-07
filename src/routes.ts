import App from "./App.vue";
import FlowDetailsPage from "./pages/FlowDetailsPage.vue";
import FlowListPage from "./pages/FlowListPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import PreferencePage from "./pages/PreferencePage.vue";

export const routes = [
    {path: '/', redirect:'/list',component: App, name: 'home'},
    {path: '/list', component: FlowListPage, name: 'flow.list'},
    {
        path: '/details/:id(\\d+)', 
        component: FlowDetailsPage, 
        props:true,
        name: 'flow.details'
    },
    {path: '/preference', component: PreferencePage, name: 'preference'},
    {path: '/:pathMatch(.*)*', component: NotFoundPage}
]