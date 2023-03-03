import classNames from 'classnames';

import Button from '~/components/Button';
import config from '~/routes/configRoutes';
import Dropdown from '~/components/Dropdown';
import { VscGroupByRefType } from 'react-icons/vsc';
import { useState } from 'react';
import { GiTicket, GiTheater, GiPopcorn } from 'react-icons/gi';
import { FaUserGraduate, FaUserTie, FaUniversity, FaAlignJustify, FaBook } from 'react-icons/fa';
import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { BiBuildings } from 'react-icons/bi';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillDoorOpenFill, BsFillBookFill, BsHouseDoorFill } from 'react-icons/bs';
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
        <div className=" w-40">
            <FaAlignJustify size={25} onClick={Menu} />
            <div className={showMenu ? '' : 'hidden'}>
                <div className="border rounded-lg border-gray-500 mt-2 ">
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
                    <div className={cx('menu flex items-center')}>
                        <div className={cx('flex flex-row items-center ')}>
                            <Button to={route.khoa} navLink={true} className={cx(' flex items-center ')}>
                                <IoLibrary size={20} className={cx('')} />
                                <div className="ml-2">Khoa</div>
                            </Button>
                        </div>
                    </div>
                    <div className={cx('menu flex  items-center active:text-sv-yellow-2')}>
                        <MenuItem
                            menuItems={[
                                {
                                    name: 'Đào tạo',
                                    subItems: [
                                        { name: 'Môn học', to: 'dao-tao/mon-hoc', icon: <BsFillBookFill /> },
                                        {
                                            name: 'Lớp học phần',
                                            to: 'dao-tao/lop-hoc-phan',
                                            icon: <BsFillDoorOpenFill />,
                                        },
                                        { name: 'Ngành', to: 'dao-tao/nganh', icon: <FaUniversity /> },
                                        { name: 'Điểm', to: 'dao-tao/diem', icon: <FaUniversity /> },
                                    ],
                                },
                            ]}
                            icon={<FaBook />}
                        ></MenuItem>
                    </div>
                    <div className={cx('menu flex  items-center active:text-sv-yellow-2')}>
                        <MenuItem
                            menuItems={[
                                {
                                    name: 'Cơ sở vật chất',
                                    subItems: [
                                        { name: 'Dãy nhà', to: 'co-so-vat-chat/day-nha', icon: <BiBuildings /> },
                                        {
                                            name: 'Phòng học',
                                            to: 'co-so-vat-chat/phong-hoc',
                                            icon: <BsHouseDoorFill />,
                                        },
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
