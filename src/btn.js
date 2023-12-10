import Button from '@mui/material/Button'

const Btn = ({buttonName, buttonAction}) => {

    return (
        <Button onClick={buttonAction} variant='contained' style={{fontFamily:'Poppins'}}>{buttonName}</Button>
    )
}

export default Btn