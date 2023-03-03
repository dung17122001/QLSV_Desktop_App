import routeConfig from './configRoutes';

import Home from '~/page/Home';
import SinhVien from '~/page/SinhVien';
import GiangVien from '~/page/GiangVien';
import Khoa from '../page/Khoa';
import DaoTao from '~/page/Daotao';
import MonHoc from '../page/Daotao/MonHoc';
import LopHocPhan from '../page/Daotao/LopHocPhan';
import Nganh from '../page/Daotao/Nganh';
import CoSoVatChat from '../page/CoSoVatChat';
import PhongHoc from '../page/CoSoVatChat/PhongHoc';
import DayNha from '../page/CoSoVatChat/DayNha';
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
        path: route.khoa,
        component: Khoa,
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
        path: route.lophocphan,
        component: LopHocPhan,
    },
    {
        path: route.monhoc,
        component: MonHoc,
    },
    {
        path: route.nganh,
        component: Nganh,
    },
    {
        path: route.cosovatchat,
        component: CoSoVatChat,
    },
    {
        path: route.phonghoc,
        component: PhongHoc,
    },
    {
        path: route.daynha,
        component: DayNha,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
