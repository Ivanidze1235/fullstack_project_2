import { useLocation } from "react-router-dom";

const ViewDegree = (data) => {
  const location = useLocation();
  console.log(location);
  
  return (
    <div>
      <p>{data.full_name}</p>
      <p>THIS SUCKS</p>
    </div>
  );
};

export default ViewDegree;

