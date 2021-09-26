import type { ReactElement } from 'react'
import { Typography } from '@material-ui/core/'
import CodeBlockTabs from '../../../components/CodeBlockTabs'

type Props = StatusNodeVersionHook

export default function VersionCheck({
  isLoading,
  isOk,
  userVersion,
  latestVersion,
  latestUrl,
}: Props): ReactElement | null {
  if (isLoading) return null

  const version = (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '30px' }}>
        <p>
          <span>User Version</span>
        </p>
        <Typography component="h5" variant="h5">
          <span>{userVersion}</span>
        </Typography>
      </div>
      <div>
        <p>
          <span>Latest Version</span>
        </p>
        <Typography component="h5" variant="h5">
          <span>{latestVersion}</span>
        </Typography>
      </div>
    </div>
  )

  // Running latest Pen version
  if (isOk) {
    return (
      <>
        <span>You are running the latest version of Pen</span>
        {version}
      </>
    )
  }

  // Old version or not connected to pen debug API
  return (
    <>
      <span>
        Your Pen version is out of date. Please update to the{' '}
        <a href={latestUrl} rel="noreferrer" target="_blank">
          latest
        </a>{' '}
        before continuing. Rerun the installation script below to upgrade. Reference the docs for help with updating.{' '}
        <a>
          Docs
        </a>
      </span>
      <CodeBlockTabs
        showLineNumbers
        linux={`pen version\nwget https://github.com/penguintop/penguin/releases/download/${latestVersion}/pen_${latestVersion}_amd64.deb\nsudo dpkg -i pen_${latestVersion}_amd64.deb`}
        mac={``}
      />
      {version}
    </>
  )
}
