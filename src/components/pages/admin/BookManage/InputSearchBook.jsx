
import { Form, Row, Col, Input, Button} from 'antd'
import './style.scss'
const InputSearchBook = (props) => {


  const onFinish = (values) => {
    let query = "";
    if (values.mainText) {
      query += `&mainText=/${values.mainText}/i`;
    }
    if (values.author) {
      query += `&author=/${values.author}/i`;
    }
    if (values.category) {
      query += `&category=/${values.category}/i`;
    }
    if (query) {
      props.handleSearch(query)
    }
   

  }
  return (
    <>
      <Form name='advance_search' onFinish={onFinish} style={{ backgroundColor: "white", padding: '30px', borderRadius: "5px", marginBottom: '30px' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`mainText`}
              label={`Tên sách`}
            >
              <Input />
            </Form.Item>

          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`author`}
              label={`Tác giả`}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`category`}
              label={`Thể loại`}
            >
              <Input />
            </Form.Item>
          </Col>

         <div  className='btn-search'>
              <button className='btn-primary' style={{marginRight : '20px'}} type="primary" htmltype="submit">Search</button>
              <button className='btn-second' htmltype="reset">Clear</button>
          </div>
        </Row>
      </Form>

    </>
  )
}

export default InputSearchBook