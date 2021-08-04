import React from 'react';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import styles from './styles.module.scss';

const itemToString = item => (item ? item : '');

const DownshiftInput = ({ input, meta, placeholder, items, ...rest }) => (
  <Downshift
    {...input}
    onInputValueChange={inputValue => {
      input.onChange(inputValue);
    }}
    itemToString={itemToString}
    selectedItem={input.value}
  >
    {({ getInputProps, getItemProps, isOpen, inputValue }) => {
      const filteredItems = matchSorter(items, inputValue);
      return (
        <div className={styles.downshift}>
          <input
            {...getInputProps({
              name: input.name,
              placeholder,
            })}
          />
          {isOpen && !!filteredItems.length && (
            <div className={styles.downshiftList}>
              {filteredItems.map(value => (
                <div {...getItemProps({ key: value, item: value })}>
                  {value}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }}
  </Downshift>
);

export default DownshiftInput;
