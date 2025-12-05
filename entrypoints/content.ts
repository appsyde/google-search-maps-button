export default defineContentScript({
  matches: [
    '*://*.google.com/*',
    '*://*.google.de/*',
    '*://*.google.at/*',
    '*://*.google.ch/*',
  ],
  main() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initMapButtons)
    } else {
      initMapButtons()
    }

    const observer = new MutationObserver(() => {
      initMapButtons()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  },
})

function initMapButtons() {
  if (!isGoogleSearchPage()) return

  const searchQuery = getSearchQuery()
  if (!searchQuery) return

  addMapsButtonToSearchTabs(searchQuery)
  addMapsButtonToSearchMapPreview(searchQuery)
}

function isGoogleSearchPage(): boolean {
  return (
    globalThis.location.pathname === '/search' ||
    globalThis.location.hash.includes('#q=') ||
    document.querySelector('[name="q"]') !== null
  )
}

function getSearchQuery(): string | null {
  const urlParams = new URLSearchParams(globalThis.location.search)
  let query = urlParams.get('q')

  if (!query) {
    const searchInput = document.querySelector(
      'input[name="q"]'
    ) as HTMLInputElement
    query = searchInput?.value
  }

  if (!query) {
    const hashMatch = new RegExp(/#q=([^&]*)/).exec(globalThis.location.hash)
    query = hashMatch ? decodeURIComponent(hashMatch[1]) : null
  }

  return query?.trim() || null
}

function addMapsButtonToSearchTabs(searchQuery: string) {
  const possibleContainers = [
    'div[role="navigation"] > div > div > div > div > div[role="list"]', // Tab: All
    'div[role="navigation"] > div > div[role="list"]', // Tab: Images
  ]

  let navigationContainer: Element | null = null

  for (const selector of possibleContainers) {
    navigationContainer = document.querySelector(selector)
    if (navigationContainer) break
  }

  if (!navigationContainer) {
    console.log(
      'Google Search Maps Button Extension: Navigation container not found'
    )
    return
  }

  const existingButton = navigationContainer.querySelector(
    '.maps-button-extension'
  )
  if (existingButton) return

  // Get navElements from navigationContainer
  const navElements = Array.from(navigationContainer.children)

  // Get navElement with attribute selected="true": div > a > div[aria-current="page"]
  const selectedNavElement = navElements.find(
    (el) => el.querySelector('div[aria-current="page"]') !== null
  )
  // Get first and second navElement
  const firstNavElement = navElements[1]
  const secondNavElement = navElements[2]
  // Set temporary navElement for maps button
  let tempNavElement = firstNavElement?.cloneNode(true) as
    | HTMLElement
    | undefined
  if (firstNavElement === selectedNavElement) {
    tempNavElement = secondNavElement?.cloneNode(true) as
      | HTMLElement
      | undefined
  }

  // Modify mapsNavElement to point to Google Maps search
  if (tempNavElement) {
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
      searchQuery
    )}`
    const link = tempNavElement.querySelector('a')
    if (link) {
      link.href = mapsUrl
      link.target = '_blank'
      link.dataset.ved = 'maps-extension'
      const span = link.querySelector('span')
      if (span) {
        span.textContent = 'Maps'
      }
    }
    tempNavElement.classList.add('maps-button-extension')
    // Insert mapsNavElement after secondNavElement
    if (secondNavElement?.parentNode) {
      secondNavElement.parentNode.insertBefore(
        tempNavElement,
        secondNavElement.nextSibling
      )
    }
  }
}

function addMapsButtonToSearchMapPreview(searchQuery: string) {
  const possibleContainers = ['div.nwn5d']

  let mapPreviewContainer: Element | null = null

  for (const selector of possibleContainers) {
    mapPreviewContainer = document.querySelector(selector)
    if (mapPreviewContainer) break
  }

  if (!mapPreviewContainer) {
    console.log(
      'Google Search Maps Button Extension: Map preview container not found'
    )
    return
  }

  // Turn mapPreviewContainer into a link to Google Maps search
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    searchQuery
  )}`

  let link = mapPreviewContainer.querySelector(
    'a.maps-button-extension'
  ) as HTMLAnchorElement
  if (!link) {
    link = document.createElement('a')
    link.classList.add('maps-button-extension')
    link.style.display = 'block'
    link.style.width = '100%'
    link.style.height = '100%'
    link.style.textDecoration = 'none'
    link.href = mapsUrl
    link.dataset.ved = 'maps-extension'

    // Wrap mapPreviewContainer's children in the link
    while (mapPreviewContainer.firstChild) {
      link.appendChild(mapPreviewContainer.firstChild)
    }
    mapPreviewContainer.appendChild(link)
  }
}
