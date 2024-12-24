import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaQuestion } from "react-icons/fa";
import { MdOutlineAdd, MdDelete, MdQuestionAnswer } from 'react-icons/md';
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";

const AddPoll = () => {
    const [options, setOptions] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const initialOptions = [];
        for (let i = 0; i < 2; i++) {
            initialOptions.push(
                <div className="mb-3" key={i}>
                    <div className="mb-5 relative">
                        <MdQuestionAnswer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input placeholder="Options" className="pl-10 w-full" type="text" id={`option-${i}`} />
                    </div>
                </div>
            );
        }
        setOptions(initialOptions);
    }, []);

    const removeOption = (index: number) => {
        setOptions(prevOptions => prevOptions.filter((_, i) => i !== index));
    };

    const addOption = () => {
        setOptions(prevOptions => [
            ...prevOptions,
            <div className="mb-3 flex" key={prevOptions.length}>
                <div className="relative flex-1">
                    <MdQuestionAnswer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={15} />
                    <Input
                        placeholder="Option"
                        className="pl-10 w-full text-white rounded-r-none border-r-0 h-10"
                        type="text"
                        id={`option-${prevOptions.length}`}
                    />
                </div>
                <Button
                    type="button"
                    className="bg-red-700 text-white px-4 h-10 rounded-l-none rounded-r-md border border-l-0 hover:bg-red-800" onClick={() => removeOption(prevOptions.length)}
                >
                    <div className="flex flex-row text-white items-center cursor-pointer">
                        <MdDelete size={20} className="text-[#999999]" />
                        <p className="ms-1">remove</p>
                    </div>
                </Button>
            </div>
        ]);
    };

    return (
        <>
            <form action="">
                <div className="mb-3">
                    <Label htmlFor="question">Your Question</Label>
                    <div className="mb-5 relative">
                        <FaQuestion className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={15} />
                        <Textarea placeholder="question" className="pl-10 pt-7 pb-2 w-full text-white" id="question" />
                    </div>
                </div>
                <Label htmlFor="options" className="text-white">Answer Options</Label>
                {options.map(opt => opt)}
                <div className="mb-3">
                    <Button className="bg-blue-700 w-[30%] hover:bg-blue-800" type="button" onClick={addOption}>
                        <div className="flex flex-row text-white items-center cursor-pointer">
                            <MdOutlineAdd size={20} className="text-[#999999]" />
                            <p className="ms-1 text-sm">Add Options</p>
                        </div>
                    </Button>
                </div>
                <Label htmlFor="settings" className="text-white">Settings</Label>
                <div className="flex flex-col mb-3 text-white mt-1" id="settings">
                    <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                        <Checkbox className="border border-[#999999] me-2" id="private" />
                        <p className="text-sm">Private</p>
                    </div>
                    <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                        <Checkbox className="border border-[#999999] me-2" id="multi-choice" />
                        <p className="text-sm">Multi Choice</p>
                    </div>
                    <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                        <Checkbox className="border border-[#999999] me-2" id="disable-comment" />
                        <p className="text-sm">Disable Comment</p>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddPoll;
