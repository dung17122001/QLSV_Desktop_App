export const getTatCaHocKy = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocky', {
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

export const getHocKyTheoKhoaHoc = async (startDate, endDate, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocky/khoahoc', {
            params: {
                startDate: startDate,
                endDate: endDate,
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

export const themHocKy = async (hocKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/hocky', hocKy, {
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
export const capNhatHocKy = async (hocKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/hocky', hocKy, {
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
export const timKiemHocKy = async (text, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('hocky/timkiem', {
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

export const getHocKyTheoMaCTK = async (maCTK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocky/ctk', {
            params: {
                maCTK: maCTK,
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

export const addChiTietHocPhan = async (hp, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/hocky/addCTHP`, hp, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const removeMonHocOfChuongTrinhKhung = async (maCTK, maHK, maHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.delete('hocky/cthp/delete', {
            params: {
                maCTK: maCTK,
                maHK: maHK,
                maHP: maHP,
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

export const getHocKyTheoTen = async (tenHocKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('hocky/tenhocky', {
            params: {
                tenHocKy: tenHocKy,
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

export const getMaHocKy = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocky/mahk', {
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
