/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react'
import * as M from './math'
import * as G from './general'
import { TriangleLab } from './geo'
import * as N from './gen'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const INTERACTIVES: Record<string, ComponentType<{ data?: any }>> = {
  fraction: M.FractionLab,
  angles: M.AngleLab,
  circle: M.CircleLab,
  quad: M.QuadLab,
  trig: M.TrigLab,
  venn: M.VennLab,
  line: M.LineLab,
  seq: M.SeqLab,
  similar: M.SimilarLab,
  count: M.CountLab,
  percent: M.PercentLab,
  tri: TriangleLab,
  system: N.SystemLab,
  graph: N.GraphLab,
  truth: N.TruthTable,
  interest: N.InterestLab,
  stats: N.StatsLab,
  steps: G.StepOrder as ComponentType<{ data?: any }>,
  flash: G.FlashDeck as ComponentType<{ data?: any }>,
  errors: G.ErrorHunt as ComponentType<{ data?: any }>,
  pattern: G.PatternLab,
  series: G.SeriesLab,
}
