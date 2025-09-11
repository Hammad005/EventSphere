import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        role: "participant",
        password: "",
    });
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newError = {};

        if (!data.name) {
            newError.name = "Name is required";
        }

        if (!data.email) {
            newError.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newError.email = "Invalid email format";
        }

        if (!data.phone) {
            newError.phone = "Phone number is required";
        }

        if (!data.department) {
            newError.department = "Department is required";
        }

        if (!data.password) {
            newError.password = "Password is required";
        } else if (data.password.length < 6) {
            newError.password = "Password must be at least 6 characters long";
        } else if (data.password !== confirmPass) {
            newError.password = "Passwords do not match";
        }
    }
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-75px)] w-full md:px-0 px-6'>
        <Card className={"md:w-1/2 w-full"}>
            <CardHeader>
                <CardTitle className={"flex items-center gap-2"}>
                    <UserRoundPlus className='size-5'/>
                    <span>
                    SignUp - <span className='text-muted-foreground text-xs'>(Only for participant)</span>
                    </span>
                </CardTitle>
                <CardDescription>
                    SignUp and unleash your potential
                </CardDescription>
                <CardContent className={'flex flex-col gap-4 px-0 mt-2'}>
                    <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                    <Label htmlFor="name">Full Name</Label>
                    <Input type={"text"} placeholder='Enter your full name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                    </div>
                    </form>
                </CardContent>
            </CardHeader>
        </Card>
    </div>
  )
}

export default Signup