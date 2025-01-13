import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaQuestion } from "react-icons/fa";
import { MdOutlineAdd, MdDelete, MdQuestionAnswer } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import Cookies from "js-cookie";
import LoadingSpinnerComponent from "react-spinners-components";
import { alertFailed } from "@/components/ui/alertFailed";
import { alertSuccess } from "@/components/ui/alertSucces";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface answerErrors {
    answer: string[];
}

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[] | {
            private?: string[];
            multiChoice?: string[];
            disableComment?: string[];
        };
    };
}

interface FormErrors {
    answer: string[];
    private: string[];
    multiChoice: string[];
    disableComment: string[];
    title: string[];
}

interface PollSettings {
    private: boolean;
    multiChoice: boolean;
    disableComment: boolean;
}

interface PollingFormValues {
    answer: string[];
    settings: PollSettings;
    title: string;
}

const AddPoll: React.FC = () => {
    const { push } = useRouter();

    const { mutate } = useMutation({
        mutationFn: async (data: PollingFormValues) => {
            const token = Cookies.get("accessToken") || "";
            const response = await axiosInstance.post("/netpoll/polling", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response;
        },
        onSuccess: async (data) => {
            alertSuccess(data.data.message);
            formik.resetForm();
            setTimeout(() => push(`/polling?pollingId=${data.data.data.polling.polling_id}`), 5000);
        },
        onError: async (error) => {
            const err = error as AxiosError<ErrorResponse>;
            if (err?.response?.status === 400 && err.response.data.errors) {
                const apiErrors = err.response?.data?.errors;
                handleValidation({
                    answer: apiErrors?.answer as string[] ?? [],
                    private: (apiErrors?.private as string[]) ?? [],
                    multiChoice: (apiErrors?.multiChoice as string[]) ?? [],
                    disableComment: (apiErrors?.disableComment as string[]) ?? [],
                    title: apiErrors?.title as string[] ?? [],
                });
            }
            alertFailed(err.response?.data.message || err.message);
        },
    })

    const [formErrors, setFormErrors] = useState<FormErrors>({
        answer: [],
        private: [],
        multiChoice: [],
        disableComment: [],
        title: [],
    });

    const handleValidation = (errors: FormErrors) => {
        setFormErrors({
            answer: errors.answer || [],
            private: errors.private || [],
            multiChoice: errors.multiChoice || [],
            disableComment: errors.disableComment || [],
            title: errors.title || [],
        });
    };

    const formik = useFormik({
        initialValues: {
            answer: ["", ""],
            settings: {
                private: false,
                multiChoice: false,
                disableComment: false,
            },
            title: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                mutate(values)
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleOptionChange = (value: string, index: number) => {
        const updatedOptions = [...formik.values.answer];
        updatedOptions[index] = value;
        formik.setFieldValue("answer", updatedOptions);
    };

    const removeOption = (index: number) => {
        const updatedOptions = formik.values.answer.filter((_, i) => i !== index);
        formik.setFieldValue("answer", updatedOptions);
    };

    const addOption = () => {
        formik.setFieldValue("answer", [...formik.values.answer, ""]);
    };

    const handleSettingChange = (key: keyof PollSettings, value: boolean) => {
        formik.setFieldValue("settings", {
            ...formik.values.settings,
            [key]: value,
        });
    };

    return (
        <form onSubmit={formik.isSubmitting ? () => { } : formik.handleSubmit}>
            <div className={`${formErrors.title ? "mb-2" : "mb-3"}`}>
                <div className="mb-5 relative">
                    <FaQuestion
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={15}
                    />
                    <Textarea
                        placeholder="Question"
                        className="pl-10 pt-7 pb-2 w-full text-white"
                        id="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    {formErrors.title && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                    )}
                </div>
            </div>
            <Label htmlFor="options" className="text-white">
                Answer Options
            </Label>
            {formik.values.answer.map((option, index) => (
                <div className="mb-3" key={index}>
                    <div className="flex">
                        <div className="relative flex-1">
                            <MdQuestionAnswer
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                size={15}
                            />
                            <Input
                                placeholder={`Option ${index + 1}`}
                                className="pl-10 w-full text-white rounded-r-none border-r-0"
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(e.target.value, index)}
                            />
                        </div>
                        <Button
                            type="button"
                            className="bg-red-700 text-white px-4 rounded-l-none rounded-r-md border border-l-0 hover:bg-red-800"
                            onClick={() => removeOption(index)}
                        >
                            <div className="flex flex-row text-white items-center cursor-pointer">
                                <MdDelete size={20} className="text-[#999999]" />
                                <p className="ms-1">Remove</p>
                            </div>
                        </Button>
                    </div>
                    {formErrors.answer[index] && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.answer[index]}</p>
                    )}
                </div>
            ))}
            <div className="mb-3">
                <Button
                    className="bg-blue-700 w-[30%] hover:bg-blue-800 h-[2rem]"
                    type="button"
                    onClick={addOption}
                >
                    <div className="flex flex-row text-white items-center cursor-pointer">
                        <MdOutlineAdd size={20} className="text-[#999999]" />
                        <p className="ms-1 text-sm">Add Options</p>
                    </div>
                </Button>
            </div>
            <Label htmlFor="settings" className="text-white">
                Settings
            </Label>
            <div className="flex flex-col mb-3 text-white mt-1" id="settings">
                <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                    <Checkbox
                        className="border border-[#999999] me-2"
                        checked={formik.values.settings.private}
                        onCheckedChange={(checked) =>
                            handleSettingChange("private", Boolean(checked))
                        }
                    />
                    <p className="text-sm">Private</p>
                </div>
                <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                    <Checkbox
                        className="border border-[#999999] me-2"
                        checked={formik.values.settings.multiChoice}
                        onCheckedChange={(checked) =>
                            handleSettingChange("multiChoice", Boolean(checked))
                        }
                    />
                    <p className="text-sm">Multi Choice</p>
                </div>
                <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                    <Checkbox
                        className="border border-[#999999] me-2"
                        checked={formik.values.settings.disableComment}
                        onCheckedChange={(checked) =>
                            handleSettingChange("disableComment", Boolean(checked))
                        }
                    />
                    <p className="text-sm">Disable Comment</p>
                </div>
            </div>
            <Button
                className="bg-blue-700 w-full hover:bg-blue-800"
                type="submit"
            >
                {formik.isSubmitting ? <LoadingSpinnerComponent size={20} /> : "Submit"}
            </Button>
        </form>
    );
};

export default AddPoll;
