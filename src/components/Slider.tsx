type SliderProps = {
    min: number
    max: number
    value: number
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    disabled: boolean
}

export default function Slider({ min, max, value, handleChange, disabled }: SliderProps) {
    return (
        <div className='slider-container'>
            <input type="range"
                min={min} max={max}
                value={value}
                onChange={handleChange}
                className='slider'
                disabled={disabled}
            />
        </div>
    )
}