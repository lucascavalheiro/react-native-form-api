import { isNullOrEmpty } from '../../utils/string';

/**
 *
 */
isEmpty = value => {
  return isNullOrEmpty(value);
};

/**
 *
 */
export function isLabelFloating(value, isFocused) {
  return !isEmpty(value) || isFocused;
}
