import classNames from 'classnames';

import Button from '~/components/Button';
import config from '~/routes/configRoutes';

import { FaUserGraduate, FaUserTie, FaUniversity } from 'react-icons/fa';

const cx = classNames;
function Header() {
    const route = config.routeConfig;

    return (
        <div className={cx(' w-56 h-full bg-blue-50 border border-gray-500')}>
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

            {/* <Dropdown
                renderButton={() => {
                    return (
                        <>
                            <BiFilm className={cx('text-2xl mr-3')} /> Phim
                        </>
                    );
                }}
            >
                <Button to={route.movie} navLink={true} className={cx('pl-4 pr-2 pb-3 flex items-center ')}>
                    <BiFilm className={cx('text-2xl mr-3')} /> Phim
                </Button>
                <Button to={route.lichChieu} navLink={true} className={cx('pl-4 pr-2 pb-3 flex items-center ')}>
                    <AiTwotoneCalendar className={cx('text-2xl mr-3')} /> Lịch chiếu
                </Button>
            </Dropdown> */}
        </div>
    );
}

export default Header;
