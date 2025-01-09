import React, { useState } from "react";
import { InputForm, Button } from "../../components";
import validate from "../../utils/Common/validateField";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";
const LoginOrganization = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });
    const [invalidFields, setInvalidFields] = useState([]);

    const handleSubmit = async () => {
        let finalPayload = { email: payload.email, password: payload.password };

        let invalids = validate(finalPayload, setInvalidFields);
        if (invalids === 0) {
            const result = await dispatch(
                actions.loginOrganization(finalPayload)
            );
            if (result?.success) {
                navigate(path.ORGANIZATION);
            } else {
                Swal.fire(
                    result?.msg || "Đăng nhập thất bại, vui lòng thử lại."
                );
            }
        }
    };
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="bg-white w-[600px] p-[30px] pb-[100px] mt-5 rounded-md shadow-lg">
                <h3 className="font-semibold text-2xl mb-3">
                    Đăng nhập tổ chức
                </h3>
                <div className="w-full flex flex-col gap-5">
                    <InputForm
                        label={"EMAIL"}
                        value={payload.email}
                        setValue={setPayload}
                        keyPayload={"email"}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <InputForm
                        label={"MẬT KHẨU"}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={"password"}
                        type="password"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Button
                        text={"Đăng nhập"}
                        bgColor="bg-[#ED1651]"
                        textColor="text-white"
                        fullWidth
                        onclick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginOrganization;
