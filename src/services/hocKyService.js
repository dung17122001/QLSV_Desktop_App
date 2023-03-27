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
