import { Avatar } from '@mui/material';
import classNames from 'classnames';
import logo from '~/images/logo.png';

const cx = classNames;

function Header() {
    return (
        <div>
            <div className="flex flex-row items-center ">
                <div className={cx(' flex justify-center items-center ml-2')}>
                    <img src={logo} alt="logo" className={cx('')} />
                </div>
                <div className={cx('w-full bg-white flex p-3 justify-end items-center pr-4 ')}>
                    <div className="flex flex-row items-center cursor-pointer">
                        <Avatar>NV</Avatar>

                        <div className="flex flex-col items-start ml-4">
                            <div className="flex w-52 border  border-sv-blue-4 rounded-lg p-1 text-sm">
                                <select
                                    className="text-sv-text-2 w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value=""
                                >
                                    <option>Nguyễn văn Đúng</option>
                                    <option>Cập nhật</option>
                                    <option>Đăng xuất</option>
                                </select>
                            </div>

                            <div className={cx('text-sm')}>Nhân viên</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full flex items-center justify-center">
                <div className="border-t border-gray-500 w-[95%]"></div>
            </div>
        </div>
    );
}

export default Header;
