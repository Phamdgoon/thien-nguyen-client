import React, { memo } from "react";

const InputFormV2 = ({
    label,
    value,
    setValue,
    keyPayload,
    invalidFields,
    setinvalidFields,
    type,
    readOnly,
}) => {
    return (
        <div>
            <label className="text-xs" htmlFor={keyPayload}>
                {label}
            </label>
            <input
                type={type || "text"}
                id={keyPayload}
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setinvalidFields && setinvalidFields([])}
                readOnly={readOnly}
            />
            {invalidFields?.some((i) => i.name === keyPayload) && (
                <small className="text-red-500 italic">
                    {invalidFields.find((i) => i.name === keyPayload)?.message}
                </small>
            )}
        </div>
    );
};

export default memo(InputFormV2);
