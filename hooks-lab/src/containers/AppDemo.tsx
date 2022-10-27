import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

interface TimeItme {
  time: string;
  value: number;
}

export default function AppDemo() {
  const input: TimeItme[] = [
    { time: '2020-07-23T11:30:00Z', value: 1 },
    { time: '2020-07-24T11:30:00Z', value: 1 },
    { time: '2020-07-05T11:30:00Z', value: 2 },
    { time: '2020-07-30T11:30:00Z', value: 3 },
  ];

  const param = 'week';
  const times = input.map((x) => dayjs(x.time));
  const min = dayjs.min(times);
  const max = dayjs.max(times);
  const start = min.startOf(param);
  const size = max.startOf(param).diff(start, param);
  const ranges = new Array(size + 1).fill(0).map((_, i) => start.add(i, param));
  const toString = (x: any) => dayjs(x).startOf(param).format('YYYY MM DD');
  const dict = ranges.reduce((acc: { [key: string]: any }, x) => {
    const stringFormat: string = toString(x);
    acc[stringFormat] = [];
    return acc;
  }, {});
  const grouped = input.reduce((acc, x) => {
    const stringFormat = toString(x.time);
    dict[stringFormat].push(x);
    return acc;
  }, dict);
  const average = (array: TimeItme[]) =>
    array.reduce((acc: number, x: { value: number }) => acc + x.value, 0) /
    (array.length || 1);
  const result = Object.fromEntries(
    Object.entries(grouped).map(([key, value]) => [key, average(value)])
  );

  console.log(result);
  return <div>AppDemo</div>;
}
