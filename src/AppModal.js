import { Modal, Button } from "antd";
import  React, {useState} from "react";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  }
  const closeModal = () => {
    setIsModalVisible(false);
  }
  return (
    <>
    <Button type="primary" onClick={showModal}>
      Open modal
    </Button>
    <Modal
      title="Basic Modal"
      visible={isModalVisible}      
      onOk={closeModal}
      onCancel={closeModal}
    >
      tes modal 
    </Modal>
    </>
  );
}

