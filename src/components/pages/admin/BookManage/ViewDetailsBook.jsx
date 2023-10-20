
import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Divider, Modal, Upload, Image } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const ViewDetailsBook = ({ openViewDetail, dataViewDetail , setOpenViewDetail , setDataViewDetail}) => {
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null)
    
  };
  useEffect(() => {
    if (dataViewDetail) {
      let imgThumbnail = {},
        imgSlider = [];
      if (dataViewDetail.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: dataViewDetail.thumbnail,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataViewDetail.thumbnail}`,
        };
      }
      if(dataViewDetail.slider && dataViewDetail.slider.length > 0){
        dataViewDetail.slider.map(item => {
          imgSlider.push({
            uid : uuidv4(),
            name : item ,
            status : ' done ' ,
            url : `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
          })
        })
      }
      setFileList([imgThumbnail, ...imgSlider]);
    }
  }, [dataViewDetail]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    
    
    setPreviewImage(file.url);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      <Drawer title="Xem chi tiết sản phẩm" width={'50%'} placement="right" onClose={onClose} open={openViewDetail}>
        <Descriptions title="Thông tin sách" bordered column={2}>
          <Descriptions.Item label="ID">{dataViewDetail?._id}</Descriptions.Item>
          <Descriptions.Item label="Tên sách" >
            {dataViewDetail?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả" >{dataViewDetail?.author}</Descriptions.Item>
          <Descriptions.Item label="Thể loại">{dataViewDetail?.category}</Descriptions.Item>
          <Descriptions.Item label="Giá tiền">{dataViewDetail?.price} vnd</Descriptions.Item>
          <Descriptions.Item label="Đã bán">{dataViewDetail?.sold}</Descriptions.Item>
          <Descriptions.Item label="Số lượng">{dataViewDetail?.quantity}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {moment(dataViewDetail?.createdAt).format('HH:mm:ss DD-MM-YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {moment(dataViewDetail?.updatedAt).format('HH:mm:ss DD-MM-YYYY')}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left">Ảnh sách</Divider>
        <Upload
          action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={{
            showRemoveIcon: false,
          }}
        ></Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Drawer>
    </>
  );
};

export default ViewDetailsBook;
