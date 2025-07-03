"use client"
import React, { useState, ChangeEvent, FocusEvent } from 'react';

interface FourDigitInputProps {
  /**
   * The current value of the 4-digit input.
   * This should be a string representing the year or any 4-digit number.
   */
  value: string;
  /**
   * Callback function to update the parent component's state with the validated 4-digit string.
   * If the input is invalid (not exactly 4 digits or contains non-numeric characters),
   * this function will be called with an empty string.
   */
  onChange: (newValue: string) => void;
}

/**
 * A React component for a 4-digit numeric input with validation and Tailwind CSS styling.
 *
 * @param {FourDigitInputProps} props - The props for the component.
 * @returns {JSX.Element} The rendered input component.
 */
const FourDigitInput: React.FC<FourDigitInputProps> = ({ value, onChange }) => {
  // Internal state to manage the input field's current value as the user types.
  const [inputValue, setInputValue] = useState<string>(value);

  /**
   * Handles changes to the input field.
   * It filters out non-digit characters and limits the input to 4 characters.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Remove any non-digit characters and take only the first 4 digits.
    const filteredValue = rawValue.replace(/\D/g, '').slice(0, 4);
    setInputValue(filteredValue);
  };

  /**
   * Handles the blur event (when the input loses focus).
   * This is where the final validation occurs.
   */
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    // Validate if the current value is exactly 4 digits and consists only of numbers.
    if (currentValue.length === 4 && /^\d{4}$/.test(currentValue)) {
      // If valid, call the parent's onChange with the validated string.
      onChange(currentValue);
    } else {
      // If invalid, call the parent's onChange with an empty string.
      onChange('');
      // Optionally, clear the input field visually if it's invalid
      setInputValue('');
    }
  };

  return (
    <input
      type="text" // Use text type to allow custom filtering
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="YYYY" // Placeholder text for user guidance
      maxLength={4} // HTML attribute to limit input length
      inputMode="numeric" // Suggests numeric keyboard on mobile devices
      pattern="\d{4}" // HTML pattern for basic client-side validation (though JS handles it more robustly)
      aria-label="Enter a four digit number" // Accessibility
      className="
        py-3 px-4      
        text-lg        
        rounded-lg     
        border-2       
        border-blue-500
        outline-none   
        shadow-lg      
        transition-all 
        duration-300   
        ease-in-out    
        w-32           
        text-center    
        font-mono      
        text-gray-200      
        bg-black      
        font-bold         

        
        hover:border-blue-700 
        focus:border-blue-700 
        focus:shadow-xl      
      "
    />
  );
};

export default FourDigitInput;
