import { Link } from "react-router-dom"
import Logo from '../logo'

const Layout = ({children, container=true})=>{
    const menus = [
        {
            path: '/',
            label: 'home'
        },
        {
            path: '/faculty',
            label: 'faculty'
        },
        {
            path: '/products',
            label: 'products'
        },
        {
            path: '/contact-us',
            label: 'contact'
        },
        {
            path: '/login',
            label: 'login'
        }
    ]

    const socials = [
        {
            icon: 'fa fa-facebook text-[#5374BC]',
            link: process.env.REACT_APP_FACEBOOK_PAGE
        },
        {
            icon: 'fa fa-instagram text-[#B8467C]',
            link: process.env.REACT_APP_INSTAGRAM_PAGE
        },
        {
            icon: 'fa fa-twitter text-[#3AABDC]',
            link: process.env.REACT_APP_TWITTER_PAGE
        },
        {
            icon: 'fa fa-linkedin text-[#207EB4]',
            link: process.env.REACT_APP_LINKEDIN_PAGE
        }
    ]

    const communities = [
        {
            path: '/documentation',
            label: 'documentation'
        },
        {
            path: '/faq',
            label: 'faq'
        },
        {
            path: '/forum',
            label: 'forum'
        },
        {
            path: '/sitemap',
            label: 'sitemap'
        }
    ]

    const teachings = [
        {
            path: '/become-a-teacher',
            label: 'become a teacher'
        },
        {
            path: '/how-to-guide',
            label: 'how to guide'
        },
        {
            path: '/terms-conditions',
            label: 'terms & conditions'
        }
    ]

    return (
        <div>
            <nav className="flex justify-between items-center px-12 py-4 bg-white shadow">
                <Logo />
                <ul className="flex gap-12">
                   {
                    menus.map((menu, index)=>(
                        <li key={index}><Link to={menu.path} className="capitalize font-medium">{menu.label}</Link></li>
                    ))
                   } 
                </ul>
                <button className="rounded-full">
                    <img src="/images/avatar.jpg" className="rounded-full w-[48px]" />
                </button>
            </nav>
            {
                container ? 
                <section className="md:px-[10%] px-8">{children}</section>
                :
                <section>{children}</section>
            }
            <footer className="p-8 md:px-[10%] md:py-16 shadow-inner">
                <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                    <div className="flex flex-col gap-4 md:w-1/3">
                        <Logo tagline />
                        <div className="flex gap-4">
                            {
                                socials.map((social, index)=>(
                                    <Link key={index} to={social.link}>
                                        <button className="bg-white py-2 px-4 shadow-lg border">
                                            <i className={social.icon}></i>
                                        </button>
                                    </Link>
                                )) 
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-bold">Company</h1>
                        <ul className="flex flex-col gap-2">
                            {
                                menus.map((menu,index)=>(
                                    <li key={index}>
                                        <Link to={menu.path} className="capitalize text-gray-600">{menu.label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-bold">Community</h1>
                        <ul className="flex flex-col gap-2">
                            {
                                communities.map((community,index)=>(
                                    <li key={index}>
                                        <Link to={community.path} className="capitalize text-gray-600">{community.label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-bold">Teaching</h1>
                        <ul className="flex flex-col gap-2">
                            {
                                teachings.map((teaching,index)=>(
                                    <li key={index}>
                                        <Link to={teaching.path} className="capitalize text-gray-600">{teaching.label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-bold">Contact</h1>
                        <div>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <span className="text-gray-600">Toll free:</span>
                                    <span>{process.env.REACT_APP_SUPPORT_NUMBER}</span>
                                </div>   
                                <span className="text-gray-600">(9:AM to 8:PM IST)</span>
                            </div>

                            <div className="flex gap-2">
                                <span className="text-gray-600">Email: </span>
                                <span>{process.env.REACT_APP_SUPPORT_EMAIL}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout