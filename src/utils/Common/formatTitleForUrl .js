export const formatTitleForUrl = (title) => {
    return title
        .toLowerCase() // Chuyển thành chữ thường
        .trim() // Loại bỏ khoảng trắng đầu và cuối
        .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
        .replace(/[^\w-]/g, ""); // Loại bỏ ký tự đặc biệt
};
