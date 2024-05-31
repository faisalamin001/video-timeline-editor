import { TimelineEffect, TimelineRow } from "@xzdarcy/react-timeline-editor"

export const mockEffect: Record<string, TimelineEffect> = {
  effect0: {
    id: "effect0",
    name: "效果0",
  },
  effect1: {
    id: "effect1",
    name: "效果1",
  },
}

export const mockData: TimelineRow[] = [
  {
    id: "0",
    actions: [
      {
        id: "action00",
        start: 0,
        end: 5,
        effectId: "effect0",
      },
    ],
  },
  {
    id: "1",
    actions: [
      {
        id: "action10",
        start: 4.0,
        end: 7,
        effectId: "effect1",
      },
    ],
  },
  {
    id: "2",
    actions: [
      {
        id: "action30",
        start: 7,
        end: 9,
        effectId: "effect1",
      },
      {
        id: "action31",
        start: 9.5,
        end: 15,
        effectId: "effect1",
      },
    ],
  },
]
