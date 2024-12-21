const priceFormater = (price?: number): string => {
    const options: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };

    if (price)
        return price.toLocaleString('id-ID', options);
    

    return 'Rp0';
};

export default priceFormater;