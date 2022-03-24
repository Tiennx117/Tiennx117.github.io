import { loadable } from 'shared/utils';
const routes = [
    {
        path: '/home',
        component: loadable(() => import('../modules/home'))
    },
    {
        path: '/about',
        component: loadable(() => import('../modules/about'))
    },
    {
        path: '/user',
        component: loadable(() => import('../modules/user'))
    },
    {
        path: '/user-modal',
        component: loadable(() => import('../modules/user-modal'))
    },
    {
        path: '/demo-control',
        component: loadable(() => import('../modules/demo-control'))
    },
    {
        path: '/modal',
        component: loadable(() => import('../modules/demo/ExampleModal'))
    },
    {
        path: '/validate-form',
        component: loadable(() => import('../modules/demo/ExampleValidateForm'))
    },

];
export { routes };