// Server component: enumerates the case routes so `output: 'export'` can
// prerender one static page per case. The interactive UI lives in the
// client component below.
import { caseRegistry } from '@/data/cases';
import CaseIntroClient from './CaseIntroClient';

export function generateStaticParams() {
  return caseRegistry.map((c) => ({ caseId: c.id }));
}

export const dynamicParams = false;

export default function CaseIntroPage() {
  return <CaseIntroClient />;
}
