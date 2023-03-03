import React, { useState } from 'react';
import HeaderQL from '../../../components/HeaderQL/HeaderQL';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Avatar, Button, Link } from '@mui/material';
import { FaRegWindowClose } from 'react-icons/fa';
import { BsFillEraserFill } from 'react-icons/bs';
import { AiFillSave } from 'react-icons/ai';
import { TiCancel } from 'react-icons/ti';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
function PhongHoc() {
    const [open, setOpen] = useState(false);
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
            field: 'maPH',
            renderHeader: () => <strong>Mã phòng học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
            align: 'center',
        },

        {
            field: 'tenPH',
            renderHeader: () => <strong>Tên phòng học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 300,
            align: 'center',
        },
        {
            field: 'loaiPhong',
            renderHeader: () => <strong>Loại phòng</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },
        {
            field: 'dayNha',
            renderHeader: () => <strong>Dãy nhà</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },
        {
            field: 'tang',
            renderHeader: () => <strong>Tầng</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 220,
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
            maPH: 'H5.02',
            tenPH: 'H5.02',
            loaiPhong: 'Thực hành',
            dayNha: 'H',
            tang: '5',

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
    const listdaynha = [
        {
            ma: 'A',
            ten: 'Dãy A',
            sotang: 10,
        },
        {
            ma: 'B',
            ten: 'Dãy B',
            sotang: 12,
        },
    ];
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [dayNha, setDayNha] = useState(listdaynha[0].ten);
    const [soTang, setSoTang] = useState([]);
    let listTang = [];
    function handleSelectDayNha(event) {
        setDayNha(event.target.value);

        for (let i = 0; i < dayNha.sotang; i++) {
            listTang.push(i);
        }
        // console.log(listTang);
        // return listTang;
        setSoTang(listTang);
    }
    console.log(dayNha);
    return (
        <>
            <div className="h-full w-full">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4 mb-3">Quản lý phòng học</div>
                <HeaderQL
                    placeholder="Mã, tên phòng học"
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
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin phòng học</div>
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
                                    <label htmlFor="">Mã phòng học:</label>
                                </div>
                                <input
                                    type="text"
                                    disabled
                                    className="block m-4 p-2 pl-4 caret-sv-blue-4 text-sm w-60 rounded-sv-login-input bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã phòng tự động tạo"
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên phòng học:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 caret-sv-blue-4 text-sm w-60 rounded-sv-login-input bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên phòng học"
                                    autoFocus
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Loại phòng:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                    <select className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="Thực hành">Thực hành</option>
                                        <option value="Lý thuyết">Lý thuyết</option>
                                        <option value="Nu">Nữ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Dãy nhà:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                    <select className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline">
                                        {listdaynha.map((item, index) => (
                                            <option value={item.ten}>{item.ten}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tầng:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                    <select className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="Thực hành">Thực hành</option>
                                        <option value="Lý thuyết">Lý thuyết</option>
                                        <option value="Nu">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Trạng thái:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                    <select className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="Hoạt động">Hoạt động</option>
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
        </>
    );
}

export default PhongHoc;
