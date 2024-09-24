import { Button, Col, DatePicker, Form, Row, Space } from 'antd';
import { AiOutlineClear, AiOutlineSearch } from 'react-icons/ai';
import { useContextHook } from '../../hooks/useContextHook';
import { IReport } from '../../model/CommonModel';
import { convertDateIntoMillis } from '../../utils/luxon';



const initialValues: IReport = {
	startDate: undefined,
	endDate: undefined,
	subClientId: undefined,
	isBookingDate: 1, 
    isPickupDate: 0,
	subAccountId: undefined,
}
interface IFilterComponent {
	onSearchClicked: (values: IReport) => void,
	onResetClicked?: () => void,
	isResetButton?: boolean,
	isFinanceManifest?: boolean
}

const DateFilterComponent = ({ onSearchClicked, onResetClicked, isResetButton = true, isFinanceManifest = false }: IFilterComponent) => {
	const [form] = Form.useForm();
	const { customerDetail } = useContextHook() || {};

	const onFilterClick = (values: any) => {
		const request = {
			...values,
			subClientId: customerDetail?.subClientId!,
			startDate: convertDateIntoMillis(values.startDate),
			endDate: convertDateIntoMillis(values.endDate),
			isBookingDate:1,
			subAccountId: customerDetail?.subClientId!,
		}
		onSearchClicked({ ...request });
	}

	const onReset = () => {
		form.resetFields();
		onResetClicked?.();
	};

	return (
		<>
			<Form
				name='filter'
				initialValues={initialValues}
				onFinish={onFilterClick}
				form={form}
				preserve={false}
				style={{ height: '7rem' }}
			>
				<Row gutter={8} justify={'start'} align='top' style={{ width: '80%', overflow: 'visible' }} wrap={false}>
					<Col span={4}>
						<Form.Item>
							<Form.Item name='startDate' label='Start Date' labelCol={{ span: 24 }}>
								<DatePicker allowClear format="DD/MM/YYYY" name='startDate' size={'middle'} style={{ width: '100%' }} />
							</Form.Item>
						</Form.Item>
					</Col>
					<Col span={4} >
						<Form.Item>
							<Form.Item name='endDate' label='End Date' labelCol={{ span: 24 }}>
								<DatePicker allowClear format="DD/MM/YYYY" name='endDate' size={'middle'} style={{ width: '100%' }} />
							</Form.Item>
						</Form.Item>
					</Col>
					<Space align='center' wrap={false} size={2} style={{ height: '8rem' }}>
						<Col>
							<Button data-args={'search'} htmlType="submit" >
								<AiOutlineSearch size={20}></AiOutlineSearch>
							</Button>
						</Col>
						{isResetButton ?
							<Col>
								<Button htmlType="button" onClick={onReset}>
									<AiOutlineClear size={20} />
								</Button>
							</Col>
							: null}
					</Space>
				</Row>
			</Form>
		</>
	)

};

export default DateFilterComponent;
