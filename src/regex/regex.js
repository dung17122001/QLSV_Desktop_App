export const checkValidTen = (value) => {
    if (
        !!value &&
        value.match(
            /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
        )
    ) {
        return true;
    } else {
        return false;
    }
};
export const checkValidSDT = (value) => {
    if (!!value && value.match(/^0\d{9}$/)) {
        return true;
    } else {
        return false;
    }
};

export const checkValidNgaySinh = (value) => {
    if (!!value) {
        return true;
    } else {
        return false;
    }
};
export const checkValidKhoa = (value) => {
    if (!!value) {
        return true;
    } else {
        return false;
    }
};
