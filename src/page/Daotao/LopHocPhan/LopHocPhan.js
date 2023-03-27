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

function LopHoc() {
    const navigate = useNavigate();
    const dsNganh = ['Công nghệ thông tin', 'SE', 'IS'];
    const dsHK = ['HK1', 'HK2', 'HK3'];
    const [selectedOptionNganh, setSelectedOptionNganh] = useState(dsNganh[0]);
    const [selectedOptionHK, setSelectedOptionHK] = useState(dsHK[0]);

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
        <div className="w-full h-full justify-center items-center ">
            <div className="w-full flex justify-center items-center mt-3">
                <div className="text-lg font-bold text-sv-blue-4">Quản lý lớp học phần</div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
                <div className="flex flex-row items-center ">
                    <div className="w-24 text-left">
                        <label htmlFor="">Học kỳ:</label>
                    </div>
                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
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
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="border border-gray-300 w-[96%]"></div>
            </div>
            <div className="w-full flex justify-start items-center mt-3 mr-11 ml-10">
                <div className="text-lg font-bold">Danh sách môn học</div>
            </div>
        </div>
    );
}

export default LopHoc;
