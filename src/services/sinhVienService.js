import * as httpRequest from '~/utils/httpRequest';

export const getTatCaSinhVien = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/sinhvien', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const themSinhVien = async (sinhvien, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/sinhvien', sinhvien, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const countSVByLopHoc = async (classID, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/sinhvien/count', {
            params: {
                classID: classID,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const capNhatSinhVien = async (sinhvien, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/sinhvien', sinhvien, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const timKiemSinhVien = async (text, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('sinhvien/timkiem', {
            params: {
                value: text,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
