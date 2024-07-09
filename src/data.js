export const chillers = [
  {
    id: 1,
    asset_name: "Chiller 1",
    status_code: 1, // running
    last_update: "10:30:45",
    alarm_status: {
      Alarm_1: false,
      Alarm_2: false,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 3,
  },
  {
    id: 2,
    asset_name: "Chiller 2",
    status_code: 0, // stopped
    last_update: "10:30:44",
    alarm_status: {
      Alarm_1: false,
      Alarm_2: false,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 3,
  },
  {
    id: 3,
    asset_name: "Chiller 3",
    status_code: 2, // error
    last_update: "10:30:47",
    alarm_status: {
      Alarm_1: true,
      Alarm_2: true,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 3,
  },
  {
    id: 4,
    asset_name: "Chiller 4",
    status_code: 1, // running
    last_update: "10:30:48",
    alarm_status: {
      Alarm_1: false,
      Alarm_2: false,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 3,
  },
];

export const upsSystems = [
  {
    id: 1,
    asset_name: "UPS 1",
    status_code: 1, // running
    last_update: "10:30:48",
    alarm_status: {
      Alarm_1: false,
      Alarm_2: false,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 5,
  },
  {
    id: 2,
    asset_name: "UPS 2",
    status_code: 0, // stopped
    last_update: "10:30:45",
    alarm_status: {
      Alarm_1: false,
      Alarm_2: false,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 5,
  },
  {
    id: 3,
    asset_name: "UPS 3",
    status_code: 2, // error
    last_update: "10:30:49",
    alarm_status: {
      Alarm_1: true,
      Alarm_2: true,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 5,
  },
  {
    id: 4,
    asset_name: "UPS 4",
    status_code: 2, // error
    last_update: "10:30:49",
    alarm_status: {
      Alarm_1: true,
      Alarm_2: true,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 5,
  },
  {
    id: 5,
    asset_name: "UPS 5",
    status_code: 1, // running
    last_update: "10:30:41",
    alarm_status: {
      Alarm_1: false,
      Alarm_2: false,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 5,
  },
  {
    id: 6,
    asset_name: "UPS 6",
    status_code: 1, // running
    last_update: "10:30:40",
    alarm_status: {
      Alarm_1: false,
      Alarm_2: false,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 5,
  },
  {
    id: 7,
    asset_name: "UPS 7",
    status_code: 0, // stopped
    last_update: "10:30:45",
    alarm_status: {
      Alarm_1: false,
      Alarm_2: false,
      Alarm_3: false,
      Alarm_4: false,
    },
    category_code: 5,
  },
];
