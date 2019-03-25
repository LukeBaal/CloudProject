import { useState } from 'react';

export default function useCheckInput(initialValue) {
  const [checked, setChecked] = useState(initialValue);

  function handleChange(e) {
    setChecked(e.target.checked);
  }

  return {
    checked,
    onChange: handleChange
  };
}
