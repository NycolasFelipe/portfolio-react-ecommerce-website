import { useEffect } from "react";

/**
 * This custom React hook detects clicks outside of a providade reference
 * element. It utilizes the `useEffect` hook to manage the event listener
 * and cleanup.
 * 
 * @param {object} ref A React ref object that points to the element for which
 * you want to detect outside clicks.
 * @param {Function} setState A function used to update the state of a component
 * using the detected outside click. This function typically takes a boolean value
 * (usually `false`) to indicate a click outside the reference element.
 * @returns {void}
 * 
 * @example
 * Usage in a React Component:
 * ```
 * import React, { useRef, useState } from 'react';
 * import useOutsideClick from './useOutsideClick';
 * 
 * function MyComponent() {
 *   const dropdownRef = useRef(null);
 *   const [isOpen, setIsOpen] = useState(false);
 * 
 *   useOutsideClick(dropdownRef, setIsOpen); // Call the hook
 * 
 *   return (
 *     <div ref={dropdownRef}>
 *       {isOpen && <div>Dropdown content is visible</div>}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @author Nycolas Felipe
 */

const useOutsideClick = (ref, setState) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideClick;