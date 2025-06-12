import React, { useState, createContext, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

// Context API
const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [productData, setProductData] = useState({
        title_en: '',
        title_tr: '',
        title_ar: '',
        description_en: '',
        description_tr: '', 
        description_ar: '',
        images: []
    });

    const updateProductData = (path, value) => {
        setProductData((prev) => {
            const keys = path.split('.');
            let temp = { ...prev };

            keys.reduce((acc, key, index) => {
                if (index === keys.length - 1) {
                    acc[key] = value;
                } else {
                    if (!acc[key]) {
                        acc[key] = {};
                    }
                    acc[key] = { ...acc[key] };
                }
                return acc[key];
            }, temp);

            return temp;
        });
    };

    return (
        <ProductContext.Provider value={{ productData, updateProductData, setProductData }}>
            {children}
        </ProductContext.Provider>
    );
};

// Kullanım Kolaylığı için Özel Bir Hook
const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct, ProductContext };
