import { set } from 'js-cookie';
import React, { useState } from 'react';
import Layout from '../components/layouts/Layout';

function Test(props) {
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    }
    );
    return (
        <>
            <Layout>



            </Layout>

        </>
    );
}

export default Test;
