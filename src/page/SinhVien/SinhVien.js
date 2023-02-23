import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import { Avatar, Button, Link } from '@mui/material';
import { IoIosAddCircle } from 'react-icons/io';

function SinhVien() {
    const columns = [
        {
            field: 'stt',
            renderHeader: () => <strong>STT</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            filterable: false,
            width: 50,
            align: 'center',
        },
        {
            field: 'maNV',
            renderHeader: () => <strong>Mã số sinh viên</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
        },
        {
            field: 'avatar',

            renderHeader: () => <strong>Họ tên sinh viên</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
            renderCell: (data) => <Avatar src={data.value} />,
            align: 'center',
        },
        {
            field: 'tenNV',
            renderHeader: () => <strong>Giới tính</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 130,
        },
        {
            field: 'ngaySinh',
            renderHeader: () => <strong>Ngày sinh</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
            align: 'right',
        },
        {
            field: 'email',
            renderHeader: () => <strong>Lớp</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
        },
        {
            field: 'sdt',
            renderHeader: () => <strong>Khoa</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
            align: 'center',
        },
        {
            field: 'chucVu',
            renderHeader: () => <strong>Khóa học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
        },
    ];

    const row = [
        {
            id: 1,

            ten: 'Phan Huu Trong',
            chucNang: '',
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
                <GridToolbarExport fileName="Danh sÃ¡ch phim" />
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
        );
    };

    return (
        <>
            <div className="w-full mt-5 mr-5">
                <div style={{ height: 400 }}>
                    <DataGridPremium
                        columns={columns}
                        rows={row.map((item, index) => ({ stt: index + 1, ...item }))}
                        getRowId={(row) => row.stt}
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

export default SinhVien;
