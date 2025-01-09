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
                        <select
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn kỹ năng --</option>
                            <option value="gói quà tặng">
                                Kỹ năng gói quà tặng
                            </option>
                            <option value="tổ chức sự kiện">
                                Kỹ năng tổ chức
                            </option>
                            <option value="vệ sinh môi trường">
                                Kỹ năng môi trường
                            </option>
                            <option value="cứu trợ thiên tai">
                                Kỹ năng cứu trợ
                            </option>
                            <option value="dạy học">Kỹ năng dạy học</option>
                            <option value="phân phát quà tặng">
                                Kỹ năng phân phát quà
                            </option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Kinh nghiệm
                        </label>
                        <select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn kinh nghiệm --</option>
                            <option value="đã tham gia tình nguyện viên trước đó">
                                Đã tham gia tình nguyện viên trước đó
                            </option>
                            <option value="chưa tham gia tình nguyện viên trước đó">
                                Chưa tham gia tình nguyện viên trước đó
                            </option>
                        </select>
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
