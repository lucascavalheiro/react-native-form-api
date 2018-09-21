import { isNullOrEmpty } from '../../utils/string';

/**
 * Check if value is null, undefined or string empty
 * @returns if value is null, undefined or string empty return true, else return false
 */
export function isEmpty(value) {
  return isNullOrEmpty(value);
}

/**
 *
 */
export function isLabelFloating(value, isFocused) {
  return !isEmpty(value) || isFocused;
}
