import React, { memo, useEffect, useState } from "react";
import icons from "../../utils/icons";
import { Button, InputFormV2 } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { apiAssignTask } from "../../services";
import Swal from "sweetalert2";

const { IoMdClose } = icons;

const ModalTask = ({ isOpen, closeModal, volunteer, reloadVolunteers }) => {
    const dispatch = useDispatch();
    const { taskTypes } = useSelector((state) => state.task);
    const [formData, setFormData] = useState({});
    const [invalidFields, setInvalidFields] = useState([]);

    useEffect(() => {
        dispatch(actions.getTaskTypes());
    }, [dispatch]);

    useEffect(() => {
        if (volunteer) {
            setFormData({
                name: volunteer?.user?.name || "",
                title: volunteer?.volunteerCampaigns[0]?.campaign?.title,
                skills: volunteer?.skills || "",
                experience: volunteer?.experience || "",
                taskTypeId: "",
            });
        }
    }, [volunteer]);

    const handleChange = (key) => (value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            const volunteerId = volunteer?.id;
            const { taskTypeId } = formData;

            if (!taskTypeId) {
                Swal.fire("Lỗi", "Vui lòng chọn loại nhiệm vụ", "error");
                return;
            }

            const response = await apiAssignTask(taskTypeId, volunteerId);

            if (response.data && response.data.err === 0) {
                Swal.fire(
                    "Thành công",
                    "Phân công nhiệm vụ thành công",
                    "success"
                );
                reloadVolunteers();
                closeModal();
            } else {
                Swal.fire("Oops!", "Có lỗi xảy ra, vui lòng thử lại", "error");
            }
        } catch (error) {
            console.error("Error assigning task: ", error);
            Swal.fire("Oops!", "Có lỗi xảy ra, vui lòng thử lại", "error");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white w-[600px] p-6 rounded-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={closeModal}
                >
                    <IoMdClose size={20} />
                </button>
                <h2 className="text-xl font-semibold mb-4">
                    Phân công nhiệm vụ
                </h2>
                <div className="flex flex-col gap-4">
                    {volunteer ? (
                        <form>
                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <InputFormV2
                                        label="Tên TNV"
                                        value={formData.name || ""}
                                        setValue={handleChange("name")}
                                        keyPayload="name"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputFormV2
                                        label="Tiêu đề"
                                        value={formData.title || ""}
                                        setValue={handleChange("title")}
                                        keyPayload="title"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <InputFormV2
                                        label="Kỹ năng"
                                        value={formData.skills || ""}
                                        setValue={handleChange("skills")}
                                        keyPayload="skills"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputFormV2
                                        label="Kinh nghiệm"
                                        value={formData.experience || ""}
                                        setValue={handleChange("experience")}
                                        keyPayload="experience"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="taskTypeId" className="text-xs">
                                    Loại nhiệm vụ
                                </label>
                                <select
                                    id="taskTypeId"
                                    name="taskTypeId"
                                    value={formData.taskTypeId || ""}
                                    onChange={handleDropdownChange}
                                    className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                                >
                                    <option value="">Chọn loại nhiệm vụ</option>
                                    {taskTypes?.map((task, index) => (
                                        <option key={index} value={task.id}>
                                            {task.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    ) : (
                        <p>Không có thông tin tình nguyện viên</p>
                    )}

                    <Button
                        text="Phân công"
                        textColor="text-white"
                        bgColor="bg-[#ED1651]"
                        px="px-6"
                        onclick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(ModalTask);
