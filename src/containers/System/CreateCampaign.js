import React, { useEffect, useState } from "react";
import { InputFormV2, Button, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../utils/icons";
import { apiUploadImages, apiCreateCampaign } from "../../services/campaign";
import Swal from "sweetalert2";

const { ImBin, BsCameraFill } = icons;

const CreateCampaign = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.app);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        dispatch(actions.getCategories());
    }, [dispatch]);

    const [payload, setPayload] = useState({
        title: "",
        description: "",
        targetAmount: 0,
        category: "",
        startDate: "",
        endDate: "",
        images: [],
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const handleInputChange = (key, value) => {
        setPayload((prev) => ({ ...prev, [key]: value }));
    };

    const handleFiles = async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        let images = [];
        const files = e.target.files;
        const formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append(
                "upload_preset",
                process.env.REACT_APP_UPLOAD_ASSETS_NAME
            );
            const response = await apiUploadImages(formData);

            if (response.status === 200) {
                images = [...images, response.data?.secure_url];
            }
        }

        setIsLoading(false);
        setImagesPreview((prev) => [...prev, ...images]);
        setPayload((prev) => ({
            ...prev,
            images: [...prev.images, ...images],
        }));
    };

    const handleDeleteImage = (image) => {
        setImagesPreview((prev) => prev?.filter((item) => item !== image));
        setPayload((prev) => ({
            ...prev,
            images: prev.images?.filter((item) => item !== image),
        }));
    };

    const handleSubmit = async () => {
        if (
            !payload.title ||
            !payload.description ||
            !payload.targetAmount ||
            !payload.category ||
            !payload.startDate ||
            !payload.endDate
        ) {
            Swal.fire("Lỗi", "Vui lòng điền đầy đủ thông tin", "error");
            return;
        }

        const finalPayload = {
            ...payload,
            targetAmount: Number(payload.targetAmount),
        };

        const response = await apiCreateCampaign(finalPayload);
        if (response.status === 200) {
            Swal.fire("Thành công", "Tạo chiến dịch mới thành công", "success");
            setPayload({
                title: "",
                description: "",
                targetAmount: 0,
                category: "",
                startDate: "",
                endDate: "",
                images: [],
            });
            setImagesPreview([]);
        } else {
            Swal.fire("Opps!", "Có lỗi gì đó xảy ra", "error");
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 ralative">
            <div className="py-4 border-b border-gray-300 flex items-center justify-between">
                <h1 className="font-medium text-3xl ">Tạo mới chiến dịch</h1>
            </div>
            <div className="w-3/5 flex flex-col gap-6">
                <InputFormV2
                    label="Title"
                    value={payload.title}
                    setValue={(value) => handleInputChange("title", value)}
                    keyPayload="title"
                    invalidFields={invalidFields}
                    setinvalidFields={setInvalidFields}
                />
                <textarea
                    id="desc"
                    cols="30"
                    rows="10"
                    className="w-full rounded-md outline-none border border-gray-200 p-2"
                    value={payload.description}
                    onChange={(e) =>
                        setPayload((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                ></textarea>
                <InputFormV2
                    label="Target Amount"
                    value={payload.targetAmount}
                    setValue={(value) =>
                        handleInputChange("targetAmount", value)
                    }
                    keyPayload="targetAmount"
                    invalidFields={invalidFields}
                    setinvalidFields={setInvalidFields}
                    type="number"
                />
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        value={payload.category}
                        onChange={(e) =>
                            handleInputChange("category", e.target.value)
                        }
                        className="w-full border border-gray-500 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.id}>
                                {category.value}
                            </option>
                        ))}
                    </select>
                </div>
                <InputFormV2
                    label="Start Date"
                    value={payload.startDate}
                    setValue={(value) => handleInputChange("startDate", value)}
                    keyPayload="startDate"
                    invalidFields={invalidFields}
                    setinvalidFields={setInvalidFields}
                    type="date"
                />
                <InputFormV2
                    label="End Date"
                    value={payload.endDate}
                    setValue={(value) => handleInputChange("endDate", value)}
                    keyPayload="endDate"
                    invalidFields={invalidFields}
                    setinvalidFields={setInvalidFields}
                    type="date"
                />
                <div className="w-full">
                    <h2 className="font-semibold text-xl py-4">Images</h2>
                    <div className="w-full mb-6">
                        <label
                            className="w-full border-2 border-dashed gap-4 my-4 flex flex-col items-center justify-center border-gray-500 rounded-md h-[200px]"
                            htmlFor="file"
                        >
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <BsCameraFill size={50} color="blue" />
                                    Thêm ảnh
                                </div>
                            )}
                        </label>
                        <input
                            onChange={handleFiles}
                            hidden
                            type="file"
                            id="file"
                            multiple
                        />
                        <div>
                            <h3 className="font-medium py-4">
                                Selected Images
                            </h3>
                            <div className="flex gap-4 items-center">
                                {imagesPreview.map((item) => (
                                    <div key={item} className="relative">
                                        <img
                                            src={item}
                                            alt="preview"
                                            className="w-40 h-40 object-cover rounded-md"
                                        />
                                        <span
                                            title="Remove"
                                            onClick={() =>
                                                handleDeleteImage(item)
                                            }
                                            className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                                        >
                                            <ImBin />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <Button
                        text="Create Campaign"
                        textColor="text-white"
                        bgColor="bg-[#ED1651] hover:bg-[#C21243]"
                        px="px-6"
                        fullWidth
                        onclick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign;
