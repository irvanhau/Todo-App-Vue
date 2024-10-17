import TasksView from '../views/TasksView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import SummaryView from '../views/SummaryView.vue';
import NotFoundErrorView from '../views/errors/NotFoundErrorView.vue';

const routes = [
    {
        path:"/tasks",
        component: TasksView,
        name:"tasks",
        meta:{
            auth: true,
        }
    },
    {
        path:"/",
        component: HomeView,
        name:"home",
    },
    {
        path:"/login",
        component:LoginView,
        name:"login",
        meta:{
            guest: true
        },
    },
    {
        path:"/register",
        component:RegisterView,
        name:"register",
        meta:{
            guest: true
        },
    },
    {
        path:"/summary",
        component:SummaryView,
        name:"summary",
        meta:{
            auth: true,
        }
    },
    {
        path:"/:notFound(.*)",
        component:NotFoundErrorView,
        name:'error.404'
    }
]

export default routes