const Hero = ()=>{
    const data = [
        {
            title: 'Customer Support',
            address: 'Chicago HQ Estica Cop. Macomb, MI 48042',
            phone: '(423) 733-8222',
            email: 'example@email.com',
            active: true
        },
        {
            title: 'Customer Support',
            address: 'Chicago HQ Estica Cop. Macomb, MI 48042',
            phone: '(423) 733-8222',
            email: 'example@email.com',
            active: false
        },
        {
            title: 'Customer Support',
            address: 'Chicago HQ Estica Cop. Macomb, MI 48042',
            phone: '(423) 733-8222',
            email: 'example@email.com',
            active: false
        }
    ]
    return (
        <div className="bg-gray-100 flex flex-col md:gap-16 gap-8 md:p-16 p-8">
            <h1 className="md:text-5xl text-4xl font-bold text-center">We`re here to help!</h1>
            <div className="grid md:grid-cols-3 md:gap-16 gap-8">
                {
                    data.map((item,index)=>(
                        <div 
                            key={index} 
                            className={`shadow-lg py-16 rounded-lg flex flex-col gap-2 items-center ${item.active ? 'bg-blue-600 text-white' : 'bg-white'}`}
                        >
                            <h1 className="text-2xl font-semibold">{item.title}</h1>
                            <div className="flex items-center gap-2">
                                <i className="fa fa-map-marker"></i>
                                <p>{item.address}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fa fa-phone"></i>
                                <p>{item.phone}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fa fa-envelope-o"></i>
                                <p>{item.email}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Hero;