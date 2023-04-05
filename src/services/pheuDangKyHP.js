export const getChiTietPhieuTheoMaLHP = async (maLHP, maNhom, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phieudkhp/lhp', {
            params: {
                maLHP: maLHP,
                maNhom: maNhom,
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
