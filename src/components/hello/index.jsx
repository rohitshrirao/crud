import useSWR, {mutate} from "swr"
import axios from 'axios'
import {
    Modal,
    Button
} from '../shared';

const Hello = ()=>{

    const fetcher = async (endpoint)=>{
        try {
            const {data} = await axios.get(endpoint)
            return data
        }
        catch(err)
        {
            throw new Error(err)
        }
    }

    const {data: products, error, isLoading} = useSWR('http://localhost:8000/product',fetcher)
    // this syntax always follow like data, error, isLoading
    // here products is a alias of data variable

    const getPrice = (price, discount)=>{
        const calcAmount = (price*discount)/100;
        const amount = (price-calcAmount)
        return amount
    }

    const onDeleteProduct = async (id)=>{
        try {
            await axios.delete(`http://localhost:8000/product/${id}`)
            mutate('http://localhost:8000/product')
        }
        catch(err)
        {
            console.log(err)
        }
    }


    if(isLoading) return (              // with the help of isLoading we can show loader
        <div>
            <p>Loading....</p>
        </div>
    )

    if(error) return (
        <div>
            <p>Unable to fetch data</p>
        </div>
    )

    return (
        <div className="flex flex-col items-center w-8/12 mx-auto py-4 bg-gray-100 min-h-screen justify-center gap-16 relative">
            <button 
                className="text-xl bg-blue-600 absolute top-5 right-5 w-12 h-12 rounded-full text-white"
            >
                <i className="fa fa-plus"></i>
            </button>
            <h1 className="text-4xl font-semibold">Products</h1>
            <div className='grid grid-cols-3 gap-8 px-8'>
                {
                    products && products.map((product, productIndex)=>(
                        <div key={productIndex} className='relative flex flex-col gap-2 shadow-lg bg-white border px-3'>
                            <img src={product.thumbnail} className='w-full' />
                            <div className='flex justify-between items-center'>
                                <label className='w-fit mt-3 uppercase font-semibold bg-rose-600 text-white text-sm rounded py-1 px-3'>{product.brand}</label>
                                <div className='flex gap-2'>
                                    <Button color="secondary" variant="outline" size="small">
                                        <i className='fa fa-edit'></i>
                                    </Button>
                                    <Button color="danger" variant="outline" size="small" onClick={()=>onDeleteProduct(product._id)}>
                                        <i className='fa fa-trash'></i>
                                    </Button>
                                </div>
                            </div>
                            <h1 className='text-xl font-bold capitalize'>{product.title}</h1>
                            <p className='text-gray-600'>{product.desc.slice(0,40)}...</p>
                            <div className='flex gap-3'>
                                <span>₹{getPrice(product.price, product.discount)}</span>
                                <del>₹{product.price}</del>
                                <label>({product.discount}% Off)</label>
                            </div>
                        </div>
                    ))
                }
            </div>  
        </div>
    )
}

export default Hello