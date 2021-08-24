import { Typography } from '@material-ui/core/'
import EthereumAddress from '../../../components/EthereumAddress'
import DepositModal from '../../../containers/DepositModal'
import type { ReactElement } from 'react'
import type { StatusChequebookHook } from '../../../hooks/status'

interface Props extends StatusChequebookHook {
  ethereumAddress?: string
}

const ChequebookDeployFund = ({ isLoading, chequebookAddress, chequebookBalance }: Props): ReactElement | null => {
  if (isLoading) return null

  return (
    <div>
      <p style={{ marginBottom: '20px', display: 'flex' }}>
        {chequebookAddress?.chequebookAddress && <DepositModal />}
      </p>
      <div style={{ marginBottom: '10px' }}>
        {!(chequebookAddress?.chequebookAddress && chequebookBalance?.totalBalance.toBigNumber.isGreaterThan(0)) && (
          <div>
            <span>
              Your chequebook is either not deployed or funded. To run the node you will need XWC and PEN token on the XWC
              network. You may need to aquire PEN. To pay the transaction fees, you will also need XWC token.
            </span>
          </div>
        )}
      </div>
      <Typography variant="subtitle1" gutterBottom>
        Chequebook Address
      </Typography>
      <EthereumAddress address={chequebookAddress?.chequebookAddress} />
    </div>
  )
}

export default ChequebookDeployFund
