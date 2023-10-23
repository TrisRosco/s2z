import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const Graph = (data) => {
  console.log("real data", data.data);

  return (
    <LineChart width={400} height={400} data={data.data}>
      <Line type="monotone" dataKey="trees" stroke="#5da694" strokeWidth={3} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" label="Dates" />
      <YAxis  />
    </LineChart>
  );
};

export default Graph;
