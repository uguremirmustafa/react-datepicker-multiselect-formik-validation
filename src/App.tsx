import { useFormik } from 'formik';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  dates: yup.array().of(yup.date()).min(2, 'at least two dates'),
});

function App() {
  const formik = useFormik({
    initialValues: {
      email: '',
      dates: [],
    },
    validationSchema: schema,
    onSubmit: (values) => console.log(values),
  });
  const [selectedSpecificDays, setSelectedSpecificDays] = useState<string[]>([]);
  console.log(formik.values);

  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <input type="text" {...formik.getFieldProps('email')} />
        {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>}
        <DatePicker
          onChange={(date: never) => {
            const dateStr = new Date(date).toDateString();
            if (selectedSpecificDays.includes(dateStr)) {
              setSelectedSpecificDays((oldDays) => {
                const newDays = oldDays.filter((day) => day !== dateStr);
                formik.setFieldValue('dates', newDays);
                return newDays;
              });
            } else {
              setSelectedSpecificDays((oldDays) => {
                const newDays = [...oldDays, dateStr];
                formik.setFieldValue('dates', newDays);
                return newDays;
              });
            }
          }}
          // selected={formik.values.date}
          inline
        />
        {formik.errors.dates && formik.touched.dates && <span>{formik.errors.dates}</span>}

        <input type="submit" value="submit" disabled={!formik.isValid} />
      </form>
    </div>
  );
}

export default App;
