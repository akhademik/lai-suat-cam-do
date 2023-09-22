import { selected_type } from '../../routes/store';

export const handle_select = (e: Event) => {
  const _target = e.currentTarget as HTMLInputElement;
  const _value = _target.value;
  selected_type.set(_value);
};
