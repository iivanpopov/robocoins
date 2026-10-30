import { Temporal } from '@js-temporal/polyfill'

type Satellite = readonly [number, number]

type ConstellationStar = {
  x: number
  y: number
  scale: number
  satellites: readonly Satellite[]
}

type Constellation = {
  name: 'robot' | 'gamepad' | 'rocket' | 'code' | 'circuit' | 'idea' | 'orbit' | 'plane'
  stars: readonly [
    ConstellationStar,
    ConstellationStar,
    ConstellationStar,
    ConstellationStar,
    ConstellationStar,
    ConstellationStar,
    ConstellationStar,
  ]
}

const CONSTELLATIONS = [
  {
    name: 'robot',
    stars: [
      {
        x: 140,
        y: 195,
        scale: 0.82,
        satellites: [
          [180, 190],
          [210, 188],
        ],
      },
      {
        x: 280,
        y: 180,
        scale: 0.76,
        satellites: [
          [280, 147],
          [280, 131],
        ],
      },
      {
        x: 430,
        y: 195,
        scale: 0.86,
        satellites: [
          [357, 188],
          [395, 190],
        ],
      },
      {
        x: 480,
        y: 285,
        scale: 0.72,
        satellites: [
          [466, 240],
          [467, 325],
        ],
      },
      {
        x: 400,
        y: 375,
        scale: 0.8,
        satellites: [
          [355, 375],
          [320, 375],
        ],
      },
      {
        x: 220,
        y: 375,
        scale: 0.74,
        satellites: [
          [165, 350],
          [140, 330],
        ],
      },
      {
        x: 100,
        y: 285,
        scale: 0.9,
        satellites: [
          [112, 240],
          [205, 259],
          [366, 259],
        ],
      },
    ],
  },
  {
    name: 'gamepad',
    stars: [
      {
        x: 95,
        y: 235,
        scale: 0.82,
        satellites: [
          [125, 207],
          [155, 190],
        ],
      },
      {
        x: 190,
        y: 180,
        scale: 0.74,
        satellites: [
          [230, 184],
          [270, 188],
        ],
      },
      {
        x: 335,
        y: 190,
        scale: 0.8,
        satellites: [
          [380, 186],
          [420, 183],
        ],
      },
      {
        x: 480,
        y: 180,
        scale: 0.76,
        satellites: [
          [504, 225],
          [515, 260],
        ],
      },
      {
        x: 525,
        y: 300,
        scale: 0.86,
        satellites: [
          [485, 330],
          [452, 350],
        ],
      },
      {
        x: 410,
        y: 365,
        scale: 0.78,
        satellites: [
          [355, 325],
          [300, 310],
        ],
      },
      {
        x: 200,
        y: 350,
        scale: 0.88,
        satellites: [
          [144, 330],
          [116, 290],
          [195, 252],
        ],
      },
    ],
  },
  {
    name: 'rocket',
    stars: [
      {
        x: 340,
        y: 145,
        scale: 0.8,
        satellites: [
          [372, 175],
          [395, 200],
        ],
      },
      {
        x: 425,
        y: 230,
        scale: 0.74,
        satellites: [
          [418, 267],
          [411, 290],
        ],
      },
      {
        x: 405,
        y: 315,
        scale: 0.82,
        satellites: [
          [430, 337],
          [450, 355],
        ],
      },
      {
        x: 470,
        y: 370,
        scale: 0.72,
        satellites: [
          [412, 356],
          [370, 345],
        ],
      },
      {
        x: 305,
        y: 335,
        scale: 0.88,
        satellites: [
          [272, 350],
          [245, 365],
        ],
      },
      {
        x: 200,
        y: 380,
        scale: 0.78,
        satellites: [
          [212, 332],
          [221, 293],
        ],
      },
      {
        x: 230,
        y: 245,
        scale: 0.84,
        satellites: [
          [267, 210],
          [304, 174],
          [330, 248],
        ],
      },
    ],
  },
  {
    name: 'code',
    stars: [
      {
        x: 175,
        y: 175,
        scale: 0.82,
        satellites: [
          [157, 186],
          [150, 206],
          [128, 214],
          [120, 232],
          [99, 241],
        ],
      },
      {
        x: 85,
        y: 260,
        scale: 0.74,
        satellites: [
          [103, 272],
          [110, 290],
          [131, 299],
          [140, 318],
          [162, 326],
        ],
      },
      { x: 175, y: 345, scale: 0.86, satellites: [] },
      {
        x: 310,
        y: 170,
        scale: 0.78,
        satellites: [],
      },
      {
        x: 255,
        y: 355,
        scale: 0.88,
        satellites: [
          [264, 337],
          [262, 315],
          [277, 299],
          [275, 277],
          [285, 260],
          [285, 239],
          [299, 223],
          [299, 201],
          [309, 183],
        ],
      },
      {
        x: 425,
        y: 185,
        scale: 0.76,
        satellites: [
          [443, 195],
          [451, 216],
          [472, 224],
          [482, 240],
          [503, 249],
        ],
      },
      {
        x: 520,
        y: 270,
        scale: 0.84,
        satellites: [
          [502, 279],
          [492, 300],
          [472, 307],
          [463, 327],
          [444, 335],
          [425, 355],
        ],
      },
    ],
  },
  {
    name: 'circuit',
    stars: [
      {
        x: 170,
        y: 175,
        scale: 0.8,
        satellites: [
          [204, 171],
          [170, 141],
        ],
      },
      {
        x: 330,
        y: 155,
        scale: 0.76,
        satellites: [
          [280, 162],
          [366, 168],
        ],
      },
      {
        x: 460,
        y: 205,
        scale: 0.86,
        satellites: [
          [416, 187],
          [500, 205],
        ],
      },
      {
        x: 475,
        y: 330,
        scale: 0.74,
        satellites: [
          [470, 278],
          [515, 330],
        ],
      },
      {
        x: 325,
        y: 375,
        scale: 0.88,
        satellites: [
          [392, 355],
          [325, 406],
        ],
      },
      {
        x: 165,
        y: 345,
        scale: 0.8,
        satellites: [
          [230, 357],
          [134, 374],
        ],
      },
      {
        x: 110,
        y: 255,
        scale: 0.84,
        satellites: [
          [135, 215],
          [132, 300],
          [76, 255],
        ],
      },
    ],
  },
  {
    name: 'idea',
    stars: [
      {
        x: 205,
        y: 170,
        scale: 0.8,
        satellites: [
          [252, 158],
          [296, 151],
        ],
      },
      {
        x: 350,
        y: 150,
        scale: 0.76,
        satellites: [
          [391, 166],
          [424, 190],
        ],
      },
      {
        x: 450,
        y: 220,
        scale: 0.84,
        satellites: [
          [446, 258],
          [434, 287],
        ],
      },
      {
        x: 415,
        y: 310,
        scale: 0.74,
        satellites: [
          [389, 337],
          [370, 356],
        ],
      },
      {
        x: 350,
        y: 375,
        scale: 0.86,
        satellites: [
          [316, 375],
          [299, 394],
        ],
      },
      {
        x: 250,
        y: 375,
        scale: 0.78,
        satellites: [
          [231, 340],
          [205, 311],
        ],
      },
      {
        x: 170,
        y: 275,
        scale: 0.88,
        satellites: [
          [166, 232],
          [181, 198],
        ],
      },
    ],
  },
  {
    name: 'orbit',
    stars: [
      {
        x: 95,
        y: 300,
        scale: 0.84,
        satellites: [
          [109, 261],
          [130, 226],
        ],
      },
      {
        x: 160,
        y: 195,
        scale: 0.76,
        satellites: [
          [210, 171],
          [260, 154],
        ],
      },
      {
        x: 315,
        y: 145,
        scale: 0.8,
        satellites: [
          [371, 151],
          [424, 167],
        ],
      },
      {
        x: 475,
        y: 190,
        scale: 0.72,
        satellites: [
          [505, 225],
          [520, 266],
        ],
      },
      {
        x: 520,
        y: 310,
        scale: 0.86,
        satellites: [
          [475, 345],
          [424, 366],
        ],
      },
      {
        x: 365,
        y: 375,
        scale: 0.78,
        satellites: [
          [311, 364],
          [265, 344],
        ],
      },
      {
        x: 220,
        y: 320,
        scale: 0.9,
        satellites: [
          [180, 285],
          [267, 266],
          [332, 237],
        ],
      },
    ],
  },
  {
    name: 'plane',
    stars: [
      {
        x: 85,
        y: 200,
        scale: 0.82,
        satellites: [
          [154, 190],
          [221, 180],
        ],
      },
      {
        x: 300,
        y: 170,
        scale: 0.74,
        satellites: [
          [373, 163],
          [445, 153],
        ],
      },
      {
        x: 525,
        y: 145,
        scale: 0.86,
        satellites: [
          [482, 191],
          [442, 234],
        ],
      },
      {
        x: 400,
        y: 280,
        scale: 0.76,
        satellites: [
          [382, 314],
          [366, 348],
        ],
      },
      {
        x: 350,
        y: 380,
        scale: 0.88,
        satellites: [
          [323, 348],
          [295, 315],
        ],
      },
      {
        x: 270,
        y: 285,
        scale: 0.78,
        satellites: [
          [239, 302],
          [205, 321],
        ],
      },
      {
        x: 170,
        y: 340,
        scale: 0.84,
        satellites: [
          [142, 292],
          [115, 248],
          [347, 240],
        ],
      },
    ],
  },
] as const satisfies readonly Constellation[]

export function getWeeklyConstellation(date?: string): Constellation {
  const weekOfYear = date ? (Temporal.PlainDate.from(date).weekOfYear ?? 1) : 1
  return CONSTELLATIONS[(weekOfYear - 1) % CONSTELLATIONS.length]
}
