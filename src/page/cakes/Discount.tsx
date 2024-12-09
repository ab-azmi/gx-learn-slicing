import React, { useEffect, useState } from 'react'
import useDiscount from './hooks/useDiscount'
import DiscountTable from './components/DiscountTable';
import Modal from '@/components/Modal';

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
                    setInput(item)
                    setShowModal(true)
                }}
            />

            <Modal title={input.id ? 'Edit' : 'Create'} show={showModal} onClose={() => setShowModal(false)}>
                
            </Modal>
        </div>
    )
}

export default Discount