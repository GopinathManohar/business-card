import { Button, Input, Space } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { AiOutlineSearch } from 'react-icons/ai';

export const filterFunction = (dataIndex: string, searchInput?: any): any => {

  const handleSearch = (
    confirm: (param?: FilterConfirmProps) => void,
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void, setSelectedKeys : any) => {
    clearFilters();
    handleSearch(confirm);
    setSelectedKeys([]);
  };

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e?.target?.value ? [e?.target?.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: 'block', textTransform: 'capitalize' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<AiOutlineSearch size={17} />}
            size="small"
            style={{ width: 90, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm, setSelectedKeys)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <AiOutlineSearch style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: any) => {
      return record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string)?.toLowerCase())
    }
    ,
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput?.current?.select(), 100);
      }
    },
    render: (text: any) =>
      text?.toString()
  }

}