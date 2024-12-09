import { useEffect, useState } from "react";
import IngredientTable from "./components/IngredientTable";
import useIngredient from "./hooks/useIngredient"
import { IngredientParam } from "@/param/cake.param";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import handleInput from "@/helpers/input.helper";
import Select from "@/components/Select";
import { systemDate } from "@/helpers/dateFormater.helper";

const Ingredient = () => {
    const {
        ingredients,
        filters,
        setFilters,
        input, setInput,
        handleGetIngredients,
        handleCreateIngredient,
        handleUpdateIngredient,
        handleDeleteIngredient,
        clearFilter
    } = useIngredient();

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = () => {
        setShowModal(false);
        if (input.id) {
            handleUpdateIngredient();
        } else {
            handleCreateIngredient();
        }
    }

    useEffect(() => {
        handleGetIngredients();
    }, [])

    return (
        <div>
            <IngredientTable
                data={ingredients}
                columns={6}
                filters={filters}
                setFilters={setFilters}
                onFilter={() => handleGetIngredients()}
                onClearFilter={clearFilter}
                onChangePage={(page) => handleGetIngredients(page)}
                onAdd={() => {
                    setInput(IngredientParam);
                    setShowModal(true);
                }}
                onDelete={handleDeleteIngredient}
                onSelected={(item) => {
                    setInput({ ...item, unitId: item.unit?.id, expirationDate: systemDate(item.expirationDate) });
                    setShowModal(true);
                }}
            />

            <Modal title={input.id ? 'Edit' : 'Create'} show={showModal} onClose={() => setShowModal(false)}>
                <form>
                    <Input
                        placeholder="Name"
                        label="Name"
                        name="name"
                        type="text"
                        value={input.name}
                        onChange={(e) => handleInput(e, setInput, input)}
                    />
                    <Input
                        placeholder="2000"
                        label="Price Per Unit"
                        name="price"
                        type="number"
                        value={input.price?.toString()}
                        onChange={(e) => handleInput(e, setInput, input)}
                    />
                    <Input
                        placeholder="100"
                        label="Stock"
                        name="quantity"
                        type="text"
                        value={input.quantity.toString()}
                        onChange={(e) => handleInput(e, setInput, input)}
                    />
                    <Select
                        placeholder="Select Unit"
                        label="Unit"
                        name="unitId"
                        value={input.unit?.id.toString()}
                        onChange={(e) => handleInput(e, setInput, input)}
                        options={[
                            { name: "Gram", value: "1" },
                            { name: "Kilogram", value: "2" },
                            { name: "Liter", value: "3" },
                            { name: "Piece", value: "4" },
                            { name: "Pack", value: "5" }
                        ]}
                    />
                    <Input
                        placeholder="PT Telur Asin"
                        label="Supplier"
                        name="supplier"
                        type="text"
                        value={input.supplier}
                        onChange={(e) => handleInput(e, setInput, input)}
                    />
                    <Input
                        placeholder="Expired Date"
                        label="Expired Date"
                        name="expirationDate"
                        type="date"
                        value={input.expirationDate}
                        onChange={(e) => handleInput(e, setInput, input)}
                    />
                    <Button className="w-100 mt-3" type="button" onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                </form>
            </Modal>
        </div>
    )
}

export default Ingredient