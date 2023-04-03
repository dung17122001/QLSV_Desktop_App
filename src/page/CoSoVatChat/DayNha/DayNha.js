import React, { useState, useEffect } from 'react';
import HeaderQL from '../../../components/HeaderQL/HeaderQL';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import { TiCancel } from 'react-icons/ti';
import { getTatCaDayNha, themDayNha, capNhatDayNha, timKiemDayNha } from '../../../services/dayNhaService';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Avatar, Button, Link } from '@mui/material';
import { exportToExcel } from '~/function/exportToExcel';
import classNames from 'classnames/bind';
import style from './DayNha.module.scss';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
function DayNha() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);

    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [listDN, setListDN] = useState();
    const [selectedDayNha, setSelectedDayNha] = useState('');
    const [maDayNha, setMaDayNha] = useState('');
    const [tenDayNha, setTenDayNha] = useState('');
    const [soTang, setSoTang] = useState('');
    const [trangThai, setTrangThai] = useState('');

    console.log(trangThai);
    let dayNha = {
        maDayNha,
        tenDayNha,
        soTang,
        trangThai,
    };
    function handleSelectTrangThai(event) {
        setTrangThai(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleExportExcel = () => {
        exportToExcel('data-sv', 'Danh sách sinh viên');
    };
    const cx = classNames.bind(style);

    useEffect(() => {
        const getALLDayNha = async () => {
            try {
                let getDayNha = await getTatCaDayNha(accessToken, axiosJWT, dispatch);
                setListDN(getDayNha);
            } catch (error) {
                console.log(error);
            }
        };
        getALLDayNha();
    }, []);

    const handleSelectDayNha = (item) => {
        setSelectedDayNha(item);
    };
    const reload = async () => {
        let getDayNha = await getTatCaDayNha(accessToken, axiosJWT, dispatch);
        setListDN(getDayNha);
    };

    const handleClickOpenCapNhat = () => {
        if (!!selectedDayNha) {
            setMaDayNha(selectedDayNha.maDayNha);
            setTenDayNha(selectedDayNha.tenDayNha);
            setSoTang(selectedDayNha.soTang);
            setTrangThai(selectedDayNha.trangThai);
            setOpen(true);
        } else {
            alert('Vui lòng chọn dãy nhà');
        }
    };
    const xoaTrang = () => {
        setTenDayNha('');
        setSoTang(1);
        setTrangThai('Bình thường');
    };
    const handleClickOpenThem = () => {
        setMaDayNha('');
        setSelectedDayNha('');
        xoaTrang();
        setOpen(true);
    };
    const handleClickSearch = async (value) => {
        const timDayNha = await timKiemDayNha(value, accessToken, axiosJWT);
        setListDN(timDayNha);
    };
    const luuDayNha = async () => {
        if (!!selectedDayNha) {
            dayNha.maDayNha = selectedDayNha.maDayNha;
            let suaDayNha = await capNhatDayNha(dayNha, accessToken, axiosJWT);
            if (suaDayNha) {
                setOpen(false);
                alert('Cập nhật thành công!!');
                reload();
            } else {
                alert('Cập nhật không thành công');
            }
        } else {
            let addDayNha = await themDayNha(dayNha, accessToken, axiosJWT);
            if (addDayNha) {
                setOpen(false);
                alert('Thêm thành công');
                reload();
            }
        }
    };
    return (
        <>
            <div className="h-full mt-5 w-full">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4 mb-3">Quản lý dãy nhà</div>
                <HeaderQL
                    placeholder="Mã, tên dãy nhà"
                    onPressSearch={handleClickSearch}
                    onPressAdd={handleClickOpenThem}
                    onPressUpdate={handleClickOpenCapNhat}
                ></HeaderQL>

                <div style={{}} className="h-3/4 mr-5 ml-10">
                    <div>
                        <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button>
                        <div className="m-2">
                            <div className="">
                                <table className={cx('table-DN')} id="data-sv">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã dãy nhà</th>
                                            <th>Tên dãy nhà</th>
                                            <th>Số tầng</th>

                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listDN?.map((item, index) => (
                                            <tr
                                                key={item.maDayNha}
                                                onClick={() => handleSelectDayNha(item)}
                                                className={`${
                                                    selectedDayNha.maDayNha === `${item.maDayNha}`
                                                        ? 'bg-orange-200'
                                                        : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                            name="radio-group-mon"
                                                            value={item.maDayNha}
                                                            checked={selectedDayNha.maDayNha === `${item.maDayNha}`}
                                                            onChange={() => handleSelectDayNha(item)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item?.maDayNha}</td>
                                                <td align="left">{item.tenDayNha}</td>

                                                <td align="left">{item?.soTang}</td>

                                                <td>{item.trangThai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog
                    sx={{ '& .MuiDialog-paper': { width: '100%', height: '50%' } }}
                    fullWidth={'100%'}
                    maxWidth
                    open={open}
                    onClose={handleClose}
                >
                    <div className="w-full flex justify-between mt-5 border-b-2">
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin dãy nhà</div>
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
                                    <label htmlFor="">Mã dãy nhà:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã dãy nhà"
                                    disabled
                                    value={maDayNha}
                                    onChange={(e) => {
                                        setMaDayNha(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên dãy nhà:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên dãy nhà"
                                    value={tenDayNha}
                                    onChange={(e) => {
                                        setTenDayNha(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32  text-left">
                                    <label htmlFor="">Tổng số tầng:</label>
                                </div>
                                <input
                                    type="number"
                                    min={1}
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tổng số tầng"
                                    value={soTang}
                                    onChange={(e) => {
                                        setSoTang(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
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
                                    luuDayNha();
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
                                    //onClick={() => onPressSearch(valueSearch)}
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
        </>
    );
}

export default DayNha;
