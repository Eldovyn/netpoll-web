import React from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


interface PollingData {
    created_at: number;
    disable_comment: boolean;
    multi_choice: boolean;
    polling_id: string;
    private: boolean;
    title: string;
    updated_at: number;
}

const PollingList = ({ data }: { data: { polling: PollingData[] } }) => {
    return (
        <>
            {data.polling.map((item: PollingData, index: number) => {
                const date = new Date(item.updated_at * 1000);

                const year = date.getUTCFullYear();
                const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                const day = String(date.getUTCDate()).padStart(2, "0");
                const hours = String(date.getUTCHours()).padStart(2, "0");
                const minutes = String(date.getUTCMinutes()).padStart(2, "0");
                const seconds = String(date.getUTCSeconds()).padStart(2, "0");

                const formattedUTC = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;

                return (
                    <React.Fragment key={index}>
                        <Card className="rounded-sm">
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{formattedUTC}</CardDescription>
                            </CardHeader>
                        </Card>
                        <br />
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default PollingList;
