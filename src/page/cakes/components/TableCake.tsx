import { Edit, Filter, Trash } from "iconsax-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Paginate } from "@/types/wraper";
import { useNavigate } from "react-router-dom";
import { Cake, CakeVariant, Ingredient } from "@/types/transaction";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ModalConfirm from "@/components/ModalConfirm";
import TablePagination from "@/components/TablePagination";
import priceFormater from "@/helpers/priceFormater.helper";
import { cakePath } from "@/path/cakes.path";
import handleInput from "@/helpers/input.helper";
import Select from "@/components/Select";
import { getCake } from "@/service/api/cake.api";
import ModalTable from "@/components/ModalTable";
import createColumn from "@/helpers/tableColumn.helper";

type TableProps = {
  data?: Paginate<Cake>;
  columns: number;
  loading?: boolean;
  filters: { [key: string]: string };
  setFilters: Dispatch<SetStateAction<{ [key: string]: string; }>>;
  onDelete?: (id: number) => void;
  onFilter: () => void;
  onClearFilter: () => void;
  onChangePage: (page?: number) => void;
};

const TableCake = ({
  data,
  columns,
  loading,
  filters,
  setFilters,
  onFilter,
  onDelete,
  onClearFilter,
  onChangePage,
}: TableProps) => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [variants, setVariants] = useState<CakeVariant[]>([]);
  const selected = useRef<Cake | null>(null);

  const ingredientColumns = [
    createColumn("name", "Name"),
    createColumn('quantity', 'Stock'),
    createColumn('pivot.quantity', 'Using'),
    createColumn('price', 'Price', 'price'),
    createColumn('expirationDate', 'Expire'),
  ];

  const variantColumns = [
    createColumn("name", "Name"),
    createColumn('price', 'Additional Price', 'price'),
  ]

  const fetchIngredients = (cake: Cake) => {
    console.log(cake);
    getCake(cake.id!).then((res) => {
      setIngredients(res.result.ingredients);
      setVariants(res.result.variants);
    });
  }

  return (
    <div className="card-secondary">
      <section className="flex-between gap-3 mb-4">
        <h4 className="fw-bold">Manage Cakes</h4>
        <Button
          type="button"
          style="fill"
          onClick={() => navigate(cakePath.form)}
        >
          Add
        </Button>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFilter();
        }}
        className="d-flex gap-3 align-items-end mb-3 flex-wrap"
      >
        <div className="w-30">
          <Input
            type="text"
            name="search"
            label="Search"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => handleInput(e, setFilters, filters)}
          />
        </div>

        <Select
          placeholder="Order By"
          name="orderBy"
          value={filters.orderBy}
          onChange={(e) => handleInput(e, setFilters, filters)}
          options={[
            { name: "name", value: 'name' },
            { name: "price", value: 'sellingPrice' },
          ]}
        />
        <Select
          placeholder="Order Type"
          name="orderType"
          value={filters.orderType}
          onChange={(e) => handleInput(e, setFilters, filters)}
          options={[
            { name: "asc", value: 'asc' },
            { name: "desc", value: 'desc' },
          ]}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
        <button className="btn px-0">
          <Filter size="24" />
        </button>
        <button
          type="button"
          className="btn px-0 text-decoration-underline"
          onClick={() => onClearFilter()}
        >
          Clear All
        </button>
      </form>

      <ul className="nav custom-tab mb-3" id="pills-tab" role="tablist">
        <li className="nav-item tab-item" role="presentation">
          <button
            className="tab-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            All Leads
          </button>
        </li>
        <li className="nav-item tab-item" role="presentation">
          <button
            className="tab-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            From MyGX App
          </button>
        </li>
        <li className="tab-item flex-grow-1">
          <button className="tab-link h-100 w-100"></button>
        </li>
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active py-2"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Ingredients</th>
                  <th>Profit Margin</th>
                  <th>Base Price</th>
                  <th>Variants</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.result?.length ? (
                  data?.result.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="mt-3">
                          <p className="text-capitalize">
                            {item['name']}
                          </p>
                        </div>
                      </td>
                      <td className="px-3">
                        <div>
                          <p className="text-muted">{item['stock']}</p>
                        </div>
                      </td>
                      <td>
                        <ModalTable
                          title="Ingredients"
                          columns={ingredientColumns}
                          data={ingredients}>
                          <Button type="button" size="sm" onClick={() => fetchIngredients(item)}>
                            Show
                          </Button>
                        </ModalTable>
                      </td>

                      <td>
                        <div>
                          <b className="text-capitalize fw-medium">
                            {item["profitMargin"] ? item["profitMargin"] : "default"}
                          </b>
                        </div>
                      </td>

                      <td className="px-3">
                        <div>
                          <b className="text-capitalize fw-medium">
                            {priceFormater(item["sellingPrice"])}
                          </b>
                        </div>
                      </td>

                      <td>
                        <div>
                          <ModalTable
                            id="variantModal"
                            title="Cake Variants"
                            columns={variantColumns}
                            data={variants}>
                            <Button type="button" size="sm" onClick={() => fetchIngredients(item)}>
                              Show
                            </Button>
                          </ModalTable>
                        </div>
                      </td>

                      <td>
                        <div className="d-flex gap-1 mt-3">
                          <button
                            type="button"
                            className="btn btn-sm text-muted"
                            onClick={() =>
                              navigate(cakePath.form, { state: item })
                            }
                          >
                            <Edit size="24" variant="Bulk" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              selected.current = item;
                              setConfirm(true);
                            }}
                            className="btn btn-sm text-danger"
                          >
                            <Trash size="24" variant="Bulk" />
                          </button>

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
            {data?.result?.length && (
              <TablePagination
                total={data.pagination?.count || 0}
                limit={data.pagination?.perPage || 0}
                page={data.pagination?.currentPage || 0}
                setPage={(page) => onChangePage(page)}
              />
            )}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          suscipit odio quam officia tempora ducimus deserunt debitis laborum
          dignissimos temporibus?
        </div>
      </div>

      <ModalConfirm
        show={confirm}
        onClose={() => setConfirm(false)}
        title="Delete Confirm"
        message="This cannot be undone!"
        onConfirm={() => {
          if (onDelete && selected.current) {
            onDelete(selected.current.id!);
          }
          setConfirm(false);
        }}
      />
    </div>
  );
};

export default TableCake;
