import { useRouteError } from "react-router";

type ErrorType = {
  statusText: string;
  message: string;
};

const ErrorElement = () => {
  const error = useRouteError() as ErrorType;

  return (
    <div className="h-dvh pt-14">
      <div className="container w-fit rounded-md p-4 m-auto text-center border-2">
        <div className="text-2xl">از مشکل پیش آمده، عذر میخواهیم.</div>
        <div className="mb-4 mt-2">
          لطفاً صفحه را رفرش کنید، یا مشکل را گزارش کنید.
        </div>

        <hr />

        <div className="mt-4 text-red-600">
          {error.statusText || error.message}
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
