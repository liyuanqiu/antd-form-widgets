import React, { ReactNode, useState, useEffect, useMemo } from 'react';
import { Select as AntdSelect } from 'antd';
import {
  SelectProps as AntdSelectProps,
  SelectValue as AntdSelectValue,
} from 'antd/lib/select';
import { Key } from 'rc-select/lib/interface/generator';

export interface Option {
  key?: string;
  label?: ReactNode;
  value: Key;
}

export type OptionsFetcher = (keyword?: string) => Option[] | Promise<Option[]>;

interface InternalSelectProps {
  fetchOptions: OptionsFetcher;
}

export type SelectProps<
  ValueType extends AntdSelectValue = AntdSelectValue
> = InternalSelectProps & AntdSelectProps<ValueType>;

function useDiscardedPropsWarning(props: { [k: string]: unknown }) {
  useEffect(() => {
    Object.entries(props).forEach(([k, v]) => {
      if (v !== undefined) {
        // eslint-disable-next-line no-console
        console.error(
          `The prop '${k}' was discarded in antd-form-widgets/Select, do not use it since it'll take no effect.`
        );
      }
    });
  }, [props]);
}

/**
 * All data loaded from remote
 * Filter locally
 */
export function Select<ValueType extends AntdSelectValue = AntdSelectValue>({
  // props from InternalSelectProps
  fetchOptions,
  // discarded props
  loading,
  optionFilterProp,
  // rest props for antd select
  ...antdSelectProps
}: SelectProps<ValueType>) {
  const discardedProps = useMemo(() => ({ loading, optionFilterProp }), [
    loading,
    optionFilterProp,
  ]);
  useDiscardedPropsWarning(discardedProps);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    const f = fetchOptions();
    if (f instanceof Promise) {
      setFetching(true);
      f.then(setOptions)
        // eslint-disable-next-line no-console
        .catch(e => console.trace(e))
        .finally(() => setFetching(false));
    } else {
      setOptions(f);
    }
  }, [fetchOptions]);
  return (
    <AntdSelect<ValueType>
      {...antdSelectProps}
      loading={fetching}
      optionFilterProp="children"
    >
      {options.map(({ label, value, key }) => (
        <AntdSelect.Option key={key ?? `${value}`} value={value}>
          {label ?? value}
        </AntdSelect.Option>
      ))}
    </AntdSelect>
  );
}
