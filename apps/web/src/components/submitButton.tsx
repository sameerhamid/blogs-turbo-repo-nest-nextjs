import React from "react";
import { Button } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import { useFormStatus } from "react-dom";

// Define props for SubmitButton by extending the Button component props
type SubmitButtonProps = React.ComponentProps<typeof Button> & {};

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props} type="submit" aria-disabled={pending}>
      {pending ? (
        <span className="animate-pulse">Submitting...</span>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
