export default function createColumn(field: string, title: string, type: string = "text") {
    return {
        field,
        title,
        type
    }

}