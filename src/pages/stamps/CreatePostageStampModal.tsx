import React, { ReactElement, useContext, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogTitle from '@material-ui/core/DialogTitle'
import BigNumber from 'bignumber.js'
import { FormikHelpers, Form, Field, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import { beeApi } from '../../services/bee'
import { Context } from '../../providers/Stamps'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import HelpIcon from '@material-ui/icons/Help'
import axios from 'axios'

interface FormValues {
  depth?: string
  amount?: string
  label?: string
}
type FormErrors = Partial<FormValues>
const initialFormValues: FormValues = {
  depth: '22',
  amount: '20',
  label: '',
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    field: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginBottom: -12,
    },
    custom: {
      border: '1px solid #e7e7e7',
      borderRadius: '4px',
      padding: '10px',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    customItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 16,
      height: 24,
    },
    customItemInput: {
      padding: theme.spacing(1),
    },
    balance: {
      width: 552,
      textAlign: 'right',
    },
    outline: {
      lineHeight: '16px',
    },
    helpIcon: {
      color: '#bdbdbd',
      marginLeft: theme.spacing(1),
    },
    formula: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
      alignItems: 'center',
      height: 24,
    },
    splitLine: {
      background: '#e7e7e7',
      height: '1px',
      margin: '10px 0',
    },
  }),
)

interface Props {
  label?: string
}

export default function FormDialog({ label }: Props): ReactElement {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { refresh } = useContext(Context)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { enqueueSnackbar } = useSnackbar()
  const [custom, setCustom] = React.useState(false)
  const handleCustom = () => setCustom(!custom)
  const getPrice = (depth: any, amount: any, isValid: any) => {
    if (!isValid || !depth || !amount) {
      return ''
    } else {
      try {
        const res = new BigNumber(2).pow(depth).times(amount).div(100000000).toFixed()
        return res
      } catch (e) {
        return ''
      }
    }
  }
  const [myBalance, setMyBalance] = React.useState({
    xwc: '0',
    pen: '0',
  })
  useEffect(() => {
    const getBalance = async () => {
      const xwcRes = await axios({
        url: `http://123.129.224.30:40123`,
        method: 'post',
        data: { "id": 1, "method": "get_addr_balances", "params": ["XWCNLveo8cXADqA62NNpC5Hvspx4pDbPoFL3p"] },
      })
      const penRes = await axios({
        url: `http://123.129.224.30:40123`,
        method: 'post',
        data: { "id": 1, "method": "invoke_contract_offline", "params": ["defi", "XWCCbLjsxYhuJmdQiykz1AXHFcQuVwtNMWq5q", "balanceOf", "XWCNLveo8cXADqA62NNpC5Hvspx4pDbPoFL3p"] },
      })
      console.log(xwcRes.data.result, 111)
      console.log(penRes.data.result, 222)
      const res = {
        xwc: '',
        pen: '',
      }
      for (let i = 0; i < xwcRes.data.result.length; i++) {
        if (xwcRes.data.result[i].asset_id === '1.3.0') {
          res.xwc = new BigNumber(xwcRes.data.result[i].amount).div(100000000).toFixed()
        }
      }
      res.pen = new BigNumber(penRes.data.result).div(100000000).toFixed()
      setMyBalance(res)
    }
    getBalance()
  }, [])

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        try {
          // This is really just a typeguard, the validation pretty much guarantees these will have the right values
          if (!values.depth || !values.amount) return

          const amount = BigInt(values.amount)
          const depth = Number.parseInt(values.depth)
          const options = values.label ? { label: values.label } : undefined
          await beeApi.stamps.buyPostageStamp(amount, depth, options)
          actions.resetForm()
          await refresh()
          handleClose()
        } catch (e) {
          enqueueSnackbar(`Error: ${e.message}`, { variant: 'error' })
          actions.setSubmitting(false)
        }
      }}
      validate={(values: FormValues) => {
        const errors: FormErrors = {}

        // Depth
        if (!values.depth) errors.depth = 'Required field'
        else {
          const depth = new BigNumber(values.depth)

          if (!depth.isInteger()) errors.depth = 'Depth must be an integer'
          else if (depth.isLessThan(16)) errors.depth = 'Minimal depth is 16'
          else if (depth.isGreaterThan(255)) errors.depth = 'Depth has to be at most 255'
        }

        // Amount
        if (!values.amount) errors.amount = 'Required field'
        else {
          const amount = new BigNumber(values.amount)

          if (!amount.isInteger()) errors.amount = 'Amount must be an integer'
          else if (amount.isLessThanOrEqualTo(0)) errors.amount = 'Amount must be greater than 0'
        }

        // Label
        // if (values.label && !/^[0-9a-z]*$/i.test(values.label)) errors.label = 'Label must be an alphanumeric string'

        return errors
      }}
    >
      {({ submitForm, isValid, isSubmitting, values }) => (
        <Form>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            {label || 'Buy Postage Stamp'}
            {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Purchase new postage stamp</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                Provide the depth, amount and optionally the label of the postage stamp. Please refer to the official pen docs to understand these values.
              </DialogContentText> */}
              <DialogContentText>
                <div className={classes.balance}>{`Balance: ${myBalance.pen}PEN / ${myBalance.xwc}XWC`}</div>
              </DialogContentText>
              <div className={classes.custom}>
                <div className={classes.customItem}>
                  <div>Price</div>
                  <div>{`${getPrice(values.depth, values.amount, isValid)} PEN`}</div>
                </div>
                <div className={classes.splitLine} />
                <div className={classes.formula}>
                  <div style={{ fontFamily: 'initial' }}>{`2^Depth(${values.depth})*Amount(${values.amount})/10^8`}</div>
                  <a className={classes.outline} target="_blank" href="https://license.whitecoin.info/content/detail/61a07bf456f03452ab616058?lang=en">
                    <HelpIcon className={classes.helpIcon} style={{ fontSize: "20px" }} />
                  </a>
                </div>
              </div>
              <div className={classes.custom}>
                <div className={classes.customItem}>
                  <div>Fee</div>
                  <div>0.04XWC</div>
                </div>
              </div>
              <div className={classes.custom}>
                <div className={classes.customItem} onClick={handleCustom}>
                  <div>Custom</div>
                  <KeyboardArrowDown />
                </div>
                {
                  custom &&
                  <div className={classes.customItemInput}>
                    <Field component={TextField} required name="depth" label="Depth" fullWidth className={classes.field} />
                    <Field component={TextField} required name="amount" label="Amount" fullWidth className={classes.field} />
                  </div>
                }
              </div>
              {/* <Field component={TextField} name="label" label="Label" fullWidth className={classes.field} /> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <div className={classes.wrapper}>
                <Button
                  color="primary"
                  disabled={isSubmitting || !isValid || !values.amount || !values.depth}
                  type="submit"
                  variant="contained"
                  onClick={submitForm}
                >
                  Create
                  {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}
