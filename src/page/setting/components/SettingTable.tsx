import { Edit } from "iconsax-react";
import { Dispatch, SetStateAction } from "react";
import { Paginate } from "@/types/wraper";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TablePagination from "@/components/TablePagination";
import handleInput from "@/helpers/input.helper";
import { Setting, SettingFilter } from "@/types/setting.type";

type TableProps = {
    data?: Paginate<Setting>;
    columns: number;
    loading?: boolean;
    filters: SettingFilter;
    setFilters: Dispatch<SetStateAction<SettingFilter>>;
    onFilter: () => void;
    onClearFilter: () => void;
    onChangePage: (page?: number) => void;
    onSelected: (cake: Setting) => void;
};

const SettingTable = ({
    data,
    columns,
    loading,
    filters,
    setFilters,
    onFilter,
    onClearFilter,
    onChangePage,
    onSelected,
}: TableProps) => {
    return (
        <div className="card-secondary">
            <section className="flex-between gap-3 mb-4">
                <h4 className="fw-bold">Manage Setting</h4>
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
            </form>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Key</th>
                            <th>Description</th>
                            <th>Value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.result?.length ? (
                            data?.result.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <p className="text-capitalize">
                                            #{index +  data.pagination.currentPage!}
                                        </p>
                                    </td>
                                    <td className="px-3">
                                        <div>
                                            {item.key}
                                        </div>
                                    </td>
                                    <td className="px-3">
                                        <div>
                                            {item.description}
                                        </div>
                                    </td>
                                    <td className="px-3">
                                        <div>
                                            {item.value}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="hstack gap-1">
                                            <Button
                                                className="bg-transparent border-0"
                                                onClick={() => onSelected(item)}
                                            >
                                                <Edit size="24" variant="Bulk" />
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
        </div>
    );
};

export default SettingTable;
