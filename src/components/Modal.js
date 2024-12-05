import React, { memo, useState } from "react";
import { Button, InputFormV2 } from "../components";
import icons from "../utils/icons";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../store/actions";
import Swal from "sweetalert2";

const { IoMdClose } = icons;

const Modal = ({ isOpen, closeModal, onSubmit }) => {
    const dispatch = useDispatch();
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [invalidFields, setInvalidFields] = useState([]);
    const { campaignId } = useParams();

    const handleSubmit = () => {
        if (!skills || !experience) {
            setInvalidFields([
                { name: "skills", message: "Kỹ năng không được để trống" },
                {
                    name: "experience",
                    message: "Kinh nghiệm không được để trống",
                },
            ]);
            return;
        }

        dispatch(actions.registerVolunteer(campaignId, { skills, experience }))
            .then((response) => {
                if (response?.data?.err === 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Đăng ký thành công!",
                        text: "Bạn đã đăng ký làm tình nguyện viên cho chiến dịch.",
                        confirmButtonText: "OK",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Đăng ký thất bại!",
                        text: "Bạn đã đăng ký làm tình nguyện viên cho chiến dịch này rồi.",
                        confirmButtonText: "OK",
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Đã có lỗi xảy ra",
                    text: "Vui lòng thử lại sau.",
                    confirmButtonText: "OK",
                });
            });

        if (onSubmit) {
            onSubmit(skills, experience);
        }

        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white w-96 p-6 rounded-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={closeModal}
                >
                    <IoMdClose size={20} />
                </button>
                <h2 className="text-xl font-semibold mb-4">
                    Đăng ký tình nguyện viên
                </h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700">Kỹ năng</label>
                        <InputFormV2
                            value={skills}
                            setValue={setSkills}
                            keyPayload="skills"
                            invalidFields={invalidFields}
                            setinvalidFields={setInvalidFields}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Kinh nghiệm
                        </label>
                        <InputFormV2
                            value={experience}
                            setValue={setExperience}
                            keyPayload="experience"
                            invalidFields={invalidFields}
                            setinvalidFields={setInvalidFields}
                        />
                    </div>
                    <Button
                        text="Đăng ký"
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

export default memo(Modal);
