'use client'

import { useFormState } from "react-dom"
import {useEffect} from "react"
import { toast } from "react-toastify"

export default function LoginForm() {
    

    return (
        <>
            <form
                className="mt-14 space-y-5"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl text-[#ff5100]"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl text-[#ff5100]"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="password"
                    />
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-[#ff5100] hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}