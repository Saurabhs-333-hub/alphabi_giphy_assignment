'use client'
import { Button, Card, CardFooter, Divider, Input } from '@nextui-org/react'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Modals from '@/widgets/Modals'
import { createUserWithEmailAndPassword } from 'firebase/auth'
const Register = () => {
    const [formData, setformData]: any = React.useState({
        email: '',
        password: '',
    })
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()
    useEffect(() => {
        if (auth.currentUser) {
            redirect('/')
        }
    },)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            setLoading(false)
            router.replace('/login')
        } catch (error: any) {
            const errorCode = error.code
            const errorMessage = error.message
            setError(errorMessage)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    const validateEmail = (value: any) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        let value = formData.email;
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [formData.email]);
    const refs = useRef<HTMLInputElement>(null)
    return (
        <>
            <div className="flex flex-col justify-center items-center  mt-24">
                <h1 className='text-3xl font-bold'>Register</h1>
                <form action="" className=' flex flex-col max-w-full gap-2' onSubmit={handleSubmit}>
                    <Card isBlurred className=" border-none  flex flex-col  gap-2  rounded-lg px-16 py-10 mt-10">


                        <Input type="email" label="Email"
                            isInvalid={isInvalid}
                            color={isInvalid ? "danger" : "default"}
                            errorMessage={isInvalid && "Please enter a valid email"} value={formData.email} isRequired onClear={() => {
                                setformData({ ...formData, email: '' })
                            }} isClearable onChange={(e) => {
                                setformData({ ...formData, email: e.target.value })
                            }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
                        <Input type="password" label="Password" value={formData.password} isRequired onClear={
                            () => {
                                setformData({ ...formData, password: '' })
                            }
                        } isClearable onChange={(e) => {
                            setformData({ ...formData, password: e.target.value })
                        }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
                        <CardFooter>
                            <Button type="submit" color='primary' variant='flat' value="Login" className="p-2 px-10 w-auto cursor-pointer rounded-full m-auto bg-gray-500 text-white hover:text-cyan-300 transition-all" >{loading ? "Registering..." : "Register"}</Button>
                        </CardFooter>
                    </Card>
                </form>
                <div className="w-80 center justify-center items-center">
                    <Divider className='mt-10 bg-cyan-700'></Divider>
                </div>
                <span className='mt-8'>
                    Already have an account? <Link href="login" className="text-blue-500">Login</Link>
                </span>
                {error && <Modals text={error} title={"Error!"} bodyColor={
                    'text-red-200'
                } headerColor={'text-red-600'} footerColor={'bg-transparent'} action={false} />}
            </div>
        </>
    )
}

export default Register