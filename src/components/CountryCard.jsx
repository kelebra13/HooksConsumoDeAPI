import React from 'react';

const CountryCard = React.memo(({ country }) => {
  console.log("Renderizando tarjeta:", country.name.common);
  return (
    <div className="card">
      <img src={country.flags.svg} alt={country.name.common} width="100" />
      <h3>{country.name.common}</h3>
      <p>Región: {country.region}</p>
    </div>
  );
});

export default CountryCard;