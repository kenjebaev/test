import React from 'react';
import {Formik} from 'formik';
import Yup from "../utils/YupLocale";
import {connect} from "react-redux";
import store from '../redux/store';
import {userActions} from '../redux/actions';

const GuestDialog = () => {

    const genders = [
        {
            "id": 1, "name": "Эркак"
        },
        {
            "id": 2, "name": "Аёл"
        },
    ];

    const schema = Yup.object({
        last_name: Yup.string().required().label("Фамилия"),
        first_name: Yup.string().required().label("Исм"),
        phone: Yup.string().required().label("Телефон"),
        sex: Yup.string().required().label("Жинсингиз"),
        region_id: Yup.string().trim().label("Вилоят"),
        district_id: Yup.string().trim().label("Шахар ёки туман"),
    });

    const handleSubmit = (values, setSubmitting) => {
        store
            .dispatch(userActions.fetchUserLogin(values))
            .then(({status}) => {
                console.log(status);
                if (status === 'success') {
                    //props.history.push('/');
                    //window.location = '/';
                }else{
                    console.log("error");
                }
                setSubmitting(false);
            })
            .catch((error) => {
                console.log(error);
                setSubmitting(false);
            });
    }

    return (
        <div className="message--form">
            <Formik
                validationSchema={schema}
                initialValues={{
                    last_name: '',
                    first_name: '',
                    phone: '',
                    sex: 1,
                    region_id: '',
                    district_id: '',
                }}
                onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="message--form_group">
                            <label>Фамилия</label>
                            <input
                                type="text"
                                name="last_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.last_name}
                            />
                            <div className="message--form_info">
                                {errors.last_name && touched.last_name && errors.last_name}
                            </div>
                        </div>
                        <div className="message--form_group">
                            <label>Исм</label>
                            <input
                                type="text"
                                name="first_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.first_name}
                            />
                            <div className="message--form_info">
                                {errors.first_name && touched.first_name && errors.first_name}
                            </div>
                        </div>
                        <div className="message--form_group">
                            <label>Телефон</label>
                            <input
                                type="text"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                            />
                            <div className="message--form_info">
                                {errors.phone && touched.phone && errors.phone}
                            </div>
                        </div>
                        <div className="message--form_group">
                            <label>Жинсингиз</label>
                            <select
                                name="gender_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.gender_id}
                            >
                                {
                                    genders.map(e => <option key={Math.random()} value={e.id}>{e.name}</option>)
                                }
                            </select>
                            <div className="message--form_info">
                                {errors.gender_id && touched.gender_id && errors.gender_id}
                            </div>
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Киритиш
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default connect(() => (
    {...userActions}
))(GuestDialog);
