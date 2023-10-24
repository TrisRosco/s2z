import {
  LineChart,
  Line,
  Label,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

const Graph = (props) => {
  return (
    <div className="Graph">
      <LineChart
        width={550}
        height={400}
        data={props.data}
        average={props.average}
        margin={{ top: 10, right: 0, bottom: 10, left: 10 }}
      >
        {/* Line to represent the user's inputted data */}
        <Line
          type="monotone"
          dataKey="trees"
          stroke="#5da694"
          strokeWidth={3}
        />
        {/* Line to represent the average */}
        <ReferenceLine
          label={props.average}
          y={props.average}
          stroke="red"
          strokeDasharray="3 3"
        />
        {/* Background grid */}
        <CartesianGrid stroke="#ccca" strokeDasharray="5 5" />
        {/* Axies and labels */}
        <XAxis dataKey="date">
          {" "}
          <Label value="Time" offset={-3} position="insideBottom" />{" "}
        </XAxis>
        <YAxis label={{ value: "kgCO2", angle: -90, position: "insideLeft" }} />
      </LineChart>
    </div>
  );
};

export default Graph;
