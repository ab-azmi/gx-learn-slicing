const priceFormater = (price: number|string): string => {
    if (typeof price === 'number') {
        return price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });
    }
    if (typeof price === 'string') {
        return parseInt(price).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });
    }

    return 'Rp0';
};

export default priceFormater;