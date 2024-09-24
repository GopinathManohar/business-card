import { Modal, Typography } from 'antd';
import { IConfirmation } from "../../model/CommonModel";

const ConfirmationModal = ({ hideModal, confirmClicked, openModal, label, isLoading = false }: IConfirmation) => {
    return (
        <Modal
            maskClosable={false}
            title="Confirm"
            open={openModal}
            onOk={confirmClicked}
            onCancel={hideModal}
            okText="Yes"
            cancelText="No"
            confirmLoading={isLoading}
        >
            <Typography.Text>{label}</Typography.Text>
        </Modal>
    )
}
export default ConfirmationModal