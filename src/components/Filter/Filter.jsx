import React from 'react';
import PropTypes from 'prop-types';
import css from 'components/Filter/Filter.module.css';

export const Filter = ({ filterValue, onChange }) => (
  <div className={css.filter}>
    <label className={css.filter__label}>Find contacts by name</label>
    <input
      className={css.filter__input}
      type="text"
      name="filter"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
      onChange={onChange}
      value={filterValue}
    />
  </div>
);

Filter.propTypes = {
  filterValue: PropTypes.string,
  onChange: PropTypes.func,
};
