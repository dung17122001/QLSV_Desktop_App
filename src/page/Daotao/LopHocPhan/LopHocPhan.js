import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';

function LopHoc() {
    const navigate = useNavigate();
    const dsNganh = ['Công nghệ thông tin', 'SE', 'IS'];
    const dsHK = ['HK1', 'HK2', 'HK3'];
    const [selectedOptionNganh, setSelectedOptionNganh] = useState(dsNganh[0]);
    const [selectedOptionHK, setSelectedOptionHK] = useState(dsHK[0]);

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
            field: 'maMonHoc',
            renderHeader: () => <strong>Mã môn học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },

        {
            field: 'tenMonHoc',
            renderHeader: () => <strong>Tên môn học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
            align: 'center',
        },
        {
            field: 'khoa',
            renderHeader: () => <strong>Khoa</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
            align: 'center',
        },
        {
            field: 'soTCLT',
            renderHeader: () => <strong>Số TC LT</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 100,
            align: 'center',
        },
        {
            field: 'soTCTH',
            renderHeader: () => <strong>Số TC TH</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 100,
            align: 'center',
        },
        {
            field: 'dieuKien',
            renderHeader: () => <strong>Điều kiện</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },

        {
            field: 'batBuoc',
            renderHeader: () => <strong>Bắt buộc</strong>,
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
            maMonHoc: '2534253',
            tenMonHoc: 'OOP',
            khoa: 'CNTT',
            soTCLT: 2,
            soTCTH: 1,
            dieuKien: '7666a',
            batBuoc: true,
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

    function handleSelectNganh(event) {
        setSelectedOptionNganh(event.target.value);
    }

    function handleSelectHK(event) {
        setSelectedOptionHK(event.target.value);
    }

    const handleOpenListClass = () => {
        navigate('/' + 'dao-tao/lop-hoc-phan/ds-lop');
    };

    return (
        <div className="w-full h-full  ">
            <div className="w-full flex justify-center items-center mt-3">
                <div className="text-lg font-bold text-sv-blue-4">Quản lý lớp học phần</div>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="flex justify-center flex-row items-center w-1/3">
                    <div className="w-24 text-left">
                        <label htmlFor="">Học kỳ:</label>
                    </div>
                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                        <select
                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedOptionHK}
                            onChange={handleSelectHK}
                        >
                            {dsHK.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center flex-row items-center w-1/3">
                    <div className="w-24 text-left">
                        <label htmlFor="">Ngành:</label>
                    </div>
                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                        <select
                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedOptionNganh}
                            onChange={handleSelectNganh}
                        >
                            {dsNganh.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center flex-row items-center w-1/3">
                    <input
                        type="text"
                        className="block m-4 p-2 pl-4 caret-sv-blue-4 text-sm w-60 rounded-sv-login-input bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                        placeholder="Mã/tên môn học"
                        // value={valueTenGV}
                        // onChange={(e) => {
                        //     setValueTenGV(e.target.value);
                        // }}
                    />
                    <div className="ml-6">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<AiOutlineSearch />}
                            // onClick={() => onPressSearch(valueSearch)}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="border border-gray-300 w-[96%]"></div>
            </div>
            <div className="w-full flex justify-start items-center mt-3">
                <div className="text-lg font-bold">Danh sách môn học</div>
            </div>
            <div className="h-4/6 w-full">
                <DataGridPremium
                    columns={columns}
                    rows={row.map((item, index) => ({ STT: index + 1, ...item }))}
                    getRowId={(row) => row.STT}
                    checkboxSelection
                    showCellRightBorder={true}
                    showColumnRightBorder={true}
                    onRowClick={handleOpenListClass}
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
        </div>
    );
}

export default LopHoc;
