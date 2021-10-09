import React, { ReactElement, useEffect, useState, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styles } from 'Styles/indexStyle';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from 'services/api'
import { Password } from '@mui/icons-material';
import { AuthContext } from 'contexts/AuthContext';

import Image from 'next/Image';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const { signIn } = useContext(AuthContext);

  const schema = yup.object().shape({
    email: yup.string()
      .email('O campo email não está no padrão correto')
      .required('O campo email é obrigatório'),
    password: yup.string()
      .min(4, 'O campo senha deve ter no mínimo 4 caracteres')
      .max(20, 'O campo senha deve ter no máximo 20 caracteres')
      .required('O campo senha é obrigatório'),
  });

  const { handleSubmit, control, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  }
  );

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   // eslint-disable-next-line no-console
  //   api.post(`/oauth/token?grant_type=password&username=${data.get('email')}&password=${data.get('password')}`, null, {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Authorization": "Basic d2ViY2xpZW50OmNsaWVudEB3ZWI=",
  //       //"Access-Control-Allow-Origin": "*"
  //     }
  //   }).then(response => {
  //     const data = response.data

  //     localStorage.setItem('token', data.access_token)
  //   })
  // };

  function signInSubmit(data: any) {
    console.log(data)
    signIn(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={styles.container}>
        <CssBaseline />
        <Box
          sx={styles.box}
        >
          <Image src= '/Logo.png' alt="Logo" width={75}  height={75} />
          <Typography component="h1" variant="h5" sx={styles.title}>
            Bem vindo ao portal EY
          </Typography>
          <Box component="form" onSubmit={handleSubmit(signInSubmit)} noValidate sx={{ mt: 1 }}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ''}
                  label="Email"
                  fullWidth
                  required
                  type="email"
                  margin="normal"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password?.message : ''}
                  label="Senha"
                  fullWidth
                  required
                  type="password"
                  margin="normal"
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.button}
            >
              Acessar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <React.Fragment>{page}</React.Fragment>
  )
}