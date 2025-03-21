import { useNavigate } from "react-router-dom";

const LinkDegree = (data) => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('degree/' + data.data, { state: data });
  };

  return <button onClick={handleClick}>Go to Degree</button>;
};

export default LinkDegree;