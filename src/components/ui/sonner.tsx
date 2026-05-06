import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-center"
      duration={2000}
      toastOptions={{
        style: {
          background: 'white',
          color: '#1e3856',
          border: '1px solid #e5e7eb',
          borderRadius: 0,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };