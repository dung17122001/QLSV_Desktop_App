export const getTatCaDayNha = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/daynha', {
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

export const getPhongHocConTrong = async (maLoai, maDay, ngayHoc, maCa, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phong/phongtrong', {
            params: {
                maLoai: maLoai,
                maDay: maDay,
                ngayHoc: ngayHoc,
                maCa: maCa,
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
