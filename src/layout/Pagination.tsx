import React, { useState } from "react";
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

interface Polling {
    created_at: number;
    disable_comment: boolean;
    multi_choice: boolean;
    polling_id: string;
    private: boolean;
    title: string;
    updated_at: number;
}

interface PollingPage {
    current_page: number;
    per_page: number;
    pollings: Polling[][]; 
    size: number;
    total_page: number;
}

interface PollingData {
    polling: Polling[];
    user_id: string;
    username: string;
}

interface PollingResponse {
    data: PollingData;
    message: string;
    page: PollingPage;
}

interface PollingListProps {
    category: string;
    data: PollingResponse;
}

const PaginationPage: React.FC<PollingListProps> = ({ category, data }) => {
    const [currentPage, setCurrentPage] = useState(data.page.current_page);

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < data.page.total_page - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const renderPaginationItems = () => {
        const pageItems = [];
        const totalPages = data.page.total_page;
        const maxVisiblePages = 8; // Max number of pagination buttons including ellipses
        const startPage = Math.max(currentPage - 3, 1);
        const endPage = Math.min(currentPage + 3, totalPages);

        let visiblePagesCount = 0;

        for (let i = 1; i <= totalPages; i++) {
            // Only show a maximum of `maxVisiblePages` pagination items
            if (i < startPage || i > endPage) {
                if (visiblePagesCount < maxVisiblePages) {
                    if (i === startPage - 1 || i === endPage + 1) {
                        pageItems.push(
                            <PaginationEllipsis key={`ellipsis-${i}`} className="bg-blue-600 rounded-sm cursor-pointer">
                                <PaginationLink className="hover:bg-blue-800 hover:text-white">...</PaginationLink>
                            </PaginationEllipsis>
                        );
                        visiblePagesCount++;
                    }
                }
            } else {
                pageItems.push(
                    <PaginationItem key={i} className={`bg-blue-600 rounded-sm cursor-pointer ${i === currentPage + 1 ? 'bg-blue-800' : ''}`}>
                        <PaginationLink
                            className="hover:bg-blue-800 hover:text-white"
                            onClick={() => setCurrentPage(i - 1)}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
                visiblePagesCount++;
            }

            // Stop rendering if we've reached the max number of visible buttons
            if (visiblePagesCount >= maxVisiblePages) {
                break;
            }
        }

        return pageItems;
    };

    return (
        <>
            {category === 'my-polling' && (
                <PollingList data={data} currentPage={currentPage} />
            )}
            <Pagination>
                <PaginationContent className="text-white">
                    <PaginationItem className="bg-blue-600 rounded-sm cursor-pointer">
                        <PaginationPrevious className="hover:bg-blue-800 hover:text-white" onClick={handlePrevious} />
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem className="bg-blue-600 rounded-sm cursor-pointer">
                        <PaginationNext className="hover:bg-blue-800 hover:text-white" onClick={handleNext} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};


export default PaginationPage;
