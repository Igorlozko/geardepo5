import React from 'react';
import { useValue } from '../../context/ContextProvider';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material';

const WindowGear = ({ popupInfo }) => {
    const { title, description, price, images } = popupInfo;
    const { dispatch } = useValue();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Card sx={{ maxWidth: 400 }}>
            <Slider {...settings}>
                {images.map((url, index) => (
                    <div key={index}>
                        <Box
                            component="img"
                            src={url}
                            alt="gear"
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                            onClick={() =>
                                dispatch({ type: 'UPDATE_GEAR', payload: popupInfo })
                            }
                        />
                    </div>
                ))}
            </Slider>
            <ImageListItem>
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                        zIndex: 2,
                    }}
                    title={price === 0 ? 'Free Stay' : '€' + price}
                    position="top"
                />
                <ImageListItemBar
                    title={title}
                    subtitle={description.substr(0, 30) + '...'}
                    sx={{ zIndex: 2 }}
                />
            </ImageListItem>
        </Card>
    );
};

export default WindowGear;
