import classNames from 'classnames';

import Button from '~/components/Button';
import config from '~/routes/configRoutes';
import Dropdown from '~/components/Dropdown';
import { VscGroupByRefType } from 'react-icons/vsc';
import { useState } from 'react';
import { GiTicket, GiTheater, GiPopcorn } from 'react-icons/gi';
import { FaUserGraduate, FaUserTie, FaUniversity, FaAlignJustify } from 'react-icons/fa';
import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillDoorOpenFill, BsFillBookFill } from 'react-icons/bs';
import MenuItem from '../../../components/ItemMenu';

const cx = classNames;
function Header() {
    const route = config.routeConfig;
    const [showMenu, setShowMenu] = useState(true);
    function Menu() {
        showMenu ? setShowMenu(false) : setShowMenu(true);
        console.log('hhh');
    }
    return (
        <div className=" w-40 ">
            <FaAlignJustify size={25} onClick={Menu} />
            <div className={showMenu ? '' : 'hidden'}>
                {/* <div className={cx(' w-40 h-screen bg-blue-50 border border-gray-500')}>
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
                    <Dropdown
                        renderButton={() => {
                            return (
                                <>
                                    <GiTheater className={cx('text-2xl mr-3')} /> Rạp chiếu
                                </>
                            );
                        }}
                    >
                        <Button to={route.cumRap} navLink={true} className={cx('pl-4 pr-2 pb-3 flex items-center ')}>
                            <VscGroupByRefType className={cx('text-2xl mr-3')} /> Cụm rạp
                        </Button>
                        <Button
                            to={route.phongChieu}
                            navLink={true}
                            className={cx('pl-4 pr-2 pb-3 flex items-center ')}
                        >
                            <GiTheater className={cx('text-2xl mr-3')} /> Phòng chiếu
                        </Button>
                    </Dropdown>
                </div> */}
                <div className="border border-gray-500 mt-2 ">
                    <div className={cx('menu flex items-center')}>
                        <div className={cx('flex flex-row items-center ')}>
                            <Button to={route.sinhvien} navLink={true} className={' flex items-center '}>
                                <FaUserGraduate size={20} className={cx('')} /> <div className="ml-2">Sinh Viên</div>
                            </Button>
                        </div>
                    </div>
                    <div className={cx('menu flex items-center')}>
                        <div className={cx('flex flex-row items-center ')}>
                            <Button to={route.giangvien} navLink={true} className={cx(' flex items-center ')}>
                                <FaUserTie size={20} className={cx('')} />
                                <div className="ml-2">Giảng viên</div>
                            </Button>
                        </div>
                    </div>
                    <div className={cx('menu flex  items-center active:text-sv-yellow-2')}>
                        <MenuItem
                            menuItems={[
                                {
                                    name: 'Học phần',
                                    subItems: [
                                        { name: 'Môn học', to: 'dao-tao/mon-hoc', icon: <BsFillBookFill /> },
                                        { name: 'Lớp học', to: 'dao-tao/lop-hoc', icon: <BsFillDoorOpenFill /> },
                                        { name: 'Ngành', to: 'dao-tao/nganh', icon: <FaUniversity /> },
                                    ],
                                },
                            ]}
                            icon={<FaUniversity />}
                        ></MenuItem>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
