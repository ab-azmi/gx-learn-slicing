
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
        <div className="hstack gap-2">
            <label className="switch hstack">
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span className="slider"></span>
            </label>
            {label && <span>{label}</span>}
        </div>
    )
}

export default Switch