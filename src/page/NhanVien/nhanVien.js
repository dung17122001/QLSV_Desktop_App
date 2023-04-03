import React, { useState, useEffect } from 'react';
import HeaderQL from '../../components/HeaderQL/HeaderQL';

import { Avatar, Button, Link } from '@mui/material';
import { IoIosAddCircle } from 'react-icons/io';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import { themNhanVien, timKiemNhanVien } from '../../services/nhanVienService';
import { capNhatNhanVien } from '../../services/nhanVienService';

import { TiCancel } from 'react-icons/ti';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { getTatCaKhoa } from '../../services/khoaService';
import { getTatCaChucVu } from '../../services/chucVuService';
import { register } from '../../services/authService';
import { getTatCaNhanVien } from '../../services/nhanVienService';
import { exportToExcel } from './exportToExcel';
import classNames from 'classnames/bind';
import style from './NhanVien.module.scss';
function GiangVien() {
    let [listKhoa, setListKhoa] = useState([]);
    let [listChucVu, setListChucVu] = useState([]);
    const cx = classNames.bind(style);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [open, setOpen] = useState(false);
    const [tenNhanVien, setTenNhanVien] = useState('');
    const [maNhanVien, setMaNhanVien] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');

    const [ngaySinh, setNgaySinh] = useState('');
    const [email, setEmail] = useState('');
    const [khoa, setKhoa] = useState('null');
    const [chucVu, setChucVu] = useState('null');
    const [soCCCD, setsoCCCD] = useState('');
    const [ngayCapCCCD, setNgayCapCCCD] = useState('');
    const [noiCapCCCD, setNoiCapCCCD] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [noiSinh, setNoiSinh] = useState('');
    const [doiTuong, setDoiTuong] = useState('');
    const [ngayVaoDoan, setNgayVaoDoan] = useState('');
    const [ngayVaoDang, setNgayVaoDang] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [linkAnh, setLinkAnh] = useState('');

    let nhanVien = {
        maNhanVien,
        diaChi,
        doiTuong,
        email,
        ngayCapCCCD,
        ngaySinh,
        ngayVaoDang,
        ngayVaoDoan,
        noiCapCCCD,
        noiSinh,
        soDienThoai,
        gioiTinh,
        tenNhanVien,
        trangThai,
        chucVu,
        soCCCD,
        khoa,
    };

    const [listNV, setListNV] = useState();
    const [selectedNhanVien, setSelectedNhanVien] = useState('');
    useEffect(() => {
        const getALLKhoa = async () => {
            try {
                const getKhoa = await getTatCaKhoa(accessToken, axiosJWT, dispatch);
                setListKhoa(getKhoa);
            } catch (error) {
                console.log(error);
            }
        };
        getALLKhoa();
    }, []);

    useEffect(() => {
        const getALLChucVu = async () => {
            try {
                const getChucVu = await getTatCaChucVu(accessToken, axiosJWT, dispatch);
                setListChucVu(getChucVu);
            } catch (error) {
                console.log(error);
            }
        };
        getALLChucVu();
    }, []);

    useEffect(() => {
        let getALLNhanVien = async () => {
            let getTatCaNV = await getTatCaNhanVien(accessToken, axiosJWT, dispatch);

            setListNV(getTatCaNV);
        };
        getALLNhanVien();
    }, []);
    const reload = async () => {
        let getTatCaNV = await getTatCaNhanVien(accessToken, axiosJWT, dispatch);

        setListNV(getTatCaNV);
    };

    const handleClickOpenCapNhat = () => {
        if (!!selectedNhanVien) {
            setTenNhanVien(selectedNhanVien.tenNhanVien);
            setMaNhanVien(selectedNhanVien.maNhanVien);
            setSoDienThoai(selectedNhanVien.soDienThoai);
            setGioiTinh(selectedNhanVien.gioiTinh);
            setNgaySinh(selectedNhanVien.ngaySinh);
            setEmail(selectedNhanVien.email);
            setKhoa(selectedNhanVien.khoa?.maKhoa);
            setChucVu(selectedNhanVien.chucVu?.maChucVu);
            setsoCCCD(selectedNhanVien.soCCCD);
            setNgayCapCCCD(selectedNhanVien.ngayCapCCCD);
            setNoiCapCCCD(selectedNhanVien.noiCapCCCD);
            setDiaChi(selectedNhanVien.diaChi);
            setNoiSinh(selectedNhanVien.noiSinh);
            setDoiTuong(selectedNhanVien.doiTuong);
            setNgayVaoDoan(selectedNhanVien.ngayVaoDoan);
            setNgayVaoDang(selectedNhanVien.ngayVaoDang);
            setTrangThai(selectedNhanVien.trangThai);
            setLinkAnh(selectedNhanVien.linkAnh);
            setOpen(true);
        } else {
            alert('Vui lòng chọn nhân viên');
        }
    };
    const xoaTrang = () => {
        setTenNhanVien('');

        setSoDienThoai('');
        setGioiTinh('');
        setNgaySinh('');
        setEmail('');
        setKhoa('');
        setChucVu('');
        setsoCCCD('');
        setNgayCapCCCD('');
        setNoiCapCCCD('');
        setDiaChi('');
        setNoiSinh('');
        setDoiTuong('');
        setNgayVaoDoan('');
        setNgayVaoDang('');
        setTrangThai('');
        setLinkAnh('');
    };
    const handleClickOpenThem = () => {
        setMaNhanVien('');
        setSelectedNhanVien('');
        xoaTrang();
        setOpen(true);
        console.log(selectedNhanVien);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectNhanVien = (item) => {
        setSelectedNhanVien(item);
    };
    const luuNhanVien = async () => {
        console.log(nhanVien);
        if (!!selectedNhanVien) {
            nhanVien.maNhanVien = selectedNhanVien.maNhanVien;

            let suaNhanVien = await capNhatNhanVien(nhanVien, accessToken, axiosJWT);

            if (suaNhanVien) {
                setOpen(false);
                alert('Cập nhật thành công');
                reload();
            }
        } else {
            let role = '';
            let addNhanVien = await themNhanVien(nhanVien, accessToken, axiosJWT);
            console.log(addNhanVien);
            if (addNhanVien.chucVu.maChucVu === 'CV001') {
                role = 'ROLE_QUANLY';
            } else if (addNhanVien.chucVu.maChucVu === 'CV002') {
                role = 'ROLE_PHONGDAOTAO';
            } else {
                role = 'ROLE_GIANGVIEN';
            }
            const nhanVienRegister = { username: addNhanVien.maNhanVien, password: '123456', role: role };

            console.log(nhanVienRegister);
            await register(nhanVienRegister);
            if (addNhanVien && nhanVienRegister) {
                setOpen(false);
                alert('Thêm thành công');
                reload();
            }
        }
    };

    const handleClickSearch = async (value) => {
        const timNhanVien = await timKiemNhanVien(value, accessToken, axiosJWT);
        setListNV(timNhanVien);
    };
    function handleSelectGT(event) {
        setGioiTinh(event.target.value);
    }
    function handleSelectTrangThai(event) {
        setTrangThai(event.target.value);
    }

    function handleSelectKhoa(event) {
        setKhoa(event.target.value);
    }
    function handleSelectChucVu(event) {
        setChucVu(event.target.value);
    }

    const handleClick = () => {
        exportToExcel('data-nv', 'Danh sách nhân viên');
    };

    return (
        <div className="h-full mt-5 w-full">
            <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý giảng viên</div>
            <HeaderQL
                placeholder="Mã, tên giảng viên"
                onPressSearch={handleClickSearch}
                onPressAdd={handleClickOpenThem}
                onPressUpdate={handleClickOpenCapNhat}
                onChangeSearch={handleClickSearch}
            ></HeaderQL>

            <div className="h-3/4 mr-11 ml-10">
                <div>
                    <Button type="primary" onClick={handleClick}>
                        Export Excel
                    </Button>
                    <div className="m-2">
                        <div className="">
                            <table className={cx('table-SV')} id="data-nv">
                                <thead className="text-sv-blue-5">
                                    <tr className={cx(' bg-blue-100')}>
                                        <th></th>
                                        <th className={cx('')}>STT</th>
                                        <th className={cx('')}>Mã số nhân viên</th>
                                        <th className={cx('')}>Họ tên</th>
                                        <th className={cx('')}>Giới tính</th>
                                        <th className={cx('')}>Ngày sinh</th>

                                        <th>Khoa</th>
                                        <th>Chức vụ</th>
                                        <th className={cx('')}>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listNV?.map((item, index) => (
                                        <tr
                                            key={item.maNhanVien}
                                            onClick={() => handleSelectNhanVien(item)}
                                            className={`${
                                                selectedNhanVien.maNhanVien === `${item.maNhanVien}`
                                                    ? 'bg-orange-200'
                                                    : ''
                                            } hover:cursor-pointer`}
                                        >
                                            <td>
                                                <input
                                                    type="radio"
                                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                    name="radio-group-mon"
                                                    value={item.maNhanVien}
                                                    checked={selectedNhanVien.maNhanVien === `${item.maNhanVien}`}
                                                    onChange={() => handleSelectNhanVien(item)}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.maNhanVien}</td>
                                            <td align="left">{item.tenNhanVien}</td>
                                            <td>{item.gioiTinh ? 'Nam' : 'Nữ'}</td>
                                            <td>{item.ngaySinh}</td>
                                            <td align="left">{item.khoa?.tenKhoa}</td>
                                            <td align="left">{item.chucVu.tenChucVu}</td>

                                            <td>{item.trangThai}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog fullWidth={'100%'} maxWidth={'100%'} open={open} onClose={handleClose}>
                <div className="w-full flex justify-between mt-5 border-b-2">
                    <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin giảng viên</div>
                    <div>
                        <FaRegWindowClose className="mr-5" size={30} color="#47A9FF" onClick={handleClose} />
                    </div>
                </div>
                <DialogContent>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    ></Box>
                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Mã giảng viên:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Mã giảng viên tự động tạo"
                                disabled
                                value={maNhanVien}
                                onChange={(e) => {
                                    setMaNhanVien(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Họ và tên:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Họ và tên"
                                value={tenNhanVien}
                                onChange={(e) => {
                                    setTenNhanVien(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ảnh:</label>
                            </div>
                            <input
                                type="file"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Link ảnh"
                                value={linkAnh}
                                onChange={(e) => {
                                    setLinkAnh(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Số điện thoại:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                value={soDienThoai}
                                onChange={(e) => {
                                    setSoDienThoai(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Giới tính:</label>
                            </div>
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value={gioiTinh}
                                    onChange={handleSelectGT}
                                >
                                    <option value="null">Giới tính</option>
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày sinh:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                value={ngaySinh}
                                onChange={(e) => {
                                    setNgaySinh(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Email:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Khoa:</label>
                            </div>
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value={khoa}
                                    onChange={handleSelectKhoa}
                                >
                                    <option value="">Khoa</option>
                                    {listKhoa.map((option) => (
                                        <option key={option.maKhoa} value={option.maKhoa}>
                                            {option.tenKhoa}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Chức vụ:</label>
                            </div>
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value={chucVu}
                                    onChange={handleSelectChucVu}
                                >
                                    <option value="">Chức vụ</option>
                                    {listChucVu.map((option) => (
                                        <option key={option.maChucVu} value={option.maChucVu}>
                                            {option.tenChucVu}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Số CCCD:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số CCCD"
                                value={soCCCD}
                                onChange={(e) => {
                                    setsoCCCD(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày cấp CCCD:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Ngày cấp căn cước công dân"
                                value={ngayCapCCCD}
                                onChange={(e) => {
                                    setNgayCapCCCD(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Nơi cấp:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Nơi cấp"
                                value={noiCapCCCD}
                                onChange={(e) => {
                                    setNoiCapCCCD(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Địa chỉ:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Địa chỉ"
                                value={diaChi}
                                onChange={(e) => {
                                    setDiaChi(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Nơi sinh:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Nơi sinh"
                                value={noiSinh}
                                onChange={(e) => {
                                    setNoiSinh(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Đối tượng:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Đối tượng"
                                value={doiTuong}
                                onChange={(e) => {
                                    setDoiTuong(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào đoàn:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                //placeholder="Mã hồ sơ"
                                value={ngayVaoDoan}
                                onChange={(e) => {
                                    setNgayVaoDoan(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào Đảng:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                //placeholder="Mã giảng viên"
                                value={ngayVaoDang}
                                onChange={(e) => {
                                    setNgayVaoDang(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Trạng thái:</label>
                            </div>
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value={trangThai}
                                    onChange={handleSelectTrangThai}
                                >
                                    <option value="Bình thường">Bình thường</option>
                                    <option value="Tạm ngưng">Tạm ngưng</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-center p-3">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<AiFillSave />}
                            color="success"
                            onClick={() => {
                                luuNhanVien();
                            }}
                        >
                            Lưu
                        </Button>
                        <div className="ml-6">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<BsFillEraserFill />}
                                color="success"
                                onClick={() => xoaTrang()}
                            >
                                Xóa trắng
                            </Button>
                        </div>
                        <div className="ml-6">
                            <Button
                                variant="contained"
                                size="small"
                                color="error"
                                startIcon={<TiCancel />}
                                //onClick={() => onPressSearch(valueSearch)}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default GiangVien;
