import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TiCancel } from 'react-icons/ti';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import style from './KetQuaHocTap.module.scss';
import { getTatCaHocKy } from '~/services/hocKyService';
import { exportToExcel } from '~/function/exportToExcel';
import { getHocPhanTheoHocKy, getHocPhanTheoMaGVVaHK } from '~/services/hocPhanService';
import { getChiTietPhieuTheoMaLHP } from '~/services/pheuDangKyHP';
import {
    getLopHocPhanTheoMaHP,
    addLopHocPhan,
    addNhomTH,
    getNhomTHTheoMaHP,
    updateLopHocPhan,
    getLHPCuaGVTheoMaHK,
    getALLNhomTHTheoMaHP,
} from '~/services/lopHocPhanService';
import { getNhanVienTheoKhoa } from '~/services/nhanVienService';
import { getLichTheoLHP, themLich, updateLich } from '~/services/lichService';
import classNames from 'classnames/bind';
import HeaderQL from '../../../components/HeaderQL';
import nhanVienSlice from '../../../redux/Slice/nhanVienSlice';
import { tr } from 'date-fns/locale';
const cx = classNames.bind(style);

function LopHoc() {
    const navigate = useNavigate();
    const [listHocKy, setListHocKy] = useState();
    const [selectedOptionHK, setSelectedOptionHK] = useState('');
    const [selectedHocPhan, setSelectedHocPhan] = useState('');
    const [selectedLHP, setSelectedLHP] = useState('');
    const [listHocPhan, setListHocPhan] = useState();
    const [listLHP, setListLHP] = useState();
    const [listLichHoc, setListLichHoc] = useState();
    const [selectedLichHoc, setSelectedLichHoc] = useState('');
    const [listThongTinLHP, setThongTinLHP] = useState();
    const [selectedNhom, setSelectNhom] = useState('');
    const [listNhomTH, setListNhomTH] = useState();

    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const curNhanVien = useSelector((state) => state.persistedReducer.nhanVienSlice.currentNhanVien);
    //console.log(curNhanVien);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const handleSelectHK = async (e) => {
        setSelectedOptionHK(e.target.value);
        //console.log({ selectedOptionHK });
        if (!!e.target.value) {
            var dsHP = await getHocPhanTheoMaGVVaHK(curNhanVien?.maNhanVien, e.target.value, accessToken, axiosJWT);
            if (!!dsHP) setListHocPhan(dsHP);
            //console.log(listHocPhan);
        }
        // console.log(selectedOptionHK);
    };
    const handleSellectHocPhan = async (e) => {
        setSelectedHocPhan(e.target.value);
        if (!!e.target.value) {
            let result = await getLHPCuaGVTheoMaHK(
                curNhanVien.maNhanVien,
                selectedOptionHK,
                e.target.value,
                accessToken,
                axiosJWT,
            );
            if (!!result) setListLHP(result);
        }
    };

    const handleSelectLHP = async (e) => {
        setSelectedLHP(e.target.value);
        if (!!e.target.value) {
            let result = await getALLNhomTHTheoMaHP(e.target.value, accessToken, axiosJWT);
            if (!!result) setListNhomTH(result);
        }
    };

    const handelSelectNhomTH = async (e) => {
        setSelectNhom(e.target.value);
        let result = await getChiTietPhieuTheoMaLHP(selectedLHP, e.target.value, accessToken, axiosJWT);
        console.log(result);
        if (!!result) setThongTinLHP(result);
    };

    const handleExportExcel = () => {
        exportToExcel('data-nganh', 'Danh sách ngành học');
    };

    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        const getALLHocKy = async () => {
            const getTatCaHK = await getTatCaHocKy(accessToken, axiosJWT, dispatch);

            setListHocKy(getTatCaHK);
        };

        getALLHocKy();
    }, []);

    return (
        <div className="w-full h-full justify-center items-center ">
            <div className="w-full flex justify-center items-center mt-3">
                <div className="text-lg font-bold text-sv-blue-4">Quản lý kết quả của lớp học phần</div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
                <div className="flex flex-row items-center ">
                    <div className="w-24 text-left">
                        <label htmlFor="">Học kỳ:</label>
                    </div>
                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                        <select
                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedOptionHK}
                            onChange={(e) => handleSelectHK(e)}
                        >
                            {listHocKy?.map((item) => (
                                <option key={item.maHocKy} value={item.maHocKy}>
                                    {item.tenHocKy}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-row items-center ">
                    <div className="w-24 text-left">
                        <label htmlFor="">Học phần:</label>
                    </div>
                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                        <select
                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedHocPhan}
                            onChange={(e) => handleSellectHocPhan(e)}
                        >
                            <option value="">Học phần</option>
                            {listHocPhan?.map((item) => (
                                <option key={item.maHocPhan} value={item.maHocPhan}>
                                    {item.tenHocPhan}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-row items-center ">
                    <div className="w-32 text-left">
                        <label htmlFor="">Lớp học phần:</label>
                    </div>
                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                        <select
                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedLHP}
                            onChange={(e) => handleSelectLHP(e)}
                        >
                            <option value="">Lớp học phần</option>
                            {listLHP?.map((item) => (
                                <option key={item.maLopHocPhan} value={item.maLopHocPhan}>
                                    {item.maLopHocPhan} - {item.tenLopHocPhan}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
                {/* <div className="flex flex-row items-center ">
                    <div className="w-24 text-left">
                        <label htmlFor="">Học kỳ:</label>
                    </div>
                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                        <select
                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedOptionHK}
                            onChange={(e) => handleSelectHK(e)}
                        >
                            {listHocKy?.map((item) => (
                                <option key={item.maHocKy} value={item.maHocKy}>
                                    {item.tenHocKy}
                                </option>
                            ))}
                        </select>
                    </div>
                </div> */}
                <input
                    type="text"
                    className="block p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                    placeholder="Mã, tên LHP"
                    //value={valueSearch}
                    // onChange={(e) => {
                    //     setValueSearch(e.target.value);
                    // }}
                />
                <div className="ml-6">
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AiOutlineSearch />}
                        //onClick={() => onPressSearch(valueSearch)}
                    >
                        Tìm kiếm
                    </Button>
                </div>
                <div className="flex flex-row items-center ">
                    <div className="w-24 text-left ml-6">
                        <label htmlFor="">Nhóm:</label>
                    </div>
                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                        <select
                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedNhom}
                            onChange={(e) => handelSelectNhomTH(e)}
                        >
                            <option value="">Chọn nhóm</option>
                            {listNhomTH?.map((item) => (
                                <option key={item.maNhom} value={item.maNhom}>
                                    {item.tenNhom === 'Nhóm 0' ? 'Lý thuyết' : item.tenNhom}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="border border-gray-300 w-[96%]"></div>
            </div>
            <div className="w-full flex justify-start items-center mt-3 mr-11 ml-10">
                <div className="text-lg font-bold ">Danh sách học phần cần quản lý trong học kỳ</div>
            </div>
            <div style={{}} className=" mt-2 mr-11 ml-10">
                <div>
                    {/* <Button type="primary" onClick={handleExportExcel}>
                        Export Excel
                    </Button> */}
                    <div className="m-2">
                        <div className="overflow-y-auto max-h-[480px] ">
                            <table className={cx('table')} id="data">
                                <thead className="text-sv-blue-5">
                                    <tr className={cx(' bg-blue-100')}>
                                        <th rowSpan={3}>STT</th>
                                        <th colSpan={6}>Thông tin sinh viên</th>
                                        <th rowSpan={3}>Giữa kỳ</th>
                                        <th colSpan={5}>Thường xuyên</th>
                                        <th colSpan={3}>Thực hành</th>
                                        <th rowSpan={3}>
                                            Được
                                            <br /> dự thi
                                        </th>
                                        <th rowSpan={3}>Ghi chú</th>
                                    </tr>
                                    <tr className={cx(' bg-blue-100')}>
                                        <th colSpan={7}>LHP: {selectedLHP}</th>
                                        <th colSpan={5}>LT hệ số 1</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr className={cx(' bg-blue-100')}>
                                        <th>Mã sinh viên</th>
                                        <th>Tên sinh viên</th>
                                        <th>Giới tính</th>
                                        <th>Ngày sinh</th>
                                        <th>Lớp học</th>
                                        <th>Trạng thái ĐK</th>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {listThongTinLHP?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.phieuDangKyHocPhan.sinhVien.maSinhVien}</td>
                                            <td>{item.phieuDangKyHocPhan.sinhVien.tenSinhVien}</td>
                                            <td>
                                                {item.phieuDangKyHocPhan.sinhVien.gioiTinh === false ? 'Nữ' : 'Nam'}
                                            </td>
                                            <td>{convertDateFormat(item.phieuDangKyHocPhan.sinhVien.ngaySinh)}</td>
                                            <td>{item.phieuDangKyHocPhan.sinhVien.lopHoc.tenLop}</td>
                                            <td>{item.loaiDangKyHP.tenLoaiDKHP}</td>
                                            <td align="center">
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-7 caret-sv-blue-4 text-sm w-12 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td align="center">
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-green-500 cursor-pointer"
                                                    //checked={item.isChecked}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-12 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                                    //placeholder="Sỉ số"
                                                    // value={siSo}
                                                    // onChange={(e) => {
                                                    //     setSiSo(e.target.value);
                                                    // }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LopHoc;
