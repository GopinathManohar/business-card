import { ColumnsType } from "antd/lib/table";
import { RowProps } from "antd";

interface IScroll {
    x: number,
    y: number
}
export interface ITable {
    columns: ColumnsType<any>,
    data: Array<any>,
    title?: string,
    isLoading: boolean,
    id?: string,
    rowKey?:string,
    scroll?: IScroll,
    showRowSelection?: boolean,
    isRefresh?: boolean,
    total?: number,
    current?: number,
    rowSelection?: {
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
    },
    onPaginationChange?: (page: number, pageSize: number) => void
    onShowSizeChange?: (page: number, pageSize: number) => void
    onRowSelect?: (record: RowProps, rowIndex?: number) => void
    rowSelected?: boolean,
    children?: React.ReactNode,
    onRefreshHandle?: () => void,
}