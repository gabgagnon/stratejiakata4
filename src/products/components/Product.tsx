import { Button, Slider, Spin } from 'antd';
import { FC, useEffect, useState, useRef } from 'react';

import './Product.css'

interface ProductComponentInterface {
  product: {
    imageUrls: string[];
    defaultImageIndex: number;
    nbImages: number;
  }
}

export const Product: FC<ProductComponentInterface> = ({ product }) => {
  const { imageUrls, defaultImageIndex, nbImages } = product

  return (
    <div className="product">
    </div>
  )
}