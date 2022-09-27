import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import zIndex from '@mui/material/styles/zIndex';
import { CenterFocusStrong } from '@mui/icons-material';
 


function CardCar(props) {

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    width:'40%',
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d8',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

  return (
    <div className='box'>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={props.img}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
           {props.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             Engine: {props.engine}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             Year: {props.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             Price: {props.price} €/day
          </Typography>
        </CardContent>
        <CardActions>
        <BootstrapButton  onClick={props.addReservation} variant="contained">ADD</BootstrapButton>
        </CardActions>
      </Card>
    </div>
  )
}
 

export default CardCar