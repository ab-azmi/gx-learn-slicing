import { useEffect, useState } from "react";
import Input from "./Input";
import Dropdown from 'react-bootstrap/Dropdown';
import { Options } from "@/types/wraper";

type Props = {
    value?: Options[];
    options: { value: string, label: string }[];
    onFetchOptions: (search: string) => void;
    onChange: (option: Options) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
}

const SelectSearch = ({
    options,
    onFetchOptions,
    value,
    onChange,
    label,
    required,
    placeholder = 'Search...',
}: Props) => {
    const [showdropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<Options[]>(value || []);
    const [search, setSearch] = useState('');
    const delay = 500;

    useEffect(() => {
        const timeout = setTimeout(() => {
            onFetchOptions(search);
        }, delay)

        return () => clearTimeout(timeout);
    }, [search])

    const handleSelect = (option: Options) => {
        onChange(option);

        const exists = selected.find((item) => item.value === option.value);
        if (exists) return;

        setSelected([...selected, option]);
    }

    const handleRemoveValue = (value: string) => {
        setSelected(selected.filter((item) => item.value !== value));
    }

    return (
        <div>
            <div className="position-relative vstack gap-2 align-items-start">
                {label && (
                    <label className="text-muted fs-xs">
                        {label}
                        {required && <span className="text-danger">*</span>}
                    </label>
                )}
                {selected.length > 0 && (
                    <div className="hstack flex-wrap gap-2">
                        {selected.map((item) => (
                            <div key={item.value} className="badge-md badge bg-primary" onClick={() => handleRemoveValue(item.value)}>
                                <span className="me-1">{item.label}</span>
                                <span style={{ cursor: 'pointer' }}>&times;</span>
                            </div>
                        ))}
                    </div>
                )}
                <Input
                    name="search"
                    type="text"
                    autocomplete="off"
                    placeholder={placeholder}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                    onChange={(e) => {
                        setShowDropdown(true);
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <Dropdown show={showdropdown} drop="up-centered">
                <Dropdown.Menu className="w-100">
                    {options.length > 0 ? (
                        options.map((option) => (
                            <Dropdown.Item
                                active={selected.find((item) => item.value === option.value) ? true : false}
                                as="button"
                                key={option.value}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(option);
                                }}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item disabled>
                            No data found
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default SelectSearch