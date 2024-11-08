import Button from "./Button";

type Props = {
    total: number;
    limit: number;
    page: number;
    setPage: (page: number) => void;
}

const TablePagination = ({total, limit, page, setPage}: Props) => {
  return (
    <div className='d-flex gap-2 w-100 align-items-center'>
        {/* TODO : Hilangkan kalau kosong */}
        <Button 
            isOutline
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
        >
            Previous
        </Button>
        <span className='text-center'>
            {page} of {Math.ceil(total / limit)}
        </span>
        <button 
            className='btn btn-primary' 
            disabled={page === Math.ceil(total / limit)}
            onClick={() => setPage(page + 1)}
        >
            Next
        </button>
    </div>
  )
}

export default TablePagination