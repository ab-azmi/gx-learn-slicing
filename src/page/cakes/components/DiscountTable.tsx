import { ArchiveBox, Edit, Filter } from "iconsax-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Paginate } from "@/types/wraper";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ModalConfirm from "@/components/ModalConfirm";
import TablePagination from "@/components/TablePagination";
import priceFormater from "@/helpers/priceFormater.helper";
import handleInput from "@/helpers/input.helper";
import Modal from "@/components/Modal";
import { Discount, DiscountFilter } from "@/types/cake.type";
import DatePicker from "@/components/DatePicker";
import { formatDate } from "@/helpers/dateFormater.helper";

type TableProps = {
    data?: Paginate<Discount>;
    loading?: boolean;
    filters: DiscountFilter;
    setFilters: Dispatch<SetStateAction<DiscountFilter>>;
    onDelete?: (id: number) => void;
    onFilter: () => void;
    onClearFilter: () => void;
    onChangePage: (page?: number) => void;
    onSelected?: (cake: Discount) => void;
    onAdd?: () => void;
};

const DiscountTable = ({
    data,
    loading,
    filters,
    setFilters,
    onFilter,
    onDelete,
    onClearFilter,
    onChangePage,
    onSelected,
    onAdd,
}: TableProps) => {
    const [confirm, setConfirm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const selected = useRef<Discount | null>(null);

    return (
        <div className="card-secondary">
            <section className="flex-between gap-3 mb-4">
                <h4 className="fw-bold">Manage Discounts</h4>
                <Button
                    type="button"
                    style="fill"
                    onClick={() => onAdd && onAdd()}
                >
                    Add
                </Button>
            </section>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onFilter();
                }}
                className="flex-between mb-3"
            >
                <div className="w-70 gap-2 hstack">
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        value={filters.search}
                        onChange={(e) => handleInput(e, setFilters, filters)}
                    />

                    <Button onClick={() => onFilter()}>
                        Search
                    </Button>
                    <Button isOutline onClick={() => onClearFilter()}>
                        Reset
                    </Button>
                </div>

                <Button onClick={() => setShowModal(true)} className="position-relative">
                    <span className="badge rounded-pill bg-danger position-absolute top-0 end-50 translate-middle">
                        {Object.values(filters).filter((value) => value !== "").length}
                    </span>
                    <Filter variant="Bulk" />
                </Button>
            </form>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date Active</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.result?.length ? (
                            data?.result.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <p className="text-capitalize">
                                            {item.name}
                                        </p>
                                    </td>
                                    <td className="px-3">
                                        {item.description}
                                    </td>
                                    <td className="px-3">
                                        {priceFormater(item.value)}
                                    </td>
                                    <td className="px-3">
                                        {item.fromDate} - {item.toDate}
                                    </td>
                                    <td>
                                        <div className="hstack gap-1">
                                            <Button
                                                className="bg-transparent border-0"
                                                onClick={() =>
                                                    onSelected && onSelected(item)
                                                }
                                            >
                                                <Edit size="24" variant="Bulk" />
                                            </Button>
                                            <Button
                                                className="bg-transparent border-0 text-danger"
                                                onClick={() => {
                                                    selected.current = item;
                                                    setConfirm(true);
                                                }}
                                            >
                                                <ArchiveBox size="24" variant="Bulk" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">
                                    {loading ? "Loading..." : " No data available"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-2">
                {(data?.result?.length && data?.result?.length > data?.pagination?.perPage) && (
                    <TablePagination
                        total={data.pagination?.totalPage || 0}
                        limit={data.pagination?.perPage || 0}
                        page={data.pagination?.currentPage || 0}
                        setPage={(page) => onChangePage(page)}
                    />
                )}
            </div>

            <ModalConfirm
                show={confirm}
                onClose={() => setConfirm(false)}
                title="Archived Confirm"
                message={`${selected.current?.name} will be archived`}
                onConfirm={() => {
                    if (onDelete && selected.current) {
                        onDelete(selected.current.id!);
                    }
                    setConfirm(false);
                }}
            />

            <Modal show={showModal} onClose={() => setShowModal(false)} title="Discount Filter">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onFilter();
                    setShowModal(false);
                }}>
                    <div className="mb-2 w-50">
                        <DatePicker
                            label="Created At Range"
                            onChange={(date) => {
                                setFilters({
                                    ...filters,
                                    fromDate: date[0] ? formatDate(date[0]) : "",
                                    toDate: date[1] ? formatDate(date[1]) : "",
                                })
                            }} />
                    </div>
                    
                    <div className="hstack gap-2">
                        <Button type="submit" className="w-100">Filter</Button>
                        <Button
                            type="button"
                            isOutline
                            onClick={() => onClearFilter()}
                            className="w-40">Clear Filter</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DiscountTable;
