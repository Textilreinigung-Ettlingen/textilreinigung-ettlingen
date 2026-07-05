import { useEffect } from 'react'

const SITE_URL = 'https://textilreinigung-ettlingen.de'

export function useDocumentMeta(title, description, path = '') {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const descMeta = document.querySelector('meta[name="description"]')
    const prevDescription = descMeta?.getAttribute('content')
    if (descMeta && description) descMeta.setAttribute('content', description)

    const canonical = document.querySelector('link[rel="canonical"]')
    const prevCanonical = canonical?.getAttribute('href')
    const url = `${SITE_URL}${path}`
    if (canonical) canonical.setAttribute('href', url)

    const ogUrl = document.querySelector('meta[property="og:url"]')
    const prevOgUrl = ogUrl?.getAttribute('content')
    if (ogUrl) ogUrl.setAttribute('content', url)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    const prevOgTitle = ogTitle?.getAttribute('content')
    if (ogTitle) ogTitle.setAttribute('content', title)

    return () => {
      document.title = prevTitle
      if (descMeta && prevDescription) descMeta.setAttribute('content', prevDescription)
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical)
      if (ogUrl && prevOgUrl) ogUrl.setAttribute('content', prevOgUrl)
      if (ogTitle && prevOgTitle) ogTitle.setAttribute('content', prevOgTitle)
    }
  }, [title, description, path])
}
