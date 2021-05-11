import { CSSProperties, ReactElement } from 'react';
import { GroupedOptionsType, OptionsType, OptionTypeBase } from 'react-select';

export type PropType = number | string;

export interface IColumn<T extends DefaultRowProps> {
  title: string;
  delimiter?: string;
  cssProps?: CSSProperties;
  formatter?: (row: IRow<T>) => string;
  orderable?: boolean;
  id?: PropType;
  props: PropType[];
  filterRef?: React.MutableRefObject<HTMLInputElement | undefined>;
  type?:
    | 'currency'
    | 'number'
    | 'date'
    | 'string'
    | 'boolean'
    | 'datetime'
    | 'time';
  trunc?: number;
  renderItem?: (row: IRow<T>) => string | ReactElement;
}

export interface DefaultRowProps {
  id?: string | number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IRow<T extends DefaultRowProps = any> = T;

export type IAction<T extends DefaultRowProps> = {
  onClick: (
    row: IRow<T>[],
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
  renderItem: () => string | ReactElement;
};
export type IRowAction<T extends DefaultRowProps> = {
  onClick: (
    row: IRow<T>,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
  renderItem: (row?: IRow<T>) => string | ReactElement;
};

export interface ITableProps<T extends DefaultRowProps> {
  columns: Array<IColumn<T>>;
  rowActions?: Array<IRowAction<T>>;
  rows: Array<IRow<T>>;
  actions?: Array<IAction<T>>;
  loading?: boolean;
  defaultSort?: string;
  selectBox?: boolean;
  hidePagination?: boolean;
  paginationOptions?:
    | GroupedOptionsType<OptionTypeBase>
    | OptionsType<OptionTypeBase>
    | undefined;
  defaultPage?: number;
  defaultNumberOfRows?: number;
  onDeleteRow?: (
    row: IRow<T>,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onEditRow?: (
    row: IRow<T>,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface TableCellProps<T extends DefaultRowProps> {
  column: IColumn<T>;
  row: IRow<T>;
}
