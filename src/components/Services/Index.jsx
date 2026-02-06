import { useState } from "react";

const ButtonPage = () => {
  const [button, setButton] = useState(7);

  return (
    <div>
      <button onClick={() => setButton(button + 1)}>{button}</button>

      {button > 8 && <p> From next</p>}
    </div>
  );
};

export default ButtonPage;
