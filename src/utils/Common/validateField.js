const validate = (payload, setinvalidFields) => {
    let invalids = 0;
    let fields = Object.entries(payload);

    fields.forEach((item) => {
        if (item[1] === "") {
            setinvalidFields((prev) => [
                ...prev,
                {
                    name: item[0],
                    message: "Bạn không được bỏ trống trường này.",
                },
            ]);
            invalids++;
        }
    });
    fields.forEach((item) => {
        switch (item[0]) {
            case "password":
                if (item[1].length < 6) {
                    setinvalidFields((prev) => [
                        ...prev,
                        {
                            name: item[0],
                            message: "Mật khẩu phải có tối thiểu 6 kí tự.",
                        },
                    ]);
                    invalids++;
                }
                break;
            case "email":
                // Kiểm tra định dạng email nếu trường không rỗng
                if (
                    item[1] &&
                    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(item[1])
                ) {
                    setinvalidFields((prev) => [
                        ...prev,
                        {
                            name: item[0],
                            message: "Email không hợp lệ.",
                        },
                    ]);
                    invalids++;
                }
                break;
            case "priceNumber":
            case "areaNumber":
                if (+item[1] === 0) {
                    setinvalidFields((prev) => [
                        ...prev,
                        {
                            name: item[0],
                            message: "Chưa đặt giá trị cho trường này",
                        },
                    ]);
                    invalids++;
                }
                if (!+item[1]) {
                    setinvalidFields((prev) => [
                        ...prev,
                        {
                            name: item[0],
                            message: "Trường này phải là số",
                        },
                    ]);
                    invalids++;
                }
                break;
            default:
                break;
        }
    });
    return invalids;
};

export default validate;
