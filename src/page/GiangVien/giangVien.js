import { Alert } from '@mui/material';
import React from 'react';
import HeaderQL from '../../components/HeaderQL/HeaderQL';

function GiangVien() {
    return (
        <div>
            <HeaderQL placeholder="Mã, tên giảng viên" onPressSearch={(value) => console.log(value)}></HeaderQL>
        </div>
    );
}

export default GiangVien;
