import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { apiDeleteUser } from "../../services/user";
import Swal from "sweetalert2";
import { blobToBase64 } from "../../utils/Common/tobase64";

const ManageUser = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const [updateData, setUpdateData] = useState(false);

    useEffect(() => {
        dispatch(actions.getAllUser());
    }, [updateData]);

    const handleDeleteUser = async (id) => {
        const response = await apiDeleteUser(id);
        if (response.data.err === 0) {
            setUpdateData((prev) => !prev);
            Swal.fire("Success!", "Xóa user thành công!", "success");
        } else {
            Swal.fire("Oops!", "Xóa user thất bại~~", "error");
        }
    };
    return (
        <div className="flex flex-col gap-6 p-6 ralative">
            <div className="py-4 border-b border-gray-300 flex items-center justify-between">
                <h1 className="font-medium text-3xl ">Quản lý người dùng</h1>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className="flex w-full bg-gray-100">
                        <th className="border flex-1 py-2">STT</th>
                        <th className="border flex-1 py-2">Ảnh đại diện</th>
                        <th className="border flex-1 py-2">Tên</th>
                        <th className="border flex-1 py-2">Email</th>
                        <th className="border flex-1 py-2">Số điện thoại</th>
                        <th className="border flex-1 py-2">Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                Không có người dùng
                            </td>
                        </tr>
                    ) : (
                        users.map((item, index) => (
                            <tr
                                className="flex items-center h-16"
                                key={item.id}
                            >
                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {index + 1}
                                </td>
                                <td className="border flex-1 h-full flex items-center justify-center ">
                                    <img
                                        src={blobToBase64(item?.avatar) || ""}
                                        alt="avatar-user"
                                        className="w-10 h-10 object-cover rounded-md"
                                    />
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.name}
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.email}
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.phone}
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center gap-4">
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            handleDeleteUser(item.id)
                                        }
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUser;
