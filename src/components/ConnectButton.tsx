import { useAppKit } from '@reown/appkit/react'

export function ConnectButton() {
  // Option 1: Using the web component (simplest approach)
  return <appkit-button />
  
  // Option 2: Using custom button with hooks
  /*
  const { open } = useAppKit()
  
  return (
    <button 
      onClick={() => open()}
      className="your-button-styles"
    >
      Connect Wallet
    </button>
  )
  */
} 