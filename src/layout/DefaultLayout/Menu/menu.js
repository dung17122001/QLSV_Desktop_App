import classNames from 'classnames';

import Button from '~/components/Button';
import config from '~/routes/configRoutes';
import Dropdown from '~/components/Dropdown';
import { VscGroupByRefType } from 'react-icons/vsc';
import { useState } from 'react';
import { GiTicket, GiTheater, GiPopcorn } from 'react-icons/gi';
import { FaUserGraduate, FaUserTie, FaUniversity, FaAlignJustify } from 'react-icons/fa';

const cx = classNames;
function Header() {
    const route = config.routeConfig;
    const [showMenu, setShowMenu] = useState(true);
    function Menu() {
        showMenu ? setShowMenu(false) : setShowMenu(true);
        console.log('hhh');
    }
    return (
        <div>
            <FaAlignJustify size={25} onClick={Menu} />
            <div className={showMenu ? '' : 'hidden'}>
                <div className={cx(' w-40 h-screen bg-blue-50 border border-gray-500')}>
                    <Button to={route.sinhvien} navLink={true} className={cx('pl-4 pr-2 mt-8 pb-3 flex items-center ')}>
                        <FaUserGraduate className={cx('text-2xl mr-3')} /> Sinh Viên
                    </Button>
                    <Button to={route.giangvien} navLink={true} className={cx('pl-4 pr-2 pb-3 flex items-center ')}>
                        <FaUserTie className={cx('text-2xl mr-3')} />
                        Giảng viên
                    </Button>
                    <Button to={route.daotao} navLink={true} className={cx('pl-4 pr-2 pb-3 flex items-center ')}>
                        <FaUniversity className={cx('text-2xl mr-3')} />
                        Đào tạo
                    </Button>
                </div>
            </div>
        </div>
        // <div className={cx(' w-56 h-full bg-blue-50 border border-gray-500')}>
        //     <Button to={route.sinhvien} navLink={true} className={cx('pl-4 pr-2 mt-8 pb-3 flex items-center ')}>
        //         <FaUserGraduate className={cx('text-2xl mr-3')} /> Sinh Viên
        //     </Button>
        //     <Button to={route.giangvien} navLink={true} className={cx('pl-4 pr-2 pb-3 flex items-center ')}>
        //         <FaUserTie className={cx('text-2xl mr-3')} />
        //         Giảng viên
        //     </Button>
        //     <Button to={route.daotao} navLink={true} className={cx('pl-4 pr-2 pb-3 flex items-center ')}>
        //         <FaUniversity className={cx('text-2xl mr-3')} />
        //         Đào tạo
        //     </Button>
        // </div>
    );
}

export default Header;
