
type Props = {
    checked: boolean;
    onChange: () => void;
    label?: string;
}
const Switch = ({
    checked,
    onChange,
    label
}: Props) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider"></span>
            {label}
        </label>
    )
}

export default Switch