import { ToastOptions, toast, ToastPosition } from 'react-toastify';

function createToastOptions(position: ToastPosition): ToastOptions {
  return {
    position,
    hideProgressBar: false,
    autoClose: 2000,
    theme: 'light',
  };
}

// Success Notification
export function Success(msg: string): void {
  const options = createToastOptions('top-right');
  toast.success(
    <p className="text-dark tx-16 mb-0">{msg}</p>,
    options
  );
}

// Secondary (Error) Notification
export function Secondary(msg: string): void {
  const options = createToastOptions('top-center');
  toast.error(
    <p className="tx-16 mb-0">Oops! {msg}</p>,
    options
  );
}

// Warning Notification (Left Position)
export function LeftNotifier(msg: string): void {
  const options = createToastOptions('top-right');
  toast.warn(
    <p className="tx-16 mb-0">Warning: {msg}</p>,
    options
  );
}

// Info Notification (Centered)
export function CenterInfo(msg: string): void {
  const options = createToastOptions('top-center');
  toast.info(
    <p className="tx-16 mb-0">Info: {msg}</p>,
    options
  );
}

// Danger Notification (Centered)
export const CenterDanger = (msg: string): void => {
  const options = createToastOptions('top-center');
  toast.error(
    <p className="tx-16 mb-0">Error: {msg}</p>,
    options
  );
};

// Warning Notification (Centered)
export function CenterWarning(msg: string): void {
  const options = createToastOptions('top-center');
  toast.warn(
    <p className="tx-16 mb-0">{msg}</p>,
    options
  );
}

// Success Notification (Left)
export function SuccessLeft(msg: string): void {
  const options = createToastOptions('top-right');
  toast.success(
    <p className="tx-16 mb-0"><h3>Notice!</h3>{msg}</p>,
    options
  );
}

// Warning Notification (Left)
export function WarningLeft(msg: string): void {
  const options = createToastOptions('top-right');
  toast.warn(
    <p className="tx-16 mb-0"><h3>Warning!</h3>{msg}</p>,
    options
  );
}

// Danger Notification (Right)
export function DangerRight(msg: string): void {
  const options = createToastOptions('top-right');
  toast.error(
    <p className="tx-16 mb-0">{msg}</p>,
    options
  );
}

// Gradient Success Notification (Right)
export function GradientSuccess(msg: string): void {
  const options = createToastOptions('top-right');
  toast.success(
    <p className="tx-16 mb-0"><h3>Success!</h3>{msg}</p>,
    options
  );
}

// Gradient Warning Notification (Right)
export function GradientWarning(msg: string): void {
  const options = createToastOptions('top-right');
  toast.warn(
    <p className="tx-16 mb-0">{msg}</p>,
    options
  );
}

// Gradient Danger Notification (Right)
export function GradientDanger(msg: string): void {
  const options = createToastOptions('top-right');
  toast.error(
    <p className="tx-16 mb-0"><h3>Error!</h3>{msg}</p>,
    options
  );
}
