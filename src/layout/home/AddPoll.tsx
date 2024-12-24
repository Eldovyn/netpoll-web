import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaQuestion } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { MdOutlineAdd } from 'react-icons/md';
import { Checkbox } from "@/components/ui/checkbox"

const AddPoll = () => {
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
                <Label htmlFor="email" className="text-white">answer</Label>
                <div className="mb-3 mt-1">
                    <div className="mb-5 relative">
                        <MdQuestionAnswer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input placeholder="options" className="pl-10 w-full" type="text" id="email" />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="mb-5 relative">
                        <MdQuestionAnswer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input placeholder="options" className="pl-10 w-full" type="text" id="email" />
                    </div>
                </div>
                <div className="mb-3">
                    <Button className="bg-blue-700 w-[30%] hover:bg-blue-800">
                        <div className="flex flex-row text-white items-center cursor-pointer">
                            <MdOutlineAdd size={20} className="text-[#999999]" />
                            <p className="ms-1 text-sm">Add Options</p>
                        </div>
                    </Button>
                </div>
                <Label htmlFor="email" className="text-white">settings</Label>
                <div className="flex flex-col mb-3 text-white mt-1">
                    <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                        <Checkbox className="border border-[#999999] me-2" id="checkbox" />
                        <p className="text-sm">Private</p>
                    </div>
                    <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                        <Checkbox className="border border-[#999999] me-2" id="checkbox" />
                        <p className="text-sm">Multi Choice</p>
                    </div>
                    <div className="flex flex-row text-[#999999] items-center cursor-pointer mb-1">
                        <Checkbox className="border border-[#999999] me-2" id="checkbox" />
                        <p className="text-sm">Disable Comentar</p>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddPoll;
