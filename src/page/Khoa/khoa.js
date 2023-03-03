import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { IoIosAddCircle } from 'react-icons/io';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import HeaderQL from '../../components/HeaderQL';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TiCancel } from 'react-icons/ti';
function Khoa(onPressSearch, onPressAdd, onPressUpdate, onPressDelete, placeholder) {
    const [valueSearch, setValueSearch] = useState('');
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
            field: 'MaKhoa',
            renderHeader: () => <strong>Mã khoa</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 300,
        },
        {
            field: 'TenKhoa',

            renderHeader: () => <strong>Tên khoa</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 580,

            align: 'left',
        },

        {
            field: 'TrangThai',
            renderHeader: () => <strong>Trạng thái</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 300,
        },
    ];

    const row = [
        {
            id: 1,
            MaKhoa: '19496481',
            TenKhoa: 'Công nghệ thông tin',

            TrangThai: 'Hoạt động',
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
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý khoa</div>
                <HeaderQL
                    placeholder="Mã, tên khoa"
                    onPressSearch={(value) => console.log(value)}
                    onPressAdd={handleClickOpen}
                    onPressUpdate={handleClickOpen}
                ></HeaderQL>
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
                                    // value={valueTenGV}
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

                <div style={{}} className="h-4/6 mt-2 mr-11 ml-10">
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
            </div>
        </>
    );
}

export default Khoa;
