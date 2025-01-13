import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaQuestion } from "react-icons/fa";
import { MdOutlineAdd, MdDelete, MdQuestionAnswer } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import Cookies from "js-cookie";
import LoadingSpinnerComponent from "react-spinners-components";
import { alertFailed } from "@/components/ui/alertFailed";
import { alertSuccess } from "@/components/ui/alertSucces";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

interface PollSettings {
    private: boolean;
    multiChoice: boolean;
    disableComment: boolean;
}

const AddPoll: React.FC = () => {
    const { push } = useRouter();

    const formik = useFormik({
        initialValues: {
            options: ["", ""],
            settings: {
                private: false,
                multiChoice: false,
                disableComment: false,
            },
            question: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                // 
            } catch (error) {
                // 
            } finally {
                console.log(values);
                setSubmitting(false);
            }
        },
    });

    const handleOptionChange = (value: string, index: number) => {
        const updatedOptions = [...formik.values.options];
        updatedOptions[index] = value;
        formik.setFieldValue("options", updatedOptions);
    };

    const removeOption = (index: number) => {
        const updatedOptions = formik.values.options.filter((_, i) => i !== index);
        formik.setFieldValue("options", updatedOptions);
    };

    const addOption = () => {
        formik.setFieldValue("options", [...formik.values.options, ""]);
    };

    const handleSettingChange = (key: keyof PollSettings, value: boolean) => {
        formik.setFieldValue("settings", {
            ...formik.values.settings,
            [key]: value,
        });
    };

    return (
        <form onSubmit={formik.isSubmitting ? () => {} : formik.handleSubmit}>
            <div className="mb-3">
                <div className="mb-5 relative">
                    <FaQuestion
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={15}
                    />
                    <Textarea
                        placeholder="Question"
                        className="pl-10 pt-7 pb-2 w-full text-white"
                        id="question"
                        value={formik.values.question}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <Label htmlFor="options" className="text-white">
                Answer Options
            </Label>
            {formik.values.options.map((option, index) => (
                <div className="mb-3 flex" key={index}>
                    <div className="relative flex-1">
                        <MdQuestionAnswer
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            size={15}
                        />
                        <Input
                            placeholder="Option"
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
