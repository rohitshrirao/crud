import { useState } from "react"

const Homepage = ()=>{
    const [progress, setProgress] = useState(0)

    const [notifications, setNotifications] = useState([
        {
            title: 'This is first and last warning',
            color: 'red'
        },
        {
            title: 'This is first and last warning',
            color: 'blue'
        },
        {
            title: 'This is first and last warning',
            color: 'deeppink'
        }
    ])

    const onDelete = (index)=>{
        const tmp = [...notifications]
        tmp.splice(index, 1)
        setNotifications(tmp)
    }

    const showProgress = ()=>{
        const interval = setInterval(()=>{
            setProgress((prev)=>{
                if(prev < 100) return prev+1
                return clearInterval(interval)
            })
        },10)
    }

    return (
        <div className='p-10'>
            <div 
                className='bg-blue-500 w-24 h-24 hover:scale-110 duration-300'>
                
            </div>
            <p className='text-4xl font-bold'>I am testing</p>
            
            <div className='flex flex-col gap-4'>
                {
                    notifications.map((item, index)=>(
                        <div key={index} className='p-4 flex justify-between items-center' style={{background: item.color}}>
                            <strong>{item.title}</strong>
                            <button className='w-8 h-8' onClick={()=>onDelete(index)}><i className='fa fa-times-circle'></i></button>
                        </div>
                    ))
                }
            </div>

            <div className="bg-gray-200 h-16 mt-8">
                <div className="h-full bg-green-500" style={{width: progress+'%'}}></div>
            </div>
            <button className="bg-blue-400 px-8 py-2" onClick={showProgress}>Run</button>
            <h1 className="text-4xl font-bold">{progress}</h1>
        </div>
    )
}

export default Homepage