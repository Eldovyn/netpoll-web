import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaQuestion } from "react-icons/fa";
import { MdOutlineAdd, MdDelete, MdQuestionAnswer } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import Cookies from "js-cookie";
import LoadingSpinnerComponent from 'react-spinners-components';
import { alertFailed } from "@/components/ui/alertFailed";
import { alertSuccess } from "@/components/ui/alertSucces";
import { useRouter } from "next/navigation";

const AddPoll: React.FC = () => {
    const [options, setOptions] = useState<string[]>(["", ""]);
    const [settings, setSettings] = useState({
        private: false,
        multiChoice: false,
        disableComment: false,
    });
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const { push } = useRouter();

    const handleOptionChange = (value: string, index: number) => {
        setOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = value;
            return updatedOptions;
        });
    };

    const removeOption = (index: number) => {
        setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
    };

    const addOption = () => {
        setOptions((prevOptions) => [...prevOptions, ""]);
    };

    const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const accessToken = Cookies.get('accessToken') || '';
        try {
            setLoading(true);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
            setQuestion("");
            setOptions(["", ""]);
            setSettings({
                private: false,
                multiChoice: false,
                disableComment: false,
            });
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <div className="mb-5 relative">
                    <FaQuestion
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={15}
                    />
                    <Textarea
                        placeholder="Question"
                        className="pl-10 pt-7 pb-2 w-full text-white"
                        id="question" value={question} onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
            </div>
            <Label htmlFor="options" className="text-white">
                Answer Options
            </Label>
            {options.map((option, index) => (
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
                        checked={settings.private}
                        onCheckedChange={(checked) =>
                            handleSettingChange("private", checked as boolean)
                        }
                    />
                    <p className="text-sm">Private</p>
                </div>
                <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                    <Checkbox
                        className="border border-[#999999] me-2"
                        checked={settings.multiChoice}
                        onCheckedChange={(checked) =>
                            handleSettingChange("multiChoice", checked as boolean)
                        }
                    />
                    <p className="text-sm">Multi Choice</p>
                </div>
                <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                    <Checkbox
                        className="border border-[#999999] me-2"
                        checked={settings.disableComment}
                        onCheckedChange={(checked) =>
                            handleSettingChange("disableComment", checked as boolean)
                        }
                    />
                    <p className="text-sm">Disable Comment</p>
                </div>
            </div>
            <Button className="bg-blue-700 w-full hover:bg-blue-800" type="submit">
                Submit
            </Button>
        </form>
    );
};

export default AddPoll;
