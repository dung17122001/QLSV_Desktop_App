import * as React from 'react';
import { Avatar } from '@mui/material';
import classNames from 'classnames';
import logo from '~/images/logo.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Menu1 from '../Menu/menu';
const cx = classNames;

function Header({ userLoginData }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                            <div>
                                <div
                                    className="text-sv-blue-4 font-bold"
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    {userLoginData?.tenNhanVien}
                                </div>
                                <Menu
                                    className="mt-4"
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>Thông tin tài khoản</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
                                </Menu>
                            </div>

                            <div className={cx('text-sm text-red-500')}>{userLoginData?.chucVu.tenChucVu}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full flex items-center justify-end">
                <div className="border-t border-gray-500 w-[100%]"></div>
            </div>
        </div>
    );
}

export default Header;
