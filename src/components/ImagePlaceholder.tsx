import { useRef, type ChangeEvent, type CSSProperties } from 'react'

type ImagePlaceholderProps = {
    imageUrl: string | null
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void
    onRemoveImage: () => void
    style: CSSProperties
}

export default function ImagePlaceholder({
    imageUrl,
    handleImageChange,
    onRemoveImage,
    style
}: ImagePlaceholderProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div className="image-placeholder-container">

            {imageUrl ? (
                <>
                    <div className="image-placeholder" style={style}>
                        <img className="image-placeholder-image" src={imageUrl} alt="Image" />
                    </div>
                    <button
                        type="button"
                        className="image-placeholder-remove"
                        onClick={() => {
                            onRemoveImage()
                            inputRef.current && (inputRef.current.value = '')
                        }}
                    >
                       X
                    </button>
                </>
            ) : (
                <button
                    type="button"
                    className="image-placeholder-button"
                    onClick={() => inputRef.current?.click()}
                >
                    Upload Image
                </button>
            )}

            <input
                ref={inputRef}
                className="image-placeholder-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
        </div>
    )
}
