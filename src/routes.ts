import App from "./App.vue";
import FlowDetailsPage from "./pages/FlowDetailsPage.vue";
import FlowListPage from "./pages/FlowListPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

export const routes = [
    {path: '/', component: App, name: 'home'},
    {path: '/list', component: FlowListPage, name: 'flow.list'},
    {
        path: '/details/:id(\\d+)', 
        component: FlowDetailsPage, 
        props:true,
        name: 'flow.details'
    },
    {path: '/:pathMatch(.*)*', component: NotFoundPage}
]