import Layout from '../shared/layout'
import Hero from './hero'
import LetsTalk from './lets-talk'
import Map from './map'

const ContactUs = ()=>{
    return (
        <Layout container={false}>
            <div>
                <Hero />
                <LetsTalk />
                <Map />
            </div>
        </Layout>
    )
}

export default ContactUs