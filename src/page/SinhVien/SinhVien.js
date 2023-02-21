import React from 'react';
import HeaderQL from '../../components/HeaderQL/HeaderQL';

function SinhVien() {
    return (
        <div>
            <HeaderQL placeholder="Mã, tên giảng viên" onPressSearch={(value) => console.log(value)}></HeaderQL>
        </div>
    );
}

export default SinhVien;
