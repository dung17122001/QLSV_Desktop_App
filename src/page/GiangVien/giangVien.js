import React from 'react';
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

function GiangVien() {
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
            renderHeader: () => <strong>Mã nhân viên</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 100,
        },
        {
            field: 'avatar',

            renderHeader: () => <strong>Ảnh đại diện</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 100,
            renderCell: (data) => <Avatar src={data.value} />,
            align: 'center',
        },
        {
            field: 'tenNV',
            renderHeader: () => <strong>Tên nhân viên</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
        },
        {
            field: 'ngaySinh',
            renderHeader: () => <strong>Ngày sinh</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'right',
        },
        {
            field: 'email',
            renderHeader: () => <strong>Email</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
        },
        {
            field: 'sdt',
            renderHeader: () => <strong>SĐT</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 100,
            align: 'center',
        },
        {
            field: 'chucVu',
            renderHeader: () => <strong>Chức vụ</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
        },
        {
            field: 'diaChi',
            renderHeader: () => <strong>Địa chỉ</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
        },
        {
            field: 'trangThai',
            renderHeader: () => <strong>Trạng thái</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
        },
        {
            field: 'chucNang',
            renderHeader: () => <strong className="text-center">Chức năng</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 300,
            renderCell: (data) => (
                <div>
                    <Button variant="outlined" color="yellow" sx={{ marginRight: 1, marginLeft: 1 }}>
                        <IoIosAddCircle className={'text-xl text-2t-yellow-1'} />
                    </Button>
                    <Button variant="outlined" color="error">
                        Thôi việc
                    </Button>
                </div>
            ),
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
                <GridToolbarExport fileName="Danh sách phim" />
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
        );
    };

    return (
        <div className="h-full w-full">
            <HeaderQL placeholder="Mã, tên giảng viên" onPressSearch={(value) => console.log(value)}></HeaderQL>

            <DataGridPremium
                columns={columns}
                rows={row.map((item, index) => ({ stt: index + 1, ...item }))}
                getRowId={(row) => row.stt}
                checkboxSelection
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
    );
}

export default GiangVien;
