const LogoRocket = ({ ...rest }) => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 65 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      opacity="0.5"
      d="M63.0716 0.980994L47.8192 55.0134L38.2112 45.8978L45.9427 18.5391C46.2272 17.6033 45.326 16.9199 44.5418 17.1318L15.6403 24.4836L6.14646 15.4763L63.0716 0.980994Z"
      fill="#059669"
      stroke="#059669"
      strokeWidth="1.60611"
    />
    <path
      opacity="0.5"
      d="M36.4016 46.395L32.6968 59.5761L1.28307 29.7965L15.1771 26.2582L36.4016 46.395ZM33.2346 60.0858L33.2343 60.0856L33.2346 60.0858Z"
      fill="#059669"
      stroke="#059669"
      strokeWidth="1.60611"
    />
    <path
      d="M17.0163 25.79L44.1753 18.8814L36.8936 44.6486L17.0163 25.79Z"
      fill="#059669"
      stroke="#059669"
      strokeWidth="1.60611"
    />
  </svg>
);

const SpinerLogin = ({ ...rest }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="#e4e4e7"
    {...rest}
  >
    <circle cx="50" cy="50" r="40" stroke="#e4e4e7" strokeWidth="8" fill="none">
      <animate
        attributeName="stroke-dasharray"
        from="0,251.32741228718345"
        to="251.32741228718345,0"
        dur="0.75s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export { LogoRocket, SpinerLogin };
