import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { apiDeleteOrganization } from "../../services";
import Swal from "sweetalert2";

const ManageOrganization = () => {
    const dispatch = useDispatch();
    const { organizations } = useSelector((state) => state.organization);
    const [updateData, setUpdateData] = useState(false);
    useEffect(() => {
        dispatch(actions.getAllOrganization());
    }, [updateData]);

    const handleDeleteOrganization = async (campaignId) => {
        const response = await apiDeleteOrganization(campaignId);
        if (response.data.err === 0) {
            setUpdateData((prev) => !prev);
            Swal.fire("Success!", "Xóa tổ chức thành công!", "success");
        } else {
            Swal.fire("Oops!", "Xóa tổ chức thất bại~~", "error");
        }
    };
    return (
        <div className="flex flex-col gap-6 p-6 ralative">
            <div className="py-4 border-b border-gray-300 flex items-center justify-between">
                <h1 className="font-medium text-3xl ">Quản lý tổ chức</h1>
            </div>
            <table className="w-full table-auto ">
                <thead>
                    <tr className="flex w-full bg-gray-100">
                        <th className="border flex-1 py-2">STT</th>
                        <th className="border flex-1 py-2">Ảnh đại diện</th>
                        <th className="border flex-1 py-2">Tên tổ chức</th>
                        <th className="border flex-1 py-2">Email</th>
                        <th className="border flex-1 py-2">Số điện thoại</th>
                        <th className="border flex-1 py-2">Địa chỉ</th>
                        <th className="border flex-1 py-2">Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {organizations.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="text-center py-4">
                                Không có tổ chức nào
                            </td>
                        </tr>
                    ) : (
                        organizations.map((item, index) => (
                            <tr
                                className="flex items-center h-16 cursor-pointer"
                                key={item.id}
                            >
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {index + 1}
                                </td>
                                <td className="border flex-1 h-full flex items-center justify-center ">
                                    <img
                                        src={item?.image || ""}
                                        alt="avatar-post"
                                        className="w-10 h-10 object-cover rounded-md"
                                    />
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {`${item?.name}`}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {item?.email}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {item?.phone}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {item?.address}
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center gap-4">
                                    <button
                                        className="bg-red-600 text-white px-1 py-1 rounded"
                                        onClick={() =>
                                            handleDeleteOrganization(item.id)
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

export default ManageOrganization;
