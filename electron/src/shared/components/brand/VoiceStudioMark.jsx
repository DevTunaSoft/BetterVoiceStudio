import React from 'react';

/** VoiceBlueprint Pro mark: a B-shaped signal and a blueprint waveform.
 * Keep its paths aligned with the canonical docs/logo.svg asset. The legacy
 * module filename remains an internal import compatibility alias.
 */
export default function VoiceStudioMark({ className = '', title, ...props }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M18 16V48M18 16H31C41 16 45 20 45 25C45 30 41 33 32 33H18M18 33H33C43 33 47 37 47 41C47 46 42 48 33 48H18"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 33H21L25 27L30 39L35 28L39 33H53"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}
