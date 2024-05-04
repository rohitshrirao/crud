import { useState, useEffect } from 'react';
import {
    Modal,
    Button
} from '../shared';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000'

const Test = ()=>{
    const model = {
        title: '',
        desc: '',
        price: '',
        discount: '',
        brand: '',
        thumbnail: ''
    }

    const [open, setOpen] = useState(false)
    const [productForm, setProductForm] = useState(model)
    const [products, setProducts] = useState([])
    const [id, setId] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    const messageModel = {
        state: false,
        type: null,
        content: null
    }
    const [message, setMessage] = useState(messageModel)


    useEffect(()=>{
        const req = async ()=>{
            try {
                const {data} = await axios.get('/product');
                console.log(data)
                setProducts(data);
            }
            catch(err)
            {
                console.log(err)
            }
        }
        req()
    },[])

    const onInput = (e)=>{
        const input = e.target;
        const key = input.name;
        const value = input.value;
        setProductForm({
            ...productForm,
            [key]: value
        })
    }

    const onProductAdd = async (e)=>{
        try {
            e.preventDefault();
            const {data} = await axios.post('/product',productForm);
            setProducts([
                ...products,
                data
            ])
            setProductForm(model)
            setOpen(false)
            setMessage({
                state: true,
                type: 'success',
                content: 'Product added successfully'
            })
        }
        catch(err)
        {
            console.log(err)
            setMessage({
                state: true,
                type: 'error',
                content: 'Unable to add product please try after sometime'
            })
        }
        finally{
            setTimeout(()=>{
                setMessage({
                    state: false,
                    type: null,
                    content: null
                })
            },2000)
        }
    }

    const getPrice = (price, discount)=>{
        const calcAmount = (price*discount)/100;
        const amount = (price-calcAmount)
        return amount
    }

    const onDeleteProduct = async (id, index)=>{
        try {
            await axios.delete(`/product/${id}`)
            const tmp = [...products]
            tmp.splice(index, 1)
            setProducts(tmp)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const onEditProduct = (product, index)=>{
        console.log(product);
        console.log(index);
        setId(product._id);   // db id for update
        setEditIndex(index);  // ui id for update
        setProductForm(product) // copy the all data of "product" & paste into the "ProductForm" (means all the data fetch on the modal form or product form)
        setOpen(true)         // modal open
    }

    const onProductSave = async (e)=>{
        try {
            e.preventDefault();
            await axios.put(`/product/${id}`,productForm)  // data updated on database
            const tmp = [...products]       // backup of products
            console.log("tmp ", tmp[editIndex])
            tmp[editIndex] =  productForm          // data updated on ui
            setProducts(tmp)
            setMessage({            // after click on save button show the message like Data updated successfully !
                state: true,
                type: 'success',
                content: 'Data updated successfully !'
            })
        }
        catch(err)
        {
            setMessage({             // after click on save button show the message like Failed to edit product !
                state: true,
                type: 'error',
                content: 'Failed to edit product !'
            })
        }
        finally {
            setProductForm(model)   // reset (release state) modal form data after click on save button
            setEditIndex(null)      // reset (release state) data 
            setId(null)             // reset (release state) data 
            setOpen(false)          // closed popup
            setTimeout(()=>{
                setMessage(messageModel)  // reset message like data updated successfully
            },2000)
        }
    }

    return (
        <div className="flex flex-col items-center w-8/12 mx-auto py-4 bg-gray-100 min-h-screen justify-center gap-16 relative">
            <button 
                className="text-xl bg-blue-600 absolute top-5 right-5 w-12 h-12 rounded-full text-white"
                onClick={()=>setOpen(true)}
            >
                <i className="fa fa-plus"></i>
            </button>
            <h1 className="text-4xl font-semibold">Products</h1>
            {
                !products.length &&  
                <h1>Product not found please add some products</h1>
            }
            <div className='grid grid-cols-3 gap-8 px-8'>
                {
                    products.map((product, productIndex)=>(
                        <div key={productIndex} className='relative flex flex-col gap-2 shadow-lg bg-white border px-3'>
                            <img src={product.thumbnail} className='w-full' />
                            <div className='flex justify-between items-center'>
                                <label className='w-fit mt-3 uppercase font-semibold bg-rose-600 text-white text-sm rounded py-1 px-3'>{product.brand}</label>
                                <div className='flex gap-2'>
                                    <Button color="secondary" variant="outline" size="small" onClick={()=>onEditProduct(product, productIndex)}>
                                        <i className='fa fa-edit'></i>
                                    </Button>
                                    <Button color="danger" variant="outline" size="small" onClick={()=>onDeleteProduct(product._id, productIndex)}>
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
            <Modal 
                open={open} 
                close={()=>setOpen(false)} 
                title="New Product"
                footer={false}
            >
                <form className='flex flex-col gap-4' onSubmit={editIndex === null ? onProductAdd : onProductSave}>
                    <input 
                        name="title" 
                        className='bg-gray-100 rounded-md px-4 py-2' 
                        placeholder='Title'
                        value={productForm.title}
                        onChange={onInput}
                        required
                    />  
                    <input 
                        name="price" 
                        className='bg-gray-100 rounded-md px-4 py-2' 
                        placeholder='Price'
                        type="number"
                        value={productForm.price}
                        onChange={onInput}
                        required
                    />  

                    <input 
                        name="discount" 
                        className='bg-gray-100 rounded-md px-4 py-2' 
                        placeholder='Discount'
                        type="number"
                        value={productForm.discount}
                        onChange={onInput}
                        required
                    />

                    <input 
                        name="brand" 
                        className='bg-gray-100 rounded-md px-4 py-2' 
                        placeholder='Brand'
                        value={productForm.brand}
                        onChange={onInput}
                        required
                    />       

                    <input 
                        name="thumbnail" 
                        className='bg-gray-100 rounded-md px-4 py-2' 
                        placeholder='Thumbnail URL'
                        type="url"
                        value={productForm.thumbnail}
                        onChange={onInput}
                        required
                    />   

                    <textarea 
                        name="desc" 
                        className='bg-gray-100 rounded-md px-4 py-2' 
                        placeholder='Description'
                        value={productForm.desc}
                        onChange={onInput}
                        required
                    />
                    { editIndex === null && <Button color="success">Submit</Button>}
                    { editIndex !== null && <Button color="danger">Save</Button>}
                </form>    
            </Modal>

            {
                (message.state && message.type === "success") &&
                <div className='w-6/12 bg-green-200 border border border-green-500 p-4 text-green-800 font-semibold rounded-md fixed top-3 left-[50%] translate-x-[-50%]'>
                {message.content}
                </div>
            }
            
            {
                (message.state && message.type === 'error') && 
                <div className='w-6/12 bg-rose-200 border border border-rose-500 p-4 text-rose-800 font-semibold rounded-md fixed top-3 left-[50%] translate-x-[-50%]'>
                {message.content}
                </div>
            }
            
        </div>
    )
}

export default Test;