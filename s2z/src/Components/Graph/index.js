import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const Graph = (props) => {

  return (
    <div className="Graph">
    <LineChart width={550} height={400} data={props.data} average={props.average}>
      <Line type="monotone" dataKey="trees" stroke="#5da694" strokeWidth={3} />
      <Line type="monotone" dataKey="average" stroke="#a65d5d" strokeWidth={3} />
      <CartesianGrid stroke="#ccca" strokeDasharray="5 5" />
      <XAxis dataKey="date" label="Dates" />
      <YAxis  />
    </LineChart>
    </div>
  );
};

export default Graph;
