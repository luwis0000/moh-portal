import React from "react";

export default function InputField({ label, value, onChange, type = "text", placeholder, id }) {
  return (
    <label className="input-label" htmlFor={id}>
      <span className="input-label-text">{label}</span>
      <input id={id} className="input-field" value={value} onChange={onChange} type={type} placeholder={placeholder} />
    </label>
  );
}
