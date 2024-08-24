import React from 'react';

const SVGIcon = ({
  className,
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={
        "cursor-pointer text-gray-500 transition-all duration-300 " + className
      }
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
};

const BookmarkSVG = ({ className }) => {
  return (
    <SVGIcon className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"></path>
    </SVGIcon>
  );
};

const ChartSVG = ({ className }) => {
  return (
    <SVGIcon className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
      <path d="M16.924 11.132a5 5 0 1 0 -4.056 5.792"></path>
      <path d="M3 12a9 9 0 1 0 9 -9"></path>
    </SVGIcon>
  );
};

const PauseSVG = ({ className }) => {
  return (
    <SVGIcon className={className}>
     <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
    </SVGIcon>
  );
};

const PlaySVG = ({ className }) => {
  return (
    <SVGIcon className={className}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
    </SVGIcon>
  );
};
  
  export const Icons = {
    bookmark: BookmarkSVG,
    chart: ChartSVG,
    pause: PauseSVG,
    play: PlaySVG,
  };
  