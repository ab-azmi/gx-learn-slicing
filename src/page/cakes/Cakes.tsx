import Modal from "@/components/Modal";
import useCakes from "./hooks/useCakes";
import { useState } from "react";
import { Cake } from "@/types/cake.type";
import priceFormater from "@/helpers/priceFormater.helper";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Add, Minus } from "iconsax-react";
import handleInput from "@/helpers/input.helper";
import { restockCake } from "@/service/api/cake.api";
import { cakeRestockParam } from "@/param/cake.param";
import CakeTable from "./components/CakeTable";

const Cakes = () => {
  const {
    cakes,
    filters,
    setFilters,
    loading,
    restock,
    setRestock,
    fetchCakes,
    handleDelete,
    handleAdjustStock,
    clearFilter } = useCakes();

  const [selected, setSelected] = useState<Cake | null>(null);
  const [modalDetail, setModalDetail] = useState<boolean>(false);
  const [modalRestock, setModalRestock] = useState<boolean>(false);

  const handleRestockRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected) {
      restockCake(selected.id!, restock).then(() => {
        fetchCakes();
        setModalRestock(false);
        setRestock(cakeRestockParam);
      });
    }
  }

  return (
    <div className="p-4">
      <CakeTable
        data={cakes}
        columns={5}
        onDelete={(id) => handleDelete(id)}
        onChangePage={(page) => fetchCakes(page)}
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        onFilter={() => fetchCakes()}
        onClearFilter={() => clearFilter()}
        onSelected={(cake) => {
          setSelected(cake);
          setModalDetail(true);
        }}
        onRestock={(cake) => {
          setSelected(cake);
          setModalRestock(true);
        }}
      />

      <Modal size="lg" show={modalDetail} onClose={() => setModalDetail(false)} title="Cake Detail">
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
                <td>#{index + 1}</td>
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
                <td>#{index + 1}</td>
                <td>{ing.name}</td>
                <td>{ing.quantity} {ing.unit?.name}</td>
                <td>{ing.pivot?.quantity} {ing.unit?.name}</td>
                <td>{priceFormater(ing.price)}</td>
                <td>{ing.expirationDate}</td>
                <td>{ing.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>

      <Modal show={modalRestock} onClose={() => setModalRestock(false)} title="Restock Cake">
        <form onSubmit={(e) => handleRestockRequest(e)}>
          <div className="hstack w-100 align-items-end gap-3 mb-3">
            <Button size="sm" onClick={() => handleAdjustStock(1, null)}>
              <Add />
            </Button>
            
            <Input
              type="number"
              label="Adjust Stock Sell"
              placeholder="0"
              value={restock.addStockSell.toString()}
              onChange={(e) => handleInput(e, setRestock, restock)}
              name="addStockSell"
            />
            <Button size="sm" onClick={() => handleAdjustStock(-1, null)}>
              <Minus />
            </Button>
          </div>
          <div className="hstack w-100 align-items-end gap-3 mb-3">
            <Button size="sm" onClick={() => handleAdjustStock(null, 1)}>
              <Add />
            </Button>
            <Input
              type="number"
              label="Adjust Stock Non Sell"
              placeholder="0"
              value={restock.addStockNonSell.toString()}
              onChange={(e) => handleInput(e, setRestock, restock)}
              name="addStockNonSell"
            />
            <Button size="sm" onClick={() => handleAdjustStock(null, -1)}>
              <Minus />
            </Button>
          </div>
          <Button type="submit" className="w-100">Adjust</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Cakes;
