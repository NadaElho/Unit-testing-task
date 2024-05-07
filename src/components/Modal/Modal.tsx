import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { IUser } from "../../Interfaces/User";

interface ModelData {
  data: IUser;
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
  resetForm: () => void;
}

export function ModalComponent({
  data,
  clicked,
  setClicked,
  resetForm,
}: ModelData) {
  const [openModal, setOpenModal] = useState(clicked ? true : false);
  useEffect(() => {
    if (clicked && data.email && data.password) {
      setOpenModal(true);
    }
  }, [clicked, data]);

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setClicked(false);
        }}
      >
        <Modal.Header>User Data</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Email: {data.email}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Password: {data.password}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenModal(false);
              setClicked(false);
              resetForm();
            }}
            name="submit"
          >
            Submit
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setOpenModal(false);
              setClicked(false);
            }}
            name="cancel"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
