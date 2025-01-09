import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { apiDeleteVolunteer, apiApprovedVolunteer } from "../../services";
import Swal from "sweetalert2";
import ModalTask from "./ModalTask";

const ManageVolunteer = () => {
    const dispatch = useDispatch();
    const { allVolunteers, approvedVolunteers, notApprovedVolunteers } =
        useSelector((state) => state.volunteer);
    const [status, setStatus] = useState("0");
    const [volunteer, setVolunteer] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);

    useEffect(() => {
        if (allVolunteers) setVolunteer(allVolunteers);
    }, [allVolunteers]);

    useEffect(() => {
        dispatch(actions.getAllVolunteer());
    }, [updateData]);

    useEffect(() => {
        if (status === "1") {
            setVolunteer(notApprovedVolunteers || []);
        } else if (status === "2") {
            setVolunteer(approvedVolunteers || []);
        } else {
            setVolunteer(allVolunteers || []);
        }
    }, [status, allVolunteers, approvedVolunteers, notApprovedVolunteers]);

    const handleDeleteVolunteer = async (volunteerId) => {
        const response = await apiDeleteVolunteer(volunteerId);
        if (response.data.err === 0) {
            setUpdateData((prev) => !prev);
            Swal.fire("Success!", "Xóa volunteer thành công!", "success");
        } else {
            Swal.fire("Oops!", "Xóa volunteer thất bại~~", "error");
        }
    };
    const handleApprovedVolunteer = async (volunteerId) => {
        const response = await apiApprovedVolunteer(volunteerId);
        if (response.data.err === 0) {
            setUpdateData((prev) => !prev);
            Swal.fire("Success!", "Duyệt volunteer thành công!", "success");
        } else {
            Swal.fire("Oops!", "Duyệt volunteer thất bại~~", "error");
        }
    };
    const handlePCNVClick = (volunteer) => {
        setSelectedVolunteer(volunteer);
        setIsModalOpen(true);
    };
    const reloadVolunteers = () => {
        dispatch(actions.getAllVolunteer());
    };

    return (
        <div className="flex flex-col gap-6 p-6 ralative">
            <div className="py-4 border-b border-gray-300 flex items-center justify-between">
                <h1 className="font-medium text-3xl ">
                    Quản lý tình nguyện viên
                </h1>
                <select
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    className="outline-none border border-gray-200 p-2"
                >
                    <option value="0">Tất cả tình nguyện viên</option>
                    <option value="1">Chưa duyệt</option>
                    <option value="2">Đã duyệt</option>
                </select>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className="flex w-full bg-gray-100">
                        <th className="border flex-1 py-2">STT</th>
                        <th className="border flex-1 py-2">Tên TNV</th>
                        <th className="border flex-1 py-2">Tiêu đề</th>
                        <th className="border flex-1 py-2">Kỹ năng</th>
                        <th className="border flex-1 py-2">Kinh nghiệm</th>
                        <th className="border flex-1 py-2">Nhiệm vụ</th>
                        <th className="border flex-1 py-2">Trạng thái</th>
                        <th className="border flex-1 py-2">Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteer.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                Không có tình nguyện viên
                            </td>
                        </tr>
                    ) : (
                        volunteer.map((item, index) => (
                            <tr
                                className="flex items-center h-16"
                                key={item.id}
                            >
                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {index + 1}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.user?.name}
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.volunteerCampaigns[0]?.campaign?.title.slice(
                                        0,
                                        20
                                    )}
                                    ...
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.skills}
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.experience}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.taskName}
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center">
                                    {item?.status?.name}
                                </td>

                                <td className="border px-2 flex-1 h-full flex items-center justify-center gap-4">
                                    <button
                                        className={`bg-green-600 text-white px-2 py-1 rounded ${
                                            item?.status?.name === "Đã duyệt" &&
                                            item?.status?.entityType ===
                                                "volunteer"
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            !(
                                                item?.status?.name ===
                                                    "Đã duyệt" &&
                                                item?.status?.entityType ===
                                                    "volunteer"
                                            ) &&
                                            handleApprovedVolunteer(item.id)
                                        }
                                        disabled={
                                            item?.status?.name === "Đã duyệt" &&
                                            item?.status?.entityType ===
                                                "volunteer"
                                        }
                                    >
                                        Duyệt
                                    </button>
                                    <button
                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                        onClick={() => handlePCNVClick(item)}
                                    >
                                        PCNV
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            handleDeleteVolunteer(item.id)
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
            <ModalTask
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                volunteer={selectedVolunteer}
                reloadVolunteers={reloadVolunteers}
            />
        </div>
    );
};

export default ManageVolunteer;
