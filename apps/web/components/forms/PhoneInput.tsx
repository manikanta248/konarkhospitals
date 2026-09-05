"use client";

import { useState } from "react";

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export function PhoneInput({ className }: { className: string }) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const isValid = INDIAN_MOBILE_REGEX.test(value);
  const showError = touched && value.length > 0 && !isValid;

  return (
    <div>
      <input
        name="phone"
        required
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        maxLength={10}
        pattern="[6-9][0-9]{9}"
        title="Enter a valid 10-digit mobile number"
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 10))}
        onBlur={() => setTouched(true)}
        className={`${className} ${showError ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
        placeholder="10-digit mobile number"
        aria-invalid={showError}
      />
      {showError && <p className="mt-1 text-xs text-red-600">Enter a valid 10-digit mobile number</p>}
    </div>
  );
}
