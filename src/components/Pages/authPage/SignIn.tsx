import Grid from '../../utils/customComponent/Grid'
import { HeroIcon } from '../../utils/customComponent/Icon'
import styled from 'styled-components'
import Text from '../../utils/customComponent/Text'
import InputComponent from '../../utils/customComponent/Input'
import Button from '../../utils/customComponent/Button'
import Block from '../../utils/customComponent/Block'
import Image from '../../utils/customComponent/Image'
import { useDispatch, useSelector } from "react-redux";
import Lines from "../../../assets/auth/line.svg";
import Google from "../../../assets/auth/google.svg";
import Apple from "../../../assets/auth/apple.svg";
import { Link } from 'react-router-dom'
import { loginUser, setLoader } from '../../../redux/slice/authSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { useEffect, useState } from 'react'
import { DangerRight } from '../../utils/toastServices'


interface LoginPayload {
    email: string;
    password: string;
}

export default function SignIn() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [alertError, setAlertError] = useState(false)
    const { isLoading } = useSelector((state: any) => state.auth);


    const [alertSuccess, setAlertSuccess] = useState(false)
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const validateFields = () => {
        let isValid = true;
        const newErrors = { email: "", password: "" };

        if (!email) {
            newErrors.email = "Email or username is required";
            isValid = false;
        }
        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const ErrorDialog = () => {
        return (
            <Grid className="p-4 top-[40%] z-20 w-[90%] mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">{errorMessage}</h3>
                </div>
                {(errors.email.length > 0 || errors.password.length > 0) &&
                    <div className="mt-2 mb-4 text-sm">
                        {JSON.stringify(Object.values(errors))}
                    </div>}
                <div className="flex">
                    <button onClick={() => setAlertError(false)} type="button" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                        Ok
                    </button>
                </div>
            </Grid>
        )
    }

    const SuccessDialog = () => {
        return (
            <Grid className="p-4 top-[40%] z-20 w-[90%] mb-4 text-green-400 border border-green-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">User Found Successfully!</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                    Enjoy your dreams...
                </div>
                <div className="flex">
                    <button onClick={() => { window.location.replace("/") }} type="button" className="text-green-400 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                        Ok
                    </button>
                </div>
            </Grid>
        )
    }
    const Loader = () => {
        return (
            <div className="fixed inset-0 flex font-roboto items-center justify-center z-20">
                {/* Overlay */}
                <div className="fixed inset-0 flex bg-black bg-opacity-50"></div>
                <Block className="fixed flex items-start w-[75%] p-4 justify-center z-10  px-5 gap-5 left-13 right-0 h-auto bg-[#242424] overflow-y-auto">

                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div>Fetching your data...</div>
                </Block>
            </div>


        )
    }
    // const VerifyOtp = () => {

    //     setIsLoading(true)
    //     if (validateFields()) {
    //         loginMutation.mutate(
    //             { email, password },
    //             {
    //                 onSuccess: (data) => {
    //                     // Handle success logic
    //                     console.log("Success", data);
    //                     const userLogin = { email: email, password: password }
    //                     localStorage.setItem("USER_LOGIN", JSON.stringify(userLogin))
    //                     setAlertSuccess(true);
    //                     setIsLoading(false)

    //                 },

    //                 onError: (error: ClientError) => {
    //                     console.log("ERROR", error);
    //                     setErrorMessage("Email/username or password do not match.");
    //                     setAlertError(true);
    //                     setIsLoading(false)
    //                 },
    //             }
    //         );
    //     } else {
    //         // If fields are invalid
    //         setErrorMessage("Error in fields...!");
    //         setAlertError(true);
    //         setIsLoading(false)
    //     }
    // };


    const handleSubmitLogin = () => {
        console.log("isLoading", isLoading)
        const payloadLoader = {
            isLoading: true
        }
        dispatch(setLoader(payloadLoader)); // Dispatch the action
        const payload: LoginPayload = {
            email: email,
            password: password
        };
        dispatch(loginUser(payload));
        setAlertSuccess(true);
    }

    useEffect(() => {
        console.log("isLoading", isLoading)
        if (isLoading) {
            setTimeout(() => {
                const payloadLoader = {
                    isLoading: false
                }
                dispatch(setLoader(payloadLoader));
                DangerRight("Server Error....")
            }, 10000);
        }
    }, [isLoading])


    return (
        <>
            <Grid className="w-full h-screen p-4 gap-7 bg-black">
                <Header>
                    <Grid className="rounded-lg ml-2 border border-white p-[0.4rem]">
                        <HeroIcon iconName="ChevronLeftIcon" className="h-6 w-6 text-white" solid />
                    </Grid>
                </Header>
                <Body className="gap-10">
                    <Grid className={"flex justify-center space-y-2"}>
                        <Text font="medium" className="text-white !text-xl">Hi There! 👋</Text>
                        <Text font='small' className="text-white !text-lg font-thin">Welcome back, Sign in to your account</Text>
                    </Grid>
                    <Grid className="gap-5">
                        <Grid>
                            <InputComponent onChange={(e) => setEmail(e.currentTarget.value)} placeholder="email or username" classname='bg-blur rounded-xl text-white' type="text" />
                            {errors.email && <span className="text-red-500 text-[12px]">{errors.email}</span>}
                        </Grid>
                        <Grid>
                            <InputComponent onChange={(e) => setPassword(e.currentTarget.value)} placeholder="Password" type={showPassword ? "text" : "password"} classname='bg-blur rounded-xl text-white' right={
                                <HeroIcon iconName={showPassword ? "EyeIcon" : "EyeSlashIcon"} onClick={() => {
                                    setShowPassword(() => !showPassword)
                                }} />
                            } />
                            {errors.password && <span className="text-red-500 text-[12px]">{errors.password}</span>}
                        </Grid>
                    </Grid>

                    <Grid className="gap-10">
                        <Text font="small" className="text-white !text-lg">Forgot Password?</Text>
                        <Button onClick={() => handleSubmitLogin()}>Sign In</Button>
                    </Grid>

                    <Grid className="my-2">
                        <Block className="justify-between">
                            <Image src={Lines} classname='rotate-180' />
                            <Text font='medium' style={{ fontSize: "1rem" }} className="px-0">OR</Text>
                            <Image src={Lines} />
                        </Block>
                    </Grid>
                </Body>

                <Footer className="h-[300px] justify-between">

                    <Block className="justify-between">
                        <Grid className="bg-blur w-[40%] p-4 items-center rounded-xl cursor-pointer">
                            <Grid className={"w-6"}>
                                <Image src={Google} />
                            </Grid>
                        </Grid>

                        <Grid className="bg-blur w-[40%] p-4 items-center rounded-xl cursor-pointer">
                            <Grid className={"w-5"}>
                                <Image src={Apple} />
                            </Grid>
                        </Grid>
                    </Block>

                    <Grid className="items-center">
                        <Text font='small' className="text-white !text-lg font-thin">Don’t have an account? <Link to="/signup" className="text-theme font-medium">Sign Up</Link></Text>
                    </Grid>
                </Footer>
                {/* {alertSuccess && <div className="fixed inset-0 flex items-center justify-center z-20">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setAlertSuccess(false)}></div>
                    <SuccessDialog />
                </div>} */}
                {alertError && <div className="fixed inset-0 flex items-center justify-center z-20">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setAlertError(false)}></div>
                    <ErrorDialog />
                </div>}
            </Grid>
            {isLoading &&
                <div className='loader'>
                    <div className='loaderShow'>
                        <div className="three-body">
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

const Header = styled.div`
    display:flex;
    flex-direction:row;

`

const Body = styled.div`
    display:flex;
    flex-direction:column;

`

const Footer = styled.div`
    display:flex;
    flex-direction:column;

`

