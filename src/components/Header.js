import { Toolbar, AppBar, IconButton, Typography,  List, ListItemText, ListItemButton, ListItem, ListItemIcon } from '@mui/material' //these are components



//custom styles for list

const Header = () => {

    const navItem = ['About', 'How to use?']

    return (

        <AppBar>
            <Toolbar>


                        <Typography variant='h4' flexGrow={1}>Heritage Detection</Typography>



                    <List sx={{
                        display:'flex',
                        justifyContent:'flex-end',
                        flexFlow:'row no-wrap',
                        flexBasis:'10px'
                    }}>

                        {
                            navItem.map((item) => {
                                return (
                                    <ListItem>
                                        <ListItemButton>
                                            <ListItemText primary={item}></ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }


                        <ListItem>
                            <ListItemButton>

                                <ListItemIcon color='inherit' href='https://www.github.com/sauravkhanal/yolo-inference-webapp' target='blank'>
                                    <GitHubIcon />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    </List>



            </Toolbar>
        </AppBar>



    )
}

export default Header