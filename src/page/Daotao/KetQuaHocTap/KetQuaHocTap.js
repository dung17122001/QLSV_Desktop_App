import React, { useState, useEffect, useRef } from 'react';
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
    getThongTinSVByMaLHP,
    addBangDiem,
    updateBangDiem,
    getLopHocPhanByTextSearch,
} from '~/services/lopHocPhanService';
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
    const [listThongTinLHP, setListThongTinLHP] = useState();
    const [selectedNhom, setSelectNhom] = useState('');
    const [listNhomTH, setListNhomTH] = useState();
    const [listDiemLHP, setListDiemLHP] = useState();
    const diemRef = useRef(null); // Khởi tạo ref
    const [resultSearchLHP, setResultSearch] = useState();

    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const curNhanVien = useSelector((state) => state.persistedReducer.nhanVienSlice.currentNhanVien);
    //console.log(curNhanVien);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    // Tạo state để lưu trữ danh sách điểm của sinh viên
    const [diemSinhVienList, setDiemSinhVienList] = useState([]);
    //console.log(listThongTinLHP);
    const handleLuuBangDiem = async () => {
        for (let i = 0; i < listThongTinLHP.length; i++) {
            let diemSV = [];
            if (listThongTinLHP[i]?.loaiDangKyHP?.maLoaiDKHP === 'LDK002') {
                diemSV = listDiemLHP?.filter(
                    (e) =>
                        e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien &&
                        e.trangThai !== 'Học lại',
                );
            } else if (listThongTinLHP[i]?.loaiDangKyHP?.maLoaiDKHP === 'LDK003') {
                diemSV = listDiemLHP?.filter(
                    (e) =>
                        e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien &&
                        e.trangThai !== 'Học cải thiện',
                );
            } else {
                diemSV = listDiemLHP?.filter(
                    (e) => e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien,
                );
            }
            //console.log(listThongTinLHP[i]);
            let bangDiem = {
                maBangDiem: diemSV[0]?.maBangDiem,
                sinhVien: listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien,
                hocPhan: listThongTinLHP[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                thuongKy1: listThongTinLHP[i].thuongKy1 !== '' ? listThongTinLHP[i].thuongKy1 : diemSV[0]?.thuongKy1,
                thuongKy2: listThongTinLHP[i].thuongKy2 !== '' ? listThongTinLHP[i].thuongKy2 : diemSV[0]?.thuongKy2,
                thuongKy3: listThongTinLHP[i].thuongKy3 !== '' ? listThongTinLHP[i].thuongKy3 : diemSV[0]?.thuongKy3,
                thuongKy4: listThongTinLHP[i].thuongKy4 !== '' ? listThongTinLHP[i].thuongKy4 : diemSV[0]?.thuongKy4,
                thuongKy5: listThongTinLHP[i].thuongKy5 !== '' ? listThongTinLHP[i].thuongKy5 : diemSV[0]?.thuongKy5,
                thucHanh1: listThongTinLHP[i].thucHanh1 !== '' ? listThongTinLHP[i].thucHanh1 : diemSV[0]?.thucHanh1,
                thucHanh2: listThongTinLHP[i].thucHanh2 !== '' ? listThongTinLHP[i].thucHanh2 : diemSV[0]?.thucHanh2,
                thucHanh3: listThongTinLHP[i].thucHanh3 !== '' ? listThongTinLHP[i].thucHanh3 : diemSV[0]?.thucHanh3,
                giuaKy: listThongTinLHP[i].giuaKy !== '' ? listThongTinLHP[i].giuaKy : diemSV[0]?.giuaKy,
                cuoiKy: listThongTinLHP[i].cuoiKy !== '' ? listThongTinLHP[i].cuoiKy : diemSV[0]?.cuoiKy,
            };
            if (!!bangDiem.cuoiKy && bangDiem.cuoiKy !== '') {
                let soTCLT = listThongTinLHP[i].nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCLT;
                let soTCTH = listThongTinLHP[i].nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCTH;

                let diemTongKet = tinhDiemTongKet(
                    bangDiem.thuongKy1,
                    bangDiem.thuongKy2,
                    bangDiem.thuongKy3,
                    bangDiem.thuongKy4,
                    bangDiem.thuongKy5,
                    bangDiem.giuaKy,
                    bangDiem.cuoiKy,
                    bangDiem.thucHanh1,
                    bangDiem.thucHanh2,
                    bangDiem.thucHanh3,
                    soTCLT,
                    soTCTH,
                );
                bangDiem = { ...bangDiem, diemTongKet: diemTongKet, trangThai: setTrangThaiHocPhan(diemTongKet) };
            }

            console.log(bangDiem);
            if (
                !diemSV[0]?.thuongKy1 &&
                !diemSV[0]?.thuongKy2 &&
                !diemSV[0]?.thuongKy3 &&
                !diemSV[0]?.thuongKy4 &&
                !diemSV[0]?.thuongKy5 &&
                !diemSV[0]?.thucHanh1 &&
                !diemSV[0]?.thucHanh1 &&
                !diemSV[0]?.thucHanh3 &&
                !diemSV[0]?.giuaKy &&
                !diemSV[0]?.cuoiKy
            )
                await addBangDiem(bangDiem, accessToken, axiosJWT);
            else {
                await updateBangDiem(bangDiem, accessToken, axiosJWT);
                // console.log(bangDiem);
                // console.log('okkkk');
            }
        }
        let resultBangDiem = await getThongTinSVByMaLHP(selectedLHP, curNhanVien?.maNhanVien, accessToken, axiosJWT);
        //console.log(resultBangDiem);
        if (!!resultBangDiem) setListDiemLHP(resultBangDiem);
        alert('Đã lưu');
    };

    const tinhDiemTongKet = (tk1, tk2, tk3, tk4, tk5, gk, ck, th1, th2, th3, soTCLT, soTCTH) => {
        if (ck < 3) return 0;
        let countTK = 0;
        let diemTongKet = 0;
        if (tk1 !== null && tk1 !== '') countTK++;
        if (tk2 !== null && tk2 !== '') countTK++;
        if (tk3 !== null && tk3 !== '') countTK++;
        if (tk4 !== null && tk4 !== '') countTK++;
        if (tk5 !== null && tk5 !== '') countTK++;
        let tbTK =
            ((tk1 ? tk1 : 0) * 1 +
                (tk2 ? tk2 : 0) * 1 +
                (tk3 ? tk3 : 0) * 1 +
                (tk4 ? tk4 : 0) * 1 +
                (tk5 ? tk5 : 0) * 1) /
            countTK;
        let countTH = 0;
        if (th1 !== null && th1 !== '') countTH++;
        if (th2 !== null && th2 !== '') countTH++;
        if (th3 !== null && th3 !== '') countTH++;
        let tbTH = ((th1 ? th1 : 0) * 1 + (th2 ? th2 : 0) * 1 + (th3 ? th3 : 0) * 1) / countTH;
        // console.log(tbTK + 'tbTK');
        // console.log(tbTH + 'th');
        if (soTCTH > 0) {
            if (soTCLT > 0)
                diemTongKet = ((tbTK * 0.2 + gk * 0.3 + ck * 0.5) * soTCLT + tbTH * soTCTH) / (soTCLT + soTCTH);
            else diemTongKet = tbTH / countTH;
        } else diemTongKet = tbTK * 0.2 + gk * 0.3 + ck * 0.5;

        return diemTongKet.toFixed(1);
    };

    const handleGetDiemSV = (item, index, cot, value) => {
        //console.log(value);
        const temp = [...listThongTinLHP];
        let valueTemp = {};
        if (temp[index].phieuDangKyHocPhan.sinhVien.maSinhVien === item.phieuDangKyHocPhan.sinhVien.maSinhVien) {
            temp[index][cot] = value;
        }
        setListThongTinLHP(temp);
    };

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
        setListThongTinLHP();
        setListDiemLHP();
        setSelectedLHP(e.target.value);
        if (!!e.target.value) {
            let result = await getALLNhomTHTheoMaHP(e.target.value, accessToken, axiosJWT);
            if (!!result) setListNhomTH(result);
        }
    };

    const handelSelectNhomTH = async (e) => {
        setSelectNhom(e.target.value);

        // let resultBangDiem = await getThongTinSVByMaLHP(
        //     e.target.value,

        //     accessToken,
        //     axiosJWT,
        // );
        // //console.log(resultBangDiem);
        // if (!!resultBangDiem) setListDiemLHP(resultBangDiem);
    };

    const handleExportExcel = () => {
        exportToExcel('data', 'Danh điểm thành phần của lớp ' + selectedLHP);
    };

    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const renderThongTinSinhVien = () => {
        var listRow = [];
        //console.log(listDiemLHP);
        if (!!listThongTinLHP && listThongTinLHP.length > 0) {
            for (let i = 0; i < listThongTinLHP?.length; i++) {
                let diem = {};
                if (listThongTinLHP[i]?.loaiDangKyHP?.maLoaiDKHP === 'LDK002') {
                    diem = listDiemLHP?.find(
                        (e) =>
                            e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien &&
                            e.trangThai !== 'Học lại',
                    );
                } else if (listThongTinLHP[i]?.loaiDangKyHP?.maLoaiDKHP === 'LDK003') {
                    diem = listDiemLHP?.find(
                        (e) =>
                            e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien &&
                            e.trangThai !== 'Học cải thiện',
                    );
                } else {
                    diem = listDiemLHP?.find(
                        (e) => e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien,
                    );
                }
                var Comp = (
                    <tr>
                        <td>{i + 1}</td>
                        <td>{listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien}</td>
                        <td align="left">{listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.tenSinhVien}</td>
                        <td>{listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.gioiTinh === false ? 'Nữ' : 'Nam'}</td>
                        <td>{convertDateFormat(listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.ngaySinh)}</td>
                        <td>{listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.lopHoc.tenLop}</td>
                        <td>{listThongTinLHP[i].loaiDangKyHP.tenLoaiDKHP}</td>
                        <td align="center">
                            <input
                                type="text"
                                className="text-center block p-1 h-7 caret-sv-blue-4 text-sm w-12 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                //defaultValue={diem?.giuaKy}
                                placeholder={diem?.giuaKy || '_'}
                                value={listThongTinLHP[i].giuaKy || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'giuaKy', newValue);
                                }}
                            />
                        </td>
                        <td align="center">
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.thuongKy1 || '_'}
                                value={listThongTinLHP[i].thuongKy1 || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'thuongKy1', newValue);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.thuongKy2 || '_'}
                                value={listThongTinLHP[i].thuongKy2 || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'thuongKy2', newValue);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.thuongKy3 || '_'}
                                value={listThongTinLHP[i].thuongKy3 || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'thuongKy3', newValue);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.thuongKy4 || '_'}
                                value={listThongTinLHP[i].thuongKy4 || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'thuongKy4', newValue);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.thuongKy5 || '_'}
                                value={listThongTinLHP[i].thuongKy5 || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'thuongKy5', newValue);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.thucHanh1 || '_'}
                                value={listThongTinLHP[i].thucHanh1 || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'thucHanh1', newValue);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.thucHanh2 || '_'}
                                value={listThongTinLHP[i].thucHanh2 || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'thucHanh2', newValue);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-6 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.thucHanh3 || '_'}
                                value={listThongTinLHP[i].thucHanh3 || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'thucHanh3', newValue);
                                }}
                            />
                        </td>
                        <td align="center">
                            <input
                                type="text"
                                className="text-center block p-1 h-5 caret-sv-blue-4 text-sm w-8 rounded-md bg-transparent outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder={diem?.cuoiKy || '_'}
                                value={listThongTinLHP[i].cuoiKy || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleGetDiemSV(listThongTinLHP[i], i, 'cuoiKy', newValue);
                                }}
                            />
                        </td>

                        <td align="center">
                            {!!diem?.diemTongKet || diem?.diemTongKet === 0 ? diem?.diemTongKet : ''}
                        </td>
                        <td>
                            {!!diem?.diemTongKet || diem?.diemTongKet === 0
                                ? chuyenDoiDiemHe10SangHe4(diem.diemTongKet)
                                : ''}
                        </td>
                        <td>
                            {!!diem?.diemTongKet || diem?.diemTongKet === 0
                                ? chuyenDoiDiemHe10SangHe4Chu(diem.diemTongKet)
                                : ''}
                        </td>
                        <td>
                            {!!diem?.diemTongKet || diem?.diemTongKet === 0 ? xepLoaiBangDiem(diem?.diemTongKet) : ''}
                        </td>
                    </tr>
                );
                listRow.push(Comp);
            }
            if (listRow.length > 0) return listRow;
        }
        return <></>;
    };

    function xepLoaiBangDiem(diemHe10) {
        if (diemHe10 >= 9) {
            return 'Xuất sắc';
        } else if (diemHe10 >= 8) {
            return 'Giỏi';
        } else if (diemHe10 >= 6.5) {
            return 'Khá';
        } else if (diemHe10 >= 5) {
            return 'Trung bình';
        } else if (diemHe10 >= 4) return 'TB yếu';
        else {
            return 'Yếu';
        }
    }

    function chuyenDoiDiemHe10SangHe4Chu(diemHe10) {
        let diemHe4 = '';
        if (diemHe10 >= 9) {
            diemHe4 = 'A+';
        } else if (diemHe10 >= 8.5) {
            diemHe4 = 'A';
        } else if (diemHe10 >= 8) {
            diemHe4 = 'B+';
        } else if (diemHe10 >= 7) {
            diemHe4 = 'B';
        } else if (diemHe10 >= 6.5) {
            diemHe4 = 'C+';
        } else if (diemHe10 >= 5.5) {
            diemHe4 = 'C';
        } else if (diemHe10 >= 5) {
            diemHe4 = 'D+';
        } else if (diemHe10 >= 4) {
            diemHe4 = 'D';
        } else {
            diemHe4 = 'F';
        }
        return diemHe4;
    }

    function chuyenDoiDiemHe10SangHe4(diemHe10) {
        if (diemHe10 >= 9) {
            return 4;
        } else if (diemHe10 >= 8.5) {
            return 3.8;
        } else if (diemHe10 >= 8) {
            return 3.5;
        } else if (diemHe10 >= 7) {
            return 3;
        } else if (diemHe10 >= 6.5) {
            return 2.8;
        } else if (diemHe10 >= 6) {
            return 2.5;
        } else if (diemHe10 >= 5.5) {
            return 2;
        } else if (diemHe10 >= 5) {
            return 1.5;
        } else if (diemHe10 >= 4) {
            return 1;
        } else {
            return 0;
        }
    }

    const setTrangThaiHocPhan = (diem) => {
        if (diem >= 4) return 'Đạt';
        else return 'Không đạt';
    };

    const handleTimKIem = async () => {
        let result = await getLopHocPhanByTextSearch(resultSearchLHP, accessToken, axiosJWT);

        if (result.length > 0) {
            setSelectedHocPhan(result[0].hocPhan.maHocPhan);
            setSelectedLHP(result[0].maLopHocPhan);
        }
    };

    useEffect(() => {
        const getALLHocKy = async () => {
            const getTatCaHK = await getTatCaHocKy(accessToken, axiosJWT, dispatch);

            setListHocKy(getTatCaHK);
        };

        getALLHocKy();
    }, []);
    useEffect(() => {
        const getBangDiem = async () => {
            let resultBangDiem = await getThongTinSVByMaLHP(
                selectedLHP,
                curNhanVien?.maNhanVien,
                accessToken,
                axiosJWT,
            );
            //let diemSV = resultBangDiem.filter((e) => e.trangThai !== 'Học lại' && e.trangThai !== 'Học cải thiện');
            //console.log(diemSV);
            if (!!resultBangDiem) setListDiemLHP(resultBangDiem);
        };
        getBangDiem();
        const getTTLHP = async () => {
            let result = await getChiTietPhieuTheoMaLHP(selectedLHP, selectedNhom, accessToken, axiosJWT);
            if (!!result) {
                for (let i = 0; i < result.length; i++) {
                    result[i].giuaKy = '';
                    result[i].thuongKy1 = '';
                    result[i].thuongKy2 = '';
                    result[i].thuongKy3 = '';
                    result[i].thuongKy4 = '';
                    result[i].thuongKy5 = '';
                    result[i].thucHanh1 = '';
                    result[i].thucHanh2 = '';
                    result[i].thucHanh3 = '';
                    result[i].cuoiKy = '';
                }
                //console.log(result);
                setListThongTinLHP(result);
            }
        };
        getTTLHP();
    }, [selectedNhom, curNhanVien]);

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

            <div className="w-full flex flex-row items-center">
                <div className="w-24 text-left ml-28">
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
                <input
                    type="text"
                    className="block p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                    placeholder="Mã LHP"
                    value={resultSearchLHP}
                    onChange={(e) => {
                        setResultSearch(e.target.value);
                    }}
                />
                <div className="ml-6">
                    <Button variant="contained" size="small" startIcon={<AiOutlineSearch />} onClick={handleTimKIem}>
                        Tìm kiếm
                    </Button>
                </div>
                <div className="flex flex-row items-center ">
                    <div className="ml-6">
                        <Button variant="contained" size="small" startIcon={<AiFillSave />} onClick={handleLuuBangDiem}>
                            Lưu
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="border border-gray-300 w-[96%]"></div>
            </div>
            <div className="w-full flex justify-start items-center mt-3 mr-11 ml-10">
                <div className="text-lg font-bold ">Danh sách điểm số các sinh viên trong lớp học phần</div>
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
                                        <th rowSpan={3}>Cuối kỳ</th>
                                        <th rowSpan={3}>Điểm tổng kết</th>
                                        <th rowSpan={3}>Thang điểm 4</th>
                                        <th rowSpan={3}>Điểm chữ</th>
                                        <th rowSpan={3}>Xếp loại</th>
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
                                        <th className={cx('name')}>Tên sinh viên</th>
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

                                <tbody>{renderThongTinSinhVien()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LopHoc;
