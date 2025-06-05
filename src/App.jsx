import { useState } from 'react';
import './App.css';

const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'password', label: 'Password', type: 'password'},
  { name: 'email', label: 'Email', type: 'email'},
  { name: 'age', label: 'Age', type: 'number' },
  { name: 'birthday', label: 'Birthday', type: 'date' },
  { name: 'birthMonth', label: 'Birth Month', type: 'month' },
  { name: 'birthYear', label: 'Birth Year', type: 'number' },
  { name: 'phone', label: 'Phone', type: 'number' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'zip', label: 'Zip Code', type: 'number' },
  { name: 'country', label: 'Country', type: 'text' },
  { name: 'website', label: 'Website', type: 'url' },
  { name: 'color', label: 'Favorite Color', type: 'color' },
  { name: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male'] },
  { name: 'favoriteFood', label: 'Favorite Food', type: 'text' },
  { name: 'hobbies', label: 'Hobbies', type: 'text' },
  { name: 'FavoriteBook', label: 'Favorite Book', type: 'text' },
  { name: 'FavoriteMovie', label: 'Favorite Movie', type: 'text' },
];

function App() {
  const initialFormData = {};
  fields.forEach(field => {
    initialFormData[field.name] = '';
  });

  const [formData, setFormData] = useState(initialFormData);
  const [shown, setShown] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    fields.forEach(field => {
      const value = formData[field.name];

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = `Invalid email format.`;
        }
      }

      if (field.name === 'phone'  ) {
        const value = formData[field.name];
        if (value && value.length !== 11) 
          newErrors[field.name] = `${field.label} must be exactly 11 digits.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formatted = Object.entries(formData)
        .map(([key, val]) => `${key}: ${val}`)
        .join('\n');
      setShown(formatted);
    } else {
      setShown('');  
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label htmlFor={field.name} style={{ width: '150px' }}>
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {field.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </div>
            {errors[field.name] && (
              <p style={{ color: 'red', marginLeft: '10px' }}>
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        <button type="submit" style={{ margin: '20px', marginLeft: '30%' }}>
          Print Info
        </button>
      </form>

      <textarea
        style={{
          display: 'block',
          width: '100%',
          height: '200px',
          marginTop: '20px',
        }}
        value={shown}
        readOnly
      />
    </>
  );
}

export default App;

// arrays used to define all fields dynamically.
//  one generic validation function instead of writing 20 different ones.
//  map() to generate all inputs from a fields array.