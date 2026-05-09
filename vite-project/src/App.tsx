import { useState } from 'react'

import './App.css'
import Slider from './components/Slider'
import SidebarItem from './components/SidebarItem'

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

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)

  const selectedOption = options[selectedOptionIndex]

  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return {
          ...option,
          value: target.value
        }
      })
    })

  }
  console.log(options);

  function getImageStyles() {
    const filters = options.map(option =>
      `${option.property}(${option.value}${option.unit})`
    )
    return { filter: filters.join(' ') }
  }

  const styles = getImageStyles();
  console.log(styles);

  return (
    <div className='container'>
      <div
        className="main-image"
        style={getImageStyles()}
      />
      <div className="sidebar">
        {options.map((option, index) =>
          <SidebarItem key={index} name={option.name} active={selectedOptionIndex === index}
            handleClick={() => setSelectedOptionIndex(index)}
          />
        )
        }
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />

      <button onClick={() => setOptions(DEFAULT_OPTIONS)}>Reset</button>
    </div>
  )
}

export default App
