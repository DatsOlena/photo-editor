import { useState, type ChangeEvent } from 'react'

import './App.css'
import Slider from './components/Slider'
import SidebarItem from './components/SidebarItem'
import ImagePlaceholder from './components/ImagePlaceholder'

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturate',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

type FilterOption = {
  name: string
  property: string
  value: number
  range: {
    min: number
    max: number
  }
  unit: string
}

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState<FilterOption[]>(DEFAULT_OPTIONS)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setImageUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }

  function handleRemoveImage() {
    setImageUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }

  const selectedOption = options[selectedOptionIndex]

  function handleSliderChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = Number(event.target.value) as number
    setOptions(prevOptions =>
      prevOptions.map((option, index) =>
        index !== selectedOptionIndex
          ? option
          : { ...option, value: nextValue }
      )
    )
  }

  function getImageStyles() {
    const filters = options.map(option =>
      `${option.property}(${option.value}${option.unit})`
    )
    return { filter: filters.join(' ') }
  }

  const filtersAtDefault = options.every(
    (opt, i) => opt.value === DEFAULT_OPTIONS[i].value
  )
  const resetFiltersDisabled = imageUrl === null || filtersAtDefault

  const isDisabled =  imageUrl === null

  return (
    <div className='container'>
      <ImagePlaceholder
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        style={getImageStyles()}
      />
      <div className="sidebar">
        {options.map((option, index) => (
          <SidebarItem
            key={index}
            name={option.name}
            active={selectedOptionIndex === index}
            onClick={() => setSelectedOptionIndex(index)}
          />
        ))}
      </div>
      <div className="slider-strip">
        <Slider
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
          disabled={isDisabled}
        />
        <button
          type="button"
          className="reset-filters-button"
          disabled={resetFiltersDisabled}
          onClick={() => setOptions(DEFAULT_OPTIONS)}
        >
          Reset filters
        </button>
      </div>
    </div>
  )
}

export default App
