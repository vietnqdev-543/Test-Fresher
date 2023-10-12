
import { Form, Row, Col, Input, Button} from 'antd'
const InputSearch = (props) => {


  const onFinish = (values) => {
    let query = "";
    if (values.fullName) {
      query += `&fullName=/${values.fullName}/i`;
    }
    if (values.email) {
      query += `&email=/${values.email}/i`;
    }
    if (values.phone) {
      query += `&phone=/${values.phone}/i`;
    }
    if (query) {
      props.handleSearch(query)
    }
   

  }
  return (
    <>
      <Form name='advance_search' onFinish={onFinish} style={{ backgroundColor: "#fafafa", padding: '30px', borderRadius: "5px", marginBottom: '30px' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`fullName`}
              label={`Name`}
            >
              <Input />
            </Form.Item>

          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`email`}
              label={`Email`}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`phone`}
              label={`Số điện thoại`}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={21}></Col>
          <Col >
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col >
            <Form.Item>
              <Button htmlType="reset">Clear</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

    </>
  )
}

export default InputSearch