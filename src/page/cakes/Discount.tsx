import React, { useEffect, useState } from 'react'
import useDiscount from './hooks/useDiscount'
import DiscountTable from './components/DiscountTable';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import handleInput from '@/helpers/input.helper';
import Button from '@/components/Button';
import { systemDate } from '@/helpers/dateFormater.helper';

const Discount = () => {
    const {
        discounts,
        filters,
        input,
        setInput,
        setFilters,
        clearFilter,
        handleGetDiscounts,
    } = useDiscount();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        handleGetDiscounts()
    }, [])

    const handleSubmit = () => {
        if(input.id) {
            // handleUpdateDiscount()
        } else {
            // handleCreateDiscount()
        }
    }

    return (
        <div>
            <DiscountTable
                data={discounts}
                filters={filters}
                setFilters={setFilters}
                onFilter={() => handleGetDiscounts()}
                onClearFilter={() => clearFilter()}
                onChangePage={(page) => handleGetDiscounts(page)}
                onSelected={(item) => {
                    setInput({
                        ...item,
                        fromDate: systemDate(item.fromDate),
                        toDate: systemDate(item.toDate)
                    })
                    setShowModal(true)
                }}
            />

            <Modal title={input.id ? 'Edit' : 'Create'} show={showModal} onClose={() => setShowModal(false)}>
                <form className='vstack gap-2'>
                    <Input
                        type="text"
                        label="Discount Name"
                        required
                        placeholder="Chocolate"
                        name="name"
                        value={input.name}
                        onChange={(e) => handleInput(e, setInput, input)}
                    />
                    <Input
                        type="text"
                        label="Discount Description"
                        placeholder="Chocolate"
                        name="description"
                        value={input.description}
                        onChange={(e) => handleInput(e, setInput, input)}
                    />
                    <Input
                        type="number"
                        label="Discount Value (Rp)"
                        required
                        placeholder="100"
                        name="value"
                        value={input.value?.toString()}
                        onChange={(e) => handleInput(e, setInput, input)}
                    />
                    <div className="flex-between gap-1 mb-2">
                        <Input
                            placeholder=""
                            required
                            name="fromDate"
                            label="Start Period"
                            value={input.fromDate}
                            onChange={(e) => handleInput(e, setInput, input)}
                            type="date"
                        />
                        <Input
                            placeholder=""
                            required
                            name="toDate"
                            label="End Period"
                            value={input.toDate}
                            onChange={(e) => handleInput(e, setInput, input)}
                            type="date"
                        />
                    </div>
                    <Button onClick={() => handleSubmit()} className="w-100 mt-3">
                        Submit
                    </Button>
                </form>
            </Modal>
        </div>
    )
}

export default Discount