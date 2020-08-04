import React, {useState} from 'react';
import {Formik} from 'formik';
import Yup from "../utils/YupLocale";
import {connect} from "react-redux";
import store from '../redux/store';
import {dialogsActions} from '../redux/actions';

const CategoryDialog = () => {

    const [genders] = useState([
        {
            "id": "5f218808b8074b37609c05b4", "name": "Тест бўлим"
        },
    ]);

    const schema = Yup.object({
        category_id: Yup.string().required().label("Бўлимни танланг"),
    });

    const handleSubmit = (values, setSubmitting) => {
        store
            .dispatch(dialogsActions.fetchCreateDialog({
                cat_id: values.category_id,
                text: ""
            })).then(({status}) => {
            console.log(status);
            if (status === 'success') {
                //props.history.push('/');
                //window.location = '/';
            } else {
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
                    category_id: "5f218808b8074b37609c05b4",
                }}
                enableReinitialize={true}
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
                      setFieldValue
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="message--form_group">
                            <label>Бўлимни танланг</label>
                            <select
                                name="category_id"
                                onChange={handleChange}
                                value={values.category_id}
                            >
                                {
                                    genders.map(e => <option key={Math.random()} value={e.id}>{e.name}</option>)
                                }
                            </select>
                            <div className="message--form_info">
                                {errors.category_id && touched.category_id && errors.category_id}
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
    {...dialogsActions}
))(CategoryDialog);
