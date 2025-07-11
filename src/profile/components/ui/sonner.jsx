// import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  // const { theme = "light" } = useTheme();

  return (
    <Sonner
      // theme={theme}
      className="toaster group"
      toastOptions={{
        className: "text-sm rounded-md border shadow-lg p-3",
        style: {
          fontFamily: "inherit",
        },
        duration: 3000,
        classNames: {
          toast: "custom-toast",
          success: "custom-toast-success",
          error: "custom-toast-error",
        },
      }}
      position="top-center"
      richColors
      {...props}
    />
  );
};

export { Toaster };
