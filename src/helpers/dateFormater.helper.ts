import {format, parse} from 'date-fns';

const formatDate = (date: string, outFormat: string = 'dd-MM-yyy HH:mm:ss') => {
    const parsed = parse(date, 'dd/MM/yyyy HH:mm:ss', new Date());
    return format(parsed, outFormat);
}

export default formatDate;