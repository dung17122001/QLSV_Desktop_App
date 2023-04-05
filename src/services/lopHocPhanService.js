export const getLopHocPhanTheoMaHP = async (maHP, maHK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/hocphan', {
            params: {
                maHP: maHP,
                maHK: maHK,
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

export const addLopHocPhan = async (hp, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/lophocphan', hp, {
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

export const addNhomTH = async (nhomTH, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/nhomTH`, nhomTH, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getNhomTHTheoMaHP = async (maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/nhomTH/maLHP', {
            params: {
                maLHP: maLHP,
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

export const updateLopHocPhan = async (hp, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/lophocphan', hp, {
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

export const getLHPCuaGVTheoMaHK = async (maGV, maHK, maHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/giangvien', {
            params: {
                maGV: maGV,
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

export const getALLNhomTHTheoMaHP = async (maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/nhomTH/lhp', {
            params: {
                maLHP: maLHP,
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
