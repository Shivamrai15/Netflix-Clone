import { Navbar } from "./_components/navbar";


interface SignUpLayoutProps {
    children : React.ReactNode;
}

const SignUpLayout = ({
    children
} : SignUpLayoutProps) => {
    return (
        <main className="flex flex-col justify-between items-center">
            <Navbar/>
            {children}
        </main>
    )
}

export default SignUpLayout;