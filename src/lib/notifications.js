import { toast } from '@zerodevx/svelte-toast' // https://github.com/zerodevx/svelte-toast

export class notifications {
  static info = m => toast.push(m, {
    theme: {
      '--toastColor': 'white',
      '--toastBackground': 'var(--info)',
      '--toastBarBackground': 'var(--info-bar)'
    }
  })

  static success = m => toast.push(m, {
    theme: {
      '--toastColor': 'white',
      '--toastBackground': 'var(--success)',
      '--toastBarBackground': 'var(--success-bar)'
    }
  })
  
  static warning = m => toast.push(m, { 
    theme: {
      '--toastColor': 'whie',
      '--toastBackground': 'var(--warning)',
      '--toastBarBackground': 'var(--warning-bar)'
    }
  })
  
  static failure = m => toast.push(m, { 
    theme: {
      '--toastColor': 'white',
      '--toastBackground': 'var(--failure)',
      '--toastBarBackground': 'var(--failure-bar)'
    }
  })
}
