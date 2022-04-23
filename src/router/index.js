import HomeShow from '../views/HomeShow.vue';
import DisplayItem from '../views/DisplayItem.vue';
import PageNotFound from '../views/404.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomeShow,
  },
  {
    path: '/search/:q',
    name: 'home_search',
    component: HomeShow,
  },
  {
    path: '/home/:folder',
    name: 'home_folder',
    component: HomeShow,
  },
  {
    path: '/home/:folder/:subfolder',
    name: 'home_folder_subfolder',
    component: HomeShow,
  },
  {
    path: '/home',
    name: 'home_redirect',
    component: HomeShow,
  },
  {
    path:'/:id',
    name: 'show',
    component: DisplayItem,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

export default routes;
