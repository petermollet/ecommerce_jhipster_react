import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required input").min(3, "3 characters min").max(10, "10 characters max"),
    password: Yup.string().required("Required input").min(3, "4 characters min")
})

const FormLogin = ({ submit, initialValues }) => (
    <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
    >
        <Form>
            <Field type='text' name='username' placeholder='Login' className='form-control mb-4' />
            <Field type='password' name='password' placeholder='Password' className='form-control mb-4' />
            <button type='submit' className='btn btn-success btn-block'>Submit</button>
        </Form>
    </Formik>
)

const Login = (props) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="col-6 p-3 card shadow-sm">
                <FormLogin {...props} />
            </div>
        </div>
    );
};

export default Login;