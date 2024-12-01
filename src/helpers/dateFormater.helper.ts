import { format, parse } from 'date-fns';

const formatDate = (date: string | Date, outFormat: string = 'dd-MM-yyy HH:mm:ss') => {
    if (typeof date === 'string') {
        const parsed = parse(date, 'dd/MM/yyyy HH:mm:ss', new Date());
        return format(parsed, outFormat);
    }
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

export default formatDate;