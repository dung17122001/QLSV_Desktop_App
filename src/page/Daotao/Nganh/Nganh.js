import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import Autocomplete from '@mui/material/Autocomplete';

import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import HeaderQL from '../../../components/HeaderQL';
function Nganh() {
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
            field: 'MaNganh',
            renderHeader: () => <strong>Mã ngành</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 300,
        },
        {
            field: 'TenNganh',

            renderHeader: () => <strong>Tên ngành</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 335,

            align: 'left',
        },
        {
            field: 'Khoa',
            renderHeader: () => <strong>Khoa</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
        },
        {
            field: 'TongTC',
            renderHeader: () => <strong>Tổng số tín chỉ</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 180,
        },
        {
            field: 'TrangThai',
            renderHeader: () => <strong>Trạng thái</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
            align: 'right',
        },
    ];

    const row = [
        {
            id: 1,

            MaNganh: '19496481',
            TenNganh: 'Công nghệ thông tin',
            TongTC: '146',
            TrangThai: '',
        },
        {
            id: 2,

            ten: 'Phan Huu Trong',
        },
        {
            id: 3,

            ten: 'Phan Huu Trong',
        },
    ];
    const ToolbarTable = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport fileName="Danh sách môn học" />
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
        );
    };
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className="w-full h-screen mt-3">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý ngành học</div>
                <HeaderQL
                    placeholder="Mã, tên giảng viên"
                    onPressSearch={(value) => console.log(value)}
                    onPressAdd={handleClickOpen}
                    onPressUpdate={handleClickOpen}
                ></HeaderQL>

                <div style={{}} className="h-3/4  mt-3  mr-11 ml-10">
                    <DataGridPremium
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
                    />
                </div>

                <Dialog fullWidth={'100%'} maxWidth={'100%'} open={open} onClose={handleClose}>
                    <div className="w-full flex justify-between mt-5 border-b-2">
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin môn học</div>
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
                                    <label htmlFor="">Mã ngành:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã ngành học"
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên ngành:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên ngành học"
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Khoa:</label>
                                </div>

                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        // value={selectedOptionGT}
                                        // onChange={handleSelectGT}
                                    >
                                        <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                                        <option value="Kế toán - kiểm toán">Kế toán - kiểm toán</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tổng tín chỉ:</label>
                                </div>
                                <input
                                    type="number"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tổng tín chỉ   "
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
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        // value={selectedOptionGT}
                                        // onChange={handleSelectGT}
                                    >
                                        <option value="Hoạt động">Hoạt động</option>
                                        <option value="Tạm ngưng">Tạm ngưng</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-1/3"></div>
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

export default Nganh;
