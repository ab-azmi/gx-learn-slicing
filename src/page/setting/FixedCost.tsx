import { useEffect, useState } from "react";
import FixedCostTable from "./components/FixedCostTable";
import useFixedCost from "./hooks/useFixedCost";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import handleInput from "@/helpers/input.helper";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { fixedCostParam } from "@/param/setting.param";

const FixedCost = () => {
    const {
        fixedCosts,
        input, setInput,
        filters, setFilters, 
        handleFetchFixedCost, 
        handleClearFilter,
        handleCreateFixedCost,
        handleUpdateFixedCost,
        handleDeleteFixedCost
     } = useFixedCost();
    
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        handleFetchFixedCost()
    }, [])

    const handleSubmit = () => {
        setShowModal(false)

        if (input.id) {
            handleUpdateFixedCost()
        } else {
            handleCreateFixedCost()
        }
    }

    return (
        <div>
            <FixedCostTable
                data={fixedCosts}
                columns={5}
                filters={filters}
                setFilters={setFilters}
                onFilter={() => handleFetchFixedCost()}
                onClearFilter={() => handleClearFilter()}
                onChangePage={(page) => handleFetchFixedCost(page)}
                onAdd={() => {
                    setInput(fixedCostParam)
                    setShowModal(true)
                }}
                onSelected={(item) => {
                    setInput({...item, frequencyId: item.frequency?.id || 0})
                    setShowModal(true)
                }}
                onDelete={(id) => handleDeleteFixedCost(id)}
            />

            <Modal title={input.id ? 'Edit' : 'Create'} show={showModal} onClose={() => setShowModal(false)}>
                <form>
                    <Input 
                        placeholder="Name"
                        name="name"
                        type="text"
                        label="Name"
                        value={input.name}
                        onChange={(e) => handleInput(e, setInput, input)}/>
                    <Input 
                        placeholder="Description"
                        name="description"
                        type="text"
                        label="Description"
                        value={input.description}
                        onChange={(e) => handleInput(e, setInput, input)}/>
                    <Input 
                        placeholder="Amount"
                        name="amount"
                        type="number"
                        label="Amount"
                        value={input.amount.toString()}
                        onChange={(e) => handleInput(e, setInput, input)}/>
                    <Select
                        placeholder="Frequency"
                        name="frequency"
                        label="Frequency"
                        value={input.frequency?.id.toString()}
                        onChange={(e) => handleInput(e, setInput, input)}
                        options={
                            [
                                { value: 1, name: "Monthly" },
                                { value: 2, name: "Quarterly" },
                                { value: 3, name: "Yearly" },
                                { value: 4, name: "Weekly" },
                            ]
                        }
                        />
                    <Button className="mt-3 w-100" type="button" onClick={() => handleSubmit()}>Submit</Button>
                </form>
            </Modal>
        </div>
    )
}

export default FixedCost