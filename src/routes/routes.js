import routeConfig from './configRoutes';

import Home from '~/page/Home';
import SinhVien from '~/page/SinhVien';
import GiangVien from '~/page/GiangVien';
import DaoTao from '~/page/Daotao';
import MonHoc from '../page/Daotao/MonHoc';
import LopHoc from '../page/Daotao/LopHoc';
import Nganh from '../page/Daotao/Nganh';

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
    {
        path: route.lophoc,
        component: LopHoc,
    },
    {
        path: route.monhoc,
        component: MonHoc,
    },
    {
        path: route.nganh,
        component: Nganh,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
