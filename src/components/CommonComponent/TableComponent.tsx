import { Button, Row, Space, Table } from 'antd';
import Pagination from 'antd/es/pagination';
import { useEffect, useRef, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import styled from 'styled-components';
import { ITable } from '../../model/TableModel';
import { NAV_HEADER_HEIGHT, TABLE_HEADER_HEIGHT } from '../../utils/common';
import { getUniqueId } from '../../common/common';


const TableDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const TableComponent = ({
    columns,
    data,
    title,
    isLoading = false,
    onPaginationChange,
    onShowSizeChange,
    onRowSelect,
    scroll = { y: 510, x: 1500 },
    rowSelection,
    showRowSelection = false,
    total = 0,
    current,
    children,
    rowKey = 'id',
    isRefresh = true,
    onRefreshHandle
}: ITable) => {
    const [tableHeight, setTableHeight] = useState(650);
    // ref is the Table ref.
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref?.current;
        const { top } = node?.getBoundingClientRect()! || {};
        setTableHeight((window.innerHeight - top - (NAV_HEADER_HEIGHT + TABLE_HEADER_HEIGHT)) || 510);
    }, [ref]);


    const getRowKey = (record: any) => {
        return(record[rowKey] ?? getUniqueId())
    }

    return (
        <TableDiv>
            <Row justify='end' >
                <Space >
                    {children}
                    {isRefresh    ?
                        <Button type='default' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onRefreshHandle}>
                            <BiRefresh size={17}></BiRefresh>
                        </Button>
                        : null}
                </Space>
            </Row>
            <Table
                sticky
                rowKey={(record) => getRowKey(record)}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => onRowSelect && onRowSelect(record, rowIndex), // click row
                    };
                }}
                rowSelection={showRowSelection ? {
                    type: 'checkbox',
                    ...rowSelection,
                } : undefined}
                columns={columns}
                dataSource={data}
                loading={isLoading}
                size={'middle'}
                scroll={{ ...scroll, y: tableHeight }}
                pagination={false}
            />
            <Pagination
                onChange={onPaginationChange}
                total={total}
                showSizeChanger={false}
                hideOnSinglePage
                showTitle={false}
                // pageSizeOptions={["10", "15", "20", '25']}
                onShowSizeChange={onShowSizeChange}
                current={current}
                size={'default'}
            />
        </TableDiv>
    )
}

export default TableComponent