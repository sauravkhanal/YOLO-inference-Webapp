import React from 'react'
import { AppBar, Toolbar, Typography, Stack, Button, IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/poppins'
import { NoEncryption } from '@mui/icons-material';

const theme = createTheme({
    typography: {
        fontFamily: 'poppins'
    }
})

export const MuiNavbar = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position='static' >
                {/* adds padding to left and right side toolbar does */}
                <Toolbar >
                    <Typography variant='h6' component='div' flexGrow={1} >
                        Heritage Detector
                    </Typography>

                    <Stack direction='row' spacing={2}>
                        <Button color='inherit'>How to use ?</Button>
                        <Button color='inherit'>Features</Button>
                        <Button color='inherit'>About</Button>
                        <IconButton color='inherit' href='https://www.github.com/sauravkhanal/yolo-inference-webapp' target='blank' sx={{display:{xs:'none',md:'flex'} }}>
                            <GitHubIcon />
                        </IconButton>
                    </Stack>

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
