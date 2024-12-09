import { format, parse } from 'date-fns';

export const formatDate = (date?: string | Date, outFormat: string = 'dd-MM-yyy HH:mm:ss') => {
    if(!date) return '2020-10-10';

    if (typeof date === 'string') {
        const parsed = parse(date, 'dd/MM/yyyy HH:mm:ss', new Date());
        return format(parsed, outFormat);
    }
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

export const systemDate = (date?: string | Date) => {
    if (date) {
        console.log(date);
        if (typeof date === 'string') {
            console.log(date);
            const parsed = parse(date, 'dd/MM/yyyy HH:mm', new Date());
            return format(parsed, 'yyyy-MM-dd');
        }
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
};