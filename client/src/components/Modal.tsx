import { createPortal } from "preact/compat";
import { ComponentChildren, Fragment } from "preact";

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  children: ComponentChildren;
  isOpen: boolean;
  onClose: () => void;
}) {
  return isOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={(e) => {
            if (e.currentTarget.isSameNode(e.target as Node)) {
              onClose();
            }
          }}
        >
          {children}
        </div>,
        document.getElementById("modal")!
      )
    : null;
}
