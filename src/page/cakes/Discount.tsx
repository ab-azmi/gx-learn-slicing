import { useEffect, useState } from 'react'
import useDiscount from './hooks/useDiscount'
import DiscountTable from './components/DiscountTable';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import handleInput from '@/helpers/input.helper';
import Button from '@/components/Button';
import { systemDate } from '@/helpers/dateFormater.helper';
import SelectSearch from '@/components/SelectSearch';
import { discountParam } from '@/param/cake.param';
import { getCakes, getDiscountById } from '@/service/api/cake.api';
import { Cake } from '@/types/cake.type';
import { Options } from '@/types/wraper';

const Discount = () => {
    const {
        discounts,
        filters,
        input,
        setInput,
        setFilters,
        clearFilter,
        handleSubmit,
        handleGetDiscounts,
    } = useDiscount();

    const [showModal, setShowModal] = useState(false);
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);

    useEffect(() => {
        handleGetDiscounts()
    }, [])

    const handleFetchOptions = (search: string) => {
        if (search.length < 2) return;

        getCakes(undefined, { search, limit: 5 })
            .then((res) => {
                setOptions(
                    res.result.map((item: Cake) => ({ value: item.id, label: item.name }))
                )
            })
    }

    const handleSelectedCakes = (option: Options) => {
        setInput({
            ...input,
            cakes: [
                ...(input.cakes || []),
                option
            ]
        })
    }

    const handleSelectedDiscount = (id: number) => {

        getDiscountById(id)
            .then(({ result }) => {
                setInput({
                    ...result,
                    fromDate: systemDate(result.fromDate),
                    toDate: systemDate(result.toDate),
                    cakes: [{ value: result.cakeId?.toString() || '', label: result.cake.name || '' }]
                })
                setShowModal(true)
            });

    }

    return (
        <div>
            <DiscountTable
                data={discounts}
                onAdd={() => {
                    setInput(discountParam);
                    setShowModal(true)
                }}
                filters={filters}
                setFilters={setFilters}
                onFilter={() => handleGetDiscounts()}
                onClearFilter={() => clearFilter()}
                onChangePage={(page) => handleGetDiscounts(page)}
                onSelected={(item) => handleSelectedDiscount(item.id!)}
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
                    <div className=''>
                        <SelectSearch
                            label='Apply to Cake(s)'
                            value={input.cakes}
                            placeholder='Select Cake'
                            options={options}
                            onFetchOptions={(search) => handleFetchOptions(search)}
                            onChange={(option) => handleSelectedCakes(option)}
                        />
                    </div>
                    <Button onClick={() => {
                        setShowModal(false)
                        handleSubmit()
                    }} className="w-100 mt-3">
                        Submit
                    </Button>
                </form>
            </Modal>
        </div>
    )
}

export default Discount