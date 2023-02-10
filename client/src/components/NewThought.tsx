import { useState } from "preact/hooks";
import { useAuthCtx } from "../Context/AuthContext";
import Button from "./Button";
import Modal from "./Modal";
import NewThoughtModal from "./NewThoughtModal";

export default function NewThought() {
  const [modal, setModal] = useState(false);

  return (
    <div className="fixed bottom-8 right-8">
      <Button variant="circle" onClick={() => setModal(true)}>
        +
      </Button>

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <NewThoughtModal onSubmit={() => setModal(false)} />
      </Modal>
    </div>
  );
}
