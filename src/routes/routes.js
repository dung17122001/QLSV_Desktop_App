import routeConfig from './configRoutes';

import Home from '~/page/Home';
import SinhVien from '~/page/SinhVien';
import GiangVien from '~/page/GiangVien';
import DaoTao from '~/page/Daotao';

//public

const route = routeConfig.routeConfig;

const publicRoutes = [
    {
        path: route.home,
        component: Home,
    },
    {
        path: route.sinhvien,
        component: SinhVien,
    },
    {
        path: route.giangvien,
        component: GiangVien,
    },
    {
        path: route.daotao,
        component: DaoTao,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
