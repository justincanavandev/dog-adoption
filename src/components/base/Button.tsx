type ButtonProps = {
  text: string;
  action?: () => void;
  asyncAction?: () => Promise<void>;
  disabled?: boolean;
} & ({ action: () => void } | { asyncAction: () => Promise<void> });

const Button = ({ text, action, asyncAction, disabled }: ButtonProps) => {
  return (
    <button
      onClick={action ? action : asyncAction}
      className="w-24 hover:scale-110 duration-200 cursor-pointer rounded-sm border-2 border-black bg-purple text-white"
      disabled={disabled ? disabled : false}
    >
      {text}
    </button>
  );
};

export default Button;
