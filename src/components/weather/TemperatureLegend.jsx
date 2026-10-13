function WeatherLegend({ selectedLayer }) {
  const legendDetails = {
    temp_new: {
      title: 'Temperature',
      leftLabel: 'Cold',
      middleLabel: 'Mild',
      rightLabel: 'Hot',
      gradient:
        'linear-gradient(to right, #6ec6ff, #7ee081, #ffe66d, #ff9f43, #e53935)',
    },

    precipitation_new: {
      title: 'Precipitation',
      leftLabel: 'Light',
      middleLabel: 'Moderate',
      rightLabel: 'Heavy',
      gradient:
        'linear-gradient(to right, #c7f0ff, #46b5ff, #2468ff, #a020f0)',
    },

    clouds_new: {
      title: 'Cloud Coverage',
      leftLabel: 'Low',
      middleLabel: 'Medium',
      rightLabel: 'High',
      gradient:
        'linear-gradient(to right, #eeeeee, #999999, #444444)',
    },

    wind_new: {
      title: 'Wind',
      leftLabel: 'Low',
      middleLabel: 'Moderate',
      rightLabel: 'High',
      gradient:
        'linear-gradient(to right, #b7f7e0, #42c7b5, #3565d4)',
    },
  };

  const details = legendDetails[selectedLayer];

  return (
    <div className="rounded-lg bg-white p-3 shadow-md">
      <p className="mb-2 text-sm font-semibold text-gray-800">
        {details.title}
      </p>

      <div
        className="h-3 w-56 rounded"
        style={{ background: details.gradient }}
      />

      <div className="mt-1 flex w-56 justify-between text-xs text-gray-600">
        <span>{details.leftLabel}</span>
        <span>{details.middleLabel}</span>
        <span>{details.rightLabel}</span>
      </div>
    </div>
  );
}

export default WeatherLegend;