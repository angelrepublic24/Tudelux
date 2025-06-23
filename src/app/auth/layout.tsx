
import Logo from "@/shared/components/ui/Logo/Logo";
import ToastNotification from "@/shared/components/ui/toastNotification/ToastNotification";
import Link from "next/link";


export default function AuthLayout({
    children
}: Readonly<{children: React.ReactNode}>){

    return(
        <>
        <div className="lg:grid grid-cols-2 lg:min-h-screen">
            <div className="bg-[#ff5100] lg:bg-auth lg:bg-30 flex justify-center items-center bg-no-repeat bg-left-bottom">
                <div className="w-96 py-10 lg:py-20">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                    
                </div>
                
            </div>
            <div className="p-10 lg:py-28">
                <div className="max-w-3xl mx-auto">{children}</div>
            </div>
        </div>
        <ToastNotification />
        </>
    )
}