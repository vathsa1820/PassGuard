import * as React from 'react';
import { Input } from '../ui/Input';
import { IconButton } from '../ui/IconButton';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * PasswordInput Component
 * Touch-friendly input (44px target on mobile) with accessible password visibility toggle.
 */

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  toggleVisibility?: () => void;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  showPassword = false,
  toggleVisibility,
  placeholder = 'Enter password...',
  disabled,
  className,
  ...props
}) => {
  const [internalShow, setInternalShow] = React.useState(false);
  const isVisible = showPassword !== undefined ? showPassword : internalShow;

  const handleToggle = () => {
    if (toggleVisibility) {
      toggleVisibility();
    } else {
      setInternalShow(!internalShow);
    }
  };

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete="new-password"
      className={cn('h-10 text-sm pr-10', className)}
      startIcon={<Lock className="w-4 h-4 text-[var(--passguard-fg-muted,#94a3b8)]" aria-hidden="true" />}
      endIcon={
        <IconButton
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          onClick={handleToggle}
          className="w-8 h-8 rounded-[var(--passguard-radius,0.375rem)] hover:bg-[var(--passguard-surface-hover,#334155)] active:scale-95 flex items-center justify-center"
          icon={
            isVisible ? (
              <EyeOff className="w-4 h-4 text-[var(--passguard-fg-muted,#94a3b8)] hover:text-[var(--passguard-fg,#f8fafc)] transition-colors" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4 text-[var(--passguard-fg-muted,#94a3b8)] hover:text-[var(--passguard-fg,#f8fafc)] transition-colors" aria-hidden="true" />
            )
          }
        />
      }
      {...props}
    />
  );
};
PasswordInput.displayName = 'PasswordInput';
