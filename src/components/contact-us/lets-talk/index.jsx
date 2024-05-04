import {useState} from 'react'
import * as yup from "yup"
import Button from '../../shared/button'


const LetsTalk = ()=>{
    const model = {
        fullname: '',
        email: '',
        message: ''
    }

    const errModel = {
        fullname: null,
        email: null,
        message: null
    }

    const [form, setForm] = useState(model)
    const [formErr, setFormErr] = useState(errModel)

    const onValueInput = (e)=>{
        setFormErr(errModel)
        const input = e.target;
        const key = input.name;
        const value = input.value;
        setForm({
            ...form,
            [key]: value
        })
    }

    const schema = yup.object().shape({
        fullname: yup.string().required("Fullname is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        message: yup.string().required("Message is required")
    })

    const onSendMessage = async (e)=>{
        try {
            e.preventDefault();
            const x = await schema.validate(form)
            console.log(x)
        }
        catch(err)
        {
            console.log(JSON.stringify(err))
            setFormErr({
                fullname: 'Fullname is required',
                email: 'Email is required',
                message: 'Message is required'
            })
        }
    }



    return (
        <div className="md:py-16 md:px-[10%] p-8">
            <div className="grid md:grid-cols-2 md:gap-16 gap-8">
                <div>
                    <img src="/images/contact.svg" alt="contact" className="w-full" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">Let's talk</h1>
                    <p className="text-gray-500">
                    To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly
                    </p>
                    <form className="flex flex-col gap-4" onSubmit={onSendMessage}>
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-600">Fullname*</label>
                            <input 
                                value={form.fullname} 
                                name="fullname" 
                                type="text" 
                                className={`bg-gray-100 p-4 rounded ${formErr.fullname && 'border border-rose-600'}`}
                                onChange={onValueInput} 
                            />
                            {
                                formErr.fullname && 
                                <p className='text-rose-600 font-semibold animate__animated animate__fadeIn'>{formErr.fullname}</p>
                            }
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-600">Email*</label>
                            <input 
                                name="email" 
                                value={form.email} 
                                className={`bg-gray-100 p-4 rounded ${formErr.email && 'border border-rose-600'}`} 
                                onChange={onValueInput} 
                            />
                            {
                                formErr.email && 
                                <p className='text-rose-600 font-semibold animate__animated animate__fadeIn'>{formErr.email}</p>
                            }
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-600">Message*</label>
                            <textarea 
                                name="message" 
                                value={form.message} 
                                type="text" 
                                className={`bg-gray-100 p-4 rounded ${formErr.message && 'border border-rose-600'}`}
                                rows="4" 
                                onChange={onValueInput} 
                            />
                            {
                                formErr.message && 
                                <p className='text-rose-600 font-semibold animate__animated animate__fadeIn'>{formErr.message}</p>
                            }
                        </div>

                        <div className='mt-4 flex flex-col'>
                            <Button size="large">Send Message</Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LetsTalk