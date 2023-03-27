import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import { FaRegWindowClose, FaPlus } from 'react-icons/fa';
import { BsFillEraserFill } from 'react-icons/bs';
import { TiCancel } from 'react-icons/ti';
import Autocomplete from '@mui/material/Autocomplete';
import { AiFillSave } from 'react-icons/ai';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { exportToExcel } from '../../function/exportToExcel';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import style from './SinhVien.module.scss';
import { getTatCaSinhVien } from '../../services/sinhVienService';
import { getTatCaKhoa } from '../../services/khoaService';
import { getNganhHocByKhoa } from '../../services/nganhService';
import { getLopHocByNganhHoc } from '../../services/lopHocService';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';

import HeaderQl from '../../components/HeaderQL';
//import TableSinhVien from '../../components/TableSinhVien/TableSinhVien';

const cx = classNames.bind(style);

function SinhVien() {
    const options = ['Option 1', 'Option 2'];
    const [open, setOpen] = useState(false);
    const [listChecked, setListChecked] = useState([]);
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');

    let [listKhoa, setListKhoa] = useState([]);
    const [khoa, setKhoa] = useState();
    const [lopHoc, setLopHoc] = useState();
    const [email, setEmail] = useState();
    const [listLH, setListLH] = useState([]);
    const [maSinhVien, setMaSinhVien] = useState();
    const [tenSinhVien, setTenSinhVien] = useState();
    const [nganhHoc, setNganhHoc] = useState();
    const [value, setValue] = useState(null);
    const [listSV, setListSV] = useState();
    const [maLop, setMaLop] = useState();
    const [soDienThoai, setSoDienThoai] = useState();
    const [linkAnh, setLinkAnh] = useState();
    const [gioiTinh, setGioiTinh] = useState();
    const [ngaySinh, setNgaySinh] = useState();
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const [khoaHoc, setKhoaHoc] = useState();
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [listNganh, setListNganh] = useState([]);
    // const handleCheckboxChange = (item) => {
    //     //setIsChecked(event.target.checked);
    //     item.isCheck = true;
    // };
    const handleExportExcel = () => {
        exportToExcel('data-sv', 'Danh sách sinh viên');
    };

    const getAllChecked = (item, index) => {
        //setTick(!tick);
        //console.log(item);
        const temp = [...listSV];
        if (temp[index].maSinhVien === item.maSinhVien) {
            temp[index].isChecked = !item.isChecked;
        }
        //console.log(item);
        if (item.isChecked) setListChecked((prev) => [...prev, item.maSinhVien]);
        else {
            var arrRemove = listChecked.filter((e) => e !== item.maSinhVien);
            setListChecked(arrRemove);
        }
        setListSV(temp);
    };

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
        const getALLSinhVien = async () => {
            const getTatCaSV = await getTatCaSinhVien(accessToken, axiosJWT, dispatch);

            setListSV(getTatCaSV);
        };
        getALLSinhVien();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function handleSelectKhoa(event) {
        setKhoa(event.target.value);
    }

    const ToolbarTable = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport fileName="Danh sách sinh viên" />
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
        );
    };
    const handleClickAddLopHoc = () => {
        if (options.includes(inputValue)) {
            setValue(inputValue);
            console.log(value);
        } else {
            console.log(inputValue);
        }
    };
    // console.log(value);

    useEffect(() => {
        if (khoa) {
            const getNganh = async () => {
                const getNganhTheoKhoa = await getNganhHocByKhoa(khoa, accessToken, axiosJWT);

                setListNganh(getNganhTheoKhoa);
                console.log(getNganhTheoKhoa);
            };
            getNganh();
        }
    }, [khoa]);
    useEffect(() => {
        if (nganhHoc) {
            const getLopHoc = async () => {
                const getLopHocTheoNganh = await getLopHocByNganhHoc(nganhHoc, accessToken, axiosJWT);

                setListLH(getLopHocTheoNganh);
                console.log(getLopHocByNganhHoc);
            };
            getLopHoc();
        }
    }, [nganhHoc]);

    console.log(listSV);
    return (
        <>
            <Dialog fullWidth={'100%'} maxWidth={'100%'} open={open} onClose={handleClose}>
                <div className="w-full flex justify-between mt-5 border-b-2">
                    <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin sinh viên</div>
                    <div>
                        <FaRegWindowClose className="mr-5" size={30} color="#47A9FF" onClick={handleClose} />
                    </div>
                </div>
                <DialogContent>
                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Mã số sinh viên:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                value={maSinhVien}
                                onChange={(e) => {
                                    setMaSinhVien(e.target.value);
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
                                value={tenSinhVien}
                                onChange={(e) => {
                                    setTenSinhVien(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Hình ảnh:</label>
                            </div>
                            <input
                                type="file"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="link hình ảnh"
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
                            <div className="w-60 h-9 border border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    onChange={(e) => setGioiTinh(e.target.value)}
                                    name="selectedFruit"
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="null">Giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
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
                                <label htmlFor="">Khoa:</label>
                            </div>
                            <div className="w-60 h-9 border border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    value={khoa}
                                    onChange={handleSelectKhoa}
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="null">Khoa</option>
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
                                <label htmlFor="">Ngành:</label>
                            </div>
                            <div className="w-60 h-9 border border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    value={nganhHoc}
                                    onChange={(e) => setNganhHoc(e.target.value)}
                                    name="selectedFruit"
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="null">Ngành</option>
                                    {listNganh.map((option) => (
                                        <option key={option?.maNganh} value={option?.maNganh}>
                                            {option?.tenNganh}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Lớp học:</label>
                            </div>
                            <div
                                className=" w-60 h-9 flex justify-center items-center m-4"
                                onClick={handleClickAddLopHoc}
                            >
                                <Autocomplete
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={maLop}
                                    onInputChange={(event, newInputValue) => {
                                        setLopHoc(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={listLH.map((option) => ({
                                        value: option?.maLop,
                                        label: option?.tenLop,
                                    }))}
                                    sx={{
                                        width: 240,

                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#47A9FF',
                                            borderRadius: '5px',
                                            border: '2',
                                            height: 40,
                                        },
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            label="Lớp học"
                                            placeholder="Chọn lớp học"
                                        />
                                    )}
                                />
                                <div className="ml-3">
                                    <FaPlus size={20} color="green" />
                                </div>
                            </div>
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
                                <label htmlFor="">Khóa học:</label>
                            </div>
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value={khoaHoc}
                                    onChange={(e) => setKhoaHoc(e.target.value)}
                                >
                                    <option value="Bình thường">Bình thường</option>
                                    <option value="Tạm ngưng">Tạm ngưng</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào trường:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
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
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày cấp:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Nơi cấp:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
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
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Nơi sinh:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Đối tượng:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào Đảng:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào đoàn:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Trạng thái:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-center p-3">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<AiFillSave />}
                            color="success"
                            //onClick={() => onPressSearch(valueSearch)}
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
            <div className="w-full h-full mt-5 mr-5">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý sinh viên</div>
                <HeaderQl onPressAdd={handleClickOpen} placeholder={'Nhập thông tin tìm kiếm'} />

                <div style={{}} className="h-3/4 mr-5 ml-10">
                    <div>
                        <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button>
                        <div className="m-2">
                            <div className="">
                                <table className={cx('table-SV')} id="data-sv">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã số SV</th>
                                            <th>Họ tên</th>
                                            <th>Giới tính</th>
                                            <th>Ngày sinh</th>
                                            <th>Lớp</th>
                                            <th>Khoa</th>
                                            <th>Khóa học</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listSV?.map((item, index) => (
                                            <tr
                                                key={item.maSinhVien}
                                                onClick={() => getAllChecked(item, index)}
                                                className="cursor-pointer"
                                            >
                                                <td>
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox h-5 w-5 text-green-500 cursor-pointer"
                                                            // checked={item.isChecked}
                                                            // checked=={item.isChecked ? 'checked' : 'unchecked'}
                                                            //status={item.isChecked ? 'checked' : 'unchecked'}
                                                            //onChange={(item) => handleCheckboxChange(item)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.maSinhVien}</td>
                                                <td align="left">{item.tenSinhVien}</td>
                                                <td>{item.gioiTinh ? 'Nam' : 'Nữ'}</td>
                                                <td></td>
                                                <td align="left">{item.lopHoc.tenLop}</td>
                                                <td align="left">{item.lopHoc.nganhHoc.khoa.tenKhoa}</td>
                                                <td align="left">{item.khoaHoc.tenKhoaHoc}</td>
                                                <td>{item.trangThai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* <DataGridPremium
                        columns={columns}
                        rows={row.map((item, index) => ({ STT: index + 1, ...item }))}
                        getRowId={(row) => row.STT}
                        checkboxSelection
                        onRowClick={(row) => alert(row.id)}
                        showCellRightBorder={true}
                        // loading={loading}
                        // localeText={{
                        //     toolbarColumns: 'Thay Ä‘á»•i cá»™t',
                        //     toolbarExport: 'Xuáº¥t bÃ¡o cÃ¡o',
                        //     MuiTablePagination: {
                        //         labelDisplayedRows: ({ from, to, count }) => `${from} - ${to} cá»§a ${count}`,
                        //     },
                        // }}
                        // autoPageSize

                        pagination
                        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                        components={{
                            Toolbar: ToolbarTable,
                        }}
                    /> */}
                </div>
            </div>
        </>
    );
}

export default SinhVien;
