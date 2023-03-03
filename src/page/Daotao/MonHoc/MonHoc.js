import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TiCancel } from 'react-icons/ti';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';

import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import { height } from '@mui/system';
import HeaderQL from '../../../components/HeaderQL';
function MonHoc({ onPressSearch, onPressAdd, onPressUpdate, onPressDelete, placeholder }) {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const [valueSearch, setValueSearch] = useState('');
    const [selectedOptionGT, setSelectedOptionGT] = useState('null');
    const [arr, setArr] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            title: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
            title: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
            title: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
    ];

    function handleSelectGT(event) {
        setSelectedOptionGT(event.target.value);
    }

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
            field: 'MSMH',
            renderHeader: () => <strong>Mã môn học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
        },
        {
            field: 'TenMH',

            renderHeader: () => <strong>Tên môn học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 280,

            align: 'left',
        },
        {
            field: 'LoaiMH',
            renderHeader: () => <strong>Loại môn học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
        },
        {
            field: 'SoTCLT',
            renderHeader: () => <strong>Số tín chỉ LT</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 100,
            align: 'right',
        },
        {
            field: 'SoTCTH',
            renderHeader: () => <strong>Số tín chỉ TH</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 100,
        },
        {
            field: 'Khoa',
            renderHeader: () => <strong>Khoa</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },
        {
            field: 'DK',
            renderHeader: () => <strong>Điều kiện</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
        },
        {
            field: 'TrangThai',
            renderHeader: () => <strong>Trạng thái</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
        },
    ];

    const row = [
        {
            id: 1,

            MSSV: '19496481',
            HoTen: 'Nguyễn Tuấn Thanh',
            GioiTinh: 'Nam',
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
                <GridToolbarExport fileName="Danh sách môn học" />
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
        );
    };

    function onPressAdd1() {
        // setArr([selectedOptionGT]);
        arr.push([selectedOptionGT]);
        // console.log(arr[0]);
    }

    return (
        <>
            <div className="w-full h-screen mt-3">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý môn học</div>
                <HeaderQL
                    placeholder="Mã, tên giảng viên"
                    onPressSearch={(value) => console.log(value)}
                    onPressAdd={handleClickOpen}
                    onPressUpdate={handleClickOpen}
                ></HeaderQL>

                <div style={{}} className="h-3/4 mt-2">
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
                                    <label htmlFor="">Mã môn học:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã môn học"
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên môn học:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên môn học"
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Loại môn học:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={selectedOptionGT}
                                        onChange={handleSelectGT}
                                    >
                                        <option value="Bắt nuộc">Bắt buộc</option>
                                        <option value="Tự chọn">Tự chọn</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Số tín chỉ LT:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Số tín chỉ lý thuyết"
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueSDT(e.target.value);
                                    // }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Số tín chỉ TH:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Số tín chỉ thực hành"
                                    // value={valueSDT}
                                    // onChange={(e) => {
                                    //     setValueSDT(e.target.value);
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
                                        <option value="Bắt nuộc">Công nghệ thông tin</option>
                                        <option value="Tự chọn">Kế toán- kiểm toán</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Môn học trước:</label>
                                </div>
                                <Autocomplete
                                    className="m-4"
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={top100Films}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </li>
                                    )}
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
                                            label="Môn học"
                                            placeholder="Môn học tiên quyết"
                                        />
                                    )}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Môn học tiên quyết:</label>
                                </div>
                                <Autocomplete
                                    className="m-4"
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={top100Films}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </li>
                                    )}
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
                                            label="Môn học"
                                            placeholder="Môn học tiên quyết"
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Môn học song hành:</label>
                                </div>
                                <Autocomplete
                                    className="m-4"
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={top100Films}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </li>
                                    )}
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
                                            label="Môn học"
                                            placeholder="Môn học tiên quyết"
                                        />
                                    )}
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
        </>
    );
}

export default MonHoc;
