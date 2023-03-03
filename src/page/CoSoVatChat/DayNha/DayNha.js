import React, { useState } from 'react';
import HeaderQL from '../../../components/HeaderQL/HeaderQL';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import { TiCancel } from 'react-icons/ti';
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

function DayNha(onPressAdd, onPressUpdate) {
    const [open, setOpen] = useState(false);
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
            field: 'maDayNha',
            renderHeader: () => <strong>Mã dãy nhà</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
            align: 'center',
        },

        {
            field: 'tenDayNha',
            renderHeader: () => <strong>Tên dãy nhà</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 380,
            align: 'center',
        },
        {
            field: 'tongSoTang',
            renderHeader: () => <strong>Tổng số tầng</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 350,
            align: 'center',
        },

        {
            field: 'trangThai',
            renderHeader: () => <strong>Trạng thái</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 300,
            align: 'center',
        },
    ];

    const row = [
        {
            id: 1,
            maDayNha: 'H',
            tenDayNha: 'Nhà H',
            tongSoTang: '9',

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
    return (
        <>
            <div className="h-full w-full">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4 mb-3">Quản lý dãy nhà</div>
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
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
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
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32  text-left">
                                    <label htmlFor="">Tổng số tầng:</label>
                                </div>
                                <input
                                    type="number"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tổng số tầng"
                                    // value={valueTenGV}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Trạng thái:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select className=" w-full rounded-md bg-white leading-tight focus:outline-none focus:shadow-outline">
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

export default DayNha;
