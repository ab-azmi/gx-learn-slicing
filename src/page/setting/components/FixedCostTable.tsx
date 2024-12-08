import { ArchiveBox, Edit, Filter } from "iconsax-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Paginate } from "@/types/wraper";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ModalConfirm from "@/components/ModalConfirm";
import TablePagination from "@/components/TablePagination";
import priceFormater from "@/helpers/priceFormater.helper";
import handleInput from "@/helpers/input.helper";
import Select from "@/components/Select";
import Modal from "@/components/Modal";
import { FixedCost, FixedCostFilter } from "@/types/setting.type";

type TableProps = {
    data?: Paginate<FixedCost>;
    columns: number;
    loading?: boolean;
    filters: FixedCostFilter;
    setFilters: Dispatch<SetStateAction<FixedCostFilter>>;
    onDelete?: (id: number) => void;
    onFilter: () => void;
    onClearFilter: () => void;
    onChangePage: (page?: number) => void;
    onSelected?: (cake: FixedCost) => void;
    onAdd?: () => void;
};

const FixedCostTable = ({
    data,
    columns,
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
    const selected = useRef<FixedCost | null>(null);

    return (
        <div className="card-secondary">
            <section className="flex-between gap-3 mb-4">
                <h4 className="fw-bold">Manage Monthly Bills</h4>
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
                            <th>Frequency</th>
                            <th>Created At</th>
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
                                        {priceFormater(item.amount)}
                                    </td>
                                    <td className="px-3">
                                        {item.frequency?.name}
                                    </td>

                                    <td>
                                        {item.createdAt}
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
                                <td colSpan={columns + 1} className="text-center">
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

            <Modal show={showModal} onClose={() => setShowModal(false)} title="Fixed Cost Filter">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onFilter();
                    setShowModal(false);
                }}>
                    <div className="hstack gap-1 mb-2">
                        <Select
                            placeholder="Order By"
                            label="Order By"
                            name="orderBy"
                            onChange={(e) => handleInput(e, setFilters, filters)}
                            value={filters.orderBy}
                            options={[
                                { name: "Name", value: "name" },
                                { name: "Amount", value: "amount" },
                                { name: "Created At", value: "createdAt" },
                            ]}
                        />
                        <Select
                            placeholder="Order Type"
                            label="Order Type"
                            name="orderType"
                            onChange={(e) => handleInput(e, setFilters, filters)}
                            value={filters.orderType}
                            options={[
                                { name: "ASC", value: "asc" },
                                { name: "DESC", value: "desc" },
                            ]}
                        />
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

export default FixedCostTable;
