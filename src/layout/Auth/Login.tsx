// import React, { useState } from "react";
// import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import LoadingSpinnerComponent from 'react-spinners-components';
// import { apiLogin, apiAccountActive } from "@/api/auth";
// import { alertFailed } from "@/components/ui/alertFailed";
// import { alertSuccess } from "@/components/ui/alertSucces";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { AxiosError } from "axios";

// interface FormData {
//     email: string;
//     password: string;
// }

// interface FormErrors {
//     email: string[];
//     password: string[];
// }

// interface ErrorResponse {
//     message: string;
//     errors?: {
//         [field: string]: string[];
//     };
// }



// const LoginForm = () => {
//     const [showPassword, setShowPassword] = useState(false);

//     const [isLoading, setIsLoading] = useState(false);

//     const { push } = useRouter();

//     const togglePasswordVisibility = () => {
//         setShowPassword(prevState => !prevState);
//     };

//     const [formData, setFormData] = useState<FormData>({
//         email: '',
//         password: '',
//     });

//     const [formErrors, setFormErrors] = useState<FormErrors>({
//         email: [],
//         password: [],
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleValidation = (errors: { email: string[]; password: string[] }) => {
//         setFormErrors({
//             email: errors.email || [],
//             password: errors.password || [],
//         });
//     };

//     const handleEmailAccountActive = async (email: string) => {
//         try {
//             const response = await apiAccountActive({ email });
//             alertSuccess(response.data.message);
//             setTimeout(() => push(`${process.env.NEXT_PUBLIC_NETPOLL_API}/netpoll/account-active/page-verification?token=${response.data.data.token}`), 5000);
//             return;
//         } catch (error) {
//             const err = error as AxiosError<ErrorResponse>;
//             alertFailed(err.message);
//         }
//     }

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setIsLoading(true);
//         const { email, password } = formData;
//         try {
//             const response = await apiLogin({ email, password });

//             alertSuccess(response.data.message);
//             Cookies.set('accessToken', response.data.data.access_token);
//             setTimeout(() => push('/'), 5000);
//             setFormData({ email: '', password: '' });
//             return;
//         } catch (error) {
//             const err = error as AxiosError<ErrorResponse>;
//             if (err.response?.status === 403) {
//                 return await handleEmailAccountActive(email);
//             }
//             if (err.response?.status === 400 && err.response.data.errors) {
//                 handleValidation({
//                     email: err.response.data.errors.email || [],
//                     password: err.response.data.errors.password || [],
//                 });
//                 alertFailed(err.response.data.message);
//                 return;
//             }
//             alertFailed(err.response?.data.message || err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     return (
//         <>
//             <form onSubmit={isLoading ? () => { } : handleSubmit}>
//                 <div className="p-4 text-white">
//                     <div className={`${formErrors.email.length > 0 ? 'mb-1' : 'mb-5'} relative`}>
//                         <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//                         <Input placeholder="email address" className="pl-10 w-full" type="text" onChange={handleInputChange} name="email" />
//                     </div>
//                     {formErrors.email.map((error, index) => (
//                         <p key={index} className="text-red-500 text-sm">{error}</p>
//                     ))}
//                     <div className={`${formErrors.email.length > 0 ? 'mt-3' : ''} ${formErrors.password.length > 0 ? 'mb-1' : ''} relative`}>
//                         <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//                         <Input
//                             placeholder="password"
//                             className="pl-10 pr-10 w-full"
//                             type={showPassword ? "text" : "password"} onChange={handleInputChange} name="password"
//                         />
//                         <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
//                             {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
//                         </span>
//                     </div>
//                     {formErrors.password.map((error, index) => (
//                         <p key={index} className="text-red-500 text-sm">{error}</p>
//                     ))}
//                 </div>
//                 <Button className="bg-blue-700 w-[95%] flex mx-auto rounded-md mt-5 hover:bg-blue-800" type="submit">
//                     {isLoading ? (
//                         <div className="flex flex-row text-white items-center cursor-pointer">
//                             <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'100px'} />
//                             <p className="ms-1">Login</p>
//                         </div>
//                     ) : "Login"}
//                 </Button>
//             </form>
//         </>
//     )
// }

// export default LoginForm