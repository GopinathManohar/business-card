import { Button, Dropdown, InputRef, Menu, Space } from 'antd';
import { PaginationProps } from 'antd/es/pagination';
import type { ColumnType } from 'antd/es/table';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import * as XLSX from 'xlsx';
import { ColumnsType } from 'antd/lib/table';
import { filterFunction } from '../../common/SearchFilterComponent';
import ContactUpload, { Contact } from './ContactBulkUpload';
import { LiaIdCard } from "react-icons/lia";



const TableComponentLoadable = React.lazy(() => import('../CommonComponent/TableComponent'))

interface IShipper {
  createAt: number,
  createdBy: string,
  status: string,
  id: number,
  name: string,
  mobileNumber1: string,
  address: string,
  cityId: number,
  city: string,
  countryId: number,
  country: string,
  isoda: boolean,
  odaCityId: number,
  odaCityName: string,
  customerSubAccountId: number,
  customerSubAccount: string,
  createdById: number,
  statusId: number
}

const sampleData: Contact[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    position: 'Manager',
    mobile: '1234567890',
    email: 'john.doe@example.com',
    phone: '0987654321',
    status: 'Active',
    link: 'http://example.com/johndoe',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    position: 'Developer',
    mobile: '2345678901',
    email: 'jane.smith@example.com',
    phone: '9876543210',
    status: 'Inactive',
    link: 'http://example.com/janesmith',
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    position: 'Designer',
    mobile: '3456789012',
    email: 'alice.johnson@example.com',
    phone: '8765432109',
    status: 'Active',
    link: 'http://example.com/alicejohnson',
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Brown',
    position: 'Tester',
    mobile: '4567890123',
    email: 'bob.brown@example.com',
    phone: '7654321098',
    status: 'Active',
    link: 'http://example.com/bobbrown',
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Davis',
    position: 'Analyst',
    mobile: '5678901234',
    email: 'charlie.davis@example.com',
    phone: '6543210987',
    status: 'Inactive',
    link: 'http://example.com/charliedavis',
  },
];

const EmployeeTableComponent = () => {

  const [pageNumber, setPageNumber] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { promiseInProgress } = usePromiseTracker({ area: 'account-details-area' });
  const { promiseInProgress: deleteConsigneeProgress } = usePromiseTracker({ area: 'delete-consignee-area' });
  const [currentRow, setCurrentRow] = useState<IShipper | undefined>();
  const searchInput = useRef<InputRef>(null);
  const [isConfirmationModal, setIsConfirmationModal] = useState<boolean>(false);
  const getColumnSearchProps = (dataIndex: any): ColumnType<IShipper> => filterFunction(dataIndex, searchInput);
  const [data, setData] = useState<Contact[]>([]);

  const columns: ColumnsType<IShipper> = [
    {
      title: 'S No',
      width: 50,
      render: (_, __, index) => {
        return index + 1;
      }
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 100,
      ...getColumnSearchProps('firstName')
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 100,
      ...getColumnSearchProps('lastName')
    },
    {
      title: 'Position/Role',
      dataIndex: 'position',
      key: 'position',
      width: 100,
      ...getColumnSearchProps('position')
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 100,
      ...getColumnSearchProps('mobile')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      ...getColumnSearchProps('status')
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 100,
      render: (link: string) => (
        <Button
          type="link" // Use 'link' type for a cleaner look
          icon={<LiaIdCard />} // Card icon inside the button
          onClick={() => window.open(link, '_blank')} // Redirect to the link
        />
      ),
    },
    // Uncomment if action is needed
    // {
    //   title: 'Action',
    //   key: 'action',
    //   fixed: 'right',
    //   width: 100,
    //   render: (row: IShipper) => {
    //     return (
    //       <Space size="middle">
    //         <Dropdown.Button overlay={<MenuList row={row} setIsConfirmationModal={setIsConfirmationModal} setCurrentRow={setCurrentRow} />}></Dropdown.Button>
    //       </Space>
    //     )
    //   }
    // }
  ];


  const onPaginationChange: PaginationProps['onChange'] = (page: number) => {
    setPageNumber(page - 1)
    setCurrentPageNumber(page)
  }
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current: number, pageSize: number) => {
    setPageSize(pageSize)
  }

  const handleDownload = () => {
    const data = [
      ["firstName", "lastName", "position", "mobile", "email", "phone"]
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "sheet1");

    // Write the workbook to an array buffer
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the array buffer
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    // Create a link element
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample.xlsx'; // Filename to download

    // Append the link to the body and trigger click
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the link
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Release memory
  };


  return (
    <>
      <TableComponentLoadable
        columns={columns}
        scroll={{ y: 510, x: 10 }}
        data={sampleData}
        isLoading={promiseInProgress || deleteConsigneeProgress}
        rowKey='id'
        onPaginationChange={onPaginationChange}
        onShowSizeChange={onShowSizeChange}
        current={currentPageNumber}
        showRowSelection={true}
      // onRefreshHandle={onResetClicked}
      >
        <>
          <Button onClick={handleDownload} >Sample Excel</Button>
          <ContactUpload setData={setData} />
          {/* <Button  >Upload by excel</Button> */}
          <Button>Generate Card</Button>
        </>
      </TableComponentLoadable>

    </>
  )
}

EmployeeTableComponent.propTypes = {}
export default EmployeeTableComponent
