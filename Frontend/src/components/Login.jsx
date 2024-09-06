import React from 'react'
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button"
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";

const Login = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className='flex justify-center '>
        <div className='mt-52 w-1/4  border rounded-xl'>
            <div className='m-10 grid gap-5'>
                <h1 className=' text-center font-bold text-3xl mb-5'>Login</h1>
                <Input labelPlacement='outside' type="email" label="Email" />
                <Input
                    label="Password"
                    labelPlacement='outside'
                    // variant="bordered"
                    // placeholder="Enter your password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                    />
                <Button radius='full' color="primary" className='mt-8 w-1/2 justify-self-center'>Login</Button>
            </div>
        </div>
    </div>
  )
}

export default Login