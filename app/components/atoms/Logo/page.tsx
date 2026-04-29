'use client'
import React from 'react';

interface LogoProps {
    image: string;
}

const Logo: React.FC<LogoProps> = ({ image }) => (
    <img src={image} className='m-2 w-24 h-auto'/>

)


export default Logo
