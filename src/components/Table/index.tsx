/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState } from 'react';

import { BiLoaderAlt } from 'react-icons/bi';
import {
  Container,
  ActionsContainer,
  LoadingContainer,
  SortButton,
} from './styles';

import TableCode from '../../assets/svg/table-code.svg';
import TableProfile from '../../assets/svg/table-profile.svg';
import TableDeleteItem from '../../assets/svg/table-delete-item.svg';
import TableEditItem from '../../assets/svg/table-edit-item.svg';
import {
  IColumn,
  ITableProps,
  IRow,
  IRowAction,
  DefaultRowProps,
} from './types';
import TableSelectBox from './SelectBox';
import TableCell from './TableCell';
import PaginationComponent from '../PaginationComponentTest';

function Table<T extends DefaultRowProps>({
  columns,
  rowActions,
  actions,
  onEditRow,
  paginationOptions,
  onDeleteRow,
  defaultSort,
  defaultNumberOfRows,
  hidePagination = false,
  rows,
  selectBox = false,
  loading,
  defaultPage = 0,
}: React.PropsWithChildren<ITableProps<T>>): JSX.Element {
  const [page, setPage] = useState<number>(defaultPage);
  const [sortBy, setSortBy] = useState<string | undefined>(defaultSort);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<IRow<T>[]>([] as IRow<T>[]);

  const onChangeRowsPerPage = useCallback((value: number) => {
    setRowsPerPage(value);
    setPage(0);
    setSelectedRows([]);
  }, []);

  const onChangeSort = useCallback(
    (column: IColumn<T>) => {
      const newSortAtribute = column.props[0].toString();
      if (newSortAtribute === sortBy) {
        setSortAscending(oldState => !oldState);
      } else {
        setSortAscending(true);
      }
      setSortBy(newSortAtribute);
    },
    [sortBy]
  );

  const dynamicSort = useCallback((prop: string) => {
    let sortOrder = 1;
    let property = prop;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (a: any, b: any) => {
      let result = 0;
      const valueA = a[property] ? a[property] : 0;
      const valueB = b[property] ? b[property] : 0;
      if (valueA < valueB) {
        result = -1;
      }
      if (valueA > valueB) {
        result = 1;
      }
      return result * sortOrder;
    };
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setSelectedRows([]);
  };

  const handleSelect = useCallback(
    (row: IRow<T>) => {
      const index = selectedRows.findIndex(row_ => row_ === row);
      if (index >= 0) {
        selectedRows.splice(index, 1);
        setSelectedRows(selectedRows);
      } else {
        setSelectedRows([...selectedRows, row]);
      }
    },
    [selectedRows]
  );

  if (rows.length === 0) {
    return <p>Não foi localizado nenhum registro.</p>;
  }

  return (
    <>
      <ActionsContainer>
        {actions &&
          actions.map((action, index) => (
            <button
              key={String(index)}
              type="button"
              onClick={event => action.onClick(selectedRows, event)}
            >
              {action.renderItem()}
            </button>
          ))}
      </ActionsContainer>
      {!loading && rows.length !== 0 ? (
        <Container>
          <table className="table-box">
            <thead>
              <tr>
                {selectBox && (
                  <th>
                    <></>
                  </th>
                )}
                {columns?.map(column => {
                  return (
                    <th key={column.title}>
                      <div className="title">
                        {column.orderable ? (
                          <SortButton
                            type="button"
                            onClick={() => onChangeSort(column)}
                            className="icon"
                          >
                            <h1>{column.title}</h1>
                            <img
                              style={{
                                transform: `rotate(${
                                  sortAscending && column.props[0] === sortBy
                                    ? '180deg'
                                    : 0
                                })`,
                              }}
                              src={
                                column.props[0] === sortBy
                                  ? TableProfile
                                  : TableCode
                              }
                              alt={column.title}
                            />
                          </SortButton>
                        ) : (
                          <h1>{column.title}</h1>
                        )}
                      </div>
                    </th>
                  );
                })}
                {rowActions?.length || onEditRow || onDeleteRow ? (
                  <th>
                    <div className="title">
                      <h1>Ações</h1>
                    </div>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {(!hidePagination
                ? rows
                    .sort(dynamicSort(`${sortAscending ? '-' : ''}${sortBy}`))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows.sort(dynamicSort(`${sortAscending ? '-' : ''}${sortBy}`))
              ).map((row, index) => (
                <tr tabIndex={index} key={Date.now() + index + Math.random()}>
                  {selectBox && (
                    <td>
                      <TableSelectBox
                        select={selectedRows.includes(row)}
                        onClick={() => handleSelect(row)}
                      />
                    </td>
                  )}
                  {columns.map((column, indexColumn) => (
                    <TableCell
                      key={`${String(indexColumn)}${index}`}
                      column={column}
                      row={row}
                    />
                  ))}
                  {(!!onEditRow ||
                    !!onDeleteRow ||
                    (!!rowActions && !!rowActions.length)) && (
                    <td>
                      <div className="row-actions-item">
                        {onEditRow && (
                          <button
                            type="button"
                            onClick={event => onEditRow(row, event)}
                            className="action"
                          >
                            <p className="hover-item">Editar</p>
                            <img src={TableEditItem} alt="" />
                          </button>
                        )}
                        {onDeleteRow && (
                          <button
                            type="button"
                            onClick={event => onDeleteRow(row, event)}
                            className="action"
                          >
                            <p className="hover-item">Excluir</p>
                            <img src={TableDeleteItem} alt="" />
                          </button>
                        )}
                        {rowActions
                          ? rowActions.map((action: IRowAction<T>) => (
                              <button
                                key={`${Math.random() + index}`}
                                type="button"
                                onClick={event => action.onClick(row, event)}
                                className="action"
                              >
                                {action.renderItem(row)}
                              </button>
                            ))
                          : null}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      ) : (
        <LoadingContainer>
          <BiLoaderAlt size={48} color="#6993FF" />
          <p>Carregando...</p>
        </LoadingContainer>
      )}

      {!loading && !hidePagination ? (
        <div className="pagination-box">
          <PaginationComponent
            count={rows.length}
            page={page}
            defaultNumberOfRows={
              defaultNumberOfRows ||
              (!!paginationOptions && paginationOptions?.length
                ? paginationOptions[0].label
                : 5)
            }
            options={
              paginationOptions || [
                {
                  label: 3,
                  value: 3,
                },
                {
                  label: 5,
                  value: 5,
                },
                {
                  label: 10,
                  value: 10,
                },
              ]
            }
            onChangeRowsPerPage={onChangeRowsPerPage}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      ) : null}
    </>
  );
}

export default Table;
