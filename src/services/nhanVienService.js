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
