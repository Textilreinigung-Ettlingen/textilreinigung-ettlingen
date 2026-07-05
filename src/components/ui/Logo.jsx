import logoFull from '../../assets/logo-full-web.png'
import logoIcon from '../../assets/logo-icon-web.png'

export default function Logo({ className = '', markOnly = false, ...props }) {
  if (markOnly) {
    return (
      <img
        src={logoIcon}
        alt="Textilreinigung Ettlingen"
        className={`h-9 w-auto object-contain ${className}`}
        {...props}
      />
    )
  }

  return (
    <img
      src={logoFull}
      alt="Textilreinigung Ettlingen"
      className={`h-12 w-auto object-contain md:h-14 ${className}`}
      {...props}
    />
  )
}
