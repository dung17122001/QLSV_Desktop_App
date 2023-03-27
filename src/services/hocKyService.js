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
