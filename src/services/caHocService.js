export const getTatCaCaHoc = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/cahoc', {
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
