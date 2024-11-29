// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string): any => {
    return (
        obj[path] || path.split(".").reduce((acc, key) => acc && acc[key], obj)
    );
};

export default getNestedValue;