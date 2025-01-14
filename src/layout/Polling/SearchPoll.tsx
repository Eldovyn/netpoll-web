import { Input } from "@/components/ui/input";
import { FaQuestion } from "react-icons/fa";
import { Formik, Field, Form, FormikProps } from 'formik';

interface FormData {
    title: string;
}

interface SearchPollProps {
    width?: string;
    formik?: FormikProps<FormData>;
}

const SearchPoll: React.FC<SearchPollProps> = ({ width, formik }) => {
    return (
        <>
            <form onSubmit={formik?.isSubmitting ? () => {} : formik?.handleSubmit} className="mb-1 flex">
                <div className="relative flex-1">
                    <FaQuestion className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={13} />
                    <Input
                        placeholder="title"
                        className={`pl-10 ${width} text-white rounded-r-none border-r-0 h-10`}
                        type="text"
                        id="email"
                        name="title"
                        onChange={formik?.handleChange}
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