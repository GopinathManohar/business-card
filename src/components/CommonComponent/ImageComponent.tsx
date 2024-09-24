import { Col, Row, Space } from "antd";
import { useWatch } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import React, { useCallback } from "react";
import { AiOutlineFileJpg, AiOutlineFilePdf } from "react-icons/ai";
import { trackPromise } from "react-promise-tracker";
import { IBookingState } from "../../model/BookingModel";
import { ICommonState } from "../../model/CommonModel";
// import { useBookingStore } from "../../stores/BookingStore";
import { useCommonStore } from "../../stores/CommonStore";
import { LIFE_SCIENCE, fileFormat, isNotEmptyObject } from "../../utils/common";


const ImageChildComponent = ({ list }: { list: unknown[] | unknown }) => {

	const DownloadFilesAction = useCommonStore(state => state.DownloadFilesAction);
	const productId = (useWatch('productId'));
	// const accountDetailList = useBookingStore((state: IBookingState) => state?.accountDetailList);

	const DownloadFilesHandler = useCallback(
		(id: number, fileType: string, fileFormat: string) => {
			trackPromise(DownloadFilesAction(id, fileType, fileFormat, false), 'download-file-area');
		},
		[DownloadFilesAction],
	);

	const fileImage: { [key: string]: JSX.Element } = {
		pdf: <AiOutlineFilePdf size={30} />,
		jpeg: <AiOutlineFileJpg size={30} />,
		png: <AiOutlineFileJpg size={30} />
	}

	const onFileDownloadHandler = useCallback((item: any) => {
		DownloadFilesHandler(item?.id, item?.fileType, fileFormat[item?.fileFormat]);
	}, [DownloadFilesHandler]);

	return (
		<>
			{
				Array.isArray(list) ? list.map((item: { id: number, fileName: string, fileFormat: string }) => {
					return (
						<React.Fragment key={item?.id} >
							<Row gutter={[30, 30]} justify="space-between" wrap>
								<Col span={24} className="pointer" onClick={() => onFileDownloadHandler(item)}>
									<div className={'pointer'} title={item?.fileName} >
										{fileImage[item?.fileFormat]}
									</div>
								</Col>
							</Row>
						</React.Fragment>
					)
				}) : null}

		</>
	)
}
const ImageRenderComponent = ({ list = [], label = '' }: { list: unknown[] | undefined | unknown, label: string | undefined }) => {
	return (
		<>
			{
				(Array.isArray(list) && list.length > 0) ?
					<>
						<Row wrap justify="start">
							<Col span={24}>
								<Title type="secondary" level={5} underline>{label}</Title>
							</Col>
							<ImageChildComponent list={list} />
						</Row>
					</>
					: null
			}
		</>

	)
}
const ImageComponent = () => {
	const files = useCommonStore((state: ICommonState) => state?.operationFiles);

	return (
		<>
			<Space wrap direction='vertical' size={[20, 20]}>
				{isNotEmptyObject(files) ? Object.entries(files).map(([key, value = []]) => {
					return (
						<React.Fragment key={key}>
							<ImageRenderComponent list={value} label={Array.isArray(value) ? value.at(0)?.fileType : ''} />
						</React.Fragment>
					)
				}) : null}
			</Space>

		</>
	)
}

export default ImageComponent