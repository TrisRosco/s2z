import { LineChart, Line, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts";

const Graph = (props) => {

  return (
    <div className="Graph">
    <LineChart width={550} height={400} data={props.data} average={props.average}>
      <Line type="monotone" dataKey="trees" stroke="#5da694" strokeWidth={3} />
      <ReferenceLine label={props.average} y={props.average} stroke="red" strokeDasharray="3 3" />
      <CartesianGrid stroke="#ccca" strokeDasharray="5 5" />
      <XAxis dataKey="date" label="Dates" />
      <YAxis  />
    </LineChart>
    </div>
  );
};

export default Graph;
