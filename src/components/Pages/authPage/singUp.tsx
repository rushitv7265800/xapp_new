import Grid from '../../utils/customComponent/Grid'
import { HeroIcon } from '../../utils/customComponent/Icon'
import styled from 'styled-components'
import Text from '../../utils/customComponent/Text'
import InputComponent from '../../utils/customComponent/Input'
import Button from '../../utils/customComponent/Button'
import Block from '../../utils/customComponent/Block'
import Image from '../../utils/customComponent/Image'
import Lines from "../../../assets/auth/line.svg";
import Google from "../../../assets/auth/google.svg";
import Apple from "../../../assets/auth/apple.svg";
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@preact-signals/query'
import { DangerRight } from '../../utils/toastServices'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { createUser, setLoader } from '../../../redux/slice/authSlice'

export default function SignUp() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [dob, setDob] = useState("")
    const [userName, setUserName] = useState("")
    const dispatch = useDispatch<AppDispatch>();
    const [alertError, setAlertError] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [detailsCheckAlert, setDetailsCheckAlert] = useState(false)
    const navigator = useNavigate();
    const { isLoading } = useSelector((state: any) => state.auth);
    const user = { name: name.trim(), email: email.trim(), password: password.trim(), dob: dob.trim(), username: userName.trim().replace(/\s+/g, '') }

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
        username: "",
    });

    const validateFields = () => {
        let isValid = true;
        const newErrors = { name: "", email: "", password: "", dob: "", username: "" };
        const DOBValidate = (dob: string) => {
            // Regular expression to match the YYYY-MM-DD format (ISO format)
            const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

            // Check if dob matches the required format
            if (!dobRegex.test(dob)) {
                return 0; // Return 0 if the format is invalid
            }

            // Split and parse the date into year, month, and day
            const [year, month, day] = dob.split("-").map(Number);

            // Validate year range (must be between 1900 and the current year)
            const currentYear = new Date().getFullYear();
            if (year < 1900 || year > currentYear) {
                return 0; // Invalid year (too old or future year)
            }

            // Validate month (must be between 1 and 12)
            if (month < 1 || month > 12) {
                return 0; // Invalid month
            }

            // Validate day based on the number of days in the specific month and year
            const daysInMonth = new Date(year, month, 0).getDate(); // Get days in month
            if (day < 1 || day > daysInMonth) {
                return 0; // Invalid day
            }

            // Create the Date object for the entered dob
            const dobDate = new Date(year, month - 1, day);

            // Get today's date (only the date, ignoring the time)
            const today = new Date();
            today.setHours(0, 0, 0, 0);  // Ignore time for comparison

            // Check if the dob is in the future
            if (dobDate > today) {
                return 0; // Future date is invalid
            }

            // Calculate the age
            let age = today.getFullYear() - year;

            // Adjust the age if the birthday hasn't occurred yet this year
            if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
                age--;
            }

            return age; // Return the calculated age
        };

        // Example InputComponent usage:
        <InputComponent
            value={dob}
            onChange={(e: any) => setDob(e.currentTarget.value)} // Capture both manual and calendar input
            type="date" // Allow the date picker as well
            className="bg-blur rounded-xl text-white"
        />

        const validatePassword = () => {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;
            return passwordRegex.test(password);
        };
        if (!name) {
            newErrors.name = "Name is required";
            isValid = false;
        }
        if (!email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }
        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 5) {
            newErrors.password = "Password must be at least 5 characters long and not contains space";
            isValid = false;
        }
        else if (!validatePassword()) {
            newErrors.password = "Password must contain 1 of each: special character, alphabet and number";
            isValid = false;
        }
        if (!dob) {
            newErrors.dob = "Date of Birth is required";
            isValid = false;
        } else if (DOBValidate(dob) < 18 && DOBValidate(dob) > 0) {
            newErrors.dob = "This is for 18+ users"
            isValid = false;
        } else if (DOBValidate(dob) == 0) {
            newErrors.dob = "Invalid Date of Birth (DD-MM-YYYY)"
            isValid = false
        }
        if (!userName) {
            newErrors.username = "Username is required";
            isValid = false;
        } else if (userName.length < 5 || !userName.startsWith("@") || userName.includes(" ")) {
            newErrors.username = "Username must start with '@', have no spaces, and be at least 5 characters long.";
            isValid = false;
        }


        setErrors(newErrors);
        return isValid;
    };
    const ErrorDialog = () => {
        return (
            <Grid className="p-4 z-20 w-[90%] mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">Error on signup details</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                    {JSON.stringify(Object.values(errors))}
                </div>
                <div className="flex">
                    <button onClick={() => setAlertError(false)} type="button" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                        Ok
                    </button>
                </div>
            </Grid>
        )
    }

    const SuccessDialog = () => {
        const hadnleVerifySend = () => {
            setAlertSuccess(false)
            navigator("/verify", { state: { user, email } })
        }
        return (
            <Grid className="p-4 z-20 w-[90%] mb-4 text-green-400 border border-green-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">Verify your email with OTP!</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                    Please verify your 5 digit OTP send to your register email address!
                </div>
                <div className="flex">
                    <button onClick={() => hadnleVerifySend()} type="button" className="text-green-400 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                        Ok
                    </button>
                </div>
            </Grid>
        )
    }
    const handleFinalOk = () => {
        setDetailsCheckAlert(false)
        setAlertSuccess(true)
    }
    const UserDetailsAlert = () => {
        return (
            <Grid className="p-4 mb-4 z-20 w-[90%] text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800">
                <Block className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">User Details</h3>
                </Block>
                <div className="mt-2 mb-2 text-sm">
                    Please check your details properly before signup:
                </div>
                <div className="mb-4 space-y-2 text-sm">
                    <Grid className={"text-[16px]"}>
                        Name: {name}
                    </Grid><Grid className={"text-[16px]"}>
                        Email: {email}
                    </Grid><Grid className={"text-[16px]"}>
                        DOB: {dob}
                    </Grid><Grid className={"text-[16px]"}>
                        Password: {password}
                    </Grid><Grid className={"text-[16px]"}>
                        Username: {userName} (automatically combined)
                    </Grid>

                </div>

                <div className="flex">
                    <button onClick={handleFinalOk} type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        Ok
                    </button>
                    <button onClick={() => setDetailsCheckAlert(false)} type="button" className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                        Dismiss
                    </button>
                </div>
            </Grid>
        )
    }
    const handleSignUp = () => {
        if (validateFields() == true) {
            // setDetailsCheckAlert(true)
            const payloadLoader = {
                isLoading: true
            }
            dispatch(setLoader(payloadLoader));
            const payload: any = {
                email: email,
                fullName: name,
                userName: userName,
                birthDate: dob,
                password: password
            };
            dispatch(createUser(payload))
        }
        else {
            setAlertError(true)
        }
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
            <Grid className="w-full relative h-screen p-4 gap-10 bg-black">
                <Header>
                    <Grid className="rounded-lg border border-white ml-2 p-[0.4rem]">
                        <HeroIcon iconName="ChevronLeftIcon" className="h-6 w-6 text-white" solid onClick={() => {
                            navigator(-1)
                        }} />
                    </Grid>
                </Header>
                <Body className="gap-10">
                    <Grid>
                        <Text font="medium" className="text-white !text-2xl">Create a <span className="text-theme"> Co.payment </span><br></br> account</Text>
                    </Grid>

                    <Grid className="gap-5">
                        <Grid>
                            <InputComponent value={name} onChange={(e: any) => setName(e.currentTarget.value)} placeholder="Full Name" classname='bg-blur text-white rounded-xl' type="text" />
                            {errors.name && <Grid className="text-red-500 text-[12px]">{errors.name}</Grid>}
                        </Grid>
                        <Grid>
                            <InputComponent value={email} onChange={(e: any) => setEmail(e.currentTarget.value)} placeholder="Email" classname='bg-blur text-white rounded-xl' type="email" />
                            {errors.email && <span className="text-red-500 text-[12px]">{errors.email}</span>}
                        </Grid>
                        <Grid>
                            <InputComponent value={password} onChange={(e: any) => setpassword(e.currentTarget.value)} placeholder="Password" type={showPassword ? "text" : "password"} classname='bg-blur rounded-xl text-white' right={
                                <HeroIcon iconName={showPassword ? "EyeIcon" : "EyeSlashIcon"} onClick={() => {
                                    setShowPassword(() => !showPassword)
                                }} />
                            } />
                            {errors.password && <span className="text-red-500 text-[12px]">{errors.password}</span>}
                        </Grid>
                        <Grid>
                            <InputComponent value={dob} onChange={(e: any) => setDob(e.currentTarget.value)} type="date" classname='bg-blur rounded-xl text-white' />
                            {errors.dob && <span className="text-red-500 text-[12px]">{errors.dob}</span>}

                        </Grid>
                        <Grid>
                            <Grid>
                                <InputComponent value={userName} onChange={(e: any) => setUserName(e.currentTarget.value)} placeholder="username (@username)" type="text" classname='bg-blur rounded-xl text-white' />
                                {errors.username && <span className="text-red-500 text-[12px]">{errors.username}</span>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Button onClick={handleSignUp}>Send Signup OTP</Button>
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
                        <Text font='small' className="text-white !text-lg font-thin">Already have an account? <Link to="/" className="text-theme font-medium">Sign In</Link></Text>
                    </Grid>

                </Footer>
                {alertError &&
                    <div className="fixed inset-0 flex items-center justify-center z-20">
                        {/* Overlay */}
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setAlertError(false)}></div>
                        <ErrorDialog />
                    </div>
                }
                {
                    alertSuccess &&
                    <div className="fixed inset-0 flex items-center justify-center z-20">
                        {/* Overlay */}
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setAlertSuccess(false)}></div>
                        <SuccessDialog />
                    </div>
                }
                {
                    detailsCheckAlert &&
                    <div className="fixed inset-0 flex items-center justify-center z-20">
                        {/* Overlay */}
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setDetailsCheckAlert(false)}></div>
                        <UserDetailsAlert />
                    </div>
                }

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

