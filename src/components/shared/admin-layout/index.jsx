import {useState} from 'react'

const AdminLayout = ({children})=>{
    const [width, setWidth] = useState(280)
    const [mobileWidth, setMobileWidth] = useState(0)
    const menus = [
        {
            label: 'dashboard',
            icon: 'fa fa-dashboard'
        },
        {
            label: 'settings',
            icon: 'fa fa-gear'
        },
        {
            label: 'customers',
            icon: 'fa fa-user'
        },
        {
            label: 'authentication',
            icon: 'fa fa-sign-in',
            children: [
                {
                    label: 'login',
                    icon: 'fa fa-sign-in'
                },
                {
                    label: 'register',
                    icon: 'fa fa-user'
                }
            ]
        }
    ]

    const onOutsideClick = (e)=>{
        if(e.target.classList.contains("toggle-icon")) return null
        setMobileWidth(0);
    }

    return (
        <>
            <div className="hidden md:block">
            <aside 
                className="bg-zinc-900 fixed top-0 left-0 h-full z-10 sidenav"
                style={{
                    width: width,
                    transition: '0.3s',
                    overflowX: 'hidden'
                }}
            >
                <div className='flex flex-col'>
                    {
                        menus.map((menu,index)=>(
                            <button key={index} className='text-white text-opacity-60 hover:text-opacity-100 flex bg-black bg-opacity-10 hover:bg-opacity-100 px-4 py-4 flex items-center capitalize justify-between'>
                                <div className='flex items-center gap-3'>
                                    <i className={menu.icon}></i>
                                    {menu.label}
                                </div>
                                {
                                    menu.children && <i className="fa fa-angle-down"></i>
                                }
                            </button>
                        ))
                    }
                </div>
            </aside>
            <header 
                className="fixed top-0 left-0 bg-rose-500 h-[60px] p-4 flex items-center"
                style={{
                    left: width,
                    width: `calc(100% - ${width}px)`,
                    transition: '0.3s'
                }}
            >
                <div>
                    <button className="text-zinc-900 w-[48px] h-[48px] bg-white bg-opacity-30 rounded-full hover:bg-opacity-100" onClick={()=>setWidth(width === 280 ? 0 : 280)}>
                        <i className='fa fa-bars'></i>
                    </button>
                </div>
            </header>
            <section 
                className='flex flex-col gap-16'
                style={{
                    marginTop: 60,
                    marginLeft: width,
                    width: `calc(100% - ${width}px)`,
                    transition: '0.3s'
                }}
            >
                <div className='p-4'>
                    {children}
                </div>
                <footer className='bg-gray-100 py-2'>
                    <p className='text-zinc-700 text-sm text-center'>
                        <i className='fa fa-copyright'></i>
                        Wap Institute | All Right Reserved
                    </p>
                </footer>
            </section>
            </div>
            
            {/* Mobile */}

            <div className="md:hidden block min-h-screen" onClick={onOutsideClick}>
            <aside 
                className="bg-zinc-900 fixed top-0 left-0 h-full z-10 sidenav"
                style={{
                    width: mobileWidth,
                    transition: '0.3s',
                    overflowX: 'hidden'
                }}
            >
                <div className='flex flex-col'>
                    {
                        menus.map((menu,index)=>(
                            <button key={index} className='text-white text-opacity-60 hover:text-opacity-100 flex bg-black bg-opacity-10 hover:bg-opacity-100 px-4 py-4 flex items-center capitalize justify-between'>
                                <div className='flex items-center gap-3'>
                                    <i className={menu.icon}></i>
                                    {menu.label}
                                </div>
                                {
                                    menu.children && <i className="fa fa-angle-down"></i>
                                }
                            </button>
                        ))
                    }
                </div>
            </aside>
            <header 
                className="fixed top-0 left-0 bg-rose-500 h-[60px] p-4 flex items-center w-full"
            >
                <div>
                    <button className="toggle-icon text-zinc-900 w-[48px] h-[48px] bg-white bg-opacity-30 rounded-full hover:bg-opacity-100" onClick={()=>setMobileWidth(280)}>
                        <i className='fa fa-bars toggle-icon'></i>
                    </button>
                </div>
            </header>
            <section 
                className='flex flex-col gap-16'
                style={{
                    marginTop: 60
                }}
            >
                <div className='p-4'>
                    {children}
                    {width}
                </div>
                <footer className='bg-gray-100 py-2'>
                    <p className='text-zinc-700 text-sm text-center'>
                        <i className='fa fa-copyright'></i>
                        Wap Institute | All Right Reserved
                    </p>
                </footer>
            </section>
            </div>
        </>  
    )
}

export default AdminLayout