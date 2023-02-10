import { useState } from "preact/hooks";
import { useAuthCtx } from "../Context/AuthContext";
import Button from "./Button";
import Modal from "./Modal";
import MembershipModal from "./MembershipModal";

export default function User() {
  const [menu, setMenu] = useState(false);
  const [membershipModal, setMembershipModal] = useState(false);

  const auth = useAuthCtx();
  const { name, email, membership } = auth.user!;
  const { logout } = auth;

  return (
    <div className="relative">
      <span
        className="cursor-pointer rounded-tl-3xl bg-white p-2"
        onClick={() => setMenu((prev) => !prev)}
      >
        {name} &lt;{email}&gt;
      </span>

      {menu && (
        <ul className="absolute z-50 w-full  rounded-lg  bg-white py-3 px-2 shadow-lg">
          <li>
            {!membership && (
              <Button className="mb-3" onClick={() => setMembershipModal(true)}>
                Join Membership
              </Button>
            )}
          </li>
          <li>
            <Button onClick={logout}>LogOut</Button>
          </li>
        </ul>
      )}

      <Modal isOpen={membershipModal} onClose={() => setMembershipModal(false)}>
        <MembershipModal onSubmit={() => setMembershipModal(false)} />
      </Modal>
    </div>
  );
}
