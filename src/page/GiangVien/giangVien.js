import React, { useState } from 'react';
import HeaderQL from '../../components/HeaderQL/HeaderQL';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import { Avatar, Button, Link } from '@mui/material';
import { IoIosAddCircle } from 'react-icons/io';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { IoMdAdd } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';

function GiangVien() {
    const dsKhoa = ['Công nghệ thông tin', 'Khoa học cơ bản', 'Điện - điện tử'];

    const [open, setOpen] = useState(false);
    const [valueTenGV, setValueTenGV] = useState('');
    const [valueGioiTinh, setValueGioiTinh] = useState('');
    const [valueSDT, setValueSDT] = useState('');
    const [selectedOptionGT, setSelectedOptionGT] = useState('null');
    const [selectedOptionKhoa, setSelectedOptionKhoa] = useState(dsKhoa[0]);
    const [valueNgaySinh, setValueNgaySinh] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valueKhoa, setValueKhoa] = useState('');
    const [valueChucVu, setValueChucVu] = useState('');
    const [soCMND, setSoCMND] = useState('');
    const [ngayCapCMND, setNgayCapCMND] = useState('');
    const [noiCap, setNoiCap] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [noiSinh, setNoiSinh] = useState('');
    const [doiTuong, setDoiTuong] = useState('');
    const [ngayVaoDoan, setNgayVaoDoan] = useState('');
    const [ngayVaoDang, setNgayVaoDang] = useState('');
    const [trangThai, setTrangThai] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            field: 'STT',
            renderHeader: () => <strong>STT</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            filterable: false,
            width: 50,
            align: 'center',
        },
        {
            field: 'maGV',
            renderHeader: () => <strong>Mã Giảng Viên</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },

        {
            field: 'tenGV',
            renderHeader: () => <strong>Tên Giảng Viên</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
            align: 'center',
        },
        {
            field: 'ngaySinh',
            renderHeader: () => <strong>Ngày sinh</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },
        {
            field: 'gioiTinh',
            renderHeader: () => <strong>Giới tính</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },
        {
            field: 'khoa',
            renderHeader: () => <strong>Khoa</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
            align: 'center',
        },
        {
            field: 'chucVu',
            renderHeader: () => <strong>Chức vụ</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },

        {
            field: 'trangThai',
            renderHeader: () => <strong>Trạng thái</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
            align: 'center',
        },
    ];

    const row = [
        {
            id: 1,
            maGV: '1028383',
            tenGV: 'Nguyen Thi Lan',
            ngaySinh: '2022-11-22',
            gioiTinh: 'Nu',
            khoa: 'CNTT',
            chucVu: 'Giảng Viên',
            trangThai: '',
        },
        {
            id: 2,
            maGV: '1028383',
            tenGV: 'Nguyen Thi Lan',
            ngaySinh: '2022-11-22',
            gioiTinh: 'Nu',
            khoa: 'CNTT',
            chucVu: 'Giảng Viên',
            trangThai: '',
        },
        {
            id: 3,
            maGV: '1028383',
            tenGV: 'Nguyen Thi Lan',
            ngaySinh: '2022-11-22',
            gioiTinh: 'Nu',
            khoa: 'CNTT',
            chucVu: 'Giảng Viên',
            trangThai: '',
        },
    ];

    const ToolbarTable = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport fileName="Danh sách phim" />
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
        );
    };

    function handleSelectGT(event) {
        setSelectedOptionGT(event.target.value);
    }

    function handleSelectKhoa(event) {
        setSelectedOptionKhoa(event.target.value);
    }

    return (
        <div className="h-full w-full">
            <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý giảng viên</div>
            <HeaderQL
                placeholder="Mã, tên giảng viên"
                onPressSearch={(value) => console.log(value)}
                onPressAdd={handleClickOpen}
                onPressUpdate={handleClickOpen}
            ></HeaderQL>

            <div className="h-4/5">
                <DataGridPremium
                    columns={columns}
                    rows={row.map((item, index) => ({ STT: index + 1, ...item }))}
                    getRowId={(row) => row.STT}
                    checkboxSelection
                    showCellRightBorder={true}
                    showColumnRightBorder={true}
                    //onRowClick={(row) => alert(row.id)}
                    // loading={loading}
                    // localeText={{
                    //     toolbarColumns: 'Thay đổi cột',
                    //     toolbarExport: 'Xuất báo cáo',
                    //     MuiTablePagination: {
                    //         labelDisplayedRows: ({ from, to, count }) => `${from} - ${to} của ${count}`,
                    //     },
                    // }}
                    // autoPageSize

                    pagination
                    localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                    components={{
                        Toolbar: ToolbarTable,
                    }}
                />
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
                                <label htmlFor="">Mã hồ sơ:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Mã hồ sơ"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Mã giảng viên:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Mã giảng viên"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
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
                                value={valueTenGV}
                                onChange={(e) => {
                                    setValueTenGV(e.target.value);
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
                                value={valueSDT}
                                onChange={(e) => {
                                    setValueSDT(e.target.value);
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
                                    value={selectedOptionGT}
                                    onChange={handleSelectGT}
                                >
                                    <option value="null">Giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nu">Nữ</option>
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
                                value={valueNgaySinh}
                                onChange={(e) => {
                                    setValueNgaySinh(e.target.value);
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
                                value={valueEmail}
                                onChange={(e) => {
                                    setValueEmail(e.target.value);
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
                                    value={selectedOptionKhoa}
                                    onChange={handleSelectKhoa}
                                >
                                    {dsKhoa.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Chức vụ:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Chức vụ"
                                value={valueChucVu}
                                onChange={(e) => {
                                    setValueChucVu(e.target.value);
                                }}
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
                                placeholder="Số CCCD"
                                value={soCMND}
                                onChange={(e) => {
                                    setSoCMND(e.target.value);
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
                                //placeholder="Mã giảng viên"
                                value={ngayCapCMND}
                                onChange={(e) => {
                                    setNgayCapCMND(e.target.value);
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
                                value={noiCap}
                                onChange={(e) => {
                                    setNoiCap(e.target.value);
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
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Trạng thái"
                                value={trangThai}
                                onChange={(e) => {
                                    setTrangThai(e.target.value);
                                }}
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
        </div>
    );
}

export default GiangVien;
