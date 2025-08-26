import eases from "eases";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";

function NumberEasing({
  className,
  currency = "",
  delayValue = 50,
  ease = "quintInOut",
  locale = "en-US",
  precision = 2,
  speed = 500,
  trail = false,
  useLocaleString = true,
  value,
  ...other
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(
    trail && !Number.isNaN(parseFloat(value))
      ? parseFloat(value).toFixed(precision > -1 ? precision : 0)
      : value
  );
  const timeoutRef = useRef(null);
  const delayTimeoutRef = useRef(null);
  const startAnimationTimeRef = useRef(null);

  useEffect(() => {
    // Only animate if value changes
    if (parseFloat(value) === parseFloat(previousValue)) return;

    setPreviousValue(displayValue);

    if (!window.isNaN(parseInt(delayValue, 10))) {
      delayTimeoutRef.current = setTimeout(() => {
        startAnimationTimeRef.current = new Date().getTime();
        updateNumber();
      }, delayValue);
    } else {
      startAnimationTimeRef.current = new Date().getTime();
      updateNumber();
    }

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(delayTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const updateNumber = () => {
    const now = new Date().getTime();
    const elapsedTime = Math.min(speed, now - startAnimationTimeRef.current);
    const progress = eases[ease](elapsedTime / speed);
    const currentDisplayValue =
      Math.round(
        ((value - previousValue) * progress + Number(previousValue)) *
          10 ** precision
      ) /
      10 ** precision;

    setDisplayValue(currentDisplayValue);
    if (elapsedTime < speed) {
      timeoutRef.current = setTimeout(updateNumber, 16);
    } else {
      setPreviousValue(value);
    }
  };

  let classes = "react-number-easing";
  if (className) {
    classes += ` ${className}`;
  }

  const opts = {};
  if (useLocaleString && currency) {
    opts.currency = currency;
    opts.style = "currency";
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <span {...other} className={classes}>
      {useLocaleString
        ? parseFloat(displayValue).toLocaleString(locale, opts)
        : trail
          ? Number(displayValue).toFixed(precision > -1 ? precision : 0)
          : Number(displayValue).toString()}
    </span>
  );
}

NumberEasing.propTypes = {
  currency: PropTypes.string,
  delayValue: PropTypes.number,
  ease: PropTypes.oneOf(Object.keys(eases)),
  locale: PropTypes.string,
  precision: PropTypes.number,
  speed: PropTypes.number,
  trail: PropTypes.bool,
  useLocaleString: PropTypes.bool,
  value: PropTypes.any.isRequired,
};


export default NumberEasing;
