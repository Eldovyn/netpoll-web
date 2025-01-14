import React from "react";
import PollingList from "./Pagination/PollingData";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PollingData {
    created_at: number;
    disable_comment: boolean;
    multi_choice: boolean;
    polling_id: string;
    private: boolean;
    title: string;
    updated_at: number;
}

interface PaginationProps {
    category: string;
    data: {
        polling: PollingData[];
    };
}

const PaginationPage: React.FC<PaginationProps> = ({ category, data }) => {
    return (
        <>
            {category === 'my-polling' && (
                <PollingList data={data} />
            )}
            <Pagination>
                <PaginationContent className="text-white">
                    <PaginationItem className="bg-blue-600 rounded-sm cursor-pointer">
                        <PaginationPrevious href="#" className="hover:bg-blue-800 hover:text-white" />
                    </PaginationItem>
                    <PaginationItem className="bg-blue-600 rounded-sm cursor-pointer">
                        <PaginationLink href="#" className="hover:bg-blue-800 hover:text-white">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="bg-blue-600 rounded-sm cursor-pointer">
                        <PaginationEllipsis className="hover:bg-blue-800 hover:text-white" />
                    </PaginationItem>
                    <PaginationItem className="bg-blue-600  rounded-sm cursor-pointer">
                        <PaginationNext href="#" className="hover:bg-blue-800 hover:text-white" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default PaginationPage