import React from 'react'
import { AppBar, Toolbar, Typography, Stack, Button, IconButton, MenuItem, Menu, MenuList } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/poppins'


const theme = createTheme({
    typography: {
        fontFamily: 'poppins'
    },
    stack: {
        display: {
            xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block'
        }
    }
})


export const MuiNavbar = () => {

    const [anchorNav, setAnchorNav] = React.useState(null);

    const openMenu = (event) => {
        setAnchorNav(event.currentTarget)
    }

    const closeMenu = () => {
        setAnchorNav(null)
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position='static' >
                {/* adds padding to left and right side toolbar does */}
                <Toolbar >

                    <Typography variant='h6' component='div' flexGrow={1} >
                        Heritage Detector
                    </Typography>

                    <Stack direction='row' spacing={2} sx={{ ...theme.stack }}>
                        <Button color='inherit' href='#HowTo'>How to use ?</Button>
                        <Button color='inherit' href="#Features">Features</Button>
                        <Button color='inherit' href='#About'>About</Button>
                        <Button color='inherit' href='https://www.github.com/sauravkhanal/yolo-inference-webapp' target='_blank' startIcon={<GitHubIcon/>}>
                        View Code
                        </Button>
                    </Stack>

                    <IconButton
                        sx={{ display: { sm: 'none', xs: 'block' } }}
                        color='inherit' onClick={openMenu} edge='start'>
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                        open={Boolean(anchorNav)}
                        onClose={closeMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuList>

                            <MenuItem component='a' href='#HowTo' onClick={closeMenu}>How to Use?</MenuItem>
                            <MenuItem component='a' href='#Features' onClick={closeMenu}>Features</MenuItem>
                            <MenuItem component='a' href='#About' onClick={closeMenu}>About</MenuItem>
                            <MenuItem component='a' href='https://github.com/sauravkhanal/yolo-inference-webapp'onClick={closeMenu}target='_blank'><GitHubIcon/>&nbsp;View Code</MenuItem>

                        </MenuList>

                    </Menu>

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
