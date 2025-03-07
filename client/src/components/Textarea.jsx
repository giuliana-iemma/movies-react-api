import PropTypes from "prop-types";
import { forwardRef } from "react";

const Textarea = forwardRef(
  ({ label, maxLength = 100, name, placeholder, ...moreProps}, 
    ref
  ) => {
    return (
      <>
        {label && <label className="form-label" htmlFor={name}>{label}</label>}

        <textarea
          ref={ref}
          id={name}
          name={name}
          maxLength={maxLength}
          placeholder={placeholder}
          {...moreProps}
        ></textarea>
      </>
    );
  }
);

Textarea.displayName = "Textarea";


Textarea.propTypes = {
  label: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export { Textarea };
