import type { ReactElement } from 'react'
import { Typography } from '@material-ui/core/'
import EthereumAddress from '../../../components/EthereumAddress'

type Props = StatusEthereumConnectionHook

export default function EthereumConnectionCheck({ isLoading, isOk, nodeAddresses }: Props): ReactElement | null {
  if (isLoading) return null

  if (isOk) {
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom>
          XWC Address
        </Typography>
        <EthereumAddress address={nodeAddresses?.xwc} />
      </div>
    )
  }

  return (
    <p>
      Your Pen node must have access to the Xwc blockchain, so that it can interact and deploy your chequebook
      contract. You can run{' '}
      <a>
        your own Xwc node
      </a>
      , or use a provider instead - we recommend{' '}
      <a>
        Getblock
      </a>
      . To use a provider instead, simply change the{' '}
      <strong>swap-endpoint</strong> in your configuration file.
    </p>
  )
}
