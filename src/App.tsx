import React, { Suspense } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';


const translationEn = {
  language: 'Language',
  description: 'Send message form',
  name: 'Name',
  surname: 'Surname',
  phone: 'Phone',
  email: 'Email adress',
  message: 'Message',
  submit: 'Submit',
};
const translationRu = {
  language: 'Язык',
  description: 'Форма отправки сообщений',
  name: 'Имя',
  surname: 'Фамилия',
  phone: 'Телефон',
  email: 'Email адрес',
  message: 'Сообщение',
  submit: 'Отправить',
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      ru: { translation: translationRu },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

interface MyFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL_FORM_STATE: MyFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: ""
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let FORM_VALIDATION_EN = yup.object().shape({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string(),
  phone: yup
    .string()
    .required("This field is required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(11, "to short")
    .max(11, "to long"),
  email: yup
    .string()
    .email(),
  message: yup
    .string()
    .required("This field is required")
    .min(10, "Massage is too short")
    .max(200, "Massage is too long")
});

let FORM_VALIDATION_RU = yup.object().shape({
  firstName: yup.string().required("Это поле обязательное"),
  lastName: yup.string(),
  phone: yup
    .string()
    .required("Это поле обязательное")
    .matches(phoneRegExp, 'Неверный номер телефона')
    .min(11, "мало цифр")
    .max(11, "много цифр"),
  email: yup
    .string()
    .email(),
  message: yup
    .string()
    .required("Это поле обязательное")
    .min(10, "Сообщение слишком короткое")
    .max(200, "Сообщение слишком длинное")
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      body: {
        backgroundColor: '#67E667',
      },
    },

    paper: {
      marginTop: '100px',
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      border: '1px solid #858585',
      boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      borderRadius: '16px',
      padding: '50px',
      width: '500px',
      backgroundColor: '#fff',


    },

    description: {
      margin: '0 0 30px 0',
    },
    lang: {
      margin: '10px 0 0 0',
    },
    submit: {
      width: 'fit-content',
      margin: '10px',
      borderRadius: '0px',
      backgroundColor: '#FF9700',
      '&:hover': {
        backgroundColor: '#08a652',
      },
    },

  }));




export const App: React.FC<{}> = () => {

  const { t } = useTranslation();
  const [langValidationForm, setLangValidationForm] = React.useState(FORM_VALIDATION_EN);

  const classes = useStyles();

  const handleChangeLang = (event: any) => {
    i18n.changeLanguage(event.target.value);

    if (langValidationForm === FORM_VALIDATION_EN) {
      setLangValidationForm(FORM_VALIDATION_RU);
    }

    if (langValidationForm === FORM_VALIDATION_RU) {
      setLangValidationForm(FORM_VALIDATION_EN);
    }

  }

  return (
    <Suspense fallback="Loading...">
      <Container component="main" maxWidth="xs">

        <FormControl className={classes.lang} >
          <InputLabel htmlFor="age-native-required">{t('language')}</InputLabel>
          <Select
            native
            // value={state.age}
            onChange={handleChangeLang}
            name="age"
            inputProps={{
              id: 'age-native-required',
            }}
          >
            <option value='en'>English</option>
            <option value='ru'>Русский</option>


          </Select>
        </FormControl>

        <div className={classes.paper}>
          <Typography className={classes.description} component="h1" variant="h5" >
            {t('description')}
          </Typography>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE
            }}
            validationSchema={langValidationForm}
            onSubmit={values => {
              console.log(values)
            }}
          >
            {({ errors, handleChange, touched }) => (
              <Form>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={errors.firstName && touched.firstName ? true : false}
                      autoComplete="name"
                      onChange={handleChange}
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      id="firstName"
                      label={t('name')}
                      autoFocus
                      helperText={
                        errors.firstName && touched.firstName ? errors.firstName : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={errors.lastName && touched.lastName ? true : false}
                      variant="outlined"
                      fullWidth
                      id="lastName"
                      label={t('surname')}
                      name="lastName"
                      autoComplete="surname"
                      onChange={handleChange}
                      helperText={
                        errors.lastName && touched.lastName
                          ? errors.lastName
                          : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={errors.phone && touched.phone ? true : false}
                      variant="outlined"
                      fullWidth
                      id="phone"
                      label={t('phone')}
                      name="phone"
                      autoComplete="phone"
                      onChange={handleChange}
                      helperText={
                        errors.phone && touched.phone
                          ? errors.phone
                          : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={errors.email && touched.email ? true : false}
                      variant="outlined"
                      fullWidth
                      id="email"
                      label={t('email')}
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      helperText={
                        errors.email && touched.email
                          ? errors.email
                          : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      error={errors.message && touched.message ? true : false}
                      variant="outlined"
                      fullWidth
                      id="message"
                      label={t('message')}
                      name="message"
                      autoComplete="message"
                      multiline={true}
                      rows={4}
                      onChange={handleChange}
                      helperText={
                        errors.message && touched.message
                          ? errors.message
                          : null
                      }
                    />
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {t('submit')}
                  </Button>

                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Suspense>
  );
}


