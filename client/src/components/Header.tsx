import { useState } from "preact/hooks";

import Button from "./Button";
import Modal from "./Modal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useAuthCtx } from "../Context/AuthContext";
import User from "./User";

export default function Header() {
  const { user, logout } = useAuthCtx();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  return (
    <header>
      <div className="mx-auto flex w-[96%] max-w-7xl items-center justify-between rounded-xl bg-rose-700 p-4">
        <h1 className="font-mono text-3xl font-bold text-white">
          Personal Thoughts
        </h1>

        <div className="flex gap-4">
          {!user ? (
            <>
              <Button onClick={() => setLoginModal(true)}>Login</Button>
              <Button onClick={() => setRegisterModal(true)}>Register</Button>
            </>
          ) : (
            <>
              <User />
            </>
          )}
        </div>
      </div>

      <Modal isOpen={loginModal} onClose={() => setLoginModal(false)}>
        <LoginModal
          onSubmit={() => setLoginModal(false)}
          onChangeModal={() => {
            setLoginModal(false);
            setRegisterModal(true);
          }}
        />
      </Modal>
      <Modal isOpen={registerModal} onClose={() => setRegisterModal(false)}>
        <RegisterModal
          onSubmit={() => {
            setRegisterModal(false);
            setLoginModal(true);
          }}
          onChangeModal={() => {
            setRegisterModal(false);
            setLoginModal(true);
          }}
        />
      </Modal>
    </header>
  );
}
