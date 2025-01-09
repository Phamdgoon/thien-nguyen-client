import React, { useEffect, useState } from "react";
import { Footer, Header } from "../Public";
import { InputFormV2, Button } from "../../components";
import anonavatar from "../../assets/anon-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../store/actions";
import { blobToBase64, fileToBase64 } from "../../utils/Common/tobase64";
import Swal from "sweetalert2";
import { apiUpdateUser } from "../../services/user";

const Profile = () => {
    const dispatch = useDispatch();
    const { currentData } = useSelector((state) => state.user);
    const [invalidFields, setInvalidFields] = useState([]);

    const [payload, setPayload] = useState({
        name: currentData?.name || "",
        email: currentData?.email || "",
        phone: currentData?.phone || "",
        avatar: blobToBase64(currentData?.avatar) || "",
    });

    useEffect(() => {
        dispatch(getCurrent());
    }, [dispatch]);
    useEffect(() => {
        if (currentData) {
            const avatar = blobToBase64(currentData?.avatar);
            setPayload({
                name: currentData?.name || "",
                email: currentData?.email || "",
                phone: currentData?.phone || "",
                avatar: avatar || "",
            });
        }
    }, [currentData]);

    const inputChange = (field) => (value) => {
        setPayload((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload);

        if (response?.data.err === 0) {
            Swal.fire("Done", "Chỉnh sửa thành công", "success").then(() => {
                dispatch(getCurrent());
            });
        } else {
            Swal.fire("Oops!", "Chỉnh sửa thất bại", "error");
        }
    };

    const handleUploadFile = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0]);
        console.log("Uploaded Image Base64:", imageBase64);
        setPayload((prev) => ({ ...prev, avatar: imageBase64 }));
    };

    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <div className="w-full relative py-10">
                <img
                    src="https://givenow.vn/wp-content/uploads/2022/03/banner-3.jpg"
                    className="w-full object-cover"
                />
            </div>
            <div className="mb-20 p-6 max-w-[800px] mx-auto bg-white rounded-md shadow-md">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold">Thông tin cá nhân</h1>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputFormV2
                        label="Tên *"
                        value={payload.name}
                        setValue={inputChange("name")}
                        invalidFields={invalidFields}
                        setinvalidFields={setInvalidFields}
                    />
                    <InputFormV2
                        label="Email *"
                        value={payload.email}
                        setValue={inputChange("email")}
                        invalidFields={invalidFields}
                        setinvalidFields={setInvalidFields}
                    />

                    <InputFormV2
                        label="Số điện thoại *"
                        value={payload.phone}
                        setValue={inputChange("phone")}
                        invalidFields={invalidFields}
                        setinvalidFields={setInvalidFields}
                    />
                    <div className="flex mb-6">
                        <label className="w-48 flex-none" htmlFor="avatar">
                            Ảnh đại diện
                        </label>
                        <div>
                            <img
                                src={payload.avatar || anonavatar}
                                alt="avatar"
                                className="w-28 h-28 rounded-full object-cover"
                            />

                            <input
                                type="file"
                                id="avatar"
                                className="appearance-none my-4"
                                onChange={handleUploadFile}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        text="Lưu thông tin"
                        textColor="text-white"
                        bgColor="bg-blue-500"
                        onclick={handleSubmit}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
