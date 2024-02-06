import { AppBar, Box, Container, Dialog, IconButton, Rating, Slide, Stack, Toolbar, Typography } from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import { forwardRef, useEffect, useState } from 'react';
import { Close, PlaceSharp, StarBorder } from '@mui/icons-material';
import Gears from './Gears';
{/*
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';
import './swiper.css';
*/}


const Transition = forwardRef((props, ref)=>{
    return <Slide direction='up'{...props} ref={ref}/>
}) // pass refrence to child slide component 

const GearPage = () => {

    const {state:{gear}, dispatch} = useValue();

    const [place, setPlace] = useState(null);

    useEffect(()=>{
        if(gear){
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${gear.lng},${gear.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
            fetch(url)
                .then(response => response.json())
                .then((data) => setPlace(data.features[0]));
        }
    },[gear])

    const handleClose = ()=>{
        dispatch({type:'UPDATE_GEAR', payload: null})
    }


  return (
    <Dialog
        fullScreen
        open={Boolean(gear)}
        onClose={handleClose}
        TransitionComponent={Transition}
    >
        <AppBar
            position='relative'
        >
            <Toolbar>
                <Typography
                    variant='h6'
                    component='h3'
                    sx={{
                        ml:2,
                        flex:1
                    }}
                >
                    {gear?.title}
                </Typography>
                <IconButton
                    color='inherit'
                    onClick={handleClose}
                >
                    <Close/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Container
            sx={{pt:5}}
        >
           {/* <Swiper
                modules={[Navigation, Autoplay, EffectCoverflow,Lazy, Zoom]}
                centeredSlides
                slidesPerView={2}
                grabCursor
                navigation
                autoplay
                lazy
                zoom
                effect='coverflow'
                coverflowEffect={{
                    rotate:50,
                    stretch:0,
                    depth:100,
                    modifier:1,
                    slideShadows:true
                }}
            >
                {gear?.images?.map(url=>(
                    <SwiperSlide
                        key={url}
                    >
                        <div className='swiper-zoom-container'>
                            <img src={url} alt='gear'/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
                */}
            
            <Stack
                sx={{p:3}}
                spacing={2}
            >
                <Stack
                    direction="row"
                    sx={{
                        justifyContent:'space-between',
                        flexWrap:'wrap'
                    }}
                >
                    <Box>
                        <Typography variant='h6' component='span'>{'Price per day: '}</Typography>
                        <Typography component='span' >{gear?.price === 0 ? 'Free rental': '€'+gear?.price}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display:'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant='h6' component='span'>{'Rating: '}</Typography>
                        <Rating name='gear-rating' defaultValue={4}  precision={0.5} emptyIcon={<StarBorder/>}/>
                    </Box>
                </Stack>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent:'space-between',
                        flexWrap:'wrap'
                    }}
                >
                    <Box>
                        <Typography variant='h6' component='span'>{'Location: '}</Typography>
                        <Typography component='span' > {place?.text}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display:'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant='h6' component='span'>{'Address: '}</Typography>
                        <Typography component='span' > {place?.place_name}</Typography>
                    </Box>
                </Stack>
                <Stack>
                    <Typography variant='h6' component='span'>{'Description: '}</Typography>
                    <Typography component='span' > {gear?.description}</Typography>
                </Stack>
            </Stack>
        </Container>
    </Dialog>
  )
}

export default GearPage