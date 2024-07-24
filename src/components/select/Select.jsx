import { useRef, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import styles from "./Select.module.css";

export const Select = ({ title, options, defaultValue, onChange }) => {
  const [selectValue, setSelectValue] = useState(defaultValue);
  const titleRef = useRef(null);

  return (
    <div className={styles.select}>
      <p ref={titleRef} className={styles.title}>{title}</p>
      <select
        id="select"
        defaultValue={defaultValue}
        onChange={(e) => { setSelectValue(e.target.value); onChange(e) }}>
        {defaultValue !== "" && (
          <option key={defaultValue} value={defaultValue} disabled>
            {defaultValue}
          </option>
        )}
        {options?.map((curElm) => {
          return (
            <option key={curElm} value={curElm}>
              {curElm}
            </option>
          )
        })}
      </select>
      <p className={styles.value}>{selectValue} <IoChevronDownSharp className={styles.icon} /></p>
    </div>
  )
}
