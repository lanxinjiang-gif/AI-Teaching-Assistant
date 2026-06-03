// Server component: enumerates every case/stage combination so
// `output: 'export'` can prerender one static page per stage. The
// interactive UI lives in the client component below.
import { caseRegistry } from '@/data/cases';
import StageClient from './StageClient';

export function generateStaticParams() {
  return caseRegistry.flatMap((c) =>
    c.stages.map((s) => ({ caseId: c.id, stageId: s.id }))
  );
}

export const dynamicParams = false;

export default function StagePage() {
  return <StageClient />;
}
