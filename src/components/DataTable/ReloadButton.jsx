import { RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'

export default function ReloadButton({ func }) {
  return (
    <Button
      variant="outline"
      className="bg-transparent ps-3 md:pe-3.5 dark:bg-transparent dark:bg-neutral-700 dark:text-white"
      onClick={func}
    >
      <RefreshCw className="mr-2 h-4 w-4 font-normal" />
      <span className="font-normal">Reload</span>
    </Button>
  )
}
