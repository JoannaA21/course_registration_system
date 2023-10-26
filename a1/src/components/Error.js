import notfound from '../css/pagenotfound.jpg'
export const Error =()=>{
    
  const containerStyle = {
    background: `url('${notfound}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  };

  const responsiveContainerStyle = {
    '@media (max-width: 768px)': {
      backgroundSize: 'contain', // Adjust for smaller screens
      backgroundRepeat: 'no-repeat',
    },
    '@media (max-width: 480px)': {
      backgroundSize: 'cover', // Adjust for even smaller screens
      backgroundRepeat: 'no-repeat',
    },
  };

  return (
    <div style={{ ...containerStyle, ...responsiveContainerStyle }} />
  );
}
