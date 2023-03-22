import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { exportToExcel } from './exportToExcel';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import style from './SinhVien.module.scss';
import { getTatCaSinhVien } from '../../services/sinhVienService';

const cx = classNames.bind(style);

function App() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (item) => {
        //setIsChecked(event.target.checked);
        item.isCheck = true;
    };
    const handleClick = () => {
        exportToExcel('data-sv', 'Danh sách sinh viên');
    };

    const [listSV, setListSV] = useState();
    const [listChecked, setListChecked] = useState();

    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    useEffect(() => {
        const getALLSinhVien = async () => {
            const getTatCaSV = await getTatCaSinhVien(accessToken, axiosJWT, dispatch);

            setListSV(getTatCaSV);
        };
        getALLSinhVien();
    }, []);

    const getAllChecked = (item, index) => {
        //setTick(!tick);
        const temp = [...listSV];
        if (temp[index]._id === item._id) {
            temp[index].isChecked = !item.isChecked;
        }
        //console.log(item);
        if (item.isChecked) setListChecked((prev) => [...prev, item._id]);
        else {
            var arrRemove = listChecked.filter((e) => e !== item._id);
            setListChecked(arrRemove);
        }
        setListSV(temp);
    };

    return (
        <div>
            <Button type="primary" onClick={handleClick}>
                Export Excel
            </Button>
            <div className="m-2">
                <div className="">
                    <table className={cx('table-SV')} id="data-sv">
                        <thead className="text-sv-blue-5">
                            <tr className={cx(' bg-blue-100')}>
                                <th></th>
                                <th className={cx('')}>STT</th>
                                <th className={cx('')}>Mã số SV</th>
                                <th className={cx('')}>Họ tên</th>
                                <th className={cx('')}>Giới tính</th>
                                <th className={cx('')}>Ngày sinh</th>
                                <th>Lớp</th>
                                <th>Khoa</th>
                                <th>Khóa học</th>
                                <th className={cx('')}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSV?.map((item, index) => (
                                <tr
                                    key={item.maSinhVien}
                                    onClick={(item, index) => getAllChecked(item, index)}
                                    className="cursor-pointer"
                                >
                                    <td>
                                        <div className="flex items-center justify-center">
                                            {/* <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-green-500 cursor-pointer"
                                                //checked={item.isCheck === true ? true : false}
                                                status={item.isChecked ? 'checked' : 'unchecked'}
                                                onChange={(item) => handleCheckboxChange(item)}
                                            /> */}
                                        </div>
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{item.maSinhVien}</td>
                                    <td align="left">{item.tenSinhVien}</td>
                                    <td>{item.gioiTinh ? 'Nam' : 'Nữ'}</td>
                                    <td></td>
                                    <td align="left">{item.lopHoc.tenLop}</td>
                                    <td align="left">{item.lopHoc.nganhHoc.khoa.tenKhoa}</td>
                                    <td align="left">{item.lopHoc.khoaHoc}</td>
                                    <td>{item.trangThai}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
