// **  Mui
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material'
// **  Next
import { NextPage } from 'next'
// **  Custom components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// **  useForm
import { Controller, useForm } from 'react-hook-form'
// **  yup
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { dark } from '@mui/material/styles/createPalette'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'

type TProps = {}
const LoginPage: NextPage<TProps> = () => {
  //states
  const [showPassword, setShowPassword] = useState(false)

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('The field is required ').matches(EMAIL_REG, 'The field is must type email'),
      password: yup
        .string()
        .required('The field is required ')
        .matches(PASSWORD_REG, 'The Password is contains the character ')
    })
    .required()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onsubmit = (data: { email: string; password: string }) => {
    console.log('data:', { data, errors })
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onsubmit)} autoComplete='off' noValidate>
          <Box>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextField
                  required
                  fullWidth
                  label='Email '
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder='Input Email'
                  error={Boolean(errors?.email)}
                  helperText={errors?.email?.message}
                />
              )}
              name='email'
            />
          </Box>
          <Box>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextField
                  required
                  fullWidth
                  label='Password '
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder='Input Password'
                  error={Boolean(errors?.password)}
                  helperText={errors?.password?.message}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <Icon icon='material-symbols:visibility-outline' />
                          ) : (
                            <Icon icon='ic:outline-visibility-off' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
              name='password'
            />
          </Box>

          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}
export default LoginPage
