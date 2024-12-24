import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { MdQuestionAnswer } from 'react-icons/md';
import { Button } from "@/components/ui/button";

const Comment = () => {
    return (
        <>
            <form action="">
                <div className="mb-5 relative">
                    <MdQuestionAnswer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={15} />
                    <Textarea placeholder="comment" className="pl-10 pt-7 pb-2 w-full text-white" id="question" />
                </div>
                <div className="flex justify-start">
                    <Button className="bg-blue-700 w-[10%] rounded-md">Send</Button>
                </div>
            </form>
        </>
    )
};

export default Comment;