import * as httpRequest from '~/utils/httpRequest';

export const getNhanVienById = async (idNV, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('nhanvien/' + idNV, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};

export const timKiemNhanVien = async (text, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('nhanvien/timkiem', {
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
export const getTatCaNhanVien = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/nhanvien', {
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

export const themNhanVien = async (nhanvien, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/nhanvien', nhanvien, {
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
export const capNhatNhanVien = async (nhanvien, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/nhanvien', nhanvien, {
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
