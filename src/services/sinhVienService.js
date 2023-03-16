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
