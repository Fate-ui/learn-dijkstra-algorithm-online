import mitt from 'mitt'

type Events = {
  floorChange: number
}

export const emitter = mitt<Events>()
