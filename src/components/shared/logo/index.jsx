const Logo = ({tagline=false})=>{
    return (
        <>
            <img src="/images/logo.svg" alt="logo" className="w-[120px]" />
            {
                tagline && 
                <p className="text-gray-600">
                    Eduport education theme, built specifically for the education centers which is dedicated to teaching and involve learners.
                </p>
            }          
        </>
    )
}

export default Logo