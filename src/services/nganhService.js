export const getNganhHocByKhoa = async (khoa, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('nganh/khoa', {
            params: {
                khoaId: khoa,
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
