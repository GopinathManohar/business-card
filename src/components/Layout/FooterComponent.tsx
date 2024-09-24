import { Row, Space } from "antd";
import { getYear } from "../../utils/luxon";
import { Footer } from "antd/lib/layout/layout";

const FooterComponent = () => {
    return (
        <Footer>
            <Row className="" justify="center" >
                <Space size={2}>
                    © {getYear()} <span className=""> AJEX™</span>.
                    All Rights Reserved.
                </Space>
            </Row>
        </Footer>

    )
}

FooterComponent.propTypes = {}

export default FooterComponent