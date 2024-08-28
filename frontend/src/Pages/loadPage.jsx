import React from 'react'
const loadPage = () => {
  return (
    <section>
  <div className="min-h-[60vh] grid place-items-center">
    <div className="relative w-24 h-24">
      {/* Outer Ring */}
      <div className="absolute inset-0 border-4 border-t-primary border-l-secondary border-b-accent border-r-info rounded-full animate-spin"></div>

      {/* Middle Ring */}
      <div className="absolute inset-2 border-4 border-t-accent border-l-info border-t-primary border-r-secondary rounded-full animate-spin"></div>

      {/* Inner Ring */}
      <div className="absolute inset-4 border-4 border-t-secondary border-l-primary border-b-info border-r-accent rounded-full animate-spin"></div>

      {/* Central Pulsing Dot */}
      <div className="absolute inset-8 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
    </div>
  </div>
</section>

  )
}

export default loadPage
