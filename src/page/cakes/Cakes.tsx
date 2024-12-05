import Modal from "@/components/Modal";
import TableCake from "./components/TableCake";
import useCakes from "./hooks/useCakes";
import { useState } from "react";
import { Cake } from "@/types/cake.type";
import priceFormater from "@/helpers/priceFormater.helper";

const Cakes = () => {
  const { 
    cakes, 
    filters, 
    setFilters, 
    loading, 
    fetchCakes,
    handleDelete, 
    clearFilter } = useCakes();

  const [selected, setSelected] = useState<Cake | null>(null);

  return (
    <div className="p-4">
      <TableCake
        data={cakes}
        columns={5}
        onDelete={(id) => handleDelete(id)}
        onChangePage={(page) => fetchCakes(page)}
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        onFilter={() => fetchCakes()}
        onClearFilter={() => clearFilter()}
        onSelected={(cake) => setSelected(cake)}
      />

      <Modal size="lg" show={selected !== null} onClose={() => setSelected(null)} title="Cake Detail">
        <h5 className="mb-3">{selected?.name}</h5>
        <table className="w-40 mb-3">
          <tbody>
            <tr>
              <td>COGS</td>
              <td>{priceFormater(selected?.COGS)}</td>
            </tr>
            <tr>
              <td>Base Price</td>
              <td>{priceFormater(selected?.sellingPrice)}</td>
            </tr>
            <tr>
              <td>Total Discount</td>
              <td>{priceFormater(selected?.totalDiscount)}</td>
            </tr>
          </tbody>
        </table>

        <h6>Variants :</h6>
        <table className="w-100 mb-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price Add</th>
            </tr>
          </thead>
          <tbody>
            {selected?.variants?.map((variant, index) => (
              <tr key={variant.id}>
                <td>#{index+1}</td>
                <td>{variant.name}</td>
                <td>{priceFormater(variant.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h6>Ingredients :</h6>
        <table className="w-100 mb-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Used by Cake</th>
              <th>Price</th>
              <th>Expire</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {selected?.ingredients?.map((ing, index) => (
              <tr key={ing.id}>
                <td>#{index+1}</td>
                <td>{ing.name}</td>
                <td>{ing.quantity} {ing.unit?.name}</td>
                <td>{ing.pivot?.quantity}</td>
                <td>{priceFormater(ing.price)}</td>
                <td>{ing.expirationDate}</td>
                <td>{ing.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default Cakes;
