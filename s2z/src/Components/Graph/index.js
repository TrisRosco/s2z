import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const Graph = (data) => {
  console.log("real data", data.data);

  return (
    <div className="Graph">
    <LineChart width={550} height={400} data={data.data}>
      <Line type="monotone" dataKey="trees" stroke="#5da694" strokeWidth={3} />
      <CartesianGrid stroke="#ccca" strokeDasharray="5 5" />
      <XAxis dataKey="date" label="Dates" />
      <YAxis  />
    </LineChart>
    </div>
  );
};

export default Graph;
