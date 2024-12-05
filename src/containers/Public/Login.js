import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Swal from "sweetalert2";
import validate from "../../utils/Common/validateField";

const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(location.state?.flag);
    const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [invalidFields, setinvalidFields] = useState([]);

    useEffect(() => {
        setIsRegister(location.state?.flag);
    }, [location.state?.flag]);

    useEffect(() => {
        isLoggedIn && navigate("/");
    }, [isLoggedIn]);

    useEffect(() => {
        msg && Swal.fire("Oops!", msg, "error");
    }, [msg, update]);

    const handleSubmit = async () => {
        let finalPayload = isRegister
            ? payload
            : { email: payload.email, password: payload.password };
        let invalids = validate(finalPayload, setinvalidFields);
        if (invalids === 0) {
            isRegister
                ? dispatch(actions.register(payload))
                : dispatch(actions.login(payload));
        }
    };

    return (
        <div className="w-full mt-16 flex flex-col items-center justify-center">
            <Header />
            <div className="bg-white w-[600px] p-[30px] pb-[100px] mt-5 rounded-md shadow-lg">
                <h3 className="font-semibold text-2xl mb-3">
                    {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
                </h3>
                <div className="w-full flex flex-col gap-5">
                    {isRegister && (
                        <InputForm
                            label={"HỌ TÊN"}
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload={"name"}
                            invalidFields={invalidFields}
                            setinvalidFields={setinvalidFields}
                        />
                    )}
                    <InputForm
                        label={"EMAIL"}
                        value={payload.email}
                        setValue={setPayload}
                        keyPayload={"email"}
                        invalidFields={invalidFields}
                        setinvalidFields={setinvalidFields}
                    />
                    <InputForm
                        label={"MẬT KHẨU"}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={"password"}
                        type="password"
                        invalidFields={invalidFields}
                        setinvalidFields={setinvalidFields}
                    />
                    <Button
                        text={isRegister ? "Đăng ký" : "Đăng nhập"}
                        bgColor="bg-[#ED1651]"
                        textColor="text-white"
                        fullWidth
                        onclick={handleSubmit}
                    />
                </div>
                <div className="mt-7 flex items-center justify-between">
                    {isRegister ? (
                        <span>
                            Bạn đã có tài khoản?
                            <span
                                onClick={() => {
                                    setIsRegister(false);
                                    setPayload({
                                        phone: "",
                                        password: "",
                                        name: "",
                                    });
                                }}
                                className="text-blue-500  hover:text-[red] cursor-pointer"
                            >
                                Đăng nhập ngay
                            </span>
                        </span>
                    ) : (
                        <>
                            <span className="text-[blue] hover:text-[red] cursor-pointer">
                                Bạn quên mật khẩu?
                            </span>
                            <span
                                onClick={() => {
                                    setIsRegister(true);
                                    setPayload({
                                        phone: "",
                                        password: "",
                                        name: "",
                                    });
                                }}
                                className="text-[blue] hover:text-[red] cursor-pointer"
                            >
                                Tạo tài khoản mới
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
