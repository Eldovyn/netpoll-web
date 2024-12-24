import { Input } from "@/components/ui/input";
import { FaQuestion } from "react-icons/fa";

const SearchPoll = () => {
    return (
        <>
            <form action="" className="mb-1 flex">
                <div className="relative flex-1">
                    <FaQuestion className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={13} />
                    <Input
                        placeholder="title"
                        className="pl-10 w-full text-white rounded-r-none border-r-0 h-10"
                        type="text"
                        id="email"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 h-10 rounded-l-none rounded-r-md border border-l-0 hover:bg-blue-600"
                >
                    Search
                </button>
            </form>
        </>
    );
};

export default SearchPoll;